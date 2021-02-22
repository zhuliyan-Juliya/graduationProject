import cardComponents from './card.vue'

const card = {
    install: function(Vue) {
        Vue.component('Card-item', cardComponents)
    }
}

export default card