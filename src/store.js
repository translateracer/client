import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/api/firebase'
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

      db
      .collection('question')
      .onSnapshot( (querySnapshot)=> {
        console.log('onSnapshot')
          const data = [];
          querySnapshot.docs.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() })
          })

          this.allTask = data    
        commit('fecthQuestion', data)
      })
    }
  },
});
