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
    addToCart(product, quantity) {
      const index = this.productInCart(product)
      const productQuantity = !quantity || quantity < 1 ? 1 : parseInt(quantity);
      if (index === null) {
        const item = {
          product: product,
          quantity: productQuantity
        };
        this.$store.commit("catalog/updateCart", item);
      }
      this.$toast.show('Shopping cart updated', {
        theme: 'bubble',
        position: 'top-center',
        duration: 1500
      })
    },
  },
  computed: {
    cartTotal() {
      let totalAmount = 0
      this.cart.items.forEach(item => {
        totalAmount += item.quantity * parseFloat(item.product.price)
      })
      return totalAmount
    }
  }
}
