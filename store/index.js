// reference: https://vuex.vuejs.org/

import fireApp from '@/plugins/firebase'

export const state = () => ({
  user: null,
  counter: 0
})

// set and update data
export const mutations = {}

//where we put business logic
export const actions = {

  fireTest() {
    const payload = {
      one: 'Apple',
      two: 'Oranges',
    }
    fireApp.database().ref('testdb').push(payload)
      .then(() => {
        console.log('SUCCESS')
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  }
}

//get data from firestore
export const getters = {}
