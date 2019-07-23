// reference: https://vuex.vuejs.org/

import fireApp from '@/plugins/firebase'

export const state = () => ({
  groups: []
})

// set and update data (with COMMIT commands)
export const mutations = {
  loadGroups(state, payload) {
    state.groups.push(payload)
  },
  updateGroup(state, payload){
    const i = state.groups.indexOf(payload.group)
    state.groups[i].name = payload.name
  },
  removeGroup(state, payload){
    const i = state.groups.indexOf(payload.group)
    state.groups.splice(i, 1)
  }
}


//where we put business logic (with DISPATCH commands)
export const actions = {
  //create a group in the database.
  // This sets busy, and jobdone and error states as it moves along
  createGroup({commit}, payload) {
    //   calling setBusy from index.js store
    commit('setBusy', true, {root: true})
    commit('setJobDone', false, {root: true})
    commit('clearError', null, {root: true})

    // test error:
    // commit('setError', { message: 'error!' }, { root: true } )

    fireApp.database().ref('groups').push(payload)
      .then(() => {
        commit('setBusy', false, {root: true})
        commit('setJobDone', true, {root: true})
      })
      .catch(error => {
        commit('setBusy', false, {root: true})
        commit('setError', error, {root: true})
      })
  },

  updateGroup({commit}, payload) {
    commit('setBusy', true, {root: true})
    commit('setJobDone', false, {root: true})
    commit('clearError', null, {root: true})
    fireApp.database().ref(`groups/${payload.group.key}`).update({name: payload.name})
      .then(() => {
        commit('setBusy', false, {root: true})
        commit('setJobDone', true, {root: true})

        const groupData = {
          group: payload.group,
          name: payload.name
        }
        // calls the updateGroup mutation, not the action (which is called by dispatch)
        commit('updateGroup', groupData)
      })
      .catch(error => {
        commit('setBusy', false, {root: true})
        commit('setError', error, {root: true})
      })
  },

  // will run on a loop for realtime updating
  getGroups({commit}) {
    fireApp.database().ref('groups').on('child_added',
      snapShot => {
        let item = snapShot.val()
        item.key = snapShot.key
        commit('loadGroups', item)
      }
    )
  },
  removeGroup({commit}, payload) {
    commit('setJobDone', false, {root: true})
    commit('clearError', null, {root: true})
    fireApp.database().ref(`groups/${payload.group.key}`).remove()
    .then(() => {
      commit('setJobDone', true, {root: true})
      commit('removeGroup', payload)
    })
    .catch(error => {
      commit('setError', error, {root: true})
      console.log(error)
    })
  }
}

//get data from firestore (with getters.$variable commands)
export const getters = {
  groups(state) {
    return state.groups
  }
}
