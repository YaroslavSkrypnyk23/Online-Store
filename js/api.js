//Отримали масив товарів із fakestore.api
export const getProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error occured! Status:${response.status} `)
        }
        const product = await response.json();
        return product;
    }
    catch (error) {
        console.error(`Error occured: ${error}`);
    }
};

