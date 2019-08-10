import {
  slugString
} from "@/plugins/helpers"
export default {

  data() {
    return {
      cart: this.$store.getters['catalog/cart']
    }
  },
  methods: {
    productInCart(product) {
      const cartItems = this.cart.items
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].product.key === product.key) {
          return i
        }
      }
      return null
    },
    productPath(name, key) {
      const slug = slugString(name);
      return `/product/${slug}/${key}`;
    },
    addToCart(product, quantity) {
      const index = this.productInCart(product)
      const productQuantity = (!quantity || quantity < 1) ? 1 : parseInt(quantity);
      console.log('got here', product, productQuantity, index, )
      if (index === null) {
        const item = {
          product: product,
          quantity: productQuantity
        };
        this.$store.commit("catalog/updateCart", item);
      } else {
        if (!quantity) {
          this.$store.commit("catalog/incrementQuantity", index)
        } else {
          this.$store.commit("catalog/updateQuantity", {
            index,
            productQuantity
          })
        }
      }
      this.$toast.show('Shopping cart updated', {
        theme: 'bubble',
        position: 'top-center',
        duration: 1500
      })
    },
    incrementQuantity(i) {
      this.$store.commit('catalog/incrementQuantity', i)
    },
    decrementQuantity(i) {
      this.$store.commit('catalog/decrementQuantity', i)
    }
  },
  computed: {
    cartTotal() {
      let totalAmount = 0
      this.cart.items.forEach(item => {
        totalAmount += item.quantity * parseFloat(item.product.price)
      })
      return totalAmount
    },
    quantityTotal() {
      let totalQuantity = 0
      this.cart.items.forEach(item => {
        totalQuantity += item.quantity
      })
      return totalQuantity
    }
  }
}
