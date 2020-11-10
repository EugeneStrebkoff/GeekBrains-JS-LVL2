class Product {
    name = null;
    price = 0;
    count = 1;
    constructor(name, price) {
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
        let block = document.querySelector('.product-block');
        let btn = document.createElement('button');
        btn.classList.add('btn-buy');
        btn.innerText = 'Купить';
        btn.addEventListener('click', () => {
            const CartInstance = new Cart();
            CartInstance.add(this);
            let cartBlock = document.querySelector('.cart-block');
            cartBlock.innerText = '';
            CartInstance.render();
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
    items = []
    constructor() {


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

    render(){
        let cartDiv = document.querySelector('.cart-block');
        this.items.forEach(elem => {
            let itemBlock = document.createElement('div');
            itemBlock.innerHTML = `Товар: ${elem.name} по цене ${elem.price}$ в количестве ${elem.count} = ${elem.price * elem.count}$`;
            let btnInc = document.createElement('button');
            btnInc.classList.add('btn-inc');
            btnInc.innerText = '+';
            btnInc.addEventListener('click', () =>{
                elem.inc();
                this.sumOfPrice += elem.price;
                this.sumOfGoods++;
                cartDiv.innerHTML = '';
                this.render();
        
        })
            let btnDec = document.createElement('button');
            btnInc.classList.add('btn-dec');
            btnDec.innerText = '-';
            btnDec.addEventListener('click', () =>{
                elem.dec();
                this.sumOfPrice -= elem.price;
                this.sumOfGoods--;
                cartDiv.innerHTML = '';
                if(elem.count === 0){
                    this.items.splice(this.items.indexOf(elem), 1);
                    elem.count = 1;
                }
                this.render();
        })
            cartDiv.appendChild(itemBlock);
            cartDiv.appendChild(btnInc);
            cartDiv.appendChild(btnDec);
        })

        let sumBlock = document.createElement('div');
        if(this.sumOfPrice === 0){
            sumBlock.innerText = 'Корзина пока что пуста';
        } else {
            sumBlock.innerText = `Всего в корзине ${this.sumOfGoods} товара(ов) на сумму ${this.sumOfPrice}`;
        }
        cartDiv.appendChild(sumBlock);
    }

    productInstance(product){
        if(this.items.indexOf(product) != -1){
            product.inc();
        } else {
            this.items.push(product);
        }
        this.sumOfPrice += product.price;
        this.sumOfGoods++;
    }

    add(product){
        this.productInstance(product);
    }

    btn() {
        let block = document.querySelector('.cart-btn');
        block.addEventListener('click', () => {
            let cart = document.querySelector('.cart-block');
            cart.classList.toggle('shown');
        })
    }

    btnInc(){
    }
}

class Catalog extends List {
    constructor() {
        super();
    }

    render() {
        if (this.items) {
            this.items.forEach(element => element.createProduct())
        }
    }
}

const CatalogList = new Catalog();

CatalogList.add(new Product('1', 1));
CatalogList.add(new Product('2', 2));
CatalogList.add(new Product('3', 3));

CatalogList.render();

const CartInstance = new Cart();