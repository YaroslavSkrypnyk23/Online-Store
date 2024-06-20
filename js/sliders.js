import { getProducts } from './api.js';
//Рендеримо продукти для обох слайдерів
const renderProducts = async () => {
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
//функція для верхнього слайдера
const productsForTopSlider = async () => {
    const products = await renderProducts();
    const sliderContainer = document.querySelector('.top-slider__wrapper');
    if (!sliderContainer) {
        console.error(`${sliderContainer} not found`);
        return;
    }
    sliderContainer.innerHTML = '';
    products.forEach(product => {
        const sliderItem = document.createElement('div');
        sliderItem.classList.add('top-slider__item');
        sliderItem.innerHTML = `
        <div class="top-slider__item-left">
            <h2 class="slider-title">${product.title}</h2>
            <p class="slider-price"><span>${product.price}</span>$</p>
            <button class="slider-btn" data-id="${product.id}">Купити</button>
        </div>
        <div class="top-slider__item-right">
            <img src="${product.image}" alt="product slider image">
        </div>`;
        sliderContainer.appendChild(sliderItem);
    });

    $(document).ready(function () {
        $('.top-slider__wrapper').slick({
            arrows: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 1500,
            prevArrow: '<button type="button" class="slick-prev">Prev</button>',
            nextArrow: '<button type="button" class="slick-next">Next</button>',
        });
    });
    // ВИКЛИК addToCart З СКРИПТА cart.js
    const buyBtns = document.querySelectorAll('.slider-btn');
    buyBtns.forEach(button => {
        button.addEventListener('mousedown', (event) => {
            const productId = event.target.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            button.style.transform = 'scale(0.9)'
            addToCart(product);
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)'
        })
    });
};
productsForTopSlider();

//функція для нижнього слайдера
const productsForBottomSlider = (products) => {
    const sliderContainer = document.querySelector('.bottom-slider__wrapper');
    if (!sliderContainer) {
        console.error('Slider container not found');
        return;
    }
    sliderContainer.innerHTML = ''; // Очищення контейнера слайдера
    products.forEach(product => {
        const sliderItem = document.createElement('div');
        sliderItem.classList.add('bottom-slider__item');
        sliderItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="bottom-slider__item-img">
            <p class="slider-title">${product.title}</p>
            <div class = "price-btn__container">
                <p class="slider-price"><span>${product.price}</span>$</p>
                <button class="slider-btn" data-id="${product.id}">Купити</button>
            </div>`;
        sliderContainer.appendChild(sliderItem);
    });
    // Ініціалізація слайдера(взято з GPT-3)
    if ($('.bottom-slider__wrapper').hasClass('slick-initialized')) {
        $('.bottom-slider__wrapper').slick('unslick');
    }
    $('.bottom-slider__wrapper').slick({
        arrows: true,
        dots: false,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev">Prev</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
    });
    // ВИКЛИК addToCart З СКРИПТА cart.js
    const buyBtns = document.querySelectorAll('.bottom-slider__item .slider-btn');
    buyBtns.forEach(button => {
        button.addEventListener('mousedown', (event) => {
            const productId = event.target.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            if (product) {
                button.style.transform = 'scale(0.9)'
                addToCart(product);
            } else {
                console.error('Product not found for id:', productId);
            }
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)'
        })
    });
};

// Функція для отримання та фільтрації продуктів
const getProductsForBottomSlider = async (filterType) => {
    const products = await getProducts();
    let filteredProducts = [];

    switch (filterType) {
        case 'sale':
            filteredProducts = products.filter(product => product.price >= 0 && product.price <= 50);
            break;
        case 'new':
            filteredProducts = products.filter(product => product.rating.rate >= 4 && product.rating.rate <= 5);
            break;
        case 'bestsellers':
            filteredProducts = products.filter(product => product.price >= 40 && product.price <= 600 && product.rating.rate >= 3 && product.rating.rate <= 5);
            break;
        default:
            filteredProducts = products;
            break;
    }

    productsForBottomSlider(filteredProducts);
};

// Обробники подій для пунктів меню
document.querySelector('.bottom-slider__selector').addEventListener('click', (event) => {
    const target = event.target.closest('li a');
    if (target) {
        event.preventDefault();
        const filterType = target.textContent.toLowerCase();
        switch (filterType) {
            case 'розпродаж':
                getProductsForBottomSlider('sale');
                break;
            case 'новинки':
                getProductsForBottomSlider('new');
                break;
            case 'хіти продажів':
                getProductsForBottomSlider('bestsellers');
                break;
            default:
                getProductsForBottomSlider();
                break;
        }
    }
});
// Завантажити продукти для початкового стану слайдера
getProductsForBottomSlider();
