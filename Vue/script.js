Vue.component('search', {
    template: `
        <div class="search">
            <input 
                type="text" 
                placeholder="Искать..."
                class="goods-search" 
                @input="search"
            />
        </div>`,
    methods: {
        search(e) {
            this.$emit('search', e.target.value);
        },
    },
});

Vue.component('cart-item', {
    props: ['item'],
    methods: {
        removeFromCartHandler() {
            this.$emit('removeFromCart', this.item.id);
        },
    },
    template: `
        <li :data-id="item.id" class="cart-item">
        {{item.title}} ({{item.quantity}}) 
            <button 
                @click="removeFromCartHandler"
            >-</button>
        </li>`
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
        removeFromCartHandler(id) {
            this.$emit('removeFromCart', id);
        },
    },
    template: `
        <div class="cart">
            <button 
                class="cart-button" 
                type="button"
                @click="isVisibleCart" 
            >
                Корзина {{ cart.length }}
            </button>
            <div v-if="isCartVisible">
                <ul>
                    <cart-item 
                        v-for="item in cart"
                        :key="item.id"
                        :item="item"
                        @removeFromCart="removeFromCartHandler"
                    />
                </ul>
            </div>
        </div>`
});

Vue.component('goods-item', {
    props: ['good'],
    methods: {
        addToCart() {
            this.$emit('addToCart', this.good.id);
        },
    },
    template: `
        <div :data-id="good.id" class="goods-item">
            <h3>{{ good.title }}</h3>
            <p>{{ good.price }}</p>
            <button @click="addToCart">+</button>
        </div>`
});

Vue.component('goods-list', {
    props: ['goods'],
    methods: {
        addToCartHandler(id) {
            this.$emit('addToCart', id);
        },
    },
    template: `
        <div class="goods-list">
            <goods-item 
                v-for="good in goods"
                :key="good.id"
                :good="good"
                @addToCart="addToCartHandler"
            />
        </div>`
});

const app = new Vue({
    el: '#app',
    template: `
        <div>
            <header>
                <search 
                    @search="searchHandler"
                />
                <cart
                    :cart="cart"
                    @removeFromCart="removeFromCartHandler"
                />
            </header>
            <main>
                <goods-list 
                    :goods="filteredGoods"
                    @addToCart="addToCartHandler"
                />
            </main>
        </div>`,
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

        async removeFromCartHandler(id) {
            const item = this.cart.find((item) => item.id == id);

            const data = await fetch(`http://127.0.0.1:3000/removeFromCart`, {
                method: 'DELETE',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const cart = await data.json();
            this.cart = cart;
            
            console.log('Great Success !');
        },

        addToCartHandler(id) {
            const good = this.goods.find((item) => item.id == id);

            fetch(`http://127.0.0.1:3000/addToCart`, {
                method: 'POST',
                body: JSON.stringify(good),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                return response.json();
            })
            .then((data) => {
                this.cart = data;
            });
        },

        searchHandler(query) {
            if (query === '') {
                this.filteredGoods = this.goods;
            }

            const regexp = new RegExp(query, 'gi');
            this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));

            console.log(this.filteredGoods);
        },

        removeCartHandler(e) {
            const index = e.target.dataset.index;
            this.cart.splice(index - 1, 1);
        }
    },

    mounted() {
        this.makeGETRequest(`http://127.0.0.1:3000/catalogData`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });

        this.makeGETRequest(`http://127.0.0.1:3000/cart`, (cart) => {
            this.cart = JSON.parse(cart);
        });
    }
});
