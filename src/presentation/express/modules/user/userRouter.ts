import { UserDatasourceImpl } from '@/infrastructure/datasources/users/user.datasource.impl';
import { UserRepositoryImpl } from '@/infrastructure/repositories/users/user.repository.impl';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@presentation/express/api-docs/openAPIResponseBuilders';
import { validateRequest } from '@presentation/express/common/utils';
import { verifyToken } from '@presentation/express/common/middleware/verifyToken';
import { Router } from 'express';
import { z } from 'zod';
import { UserContoller } from './userController';
import { GetUserSchema, UserCreateSchema, UserSchema, SignInSchema, SignUpSchema } from './userModel';

// Swagger documentation
export const userRegistry = new OpenAPIRegistry();
userRegistry.register('User', UserSchema);
// (/) route
userRegistry.registerPath({
  method: 'get',
  path: '/users',
  tags: ['User'],
  responses: createApiResponse(z.array(UserSchema), 'Success')
});
// (/:id) route
userRegistry.registerPath({
  method: 'get',
  path: '/users/{id}',
  tags: ['User'],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, 'Success')
});

// (signin) route
userRegistry.registerPath({
  method: 'post',
  path: '/users/signin',
  tags: ['User'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: SignInSchema
        }
      }
    }
  },
  responses: createApiResponse(UserSchema, 'Success')
});

// (signup) route
userRegistry.registerPath({
  method: 'post',
  path: '/users/signup',
  tags: ['User'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: SignUpSchema
        }
      }
    }
  },  responses: createApiResponse(UserSchema, 'Success')
});

//--------------------------------------------//
export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDatasourceImpl(); // comunicacion a bd
    const todoRepository = new UserRepositoryImpl(datasource);
    const userContoller = new UserContoller(todoRepository);

    router.get('/', verifyToken, userContoller.getAllUser);

    router.get('/:id', verifyToken, validateRequest(GetUserSchema), userContoller.getUserById);

    router.put('/', verifyToken, validateRequest(UserSchema), userContoller.updateUserById);



    router.post('/signup', validateRequest(SignUpSchema), userContoller.createUser)

    router.post('/signin', validateRequest(SignInSchema), userContoller.signIn)

    // router.get('/session', verifyToken, userContoller.session)

    // router.get('/refresh-token', userContoller.refreshToken)


    return router;
  }
}
