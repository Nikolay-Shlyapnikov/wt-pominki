import {getDataArray} from "./api.js";

const cartProductList = document.querySelector('.cart__product-wrapper');
const headerCounterElement = document.querySelector('.page-header__cart-counter');
const orderResult = document.querySelector('.order-result__section');
const sections = document.querySelectorAll('section:not(.cart__order-result)');

const products = [
    { id: 1, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_sec: 'logo.svg' },
    { id: 2, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_src: 'logo.svg' },
    { id: 3, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_src: 'logo.svg' },
];

const updateOrderResult = (products) => {
    let totalCount = 0;
    let totalPrice = 0;

    const keys = Object.keys(localStorage).filter(key => Number.isInteger(+key));
    for (const key of keys) {
        const item = JSON.parse(localStorage.getItem(key));
        totalCount += item.count;
        totalPrice += products.find((product) => product.id === item.id).price * item.count;
    }

    orderResult.querySelector('.total-wt').textContent = totalCount;
    orderResult.querySelector('.price-wt').textContent = totalPrice;
};
updateOrderResult(products);
const restoreProductCounter = (productInfo, target) => {
    const buttonElement = target.closest('.product__button');

    if (buttonElement) {
        localStorage.removeItem(productInfo.id);

        const state1Element = buttonElement.querySelector('.state-1');
        const state2Element = buttonElement.querySelector('.state-2');
        state1Element.style.display = 'flex';
        state2Element.style.display = 'none';
        buttonElement.classList.remove('active');
    }
};

const updateProductCounter = (productInfo, target) => {
    if (target.matches('.product__plus')) {
        productInfo.count++;
        headerCounterElement.textContent = Number(headerCounterElement.textContent) + 1;
    } else if (target.matches('.product__minus')) {
        productInfo.count--;
        headerCounterElement.textContent = Number(headerCounterElement.textContent) - 1;
    }

    if (productInfo.count === 0) {
        restoreProductCounter(productInfo, target);
        return;
    } else {
        const productCount = target.parentElement.querySelector('.product__counter');
        productCount.innerHTML = productInfo.count;
    }

    localStorage.setItem(productInfo.id, JSON.stringify(productInfo));
};

const updateCartProductCounter = (productInfo, target) => {
    if (target.matches('.product__plus')) {
        productInfo.count++;
        headerCounterElement.textContent = Number(headerCounterElement.textContent) + 1;

    } else if (target.matches('.product__minus')) {
        productInfo.count--;
        headerCounterElement.textContent = Number(headerCounterElement.textContent) - 1;
    }

    if (productInfo.count === 0) {
        deleteCartProduct(productInfo, target);
        return;
    }

    const productCount = target.parentElement.querySelector('.product__counter');
    productCount.innerHTML = productInfo.count;
    localStorage.setItem(productInfo.id, JSON.stringify(productInfo));
    //updateOrderResult(getDataArray.products);
    updateOrderResult(products);
};

const deleteCartProduct = (productInfo, target) => {
    target.closest('.cart__product').style.opacity = 0;    
    const count = +headerCounterElement.textContent;
    headerCounterElement.textContent = count - productInfo.count;
    localStorage.removeItem(productInfo.id);
    updateOrderResult(products);
    
    setTimeout(() => {
        target.closest('.cart__product').remove();

        if (cartProductList.children.length === 0) {
            Array.from(sections).forEach(section => section.style.display = 'none');
            document.querySelector('.cart__title').textContent = 'Корзина пустая';
            window.scrollTo(0, 0);
        }
    }, 1000);
};

const updateHeaderCounter = () => {
    let total = 0;
    const keys = Object.keys(localStorage).filter(key => Number.isInteger(+key));
    for(const key of keys.filter((key) => +key)) {
        total += JSON.parse(localStorage.getItem(key)).count;
    }

    headerCounterElement.textContent = String(total);
};

export {
    deleteCartProduct,
    updateHeaderCounter,
    updateProductCounter,
    updateCartProductCounter,
    updateOrderResult,
};
