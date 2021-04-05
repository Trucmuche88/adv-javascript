import CartItem from './CartItem.js';

export default Vue.component('cart', {
        props: ['cart'],
        data: function() {
            return {
                isCartVisible: false
            }
        },
        components: CartItem,
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
