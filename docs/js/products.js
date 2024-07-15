import { renderProducts } from "./render.js";
import { addToCart } from "./cart.js";
import { addToSelected, displaySelectedProducts } from "./heart.js";

document.addEventListener('DOMContentLoaded', displaySelectedProducts);

const searchProducts = async () => {
    const products = await renderProducts();
    const inputField = document.getElementById('search');
    const searchBtn = document.querySelector('.search-btn');
    const siteBackground = document.body;
    const overlay = document.querySelector('#overlay');

    const findProduct = () => {
        const userRequest = inputField.value.toLowerCase();
        const matchingProducts = products.filter(product => product.title.toLowerCase().startsWith(userRequest));

        if (matchingProducts.length > 0) {
            const longestCommonPrefix = findLongestCommonPrefix(matchingProducts.map(product => product.title.toLowerCase()));
            inputField.value = longestCommonPrefix;
        }
        return matchingProducts;
    };
    const findLongestCommonPrefix = (products) => {
        if (products.length === 0) return '';
        let prefix = products[0];
        for (let i = 1; i < products.length; i++) {
            while (products[i].indexOf(prefix) !== 0) {
                prefix = prefix.substring(0, prefix.length - 1);
                if (prefix.length === 0) return '';
            }
        }
        return prefix;
    };
    const createProductModal = () => {
        const matchingProducts = findProduct();
        const productModalWindow = document.createElement('div');
        productModalWindow.classList.add('product-modal');

        if (matchingProducts.length > 0) {
            const product = matchingProducts[0];
            productModalWindow.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-text">Інформація про товар</h2>
                <img src="./img/heart/x.svg" class="close-btn" alt="close-button">
            </div>
            <div class="modal-body">
                <img class="product-image" src="${product.image}" alt="${product.title}">
                <div class="right-orient-product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-descr">${product.description}</p>
                    <p class="product-price">Ціна: ${product.price}$</p>
                    <p class="product-categ">Категорія: ${product.category}</p>
                    <p class="product-rate">Рейтинг: ${product.rating.rate}</p>
                    <p class="product-count">Відгуки: ${product.rating.count}</p>
                    <div class="info-nav">
                        <img class="buy-btn" src="./img/heart/cart.svg" width=40>
                        <img class="select-btn" src="./img/header-img/heart-ico-single.png" width=40>
                    </div>
                    </div>
            </div>
            `;
        } else {
            productModalWindow.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-text">Інформація про товар</h2>
                <img src="./img/heart/x.svg" class="close-btn" alt="close-button">
            </div>
            <div class="modal-body">
                <h2 class="empty-text">На жаль даного товару у нас у наявності немає.Зазирніть до нас пізніше :)</h2>
            </div>
            `;
        }
        document.body.appendChild(productModalWindow);
        setTimeout(() => {
            productModalWindow.classList.add('show');
        }, 10);

        overlay.style.display = 'block';
        siteBackground.style.overflow = 'hidden';

        const closeBtn = productModalWindow.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            productModalWindow.classList.remove('show');
            productModalWindow.classList.add('hide');
            inputField.value = '';
            // Закриття модального вікна з затримкою для анімації
            setTimeout(() => {
                overlay.style.display = 'none';
                siteBackground.style.overflow = 'auto';
                productModalWindow.remove(); // Видалення модалки з DOM
            }, 800); // Час затримки відповідає тривалості анімації в CSS
        });
        const buyBtn = document.querySelector('.buy-btn');
        const selectBtn = document.querySelector('.select-btn');
        const product = matchingProducts[0];
        buyBtn.addEventListener('click', () => {
            addToCart(product);
        });
        selectBtn.addEventListener('click', () => {
            addToSelected(product);
        })
    };
    inputField.addEventListener('input', () => {
        findProduct();
    });
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            createProductModal();
        }
    });
    searchBtn.addEventListener('click', () => {
        createProductModal();
    });
};

searchProducts();
