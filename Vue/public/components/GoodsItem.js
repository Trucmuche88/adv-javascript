export default Vue.component('goods-item', {
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