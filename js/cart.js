//Стилі для кошика продуктів

const cartIcon = document.querySelector('.top__icon-cart');
cartIcon.addEventListener('mouseover', () => {
    cartIcon.src = '../img/header-img/cart-ico-hover.png';
    cartIcon.style.transform = 'scale(1.5)';
});
cartIcon.addEventListener('mouseout', () => {
    cartIcon.src = '../img/header-img/cart-ico-single.png';
    cartIcon.style.transform = 'scale(1)'; // Повернення до 40px
});