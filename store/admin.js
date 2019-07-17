// reference: https://vuex.vuejs.org/

import fireApp from '@/plugins/firebase'

export const state = () => ({
  groups: []
})

// set and update data
export const mutations = {
  loadGroups(state, payload) {
    state.groups.push(payload)
  }
}


//where we put business logic
export const actions = {
  createGroup({
    commit
  }, payload) {
    //   calling setBusy from index.js store
    commit('setBusy', true, {
      root: true
    })
    commit('clearError', null, {
      root: true
    })

    fireApp.database().ref('groups').push(payload)
      .then(() => {
        commit('setBusy', false, {
          root: true
        })
        commit('setJobDone', true, {
          root: true
        })
      })
      .catch(error => {
        commit('setBusy', false, {
          root: true
        })
        commit('setError', error, {
          root: true
        })
      })
  }
}

//get data from firestore
export const getters = {
  groups(state) {
    return state.groups
  }
}
