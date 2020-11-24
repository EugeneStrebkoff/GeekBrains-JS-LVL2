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