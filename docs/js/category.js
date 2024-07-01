import { renderProducts } from './render.js';

// Рендеримо продукти з fakestore.api
const renderProductsForCategories = async () => {
    try {
        const products = await renderProducts();
        const productsContainer = document.querySelector('.products__container');
        if (!productsContainer) {
            console.error('Products container not found!');
            return [];
        }
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('col-md-3', 'product-item');
            productItem.innerHTML = `
                <div class="card d-flex justify-content-between">
                    <img src="${product.image}" class="card-img-top custom-product-image" alt="${product.title}">
                    <div class="card-body d-flex justify-content-between align-items-start flex-column">
                        <h5 class="card-title custom-product-title">${product.title}</h5>
                        <p class="card-description custom-product-description">${product.description}</p>
                        <p class="card-price"><strong>Ціна: </strong>${product.price}$</p>
                        <p class="card-category"><strong>Категорія: </strong>${product.category}</p>
                        <p class="card-rate"><strong>Рейтинг: </strong>${product.rating.rate}</p>
                        <p class="card-count"><strong>Відгуки: </strong>${product.rating.count}</p>
                        <div class="d-inline-flex justify-content-between w-100">
                            <a href="#" class="btn btn-info btn-width view-btn p-1" data-id="${product.id}">Переглянути</a>
                            <a href="#" class="btn btn-primary btn-width select-btn p-1 " data-id="${product.id}">Додати в обрані</a>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productItem);
        });
        viewProducts(products);
        addToFavorite(products);
        return products;
    } catch (error) {
        console.error('Error rendering products:', error);
        return [];
    }
};

// Функція для обробки кнопок "Переглянути" та показу модалки з деталями продукту
function viewProducts(products) {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = button.getAttribute('data-id');
            const result = products.find(product => product.id.toString() === productId);

            if (result) {
                const productModal = new bootstrap.Modal(document.getElementById('productModal'));
                const modalBody = document.querySelector('#productModal .modal-body');
                modalBody.innerHTML = `
                    <div class="productCard">
                        <img src="${result.image}" class="card-img-top custom-product-image" alt="${result.title}">
                        <div class="card-body">
                            <h5 class="card-title custom-product-title">${result.title}</h5>
                            <p class="card-description custom-product-description">${result.description}</p>
                            <p class="card-price"><strong>Ціна: </strong>${result.price}$</p>
                            <p class="card-category"><strong>Категорія: </strong>${result.category}</p>
                            <p class="card-rate"><strong>Рейтинг: </strong>${result.rating.rate}</p>
                            <p class="card-count"><strong>Відгуки: </strong>${result.rating.count}</p>
                        </div>
                    </div>
                `;
                productModal.show();
            }
        });
    });
}

// Код для поля пошуку товарів
const searchProducts = async () => {
    try {
        const products = await renderProductsForCategories();
        const searchInput = document.querySelector('.form-control');
        const searchBtn = document.querySelector('#button-addon2');
        const datalist = document.getElementById('suggestions');

        searchInput.addEventListener('input', (event) => {
            const userRequest = event.target.value.toLowerCase();
            datalist.innerHTML = '';
            const systemSuggestion = products.filter(product => product.title.toLowerCase().includes(userRequest));
            systemSuggestion.forEach(product => {
                const option = document.createElement('option');
                option.value = product.title;
                datalist.appendChild(option);
            });
        });

        searchBtn.addEventListener('click', () => {
            const userProduct = searchInput.value.toLowerCase();
            const product = products.find(product => product.title.toLowerCase() === userProduct);

            if (!product) {
                const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
                errorModal.show();
            } else {
                const productModal = new bootstrap.Modal(document.getElementById('productModal'));
                const modalBody = document.querySelector('#productModal .modal-body');
                modalBody.innerHTML = `
                    <div class="productCard">
                        <img src="${product.image}" class="card-img-top custom-product-image" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title custom-product-title">${product.title}</h5>
                            <p class="card-description custom-product-description">${product.description}</p>
                            <p class="card-price"><strong>Ціна: </strong>${product.price}$</p>
                            <p class="card-category"><strong>Категорія: </strong>${product.category}</p>
                            <p class="card-rate"><strong>Рейтинг: </strong>${product.rating.rate}</p>
                            <p class="card-count"><strong>Відгуки: </strong>${product.rating.count}</p>
                        </div>
                    </div>
                `;
                productModal.show();
            }
        });

        return products;
    } catch (error) {
        console.error('Error searching products:', error);
        return [];
    }
};

// Код для фільтрації товарів
function sortingProducts() {
    const filterByCategory = (products, selectedCategory) => {
        switch (selectedCategory) {
            case 'Усі товари':
                return products;
            case 'Чоловічий одяг':
                return products.filter(product => product.category === "men's clothing");
            case 'Жіночий одяг':
                return products.filter(product => product.category === "women's clothing");
            case 'Коштовності':
                return products.filter(product => product.category === "jewelery");
            case 'Електроніка':
                return products.filter(product => product.category === "electronics");
            default:
                return products;
        }
    };

    const filterByPrice = (products, selectedPriceOrder) => {
        const productsCopy = products.slice();
        switch (selectedPriceOrder) {
            case 'Спочатку дешеві':
                return productsCopy.sort((a, b) => a.price - b.price);
            case 'Спочатку дорогі':
                return productsCopy.sort((a, b) => b.price - a.price);
            case 'Від найбільшої знижки':
                return productsCopy.filter(product => product.price <= 100);
            case 'Від найменшої знижки':
                return productsCopy.filter(product => product.price >= 100);
            default:
                return productsCopy;
        }
    };

    const filterByRating = (products, selectedRatingOrder) => {
        const productsCopy = products.slice();
        switch (selectedRatingOrder) {
            case 'Від найвищого рейтингу':
                return productsCopy.sort((a, b) => b.rating.rate - a.rating.rate);
            case 'Від найнижчого рейтингу':
                return productsCopy.sort((a, b) => a.rating.rate - b.rating.rate);
            case 'Від найпопулярніших':
                return productsCopy.sort((a, b) => b.rating.count - a.rating.count);
            case 'Від найменш популярних':
                return productsCopy.sort((a, b) => a.rating.count - b.rating.count);
            default:
                return productsCopy;
        }
    };

    const applyFilters = async () => {
        try {
            const products = await renderProductsForCategories();
            const productsContainer = document.querySelector('.products__container');

            if (!productsContainer) {
                console.error('Products container not found!');
                return;
            }

            document.querySelectorAll('.category-dropdown').forEach(item => {
                item.addEventListener('click', async event => {
                    event.preventDefault();
                    const category = event.target.textContent;
                    const filteredProducts = filterByCategory(products, category);
                    productsContainer.innerHTML = '';
                    renderFilteredProducts(filteredProducts, productsContainer);
                    await addToFavorite(filteredProducts);

                    // Додавання класу active
                    document.querySelectorAll('.category-dropdown').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    item.classList.add('active');
                });
            });

            document.querySelectorAll('.price-dropdown').forEach(item => {
                item.addEventListener('click', async event => {
                    event.preventDefault();
                    const priceOrder = event.target.textContent;
                    const filteredProducts = filterByPrice(products, priceOrder);
                    productsContainer.innerHTML = '';
                    renderFilteredProducts(filteredProducts, productsContainer);
                    await addToFavorite(filteredProducts);

                    // Додавання класу active
                    document.querySelectorAll('.price-dropdown').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    item.classList.add('active');
                });
            });

            document.querySelectorAll('.rating-dropdown').forEach(item => {
                item.addEventListener('click', async event => {
                    event.preventDefault();
                    const ratingOrder = event.target.textContent;
                    const filteredProducts = filterByRating(products, ratingOrder);
                    productsContainer.innerHTML = '';
                    renderFilteredProducts(filteredProducts, productsContainer);
                    await addToFavorite(filteredProducts);

                    // Додавання класу active
                    document.querySelectorAll('.rating-dropdown').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    item.classList.add('active');
                });
            });
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    };

    const renderFilteredProducts = (filteredProducts, container) => {
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('col-md-3', 'product-item');
            productItem.innerHTML = `
                <div class="card d-flex justify-content-between">
                    <img src="${product.image}" class="card-img-top custom-product-image" alt="${product.title}">
                    <div class="card-body d-flex justify-content-between align-items-start flex-column">
                        <h5 class="card-title custom-product-title">${product.title}</h5>
                        <p class="card-description custom-product-description">${product.description}</p>
                        <p class="card-price"><strong>Ціна: </strong>${product.price}$</p>
                        <p class="card-category"><strong>Категорія: </strong>${product.category}</p>
                        <p class="card-rate"><strong>Рейтинг: </strong>${product.rating.rate}</p>
                        <p class="card-count"><strong>Відгуки: </strong>${product.rating.count}</p>
                        <div class="d-inline-flex justify-content-between w-100">
                            <a href="#" class="btn btn-info btn-width view-btn p-1" data-id="${product.id}">Переглянути</a>
                            <a href="#" class="btn btn-primary btn-width select-btn p-1" data-id="${product.id}">Додати в обрані</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(productItem);
        });

        viewProducts(filteredProducts); // Передаємо список фільтрованих продуктів у функцію viewProducts
    };

    applyFilters();
}

