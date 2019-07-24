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
  },
  loginUser({
    commit
  }, payload) {
    commit('setBusy', true)
    commit('clearError')
    // 1. Login user
    // 2. Find the group user belongs
    // 3. Set logged in user in local data
    fireApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const authUser = {
          id: user.user.uid,
          email: user.user.email,
          name: user.user.displayName,
        }

        // select key in groups where name is Administrator
        return fireApp.database().ref('groups').orderByChild('name').equalTo('Administrator').once('value')
          .then(snapShot => {
            const groupKey = Object.keys(snapShot.val())[0]
            // select loggedInUser.id in userGroups/<key of administrators>
            return fireApp.database().ref(`userGroups/${groupKey}`).child(`${authUser.id}`).once('value')
              .then(ugroupSnap => {
                // if it exists, they are in the admin group
                if (ugroupSnap.exists()) {
                  authUser.role = 'admin'
                } else {
                  authUser.role = 'customer'
                }
                commit('setUser', authUser)
                commit('setBusy', false)
                commit('setJobDone', true)
              })
          })
      })
      .catch(error => {
        commit('setBusy', false)
        commit('setError', error)
      })
  },
  logOut({
    commit
  }) {
    fireApp.auth().signOut()
    commit('setUser', null)
  }
}

//get data from firestore
export const getters = {
  user(state) {
    return state.user
  },
  loginStatus(state) {
    return state.user !== null && state.user !== undefined
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
