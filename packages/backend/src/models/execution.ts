import Base from './base';
import Flow from './flow';
import ExecutionStep from './execution-step';

class Execution extends Base {
  id!: string;
  flowId!: string;
  testRun = false;
  executionSteps: ExecutionStep[] = [];

  static tableName = 'executions';

  static jsonSchema = {
    type: 'object',

    properties: {
      id: { type: 'string', format: 'uuid' },
      flowId: { type: 'string', format: 'uuid' },
      testRun: { type: 'boolean' },
    },
  };

  static relationMappings = () => ({
    flow: {
      relation: Base.BelongsToOneRelation,
      modelClass: Flow,
      join: {
        from: 'executions.flow_id',
        to: 'flows.id',
      },
    },
    executionSteps: {
      relation: Base.HasManyRelation,
      modelClass: ExecutionStep,
      join: {
        from: 'executions.id',
        to: 'execution_steps.execution_id',
      },
    },
  });
}

export default Execution;