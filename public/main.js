class Product {
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
        <img src='#' alt='product-photo' width=30 height=20>
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

class List {
    items = [];

    constructor() {

    }
    //
    fetchGoods() {
        const result = fetch('https://geekbrains-js-lvl2.herokuapp.com/database.json');
        return result
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.items = data.data.map(cur => {
                    return new Product(cur);
                });
            })
    }

    add(product) {
        this.items.push(product);
    }

    del() {

    }

    render() {}
}

class Cart extends List {
    sumOfPrice = 0;
    sumOfGoods = 0;

    constructor() {
        if (Cart._instance) {
            return Cart._instance;
        }
        super();
        this.mainCartTemplate();
        Cart._instance = this;
    }

    mainCartTemplate() {
        let header = document.querySelector('.header');
        let block = document.createElement('button');
        block.classList.add('cart-btn');
        block.innerText = 'Корзина';
        let cartDiv = document.createElement('div');
        cartDiv.classList.add('cart-block');
        cartDiv.innerText = 'Корзина пока что пуста';
        header.appendChild(block);
        header.appendChild(cartDiv);
        this.btn();
    }

    render() {
        let cartDiv = document.querySelector('.cart-block');
        this.items.forEach(elem => {
            let itemBlock = document.createElement('div');
            itemBlock.innerHTML = `Товар: ${elem.name} по цене ${elem.price}$ в количестве ${elem.count} = ${elem.price * elem.count}$`;
            let btnInc = document.createElement('button');
            btnInc.classList.add('btn-inc');
            btnInc.innerText = '+';
            btnInc.addEventListener('click', () => {
                let promise = new Promise((resolve, reject) => {
                    elem.inc();
                    this.sumOfPrice += elem.price;
                    this.sumOfGoods++;
                    cartDiv.innerHTML = '';
                    resolve();
                })
                promise
                    .then(() => {
                        this.render();
                    })


            })
            let btnDec = document.createElement('button');
            btnInc.classList.add('btn-dec');
            btnDec.innerText = '-';
            btnDec.addEventListener('click', () => {
                let promise = new Promise((resolve, reject) => {
                    elem.dec();
                    this.sumOfPrice -= elem.price;
                    this.sumOfGoods--;
                    cartDiv.innerHTML = '';
                    if (elem.count === 0) {
                        this.items.splice(this.items.indexOf(elem), 1);
                        elem.count = 1;
                    }
                });
                promise.then(() => {
                    this.render();
                })


            })
            cartDiv.appendChild(itemBlock);
            cartDiv.appendChild(btnInc);
            cartDiv.appendChild(btnDec);
        })

        let sumBlock = document.createElement('div');
        if (this.sumOfPrice === 0) {
            sumBlock.innerText = 'Корзина пока что пуста';
        } else {
            sumBlock.innerText = `Всего в корзине ${this.sumOfGoods} товара(ов) на сумму ${this.sumOfPrice}`;
        }
        cartDiv.appendChild(sumBlock);
    }

    productInstance(product) {
        if (this.items.indexOf(product) != -1) {
            product.inc();
        } else {
            this.items.push(product);
        }
        this.sumOfPrice += product.price;
        this.sumOfGoods++;
    }

    add(product) {
        this.productInstance(product);
    }

    btn() {
        let block = document.querySelector('.cart-btn');
        block.addEventListener('click', () => {
            let cart = document.querySelector('.cart-block');
            cart.classList.toggle('shown');
        })
    }

    btnInc() {}
}

class Catalog extends List {
    loadedGoods = 2;

    constructor() {
        super();
        let goods = this.fetchGoods();
        goods.then(() => {
            this.render();
        })

    }

    render() {
        if (this.items) {
            for (let i = 0; i < 2; i++) {
                this.items[i].createProduct();
            }
            this.btn('Загрузить ещё');
        }
    }

    btn(text) {
        let block = document.querySelector('.main');
        let btn = document.createElement('button');
        btn.classList.add('load-btn');
        btn.innerText = `${text}`;
        btn.addEventListener('click', () => {
            this.loadMore();
        });
        block.appendChild(btn);
    }

    loadMore() {
        if (this.items && this.loadedGoods <= this.items.length) {

            for (let i = this.loadedGoods; i < this.loadedGoods + 2; i++) {
                try {
                    document.querySelector('.load-btn').remove();
                    this.items[i].createProduct();
                    this.btn('Загрузить ещё');
                } catch (error) {
                    this.btn('Товары закончились');
                }

            }

            this.loadedGoods += 2;
        }
    }
}

const CatalogList = new Catalog();

const CartInstance = new Cart();