// Код для кошика
const addToCart = async () => {
    const buyBtn = document.querySelector('.buy-btn');

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-btn')) {
            const button = event.target;
            const itemIndex = button.getAttribute('data-id');
            buyBtn.setAttribute('data-id', itemIndex);
        }
    });

    buyBtn.addEventListener('click', async (event) => {
        event.preventDefault()
        const productId = buyBtn.getAttribute('data-id');
        const products = await renderProductsForCategories();
        const product = products.find(product => product.id.toString() === productId);

        if (product) {
            const cartModalBody = document.querySelector('#cartModal .modal-body');
            const cartItem = document.createElement('div');
            cartItem.classList.add('productCard');
            cartItem.innerHTML = `
                <div class="productCard d-flex justify-content-between ">
                    <img src="${product.image}" class="card-img-top custom-product-image w-25" alt="${product.title}">
                    <div class="card-body d-flex justify-content-between align-items-start flex-column w-50">
                        <h5 class="card-title custom-product-title">${product.title}</h5>
                        <p class="card-description custom-product-description">${product.description}</p>
                        <p class="card-price"><strong>Ціна: </strong>${product.price}$</p>
                        <p class="card-category"><strong>Категорія: </strong>${product.category}</p>
                        <p class="card-rate"><strong>Рейтинг: </strong>${product.rating.rate}</p>
                        <p class="card-count"><strong>Відгуки: </strong>${product.rating.count}</p>
                    </div>
                </div>
                <hr>
            `;
            cartModalBody.appendChild(cartItem);

            const emptyText = document.querySelector('.empty-text');
            if (emptyText) {
                emptyText.style.display = 'none';
            }
        } else {
            console.log('Product not found!');
        }
    });
};

