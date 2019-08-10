import {
  fireApp
} from '@/plugins/firebase'

export const state = () => ({
  products: [],
  categories: [],
  cart: {
    items: []
  }
})

//commit
export const mutations = {
  loadProducts(state, payload) {
    state.products = payload
  },
  loadCategories(state, payload) {
    state.categories = payload
  },
  updateCart(state, payload) {
    state.cart.items.push(payload)
  },
  emptyCart(state) {
    state.cart.items = []
  },
  updateQuantity(state, payload) {
    state.cart.items[payload.index].quantity += payload.productQuantity
  },
  incrementQuantity(state, payload) {
    state.cart.items[payload].quantity++
  },
  decrementQuantity(state, payload) {
    if (state.cart.items[payload].quantity > 0) {
      state.cart.items[payload].quantity--
    }
    if (state.cart.items[payload].quantity === 0) {
      state.cart.items.splice(payload, 1)
    }
  }
}

//dispatch
export const actions = {
  getProducts({
    commit
  }) {
    fireApp.database().ref('products').orderByChild('name').limitToLast(50).once('value')
      .then(snapShot => {
        const products = []
        let item = {}
        snapShot.forEach(child => {
          item = child.val()
          item.key = child.key
          products.push(item)
        })
        // reverse will put latest first
        commit('loadProducts', products.reverse())
      })
      .catch(error => {
        console.log(error)
      })
  },
  getCategories({
    commit
  }) {
    fireApp.database().ref('categories').once('value')
      .then(snapShot => {
        const categories = []
        let item = {}
        snapShot.forEach(child => {
          item = child.val()
          item.key = child.key
          categories.push(item)
        })
        // reverse will put latest first
        commit('loadCategories', categories)
      })
      .catch(error => {
        console.log(error)
      })
  },
  productSearch({
    commit
  }, payload) {
    // const searchData = {
    //     keyword: this.keyword,
    //     category: this.category,
    //     sort: this.sort
    //   };
    let ref = 'products'
    if (payload.category) {
      console.log(payload.category)
      ref = `productCategories/${payload.category}`
    }
    fireApp.database().ref(`${ref}`).orderByChild('name').limitToLast(50).startAt(payload.keyword).endAt(payload.keyword + '\uf8ff').once('value')
      .then(snapShot => {
        let products = []
        let item = {}
        snapShot.forEach(child => {
          item = child.val()
          item.key = child.key
          products.push(item)
        })

        if (payload.sort) {
          if (payload.sort === 'low') {
            products.sort((a, b) => {
              return a.price - b.price
            })

          } else {
            products.sort((a, b) => {
              return b.price - a.price
            })
          }
        } else {
          products = products.reverse()
        }

        commit('loadProducts', products)
      })
      .catch(error => {
        console.log(error)
      })
  },
  postOrder({
    commit
  }, payload) {
    // orders/orderKey/userKey/productKey/productDetail
    const orderKey = fireApp.database().ref('orders').push().key
    const items = payload.items
    const user = fireApp.auth().currentUser
    let orderItems = {}

    items.forEach(item => {
      orderItems[`orders/${orderKey}/${user.uid}/${item.product.key}`] = {
        code: item.product.code,
        product: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
        createdAt: new Date().toISOString()
      }
    })

    fireApp.database().ref().update(orderItems)
      .then(() => {
        commit('emptyCart')
        commit('setJobDone', true, {
          root: true
        })
      })
      .catch(error => {
        commit('setError', error, {
          root: true
        })
      })
  }
}
//getters.*
export const getters = {
  products(state) {
    return state.products
  },
  categories(state) {
    return state.categories
  },
  cart(state) {
    return state.cart
  }
}
