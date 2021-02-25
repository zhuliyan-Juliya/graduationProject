import cardTitleComponents from './cardTitle.vue'

const cardTitle = {
    install: function (Vue) {
        Vue.component('Card-title', cardTitleComponents)
    }
}

export default cardTitle