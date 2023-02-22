import {getDataArray} from "./api.js";
import {deleteCartProduct, updateCartProductCounter, updateHeaderCounter, updateOrderResult} from "./counter.js";
import { setOrderFormSubmit } from "./order-form.js";

const cartProductList = document.querySelector('.cart__product-wrapper');
const cartProductTemplate = document.getElementById('cart-product')
    .content
    .querySelector('.cart__product');

const products = [
    { id: 1, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_sec: 'logo.svg' },
    { id: 2, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_src: 'logo.svg' },
    { id: 3, title: 'Суп-лашпа с курицей', price: 320, weight: 300, img_src: 'logo.svg' },
];
const renderCartProductList = (products) => {
    cartProductList.innerHTML = '';

    const cartProducts = [];
    const keys = Object.keys(localStorage).filter(key => Number.isInteger(+key));
    console.log(keys);
    for(const key of keys) {
        cartProducts.push(JSON.parse(localStorage.getItem(key)));
    }

    if (cartProducts.length) {
        cartProducts.forEach((cartProduct) => {
            const product = products.find((product) => product.id === cartProduct.id);
            product.count = cartProduct.count;
            const cartProductElement = cartProductTemplate.cloneNode(true);
    
            if (product.image_src) {
                const imageElement = cartProductElement.querySelector('.cart__product-image img');
                imageElement.src = `/uploads/products/${product.image_src}`;
            }
    
            cartProductElement.dataset.id = product.id;
            cartProductElement.querySelector('.cart__product-name').textContent = product.title;
            cartProductElement.querySelector('.cart__product-price').textContent = product.price;
            cartProductElement.querySelector('.product__counter').textContent = product.count;

            cartProductList.append(cartProductElement);
            document.querySelectorAll('section').forEach((s) => s.style.display = 'block');
        });
    } else {
        document.querySelector('.cart__title').textContent = 'Корзина пустая';
    }
};

renderCartProductList(products);

cartProductList.addEventListener('click', (evt) => {
    if (evt.target.closest('.cart__product')) {
        const productId = +evt.target.closest('.cart__product').dataset.id;
        const productInfo = JSON.parse(localStorage.getItem(productId));

        if (evt.target.matches('.counter-btn')) {
            updateCartProductCounter(productInfo, evt.target);
        } else if (evt.target.matches('.cart__product-cross')) {
            deleteCartProduct(productInfo, evt.target);
        }
    }
});

// getDataArray(
//     [
//         'http://localhost:80/products?page=1',
//         'http://localhost:80/products?page=2',
//         'http://localhost:80/products?page=3',
//     ],
//     ([products1, products2, products3]) => {
//         const products = products1.concat(products2, products3);
//         getDataArray.products = products;
//         renderCartProductList(products);
//         updateOrderResult(products);
//     }
// );

updateHeaderCounter();

const radioWrapper = document.querySelector('.radio__wrapper');
const deliveryElements = document.querySelectorAll('.delivery');

radioWrapper.addEventListener('click', (evt) => {
    const labelElement = evt.target.closest('label');

    if (labelElement) {
        if (+labelElement.previousElementSibling.value) {
            deliveryElements.forEach(d => d.style.display = 'grid');
        } else {
            deliveryElements.forEach(d => d.style.display = 'none');
        }
    }
});

const orderResultButtonElement = document.querySelector('.order-result__button');
orderResultButtonElement.addEventListener('click', () =>{
    document.querySelector('button[type=submit]').click();
});
setOrderFormSubmit();