import { addToCart } from "./cart.js";

// Події для іконки обраних товарів
const heartIcon = document.querySelector('.top__icon-heart');
const heartContainer = document.querySelector('.heart');
const siteBackground = document.body;
const overlay = document.querySelector('#overlay');

export function addToSelected(product) {
    if (!product) {
        console.log('Товар не знайдено!');
    } else {
        let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        const isProductInSelected = selectedProducts.some(item => item.id === product.id);
        if (!isProductInSelected) {
            selectedProducts.push(product);
            // Зберігаємо оновлений список у LocalStorage
            localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
        }
        
        const heartHeader = heartContainer.querySelector('.heart-header');
        if (!heartHeader) {
            const newHeartHeader = document.createElement('div');
            newHeartHeader.classList.add('heart-header');
            newHeartHeader.innerHTML = `
                <h1 class="header-title">Сторінка обраних товарів</h1>
                <img class="close-icon" src="./img/heart/x-square.svg"></img>
            `;
            heartContainer.appendChild(newHeartHeader);
            const closeIcon = newHeartHeader.querySelector('.close-icon');
            closeIcon.addEventListener('click', () => {
                heartContainer.style.display = 'none';
                overlay.style.display = 'none';
                siteBackground.style.overflow = 'auto';
            });
        }

        // Перевірка, чи товар вже існує у списку
        const existingProductCard = heartContainer.querySelector(`.heart-item[data-id="${product.id}"]`);
        if (!existingProductCard) {
            const heartItem = document.createElement('div');
            heartItem.classList.add('heart-item');
            heartItem.setAttribute('data-id', product.id);
            heartItem.innerHTML = `
                <div class="item-body">
                    <div class="item-left">
                        <img class="product-image" src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="item-right">
                        <h2 class="product-title">${product.title}</h2>
                        <p class="product-descr">${product.description}</p>
                        <p class="product-price">Ціна: ${product.price}$</p>
                        <p class="product-categ">Категорія: ${product.category}</p>
                        <p class="product-rate">Рейтинг: ${product.rating.rate}</p>
                        <div class="flex">
                            <p class="product-count">Відгуки: ${product.rating.count}</p>
                            <div class="item-navigation">
                                <img class="addToCart-btn" src="./img/heart/cart.svg">
                                <img class="del-btn" src="./img/heart/trash.svg">
                            </div>
                        </div>
                    </div>
                </div>
            `;

            //код для кнопок у модалці обраних товарів
            const deleteBtn = heartItem.querySelector('.del-btn');
            deleteBtn.addEventListener('click', () => {
                heartItem.remove();
                updateHeartCounter();
                // Видаляємо товар з LocalStorage
                selectedProducts = selectedProducts.filter(item => item.id !== product.id);
                localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
            });

            const addToCartBtn = heartItem.querySelector('.addToCart-btn');
            addToCartBtn.addEventListener('click', () => {
                addToCart(product);
            });

            heartContainer.appendChild(heartItem);
            updateHeartCounter();
        }
    }
}

// Функція для відображення обраних товарів при завантаженні сторінки
export function displaySelectedProducts() {
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    selectedProducts.forEach(product => addToSelected(product));
}
function updateHeartCounter() {
    const products = document.querySelectorAll('.heart-item');
    const counterWrapper = document.querySelector('.top__icon-heart').parentElement;
    const totalAmount = products.length;
    counterWrapper.setAttribute('data-content', totalAmount);
}
updateHeartCounter();

// Подія по наведенні на елемент (зміна зображення)
heartIcon.addEventListener('mouseover', () => {
    heartIcon.src = './img/header-img/heart-ico-hover.png';
    heartIcon.style.cursor = 'pointer';
});
// Подія при покиданні курсора зони елемента
heartIcon.addEventListener('mouseout', () => {
    heartIcon.src = './img/header-img/heart-ico-single.png';
});
// Відкриття сторінки обраних товарів
heartIcon.addEventListener('click', () => {
    heartContainer.style.display = 'block';
    overlay.style.display = 'block';
    siteBackground.style.overflow = 'hidden';
    if (!heartContainer.querySelector('.heart-header')) {
        const heartHeader = document.createElement('div');
        heartHeader.classList.add('heart-header');
        heartHeader.innerHTML = `
            <h1 class="header-title">Сторінка обраних товарів</h1>
            <img class="close-icon" src="./img/heart/x-square.svg"></img>
        `;
        heartContainer.appendChild(heartHeader);
        // Закриття сторінки обраних товарів
        const closeIcon = heartHeader.querySelector('.close-icon');
        closeIcon.addEventListener('click', () => {
            heartContainer.style.display = 'none';
            overlay.style.display = 'none';
            siteBackground.style.overflow = 'auto';
        });
    }
});

