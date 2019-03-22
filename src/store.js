import Vue from 'vue';
import Vuex from 'vuex';
import { log } from 'util';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions : []
  },
  mutations: {
    fetchQuestion(state) {
      state.questions = data
    }
  },
  actions: {
    getQuestions() {
      this.$db.collection('question')
      .onSnapshot(function (querySnapshot) {
        const data = querySnapshot.docs.map(function (doc) {
          return { id: doc.id, ...doc.data() }
        })
        console.log(data);
        
        commit('fecthQuestion', data)
      })
    }
  },
});
