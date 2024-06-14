//стилі для обраних товарів по кліку на іконку сердечка


//Події по наведенню(hover effect)
const heartIcon = document.querySelector('.top__icon-heart');
//подія по наведенні на елемент(зміна зображеня)
heartIcon.addEventListener('mouseover', () => {
    heartIcon.src = '../img/header-img/heart-ico-hover.png';
    heartIcon.style.cursor = 'pointer'
});
//подія при покиданні курсора зони елемента
heartIcon.addEventListener('mouseout', () => {
    heartIcon.src = '../img/header-img/heart-ico-single.png'
});
//додавання та показ кількості обраних товарів


