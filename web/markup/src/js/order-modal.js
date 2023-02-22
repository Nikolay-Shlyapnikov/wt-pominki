
const modalTemplate = document.getElementById('modal')
    .content
    .querySelector('.window__wrapper');

const productTemplate = document.getElementById('product')
    .content
    .querySelector('.modal-item__list-item');

const renderModalKit = (kit) => {
    const modalElement = modalTemplate.cloneNode(true);
    
    modalElement.querySelector('.modal-item__title').textContent = kit.name;
    modalElement.querySelector('.min__size').textContent = kit.min__size;
    modalElement.querySelector('.max__size').textContent = kit.max__size;
    modalElement.querySelector('.modal-item__weight span').textContent = kit.weight;
    modalElement.querySelector('.modal-item__price').textContent = kit.price;
    
    const productsListElement = modalElement.querySelector('.modal-item__list');
    kit.products.forEach((product) => {
        const productElement = productTemplate.cloneNode(true);
        
        productElement.querySelector('.item-name').textContent = product.name;
        productElement.querySelector('.item-weight').textContent = product.weight;
        productsListElement.append(productElement);
    });
    document.body.append(modalElement);
}

const closeOrderModal = () => document.body.querySelector('.window__wrapper').remove();

const onOverlayClick = (evt) => {
    if (evt.target.matches('.window__wrapper')) {
        closeOrderModal();
    }
}

const openKit = (kit) => {
   renderModalKit(kit);
   document.querySelector('.cart__product-cross').addEventListener('click', closeOrderModal);
   document.querySelector('.window__wrapper').addEventListener('click', onOverlayClick);
}

export {openKit};