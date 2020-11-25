(()=>{"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class t{constructor({name:t,price:n}){e(this,"name",null),e(this,"price",0),e(this,"count",1),this.name=t,this.price=n}createProduct(){let e=document.querySelector(".main"),t=document.createElement("div");t.classList.add("product-block"),t.innerHTML=`\n        <img src='./product-img.png' alt='product-photo' width=30 height=20>\n        <div>${this.name}</div>\n        <div>${this.price}$</div>\n        `,e.appendChild(t),t.appendChild(this.btn())}btn(){let e=document.createElement("button");return e.classList.add("btn-buy"),e.innerText="Купить",e.addEventListener("click",(()=>{new Promise(((e,t)=>{(new s).add(this),document.querySelector(".cart-block").innerText="",e()})).then((()=>{CartInstance.render()}))})),e}inc(){this.count++}dec(){this.count--}}class n{constructor(){var e,t;t=[],(e="items")in this?Object.defineProperty(this,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):this[e]=t}fetchGoods(){return fetch("../database.json").then((e=>e.json())).then((e=>{this.items=e.data.map((e=>new t(e)))}))}add(e){this.items.push(e)}del(){}render(){}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class s extends n{constructor(){if(s._instance)return s._instance;super(),i(this,"sumOfPrice",0),i(this,"sumOfGoods",0),this.mainCartTemplate(),s._instance=this}mainCartTemplate(){let e=document.querySelector(".header"),t=document.createElement("button");t.classList.add("cart-btn"),t.innerText="Корзина";let n=document.createElement("div");n.classList.add("cart-block"),n.innerText="Корзина пока что пуста",e.appendChild(t),e.appendChild(n),this.btn()}render(){let e=document.querySelector(".cart-block");this.items.forEach((t=>{let n=document.createElement("div");n.innerHTML=`Товар: ${t.name} по цене ${t.price}$ в количестве ${t.count} = ${t.price*t.count}$`;let i=document.createElement("button");i.classList.add("btn-inc"),i.innerText="+",i.addEventListener("click",(()=>{new Promise(((n,i)=>{t.inc(),this.sumOfPrice+=t.price,this.sumOfGoods++,e.innerHTML="",n()})).then((()=>{this.render()}))}));let s=document.createElement("button");i.classList.add("btn-dec"),s.innerText="-",s.addEventListener("click",(()=>{new Promise(((n,i)=>{t.dec(),this.sumOfPrice-=t.price,this.sumOfGoods--,e.innerHTML="",0===t.count&&(this.items.splice(this.items.indexOf(t),1),t.count=1)})).then((()=>{this.render()}))})),e.appendChild(n),e.appendChild(i),e.appendChild(s)}));let t=document.createElement("div");0===this.sumOfPrice?t.innerText="Корзина пока что пуста":t.innerText=`Всего в корзине ${this.sumOfGoods} товара(ов) на сумму ${this.sumOfPrice}`,e.appendChild(t)}productInstance(e){-1!=this.items.indexOf(e)?e.inc():this.items.push(e),this.sumOfPrice+=e.price,this.sumOfGoods++}add(e){this.productInstance(e)}btn(){document.querySelector(".cart-btn").addEventListener("click",(()=>{document.querySelector(".cart-block").classList.toggle("shown")}))}btnInc(){}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}new s,new class extends n{constructor(){var e;super(),(e="loadedGoods")in this?Object.defineProperty(this,e,{value:2,enumerable:!0,configurable:!0,writable:!0}):this[e]=2,this.fetchGoods().then((()=>{this.render()}))}render(){if(this.items){for(let e=0;e<2;e++)this.items[e].createProduct();this.btn("Загрузить ещё")}}btn(e){let t=document.querySelector(".main"),n=document.createElement("button");n.classList.add("load-btn"),n.innerText=`${e}`,n.addEventListener("click",(()=>{this.loadMore()})),t.appendChild(n)}loadMore(){if(this.items&&this.loadedGoods<=this.items.length){for(let e=this.loadedGoods;e<this.loadedGoods+2;e++)try{document.querySelector(".load-btn").remove(),this.items[e].createProduct(),this.btn("Загрузить ещё")}catch(e){this.btn("Товары закончились")}this.loadedGoods+=2}}},new class{constructor(){r(this,"patternName",/^[a-zA-Zа-яА-ЯёЁ]{2,}$/gi),r(this,"patternEmail",/^[a-zA-Z\d]+[\.\-]?[a-zA-Z\d]*\@[a-zA-Z]+\.[a-zA-Z]+/gi),r(this,"patternTel",/\+7\(9\d{2}\)\d{3}\-\d{4}/gi),r(this,"form",""),this.addForm(),this.addInput("name"),this.addInput("email"),this.addInput("tel"),this.addSubmit(),this.addReset()}addForm(){let e=document.querySelector(".footer"),t=document.createElement("form");t.classList.add("footer-form"),this.form=t,e.appendChild(t)}addInput(e){try{if("name"===e)throw"поменяем-ка на text";let t=document.createElement("input");if(t.classList.add(`footer-form-${e}`),t.setAttribute("type",`${e}`),"tel"===e){t.setAttribute("placeholder","+7(***)***-****");let e=document.createElement("span");e.classList.add("input-title"),e.innerText="Ваш телефон:",this.form.appendChild(e)}else{t.setAttribute("placeholder","qwe@wqe.ru");let e=document.createElement("span");e.classList.add("input-title"),e.innerText="Ваш email:",this.form.appendChild(e)}this.form.appendChild(t)}catch(t){console.log(t);let n=document.createElement("input");n.classList.add(`footer-form-${e}`),n.setAttribute("type","text"),n.setAttribute("placeholder","Имя");let i=document.createElement("span");i.classList.add("input-title"),i.innerText="Ваше имя:",this.form.appendChild(i),this.form.appendChild(n)}}addSubmit(){let e=document.createElement("button");e.classList.add("submit-btn"),e.innerText="Отправить",e.addEventListener("click",(()=>{this.checkValid()})),this.form.appendChild(e)}addReset(){let e=document.createElement("button");e.classList.add("reset-btn"),e.setAttribute("type","reset"),e.innerText="Сбросить",this.form.appendChild(e)}checkValid(){document.querySelectorAll("input").forEach((e=>{switch(e.className){case"footer-form-email":this.patternEmail.test(e.value)?(console.log("Отлично. Подходит! Отправляем вам письмо о наследстве в Африке!"),alert("Отлично. Подходит! Отправляем вам письмо о наследстве в Африке!")):console.log("Ошибка. Повторите снова!");break;case"footer-form-tel":this.patternTel.test(e.value)?(console.log("Отлично. Подходит! Ждите звонка службы безопасности Сбербанка!"),alert("Отлично. Подходит! Ждите звонка службы безопасности Сбербанка!")):console.log("Ошибка. Повторите снова!");break;case"footer-form-name":this.patternName.test(e.value)?(console.log("Отлично. Подходит! Теперь спам будет именным!"),alert("Отлично. Подходит! Теперь спам будет именным!")):console.log("Ошибка. Повторите снова!")}}))}}})();