// Код для обраних товарів
const addToFavorite = async () => {
    const addBtns = document.querySelectorAll('.select-btn');
    addBtns.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const itemIndex = button.getAttribute('data-id');
            const products = await renderProducts();
            const favProduct = products.find(product => product.id.toString() === itemIndex);
            if (favProduct) {
                const cartModalBody = document.querySelector('#heartModal .modal-body');
                const cartItem = document.createElement('div');
                cartItem.classList.add('productCard');
                cartItem.innerHTML = `
                    <div class="productCard d-flex justify-content-between ">
                        <img src="${favProduct.image}" class="card-img-top custom-product-image w-25" alt="${favProduct.title}">
                        <div class="card-body d-flex justify-content-between align-items-start flex-column w-50">
                            <h5 class="card-title custom-product-title">${favProduct.title}</h5>
                            <p class="card-description custom-product-description">${favProduct.description}</p>
                            <p class="card-price"><strong>Ціна: </strong>${favProduct.price}$</p>
                            <p class="card-category"><strong>Категорія: </strong>${favProduct.category}</p>
                            <p class="card-rate"><strong>Рейтинг: </strong>${favProduct.rating.rate}</p>
                            <p class="card-count"><strong>Відгуки: </strong>${favProduct.rating.count}</p>
                        </div>
                    </div>
                    <hr>
                `;
                cartModalBody.appendChild(cartItem);

                const emptyText = document.querySelector('.heart__empty-text');
                if (cartModalBody.children.length > 1) {
                    emptyText.style.display = 'none';
                }else{
                    emptyText.style.display = 'block';
                }
            }else {
                console.log('Product not found!');
            }
        })
    })
}

// Викликаємо функцію для відображення та обробки продуктів
document.addEventListener('DOMContentLoaded', () => {
    renderProductsForCategories();
    viewProducts();
    searchProducts();
    sortingProducts();
    addToCart();
    addToFavorite();
});
