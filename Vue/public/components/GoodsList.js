export default Vue.component('goods-list', {
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