import * as LocationController from './locationController';

export const locationResolver = {
    Query: {
        location: (_: any, { id }: { id: string }) => LocationController.getLocationById(id),
        locations: () => LocationController.getAllLocations(),
    },
    Mutation: {
        createLocation: (_: any, args: { name: string; description?: string }) =>
            LocationController.createLocation(args),
        updateLocation: (_: any, { id, ...data }: { id: string; name?: string; description?: string }) =>
            LocationController.updateLocation(id, data),
        deleteLocation: (_: any, { id }: { id: string }) =>
            LocationController.deleteLocation(id),
    },
};
