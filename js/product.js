import Cart from './list_cart.js';

export default class Product {
    name = null;
    price = 0;
    count = 1;

    constructor({
        name,
        price
    }) {
        this.name = name;
        this.price = price;
    }

    createProduct() {
        let block = document.querySelector('.main');
        let renderObject = document.createElement('div');
        renderObject.classList.add('product-block');
        renderObject.innerHTML = `
        <img src='./product-img.png' alt='product-photo' width=30 height=20>
        <div>${this.name}</div>
        <div>${this.price}$</div>
        `
        block.appendChild(renderObject);
        renderObject.appendChild(this.btn());
    }

    btn() {
        let btn = document.createElement('button');
        btn.classList.add('btn-buy');
        btn.innerText = 'Купить';
        btn.addEventListener('click', () => {
            let promise = new Promise((resolve, reject) => {
                const CartInstance = new Cart();
                CartInstance.add(this);
                let cartBlock = document.querySelector('.cart-block');
                cartBlock.innerText = '';
                resolve();
            })
            promise
                .then(() => {
                    CartInstance.render();
                })


        })
        return btn;
    }

    inc() {
        this.count++;
    }

    dec() {
        this.count--;
    }
}