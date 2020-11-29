<template>
    <header>
        <span class="header-name">Shop</span>
        <button class="cart-btn"></button>
        <div class="cart-block"></div>
    </header>
</template>

<script>
export default {
    data: {
        sumOfPrice: 0,
        sumOfGoods: 0
    },
    methods: {

    }
}
</script>

<style module lang="scss">
header {
    margin: 0;
    background: linear-gradient(to top, #feeafa, #efd3d7);
    min-height: 40px;
    line-height: 40px;
    font-family: Helvetica, Arial, serif;
    font-size: 20px;
    color: #8E9AAF;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.header-name {
    font-size: 40px;
}

.cart-btn {
    padding: 2px 5px;
    border: 1px solid #8E9AAF;
    background-color: #8E9AAF;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
}

.cart-block {
    display: none;
    width: 100%;
    margin: 0;
}

.shown {
    display: block;
}
</style>