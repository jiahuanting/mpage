import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//这里的Store一定要大写 否则会报错ncaught TypeError: __WEBPACK_IMPORTED_MODULE_1_vuex__.a is not a constructor
export default new Vuex.Store({
    state: {
        zh_en: "zh",
    },
    mutations: {
        change(state, val) {
            if(val === "zh") {
                state.zh_en = "zh";
            } else {
                state.zh_en = "en";
            }
        }
    }
})