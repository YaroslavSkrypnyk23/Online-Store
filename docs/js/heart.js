//Події для іконки обраних товарів
const heartIcon = document.querySelector('.top__icon-heart');
const heartContainer = document.querySelector('.heart');
const siteBackground = document.body;
const overlay = document.querySelector('#overlay');

//подія по наведенні на елемент(зміна зображеня)
heartIcon.addEventListener('mouseover', () => {
    heartIcon.src = './img/header-img/heart-ico-hover.png';
    heartIcon.style.cursor = 'pointer'
});
//подія при покиданні курсора зони елемента
heartIcon.addEventListener('mouseout', () => {
    heartIcon.src = './img/header-img/heart-ico-single.png'
});
// відкриття сторінки обраних товарів
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
//закриття сторінки обраних товарів
        const closeIcon = heartHeader.querySelector('.close-icon');
        closeIcon.addEventListener('click', () => {
            heartContainer.style.display = 'none';
            overlay.style.display = 'none';
            siteBackground.style.overflow = 'auto';
        })
    } else {
        const closeIcon = heartHeader.querySelector('.close-icon');
        closeIcon.addEventListener('click', () => {
            heartContainer.style.display = 'none';
            overlay.style.display = 'none';
            siteBackground.style.overflow = 'auto';
        });
    }
});

