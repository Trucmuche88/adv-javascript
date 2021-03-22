const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filterGoods: [],
        cart: [],
        isCartVisible: false,
        search: '',
    },

    methods: {

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

        addToCart(e) {
            const index = e.target.dataset.index;
            this.cart.push(this.filterGoods[index]);
        },

        removeCartHandler(e) {
            const index = e.target.dataset.index;
            this.cart.splice(index - 1, 1);
        },

        makeGETRequest(url, callback) {
            var xhr;

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
            xhr.send();
        }
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (responseText) => {
            this.goods = JSON.parse(responseText);
            this.filterGoods = JSON.parse(responseText);
        });
    }
});
