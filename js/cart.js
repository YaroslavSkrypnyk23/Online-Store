export function addToCart(product) {
    if (!product) {
        console.error("Product not found");
        return;
    }
    const cart = document.querySelector('.product-container');
    const existingCartItem = cart.querySelector(`.product[data-id="${product.id}"]`);
    let cartItem;

    if (existingCartItem) {
        const quantityBox = existingCartItem.querySelector('.quantity-box');
        const quantity = parseInt(quantityBox.textContent, 10) + 1;
        quantityBox.textContent = quantity;

        const totalElement = existingCartItem.querySelector('.total');
        const price = parseFloat(product.price);
        totalElement.textContent = (quantity * price).toFixed(2) + '$';
    } else {
        cartItem = document.createElement('div');
        cartItem.classList.add('product');
        cartItem.setAttribute('data-id', product.id);
        cartItem.innerHTML = `
            <div class="product__info">
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <div class="product-details">
                    <p class="product-title">${product.title}</p>
                    <p class="product-category">${product.category}</p>
                    <button class="remove-btn">Remove</button>
                </div>
            </div>  
            <div class="quantity">
                <button class="quantity-button minus">-</button>
                <div class="quantity-box">1</div>
                <button class="quantity-button plus">+</button>
            </div>
            <div class="price">${product.price}$</div>
            <div class="total">${product.price}$</div>`;
        cart.appendChild(cartItem);

        // Додаємо обробник подій для нової кнопки видалення
        cartItem.querySelector('.remove-btn').addEventListener('click', () => {
            cartItem.remove();
            updateCartCounter();
            isCartEmpty();
        });

        // Додаємо обробник подій для кнопок збільшення/зменшення
        cartItem.querySelector('.quantity-button.plus').addEventListener('click', () => {
            const quantityBox = cartItem.querySelector('.quantity-box');
            const quantity = parseInt(quantityBox.textContent, 10) + 1;
            quantityBox.textContent = quantity;

            const totalElement = cartItem.querySelector('.total');
            const price = parseFloat(product.price);
            totalElement.textContent = (quantity * price).toFixed(2) + '$';
            isCartEmpty(); // Оновлення загальної суми
        });

        cartItem.querySelector('.quantity-button.minus').addEventListener('click', () => {
            const quantityBox = cartItem.querySelector('.quantity-box');
            let quantity = parseInt(quantityBox.textContent, 10);
            if (quantity > 1) {
                quantity -= 1;
                quantityBox.textContent = quantity;

                const totalElement = cartItem.querySelector('.total');
                const price = parseFloat(product.price);
                totalElement.textContent = (quantity * price).toFixed(2) + '$';
                isCartEmpty(); // Оновлення загальної суми
            }
        });
    }

    updateCartCounter();
    isCartEmpty();
}

// Функція для оновлення кількості товарів у кошику
function updateCartCounter() {
    const products = document.querySelectorAll('.product');
    const counterWrapper = document.querySelector('.top__icon-cart').parentElement;
    const totalAmount = products.length;
    counterWrapper.setAttribute('data-content', totalAmount);

    const totalAmountInCart = document.querySelector('.header-items-number');
    if (totalAmountInCart) {
        if (totalAmount === 1) {
            totalAmountInCart.textContent = `${totalAmount} товар`;
        } else {
            totalAmountInCart.textContent = `${totalAmount} товарів`;
        }
    }
}

// Функція для перевірки, чи порожній кошик
function isCartEmpty() {
    const products = document.querySelectorAll('.product');
    const emptyText = document.querySelector('.empty-cart__text');
    const cartContainer = document.querySelector('.product-container');

    if (products.length === 0 && !emptyText) {
        const emptyTextContent = document.createElement('div');
        emptyTextContent.classList.add('empty-cart__text');
        emptyTextContent.innerHTML = `Ваш кошик <span class="highlighted-text">порожній</span>!<br>Вперед за покупками!`;
        cartContainer.insertBefore(emptyTextContent, cartContainer.lastChild);
        closeBtn.textContent = 'Вперед за покупками';
        
        let totalCartPrice = document.querySelector('.totalCartPrice');
        let confirmBtn = document.querySelector('.confirm-btn')
        if(totalCartPrice && confirmBtn){
            totalCartPrice.remove();
            confirmBtn.remove();
        }
    } else if (products.length > 0) {
        if (emptyText) {
            emptyText.remove();
        }
        // Обчислення загальної суми кошика
        let totalPrice = 0;
        products.forEach(product => {
            const priceElement = product.querySelector('.price');
            const quantityElement = product.querySelector('.quantity-box');
            const price = parseFloat(priceElement.textContent.replace('$', ''));
            const quantity = parseInt(quantityElement.textContent);
            totalPrice += price * quantity;
        });
        // Оновлення або створення блоку із загальною сумою
        let totalCartPrice = document.querySelector('.totalCartPrice');
        if (!totalCartPrice) {
            totalCartPrice = document.createElement('div');
            totalCartPrice.classList.add('totalCartPrice');
            const container = document.querySelector('.navigation');

            const confirmBtn = document.createElement('button');
            confirmBtn.classList.add('confirm-btn');
            confirmBtn.textContent = 'Підтвердити замовлення';

            container.appendChild(confirmBtn);
            container.appendChild(totalCartPrice);
        }
        totalCartPrice.textContent = `Загальна сума: ${totalPrice.toFixed(2)}$`;
    } else {
        closeBtn.textContent = "Продовжити покупки";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    isCartEmpty();
    updateCartCounter();
});

//Нижче іде код для відкриття та закриття кошика і зміни іконки по наведенню
const cartIcon = document.querySelector('.top__icon-cart');
const cartContainer = document.querySelector('.cart');
const closeBtn = document.querySelector('.close-btn');
const siteBackground = document.body;
const overlay = document.querySelector('#overlay');
//Зміна іконки кошика по наведенню курсора 
cartIcon.addEventListener('mouseover', () => {
    cartIcon.src = '../img/header-img/cart-ico-hover.png';
    cartIcon.style.transform = 'scale(1.5)';
});
//Зміна іконки кошика по виведенню курсора
cartIcon.addEventListener('mouseout', () => {
    cartIcon.src = '../img/header-img/cart-ico-single.png';
    cartIcon.style.transform = 'scale(1)';
});
//Відкрити кошик
cartIcon.addEventListener('click', () => {
    cartContainer.style.display = 'block';
    overlay.style.display = 'block';
    siteBackground.style.overflow = 'hidden';
});
//Закрити кошик
closeBtn.addEventListener('click', () => {
    cartContainer.style.display = 'none';
    overlay.style.display = 'none';
    siteBackground.style.overflow = 'auto';
});
