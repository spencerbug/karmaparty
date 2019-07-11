// reference: https://vuex.vuejs.org/

export const state = () => ({
  user: null,
  counter: 0
})

// set and update data
export const mutations = {
  setCounter(state, payload) {
    state.counter = state.counter + payload
  }
}

//where we put business logic
export const actions = {
  increment({
    commit
  }, payload) {
    commit('setCounter', payload)
  }
}

//get data from firestore
export const getters = {
  counter(state) {
    return state.counter
  }
}
