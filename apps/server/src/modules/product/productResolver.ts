import * as ProductController from './productController';

export const productResolver = {
    Query: {
        product: (_: any, { id }: { id: string }) => ProductController.getProductById(id),
        products: () => ProductController.getAllProducts(),
    },
    Mutation: {
        createProduct: (_: any, args: { name: string; sku?: string; description?: string; unit: string }) =>
            ProductController.createProduct(args),
        updateProduct: (_: any, { id, ...data }: { id: string; name?: string; sku?: string; description?: string; unit?: string }) =>
            ProductController.updateProduct(id, data),
        deleteProduct: (_: any, { id }: { id: string }) =>
            ProductController.deleteProduct(id),
    },
};
