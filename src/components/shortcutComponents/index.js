import shortcutComponents from './shortcut.vue'

const shortcut = {
    install: function (Vue) {
        Vue.component('Shortcut', shortcutComponents)
    }
}

export default shortcut