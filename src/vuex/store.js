import { createStore } from "vuex"
import { uuid } from 'vue-uuid'; 
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const store = createStore({
  state () {
    return {
      users: []
    }
  },
  mutations: {
    addUser (state, user) {
      state.users = [
        {...user, id: uuid.v1(),},
        ...state.users,
      ]
    },
    deleteUser (state, id) {
      state.users = [
        ...state.users.filter(u => u.id !== id)
      ]
    },
    updateUser (state, user) {
      state.users = [
        ...state.users.filter(u => u.id !== user.id),
        {...user}
      ]
    },
    
  },
  plugins:[
    vuexLocal.plugin
  ]
})

export default store;
