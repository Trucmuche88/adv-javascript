Vue.component('search', {
    template: `
        <div class="search">
            <input type="text" class="goods-search" />
            <button id="searchLine" type="button">Искать</button>
        </div>`
});

Vue.component('cart', {
    props: ['cart'],
    data: function() {
        return {
            isCartVisible: false
        }
    },
    methods: {
        isVisibleCart() {
            this.isCartVisible = !this.isCartVisible;
        },
    },
    template: `
        <div class="cart">
            <button class="cart-button" v-on:click="isVisibleCart" type="button">Корзина {{ cart.length }}</button>
            <div v-if="isCartVisible">
                <ul>
                    <li v-for="(good, index) in cart">{{good.title}} <button data-index="index" v-on:click="removeCartHandler">-</button></li>
                </ul>
            </div>
        </div>`
});

Vue.component('goods-item', {
    props: ['good', 'index'],
    template: `
        <div class="goods-item">
            <h3>{{ good.title }}</h3>
            <p>{{ good.price }}</p>
            <button :data-index="index" v-on:click="$root.$emit('add-to-cart', good.id)">+</button>
        </div>`
});

Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item 
                v-for="good in goods"
                v-bind:key="good.id"
                :good="good"
            ></goods-item>
        </div>`
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cart: [],
        isCartVisible: false,
        search: '',
    },

    methods: {
        makeGETRequest(url, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('GET', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

            xhr.send();
        },

        makePOSTRequest(url, data, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.send(data);
        },

        isVisibleCart() {
            this.isCartVisible = !this.isCartVisible;
        },

        searchLine() {
            if (this.search === '') {
                this.filterGoods = this.goods;
            }
            const regexp = new RegExp(this.search, 'gi');
            this.filterGoods = this.goods.filter((good) => regexp.test(good.title));
        },
        addToCart(id) {
        },
        
        removeCartHandler(e) {
            const index = e.target.dataset.index;
            this.cart.splice(index - 1, 1);
        }
    },

    mounted() {
        this.makeGETRequest(`http://localhost:3000/catalogData`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);

            console.log(this.filteredGoods);
        });

        this.$root.$on('add-to-cart', (id) => {
            this.addToCart(id);
        });
    }
});
