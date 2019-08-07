import {
  fireApp
} from '@/plugins/firebase'

export const state = () => ({
  //list of all
  categories: [],
  products: [],
  //individual selected for editing
  product: null,
  productCategories: []
})

//commit
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
  loadProduct(state, payload) {
    state.product = payload
  },
  removeProduct(state, payload) {
    const i = state.products.indexOf(payload)
    state.products.splice(i, 1)
  },
  loadProductCategories(state, payload) {
    state.productCategories.push(payload)
  },
  clearProductCategories(state, payload) {
    state.productCategories = []
  }
}

//dispatch
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
      .then(downloadURL => {
        imageUrl = downloadURL
        return fireApp.database().ref('products').child(productKey).update({
          imageUrl: downloadURL
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
    commit,
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
  },
  updateProduct({
    commit,
    dispatch
  }, payload) {
    const productData = payload
    const categories = payload.belongs
    const image = payload.image
    const productKey = payload.key
    let oldImageUrl = productData.oldImageUrl
    // console.log("oldImageUrl:" + oldImageUrl)
    let oldCatsRemoval = {}
    delete productData.belongs // Goes to productCategories
    delete productData.image
    delete productData.oldImageUrl

    commit('setBusy', true, {
      root: true
    })
    commit('clearError', null, {
      root: true
    })
    fireApp.database().ref(`products/${productKey}`).update(productData) //Update products data with update
      .then(() => { // Uplaod image if new image provided
        if (image) {
          return fireApp.storage().ref(`products/${image.name}`).put(image)
        } else {
          return false
        }
      })
      .then(snapShot => {
        if (snapShot) {
          return snapShot.ref.getDownloadURL()
        }
      })
      .then(downloadURL => {
        if (downloadURL) {
          productData.imageUrl = downloadURL
          return fireApp.database().ref('products').child(productKey).update({
            imageUrl: productData.imageUrl
          })
        }
      })
      .then(() => {
        //if oldImageUrl, delete the old one
        if (oldImageUrl) {
          const refUrl = oldImageUrl.split('?')[0]
          const httpsRef = fireApp.storage().refFromURL(refUrl)
          return httpsRef.delete()
        }
      })
      .then(() => {
        //prepare batch removal of product-categories 
        return fireApp.database().ref('productCategories').on('child_added',
          snapShot => {
            oldCatsRemoval[`productCategories/${snapShot.key}/${productKey}`] = null
          })
      })
      .then(() => {
        //execute removal of product categoy attachments
        return fireApp.database().ref().update(oldCatsRemoval)
      })
      .then(() => {
        //add new product-category attachments
        const productSnippet = {
          name: productData.name,
          imageUrl: productData.imageUrl,
          price: productData.price,
          status: productData.status
        }
        let catUpdates = {}
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
  productCategories({
    commit
  }, payload) {
    //productCategories->categoryKey->productKey->[imageUrl, name price, status]
    //this query finds all categoryKey
    commit('clearProductCategories')
    fireApp.database().ref('productCategories').on('child_added',
      snapShot => {
        let item = snapShot.val()
        //key is product key, val is product data
        item.key = snapShot.key
        //payload in this case is product key
        //item is keyval pairs of product data
        if (item[payload] !== undefined) {
          commit('loadProductCategories', item.key)
        }
      }
    )
  }
}

//getters
export const getters = {
  categories(state) {
    return state.categories
  },
  products(state) {
    return state.products
  },
  product(state) {
    return state.product
  },
  productCategories(state) {
    return state.productCategories
  }
}
