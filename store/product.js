import {
  fireApp
} from '@/plugins/firebase'

export const state = () => ({
  categories: [],
  products: [],
})

export const mutations = {
  loadCategories(state, payload) {
    state.categories.push(payload)
  },
  updateCategory(state, payload) {
    const i = state.categories.indexOf(payload.category)
    state.categories[i].name = payload.name
  },
  removeCategory(state, payload) {
    const i = state.categories.indexOf(payload.category)
    state.categories.splice(i, 1)
  },
  loadProducts(state, payload) {
    state.products = payload
  },
  removeProduct(state, payload) {
    const i = state.products.indexOf(payload)
    state.products.splice(i, 1)
  }
}

export const actions = {
  createCategory({
    commit
  }, payload) {
    commit('setBusy', true, {
      root: true
    })
    commit('clearError', null, {
      root: true
    })
    fireApp.database().ref('categories').push(payload)
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
  getCategories({
    commit
  }) {
    fireApp.database().ref('categories').on('child_added',
      snapShot => {
        let item = snapShot.val()
        item.key = snapShot.key
        commit('loadCategories', item)
      })
  },
  updateCategory({
    commit
  }, payload) {
    commit('setBusy', true, {
      root: true
    })
    commit('clearError', null, {
      root: true
    })
    fireApp.database().ref(`categories/${payload.category.key}`).update({
        name: payload.name
      })
      .then(() => {
        commit('setBusy', false, {
          root: true
        })
        commit('setJobDone', true, {
          root: true
        })
        const categoryData = {
          category: payload.category,
          name: payload.name
        }
        commit('updateCategory', categoryData)
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
  removeCategory({
    commit
  }, payload) {
    fireApp.database().ref(`categories/${payload.category.key}`).remove()
      .then(() => {
        commit('removeCategory', payload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  addProduct({
    dispatch,
    commit
  }, payload) {
    const productData = payload
    const categories = payload.belongs
    const image = payload.image
    let imageUrl = ''
    let productKey = ''
    //remove category and product, since they go to separate places
    delete productData.belongs
    delete productData.image

    commit('setBusy', true, {
      root: true
    })
    commit('clearError', null, {
      root: true
    })
    fireApp.database().ref('products').push(productData)
      .then(result => {
        productKey = result.key
        return fireApp.storage().ref(`products/${image.name}`).put(image)
      })
      .then(snapShot => {
        return snapShot.ref.getDownloadURL()
      })
      .then(imageUrl => {
        return fireApp.database().ref('products').child(productKey).update({
          imageUrl: imageUrl
        })
      })
      .then(() => {
        const productSnippet = {
          name: productData.name,
          price: productData.price,
          status: productData.status,
          imageUrl: imageUrl,
        }
        let catUpdates = {}
        //for each category a payload belongs to, push the name, price and status to productCategories/key
        categories.forEach(catKey => {
          catUpdates[`productCategories/${catKey}/${productKey}`] = productSnippet
        })
        return fireApp.database().ref().update(catUpdates)
      })
      .then(() => {
        dispatch('getProducts')
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
  getProducts({
    commit
  }) {
    //get list of products one time (???)
    fireApp.database().ref('products').once('value')
      .then(snapShot => {
        const products = []
        let item = {}
        snapShot.forEach(child => {
          item = child.val()
          item.key = child.key
          products.push(item)
        })
        //reverse so latest shows up on top
        commit('loadProducts', products.reverse())
      })
  },

  //https://firebasestorage.googleapis.com/v0/b/ecommerce-8f3d4.appspot.com/o/products%2Fundefined?alt=media&token=1c19edf0-705b-417b-8996-896e5349a4d7
  //1. Remove form storage
  //2. Remove from products
  //3. Remove from productCategories
  removeProduct({
    commit
  }, payload) {
    const imageUrl = payload.imageUrl
    const refUrl = imageUrl.split('?')[0]
    const httpsRef = fireApp.storage().refFromURL(refUrl)
    httpsRef.delete()
      .then(() => {
        return fireApp.database().ref(`products/${payload.key}`).remove()
      })
      .then(() => {
        return fireApp.database().ref('categories').once('value')
      })
      .then(snapShot => {
        const catKeys = Object.keys(snapShot.val())
        let updates = {}
        catKeys.forEach(key => {
          updates[`productCategories/${key}/${payload.key}`] = null
        })
        return fireApp.database().ref().update(updates)
      })
      .then(() => {
        commit('removeProduct', payload)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const getters = {
  categories(state) {
    return state.categories
  },
  products(state) {
    return state.products
  }
}
