import * as UserController from './userController';

export const userResolver = {
    Query: {
        user: (_: any, { id }: { id: string }) => UserController.getUserById(id),
    },
    Mutation: {
        createUser: (_: any, args: { name: string; email: string; passwordHash: string }) =>
            UserController.createUser(args),
    },
};