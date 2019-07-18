// reference: https://vuex.vuejs.org/

import fireApp from '@/plugins/firebase'

export const state = () => ({
  user: null,
  error: null,
  busy: false,
  jobDone: false
})

// set and update data
export const mutations = {
  setError(state, payload) {
    state.error = payload
  },
  clearError(state, payload) {
    state.error = null
  },
  setBusy(state, payload) {
    state.busy = payload
  },
  setJobDone(state, payload) {
    state.jobDone = payload
  }
}

//where we put business logic
export const actions = {
  // createGroup({
  //   commit
  // }, payload) {
  //   fireApp.database().ref('groups').push(payload)
  //     .then(() => {
  //       console.log('SUCCESS')
  //     })
  //     .catch(error => {
  //       console.log('ERROR', error)
  //     })
  // }
}

//get data from firestore
export const getters = {
  error(state) {
    return state.error
  },
  busy(state) {
    return state.busy
  },
  jobDone(state) {
    return state.jobDone
  }
}
