const cartIcon = document.querySelector('.top__icon-cart');
const cartContainer = document.querySelector('.cart');
const closeBtn = document.querySelector('.close-btn');
const siteBackground = document.body;
const overlay = document.querySelector('#overlay');
const removeBtns = document.querySelectorAll('.remove-btn');

cartIcon.addEventListener('mouseover', () => {
    cartIcon.src = '../img/header-img/cart-ico-hover.png';
    cartIcon.style.transform = 'scale(1.5)';
});
cartIcon.addEventListener('mouseout', () => {
    cartIcon.src = '../img/header-img/cart-ico-single.png';
    cartIcon.style.transform = 'scale(1)';
});
cartIcon.addEventListener('click', () => {
    cartContainer.style.display = 'block';
    overlay.style.display = 'block';
    siteBackground.style.overflow = 'hidden';
});
closeBtn.addEventListener('click', () => {
    cartContainer.style.display = 'none';
    overlay.style.display = 'none';
    siteBackground.style.overflow = 'auto';
});
removeBtns.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        if (product) {
            product.remove();
            updateCartCounter();
            isCartEmpty();
        }
    })
});

//Код для відображення кількості товарів
function updateCartCounter() {
    //Кількість товарів біля іконки
    const products = document.querySelectorAll('.product');
    const counterWrapper = document.querySelector('.top__icon-cart').parentElement;
    const totalAmount = products.length;
    counterWrapper.setAttribute('data-content', totalAmount);
    //Кількість товарів у самому кошику
    const totalAmountInCart = document.querySelector('.header-items-number')
    if(totalAmountInCart){
        totalAmountInCart.textContent = `${totalAmount} Products`
    }
}

//Код для порожнього кошика
function isCartEmpty() {
    const products = document.querySelectorAll('.product');
    const emptyText = document.querySelector('.empty-cart__text');
    if (products.length === 0 && !emptyText) {
        const emptyText = document.createElement('div');
        emptyText.classList.add('empty-cart__text');
        emptyText.innerHTML = 'Your cart is <span class = "highlighted-text">empty</span>!'
        cartContainer.insertBefore(emptyText, cartContainer.lastElementChild);
    } else if (products.length > 0 && emptyText) {
        emptyText.remove();
    }
}
//Код для зміни кількості товарів та їх ціни(+total Amount)
function changeProductsAmount(){
    
}

document.addEventListener('DOMContentLoaded', () => {
    isCartEmpty();
    updateCartCounter();
});
