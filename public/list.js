class List {
    items = [];

    constructor() {

    }
    //
    fetchGoods() {
        const result = fetch('./database.json');
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