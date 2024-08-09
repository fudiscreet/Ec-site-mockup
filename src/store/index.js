import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      { id: 1, name: '商品1', price: 1000, description: '商品1の説明', image: 'product1.jpg' },
      { id: 2, name: '商品2', price: 2000, description: '商品2の説明', image: 'product2.jpg' },
      { id: 3, name: '商品3', price: 3000, description: '商品3の説明', image: 'product3.jpg' },
    ],
    cartItems: [],
    orders: []
  },
  getters: {
    cartItemCount: state => state.cartItems.length,
    cartTotal: state => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  mutations: {
    addToCart(state, product) {
      const existingItem = state.cartItems.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += product.quantity || 1
      } else {
        state.cartItems.push({ ...product, quantity: product.quantity || 1 })
      }
    },
    removeFromCart(state, product) {
      const index = state.cartItems.findIndex(item => item.id === product.id)
      if (index !== -1) {
        state.cartItems.splice(index, 1)
      }
    },
    incrementQuantity(state, product) {
      const item = state.cartItems.find(item => item.id === product.id)
      if (item) {
        item.quantity++
      }
    },
    decrementQuantity(state, product) {
      const item = state.cartItems.find(item => item.id === product.id)
      if (item && item.quantity > 1) {
        item.quantity--
      }
    },
    clearCart(state) {
      state.cartItems = []
    },
    addOrder(state, order) {
      state.orders.push(order)
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeFromCart({ commit }, product) {
      commit('removeFromCart', product)
    },
    incrementQuantity({ commit }, product) {
      commit('incrementQuantity', product)
    },
    decrementQuantity({ commit }, product) {
      commit('decrementQuantity', product)
    },
    async placeOrder({ commit, state }, orderData) {
      const order = {
        id: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        items: [...state.cartItems],
        total: orderData.total,
        shippingInfo: orderData.shippingInfo,
        paymentInfo: orderData.paymentInfo
      }
      
      commit('addOrder', order)
      commit('clearCart')
      
      return order
    }
  }
})