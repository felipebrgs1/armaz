import * as MovementController from './movementController';

export const movementResolver = {
    Query: {
        movement: (_: any, { id }: { id: string }) => MovementController.getMovementById(id),
        movements: () => MovementController.getAllMovements(),
        movementsByProduct: (_: any, { productId }: { productId: string }) =>
            MovementController.getMovementsByProduct(productId),
        movementsByLocation: (_: any, { locationId }: { locationId: string }) =>
            MovementController.getMovementsByLocation(locationId),
    },
    Mutation: {
        createMovement: (_: any, args: {
            productId: string;
            locationId: string;
            userId: string;
            type: string;
            quantity: number;
            notes?: string;
        }) => MovementController.createMovement(args),
        deleteMovement: (_: any, { id }: { id: string }) =>
            MovementController.deleteMovement(id),
    },
};
