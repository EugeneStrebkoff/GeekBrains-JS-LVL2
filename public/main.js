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

class Footer {
    patternName = /^[a-zA-Zа-яА-ЯёЁ]{2,}$/gi;
    patternEmail = /^[a-zA-Z\d]+[\.\-]?[a-zA-Z\d]*\@[a-zA-Z]+\.[a-zA-Z]+/gi;
    patternTel = /\+7\(9\d{2}\)\d{3}\-\d{4}/gi;

    form = '';
    constructor() {
        this.addForm();
        this.addInput('name');
        this.addInput('email');
        this.addInput('tel');
        this.addSubmit();
        this.addReset();

    }

    addForm() {
        let footer = document.querySelector('.footer');
        let form = document.createElement('form');
        form.classList.add('footer-form');
        this.form = form;
        footer.appendChild(form);
    }

    addInput(type) {
        try {
            if (type === 'name') {
                throw 'поменяем-ка на text'
            }
            let input = document.createElement('input');
            input.classList.add(`footer-form-${type}`);
            input.setAttribute('type', `${type}`);
            if(type === 'tel'){
                input.setAttribute('placeholder', '+7(***)***-****');
                let title = document.createElement('span');
                title.classList.add('input-title');
                title.innerText = 'Ваш телефон:';
                this.form.appendChild(title);
            } else {
                input.setAttribute('placeholder', 'qwe@wqe.ru');
                let title = document.createElement('span');
                title.classList.add('input-title');
                title.innerText = 'Ваш email:';
                this.form.appendChild(title);
            }
            this.form.appendChild(input);
        } catch (error) {
            console.log(error);
            let input = document.createElement('input');
            input.classList.add(`footer-form-${type}`);
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Имя');
                let title = document.createElement('span');
                title.classList.add('input-title');
                title.innerText = 'Ваше имя:';
                this.form.appendChild(title);
            this.form.appendChild(input);

        }
    }

    addSubmit() {
        let btn = document.createElement('button');
        btn.classList.add('submit-btn');
        btn.innerText = 'Отправить';
        btn.addEventListener('click', () => {
            this.checkValid()
        });
        this.form.appendChild(btn);
    }

    addReset() {
        let btn = document.createElement('button');
        btn.classList.add('reset-btn');
        btn.setAttribute('type', 'reset');
        btn.innerText = 'Сбросить';
        this.form.appendChild(btn);
    }

    checkValid() {
        let inputs = document.querySelectorAll('input');
        inputs.forEach(el => {
            switch (el.className) {
                case 'footer-form-email':
                    if (this.patternEmail.test(el.value)) {
                        console.log('Отлично. Подходит! Отправляем вам письмо о наследстве в Африке!');
                        alert('Отлично. Подходит! Отправляем вам письмо о наследстве в Африке!');
                    } else {
                        console.log('Ошибка. Повторите снова!');
                    }
                    break;
                case 'footer-form-tel':
                    if (this.patternTel.test(el.value)) {
                        console.log('Отлично. Подходит! Ждите звонка службы безопасности Сбербанка!');
                        alert('Отлично. Подходит! Ждите звонка службы безопасности Сбербанка!');
                    } else {
                        console.log('Ошибка. Повторите снова!');
                    }
                    break;
                case 'footer-form-name':
                    if (this.patternName.test(el.value)) {
                        console.log('Отлично. Подходит! Теперь спам будет именным!');
                        alert('Отлично. Подходит! Теперь спам будет именным!');
                    } else {
                        console.log('Ошибка. Повторите снова!');
                    }
                    break;
            }
        });
    }
}

const CatalogList = new Catalog();

const CartInstance = new Cart();

const FooterInstance = new Footer();