import {renderProductList} from "./product-list.js";
import {renderFilterList} from "./filter.js";
import {renderCategoryList} from "./category-list.js";
import {setStorageInfo} from './storage.js';
import {updateHeaderCounter, updateProductCounter} from "./counter.js";

const productListElement = document.querySelector('.product__wrapper');




const filters = [
    { id: 1, title: 'блины'},
    { id: 2, title: 'Холодные закуски'},
    { id: 3, title: 'Салаты'},
    { id: 4, title: 'Горячие закуски'},
    { id: 5, title: 'Хачапури'},
    { id: 6, title: 'Осетинские пироги'},
    { id: 7, title: 'Горячие блюда'},
    { id: 8, title: 'Традиционная трапеза'},
    { id: 9, title: 'Десерты'},
    { id: 10, title: 'Гарниры'},
    { id: 11, title: 'Посуда'},
    { id: 12, title: 'Напитки'},
    { id: 13, title: 'Хлеб'},
    { id: 14, title: 'Соусы'}
];
const products = [
    { id: 1, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_sec: 'img/logo.svg' },
    { id: 1, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_src: 'img/logo.svg' },
    { id: 1, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_src: 'img/logo.svg' },
];
const init = (filters, products) => {
    //    renderCategoryList(categories);
        renderFilterList(filters);
        renderProductList(products);
};
init(filters, products);


const headerBurgerButton = document.querySelector('.page-header__burger');
headerBurgerButton.addEventListener('click', (evt) =>{
    headerBurgerButton.classList.toggle('active');
    headerBurgerButton.previousElementSibling.classList.toggle('active');
});

productListElement.addEventListener('click', (evt) => {
    const buttonElement = evt.target.closest('.product__button');
    if (buttonElement) {
        const state1Element = buttonElement.querySelector('.state-1');
        const isFirstClick = state1Element.style.display === 'none';

        if (isFirstClick) {
            const productElement = evt.target.closest('.product-id');

            if (productElement) {
                const productId = +productElement.dataset.id;
                const productInfo = JSON.parse(localStorage.getItem(productId));
                updateProductCounter(productInfo, evt.target);
            }
        } else {
            setStorageInfo(buttonElement);
        }
    }
});

updateHeaderCounter();