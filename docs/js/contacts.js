// code for dropdown in nav
const dropBtn = document.querySelector('.dropbtn');
dropBtn.addEventListener('click', () => {
    const dropCont = document.querySelector('.dropdown-content');
    dropCont.classList.toggle('show');
});
document.addEventListener('click', (event) => {
    const dropCont = document.querySelector('.dropdown-content');
    if (!dropBtn.contains(event.target) && !dropCont.contains(event.target)) {
        dropCont.classList.remove('show');
    }
});

//code for burger button in nav

const burgerBtn = document.querySelector('.burger-btn');
const listContainer = document.querySelector('.contacts-top');
const navList = document.querySelector('.nav-list');
burgerBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    listContainer.classList.toggle('active-header');

})