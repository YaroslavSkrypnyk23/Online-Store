import { getProducts } from "./api";

export const renderProducts = async () => {
    try {
        const products = await getProducts();
        if (!products) {
            throw new Error('No products found');
        }
        return products;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};