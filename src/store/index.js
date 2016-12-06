/**
 * Created by Admin on 2016/12/6.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const ALL = 2;
const store = new Vuex.Store({
  state: {
    goods: {
      foodType: ALL,
      onlyContent: false
    }
  },
  mutations: {
   RatingType: (state, data) => {
     state.goods.foodType = data;
   },
    ToggleonlyContent: (state) => {
      state.goods.onlyContent = !state.goods.onlyContent;
    }
  }
});

export default store;
