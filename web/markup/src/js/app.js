const headerBurgerButton = document.querySelector('.page-header__burger');
headerBurgerButton.addEventListener('click', (evt) => {
    headerBurgerButton.classList.toggle('active');
    headerBurgerButton.previousElementSibling.classList.toggle('active');
});