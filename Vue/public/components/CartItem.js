export default Vue.component('cart-item', {
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