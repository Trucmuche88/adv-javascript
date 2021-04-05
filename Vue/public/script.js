import Cart from './components/Cart.js';
import GoodsItem from './components/GoodsItem.js';
import GoodsList from './components/GoodsList.js';
import Search from './components/Search.js';

const app = new Vue({
    el: '#app',
    components: Cart, GoodsItem, GoodsList, Search,
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