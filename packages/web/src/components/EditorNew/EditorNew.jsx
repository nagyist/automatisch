import { useEffect, useCallback, createContext, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FlowPropType } from 'propTypes/propTypes';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { debounce } from 'lodash';

import useCreateStep from 'hooks/useCreateStep';
import useUpdateStep from 'hooks/useUpdateStep';

import { useAutoLayout } from './useAutoLayout';
import { useScrollBoundaries } from './useScrollBoundaries';
import FlowStepNode from './FlowStepNode/FlowStepNode';
import Edge from './Edge/Edge';
import InvisibleNode from './InvisibleNode/InvisibleNode';
import { EditorWrapper } from './style';
import {
  generateEdgeId,
  generateInitialEdges,
  generateInitialNodes,
  updatedCollapsedNodes,
} from './utils';
import { EDGE_TYPES, INVISIBLE_NODE_ID, NODE_TYPES } from './constants';

export const EdgesContext = createContext();
export const NodesContext = createContext();

const nodeTypes = {
  [NODE_TYPES.FLOW_STEP]: FlowStepNode,
  [NODE_TYPES.INVISIBLE]: InvisibleNode,
};

const edgeTypes = {
  [EDGE_TYPES.ADD_NODE_EDGE]: Edge,
};

const EditorNew = ({ flow }) => {
  const { mutateAsync: updateStep } = useUpdateStep();
  const queryClient = useQueryClient();

  const { mutateAsync: createStep, isPending: isCreateStepPending } =
    useCreateStep(flow?.id);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    generateInitialNodes(flow),
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    generateInitialEdges(flow),
  );
  const [containerHeight, setContainerHeight] = useState(null);

  useAutoLayout();
  useScrollBoundaries(containerHeight);

  const createdStepIdRef = useRef(null);
  const containerRef = useRef(null);

  const openNextStep = useCallback(
    (currentStepId) => {
      setNodes((nodes) => {
        const currentStepIndex = nodes.findIndex(
          (node) => node.id === currentStepId,
        );
        if (currentStepIndex >= 0) {
          const nextStep = nodes[currentStepIndex + 1];
          return updatedCollapsedNodes(nodes, nextStep.id);
        }
        return nodes;
      });
    },
    [setNodes],
  );

  const onStepClose = useCallback(() => {
    setNodes((nodes) => updatedCollapsedNodes(nodes));
  }, [setNodes]);

  const onStepOpen = useCallback(
    (stepId) => {
      setNodes((nodes) => updatedCollapsedNodes(nodes, stepId));
    },
    [setNodes],
  );

  const onStepChange = useCallback(
    async (step) => {
      const payload = {
        id: step.id,
        key: step.key,
        parameters: step.parameters,
        connectionId: step.connection?.id,
      };

      if (step.name || step.keyLabel) {
        payload.name = step.name || step.keyLabel;
      }

      if (step.appKey) {
        payload.appKey = step.appKey;
      }

      await updateStep(payload);

      await queryClient.invalidateQueries({
        queryKey: ['steps', step.id, 'connection'],
      });
    },
    [updateStep, queryClient],
  );

  const onAddStep = useCallback(
    debounce(async (previousStepId) => {
      const { data: createdStep } = await createStep({ previousStepId });
      createdStepIdRef.current = createdStep.id;
    }, 300),
    [createStep],
  );

  useEffect(() => {
    if (flow.steps.length + 1 !== nodes.length) {
      setNodes((nodes) => {
        const newNodes = flow.steps.map((step) => {
          const createdStepId = createdStepIdRef.current;
          const prevNode = nodes.find(({ id }) => id === step.id);
          if (prevNode) {
            return {
              ...prevNode,
              zIndex: createdStepId ? 0 : prevNode.zIndex,
              data: {
                ...prevNode.data,
                collapsed: createdStepId ? true : prevNode.data.collapsed,
              },
            };
          } else {
            return {
              id: step.id,
              type: NODE_TYPES.FLOW_STEP,
              position: {
                x: 0,
                y: 0,
              },
              zIndex: 1,
              data: {
                collapsed: false,
                laidOut: false,
              },
            };
          }
        });

        const prevInvisible = nodes.find(({ id }) => id === INVISIBLE_NODE_ID);
        return [
          ...newNodes,
          {
            id: INVISIBLE_NODE_ID,
            type: NODE_TYPES.INVISIBLE,
            position: {
              x: prevInvisible?.position.x || 0,
              y: prevInvisible?.position.y || 0,
            },
          },
        ];
      });

      setEdges((edges) => {
        const newEdges = flow.steps
          .map((step, i) => {
            const sourceId = step.id;
            const targetId = flow.steps[i + 1]?.id;
            const edge = edges?.find(
              (edge) => edge.id === generateEdgeId(sourceId, targetId),
            );
            if (targetId) {
              return {
                id: generateEdgeId(sourceId, targetId),
                source: sourceId,
                target: targetId,
                type: 'addNodeEdge',
                data: {
                  laidOut: edge ? edge?.data.laidOut : false,
                },
              };
            }
            return null;
          })
          .filter((edge) => !!edge);

        const lastStep = flow.steps[flow.steps.length - 1];
        const lastEdge = edges[edges.length - 1];

        return lastStep
          ? [
              ...newEdges,
              {
                id: generateEdgeId(lastStep.id, INVISIBLE_NODE_ID),
                source: lastStep.id,
                target: INVISIBLE_NODE_ID,
                type: 'addNodeEdge',
                data: {
                  laidOut:
                    lastEdge?.id ===
                    generateEdgeId(lastStep.id, INVISIBLE_NODE_ID)
                      ? lastEdge?.data.laidOut
                      : false,
                },
              },
            ]
          : newEdges;
      });

      if (createdStepIdRef.current) {
        createdStepIdRef.current = null;
      }
    }
  }, [flow.steps]);

  useEffect(function updateContainerHeightOnResize() {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <NodesContext.Provider
      value={{
        openNextStep,
        onStepOpen,
        onStepClose,
        onStepChange,
        flowId: flow.id,
        steps: flow.steps,
      }}
    >
      <EdgesContext.Provider
        value={{
          stepCreationInProgress: isCreateStepPending,
          onAddStep,
          flowActive: flow.active,
        }}
      >
        <EditorWrapper direction="column" ref={containerRef}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            panOnScroll
            panOnScrollMode="vertical"
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            panActivationKeyCode={null}
            proOptions={{ hideAttribution: true }}
          />
        </EditorWrapper>
      </EdgesContext.Provider>
    </NodesContext.Provider>
  );
};

EditorNew.propTypes = {
  flow: FlowPropType.isRequired,
};

export default EditorNew;
