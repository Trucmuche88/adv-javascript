export default Vue.component('search', {
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