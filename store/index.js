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
  setUser(state, payload) {
    state.user = payload
  },
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
  signUpUser({
    commit
  }, payload) {
    commit('setBusy', true)
    commit('clearError')
    /*  1. Sign up new user
        2. Update firebase user profile and set local user data
        3. Add user data into database
        4. Attach user to consumer group
     */
    let newUser = null
    fireApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        newUser = user.user
        // console.log(user)
        if (user) {
          return fireApp.auth().currentUser.updateProfile({
            displayName: payload.fullname
          }).then(() => {
            const currentUser = {
              id: newUser.uid,
              // id: fireApp.auth().currentUser.uid,
              email: payload.email,
              name: payload.fullname,
              role: 'consumer'
            }
            commit('setUser', currentUser)
          })
        }
      })
      .then(() => {
        const userData = {
          email: payload.email,
          fullname: payload.fullname,
          createAt: new Date().toISOString()
        }
        fireApp.database().ref(`users/${newUser.uid}`).set(userData)
      })
      .then(() => {
        // get the group with name='Customer'
        // assign user to group in the userGroups table
        return fireApp.database().ref('groups').orderByChild('name').equalTo('Customer').once('value')
          .then(snapShot => {
            const groupKey = Object.keys(snapShot.val())[0]
            let groupedUser = {}
            groupedUser[newUser.uid] = payload.fullname
            return fireApp.database().ref(`userGroups/${groupKey}`).update(groupedUser)
          })
      })
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch(error => {
        commit('setBusy', false)
        commit('setError', error)
      })
  }
}

//get data from firestore
export const getters = {
  user(state) {
    return state.user
  },
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
