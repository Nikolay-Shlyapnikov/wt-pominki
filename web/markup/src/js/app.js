const data =     
{ 
    totalPrice: 40000,
    products: [
        {
            name: 'Шашлык',
            count: '10',
            weight: '100kg',
            img_path: '123.png',
            price: 2000,
        },
        {
            name: 'Шашлык',
            count: 10,
            weight: '100kg',
            img_path: '123.png',
            price: 2000,
        },
    ]
}

const modalTemplate = document.querySelector('#modal')
    .content
    .querySelector('.window__wrapper');
const productTemplate = document.querySelector('#product')
    .content
    .querySelector('.cart__product');

const renderOrderInfo = ({products, totalPrice}) =>{
    const modalElement = modalTemplate.cloneNode(true);
    document.body.append(modalElement);
    const productList = modalElement.querySelector('.cart__product-wrapper');
    let productTotalCount = 0;
    products.forEach((product) =>{
        const productElement = productTemplate.cloneNode(true);
        productElement.querySelector('.cart__product-image>img').src = `/img/products/${product.img_path}`;
        productElement.querySelector('.product__counter').textContent = product.count;
        productTotalCount += Number(product.count);
        productElement.querySelector('.cart__product-name').textContent = product.name;
        productElement.querySelector('.cart__product-weight').textContent = product.weight;
        productElement.querySelector('.cart__product-price').innerHTML = product.price + "&#8381;";
        productList.append(productElement);
    });
    modalElement.querySelector(".price-wt").textContent = totalPrice;
    modalElement.querySelector(".total-wt").textContent = productTotalCount;
    document.querySelector('.cart__product-cross').addEventListener('click', closeModal);
    document.querySelector('.window__wrapper').addEventListener('click', (e) =>{
        if(e.target.matches('.window__wrapper')) closeModal();
    });
}
document.querySelectorAll('.order__info').forEach((orderBtn) =>{
    orderBtn.addEventListener('click', () => {
       const url = 'http://localhost:80/orders/' + orderBtn.parentElement.dataset.order_id;
       //getDataArray(url, renderOrderInfo(order))
       renderOrderInfo(data);
    });
});

const closeModal = () =>{
    document.body.removeChild(document.querySelector('.window__wrapper'));
}