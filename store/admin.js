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
  //create a group in the database.
  // This sets busy, and jobdone and error states as it moves along
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

    // test error:
    // commit('setError', { message: 'error!' }, { root: true } )

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
  },

  // will run on a loop for realtime updating
  getGroups({
    commit
  }) {
    fireApp.database().ref('groups').on('child_added',
      snapShot => {
        let item = snapShot.val()
        item.key = snapShot.key
        commit('loadGroups', item)
      }
    )
  }
}

//get data from firestore
export const getters = {
  groups(state) {
    return state.groups
  }
}
