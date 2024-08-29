import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import Crypto from 'crypto';
import app from '../../../../app.js';
import createAuthTokenByUserId from '../../../../helpers/create-auth-token-by-user-id.js';
import { createUser } from '../../../../../test/factories/user.js';
import { createFlow } from '../../../../../test/factories/flow.js';
import { createPermission } from '../../../../../test/factories/permission.js';
import getFlowMock from '../../../../../test/mocks/rest/api/v1/flows/get-flow.js';

describe('PATCH /api/v1/flows/:flowId', () => {
  let currentUser, currentUserRole, token;

  beforeEach(async () => {
    currentUser = await createUser();
    currentUserRole = await currentUser.$relatedQuery('role');

    token = await createAuthTokenByUserId(currentUser.id);
  });

  it('should return the updated flow data of current user', async () => {
    const currentUserFlow = await createFlow({ userId: currentUser.id });

    await createPermission({
      action: 'read',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: [],
    });

    await createPermission({
      action: 'update',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: ['isCreator'],
    });

    const newFlowName = 'Updated flow';

    const response = await request(app)
      .patch(`/api/v1/flows/${currentUserFlow.id}`)
      .set('Authorization', token)
      .send({
        name: newFlowName,
      })
      .expect(200);

    const refetchedCurrentUserFlow = await currentUserFlow.$query();

    const expectedPayload = await getFlowMock({
      ...refetchedCurrentUserFlow,
      name: newFlowName,
    });

    expect(response.body).toStrictEqual(expectedPayload);
  });

  it('should return the updated flow data of another user', async () => {
    const anotherUser = await createUser();
    const anotherUserFlow = await createFlow({ userId: anotherUser.id });

    await createPermission({
      action: 'read',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: [],
    });

    await createPermission({
      action: 'update',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: [],
    });

    const response = await request(app)
      .patch(`/api/v1/flows/${anotherUserFlow.id}`)
      .set('Authorization', token)
      .send({
        name: 'Updated flow',
      })
      .expect(200);

    const refetchedAnotherUserFlow = await anotherUserFlow.$query();

    const expectedPayload = await getFlowMock({
      ...refetchedAnotherUserFlow,
      name: 'Updated flow',
    });

    expect(response.body).toStrictEqual(expectedPayload);
  });

  it('should return not found response for not existing flow UUID', async () => {
    await createPermission({
      action: 'read',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: [],
    });

    await createPermission({
      action: 'update',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: [],
    });

    const notExistingFlowUUID = Crypto.randomUUID();

    await request(app)
      .patch(`/api/v1/flows/${notExistingFlowUUID}`)
      .set('Authorization', token)
      .expect(404);
  });

  it('should return bad request response for invalid UUID', async () => {
    await createPermission({
      action: 'read',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: [],
    });

    await createPermission({
      action: 'update',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: [],
    });

    await request(app)
      .patch('/api/v1/flows/invalidFlowUUID')
      .set('Authorization', token)
      .expect(400);
  });

  it('should return unprocessable entity response for invalid data', async () => {
    const currentUserFlow = await createFlow({ userId: currentUser.id });

    await createPermission({
      action: 'read',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: [],
    });

    await createPermission({
      action: 'update',
      subject: 'Flow',
      roleId: currentUserRole.id,
      conditions: ['isCreator'],
    });

    const response = await request(app)
      .patch(`/api/v1/flows/${currentUserFlow.id}`)
      .set('Authorization', token)
      .send({
        name: 123123,
      })
      .expect(422);

    expect(response.body.errors).toStrictEqual({
      name: ['must be string'],
    });
    expect(response.body.meta.type).toStrictEqual('ModelValidation');
  });
});