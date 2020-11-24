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