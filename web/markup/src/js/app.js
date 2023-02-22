import {getDataArray} from './api.js';
import {openKit} from './order-modal.js';
//import {updateHeaderCounter} from './counter.js';

const kitListElement = document.querySelector('.kit__wrapper');
const kitTemplate = document.getElementById('kit')
    .content
    .querySelector('.kit__item');

const data = [
    {
        name: 'Мини',
        weight: 25,
        min__size: 7,
        max__size: 9,
        img_path: '123.png',
        price: 22900,   
        products: [
            { 
                id: 1,
                name: 'Суп-лапша',
                weight: 600,
            },
            { 
                id: 2,
                name: 'Блины',
                weight: 600,
            },
            { 
                id: 3,
                name: 'Соусы',
                weight: 600,
            },
            { 
                id: 4,
                name: 'Пироги',
                weight: 600,
            },
        ],   
    },
    {
        name: 'Большой',
        weight: 25,
        min__size: 7,
        max__size: 9,
        img_path: '123.png',
        price: 22900,   
        products: [
            { 
                id: 1,
                name: 'Суп-лапша',
                weight: 600,
            },
            { 
                id: 2,
                name: 'Блины',
                weight: 600,
            },
            { 
                id: 3,
                name: 'Соусы',
                weight: 600,
            },
            { 
                id: 4,
                name: 'Пироги',
                weight: 600,
            },
        ],   
    },
    {
        name: 'Средний',
        weight: 25,
        min__size: 7,
        max__size: 9,
        img_path: '123.png',
        price: 22900,   
        products: [
            { 
                id: 1,
                name: 'Суп-лапша',
                weight: 600,
            },
            { 
                id: 2,
                name: 'Блины',
                weight: 600,
            },
            { 
                id: 3,
                name: 'Соусы',
                weight: 600,
            },
            { 
                id: 4,
                name: 'Пироги',
                weight: 600,
            },
        ],   
    },
]


kitListElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.kit__modal-button')) {
        const kitElement = evt.target.closest('.kit__item');
        if (kitElement) {
            //const id = kitElement.dataset.orderId;
            // getDataArray(
            //     [`http://localhost:80/kit/${id}`],
            //     ([kit]) => {
            //         openKit(kit);
            //     }
            // );
            openKit(data);
        }
    }
});

//supdateHeaderCounter();
data.forEach(kit => {
    const kitElement = kitTemplate.cloneNode(true);

    kitElement.querySelector('.kit__size').textContent = kit.title;
    kitElement.querySelector('.kit__size').textContent = kit.title;
    kitElement.querySelector('.kit__size').textContent = kit.title;

    kitListElement.append(kitElement);
});
