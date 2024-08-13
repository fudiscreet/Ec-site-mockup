import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      { id: 1, name: 'TechPro スマートフォン', price: 89800, discountedPrice: 79800, category: 'スマートフォン', description: '最新のAI機能搭載、高性能カメラ', image: require('@/assets/smartphone.jpg') },
      { id: 2, name: 'UltraBook ノートPC', price: 154800, category: 'ノートPC', description: '軽量でパワフルな高性能ノートPC', image: require('@/assets/laptop.jpg') },
      { id: 3, name: 'FitBit スマートウォッチ', price: 29800, discountedPrice: 24800, category: 'スマートウォッチ', description: '健康管理と通知機能を兼ね備えたスマートウォッチ', image: require('@/assets/smartwatch.jpg') },
      { id: 4, name: 'SoundMaster ワイヤレスヘッドフォン', price: 32800, category: 'ヘッドフォン', description: 'ノイズキャンセリング機能付きの高音質ヘッドフォン', image: require('@/assets/headphones.jpg') },
      // 他の商品も追加...
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