<template>
  <div class="checkout">
    <h2>チェックアウト</h2>
    <div class="order-summary">
      <h3>注文内容</h3>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - {{ formatPrice(item.price) }} x {{ item.quantity }}
        </li>
      </ul>
      <p>合計: {{ formatPrice(total) }}</p>
    </div>
    <form @submit.prevent="processOrder" class="checkout-form">
      <div class="form-group">
        <label for="name">お名前</label>
        <input id="name" v-model="form.name" required>
      </div>
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input id="email" v-model="form.email" type="email" required>
      </div>
      <div class="form-group">
        <label for="address">住所</label>
        <textarea id="address" v-model="form.address" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">注文を確定する</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CheckoutPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapState(['cartItems']),
    ...mapGetters(['cartTotal']),
    total() {
      return this.cartTotal
    }
  },
  methods: {
    formatPrice(price) {
      return `¥${price.toLocaleString()}`
    },
    processOrder() {
      // ここで注文処理を実装します（APIリクエストなど）
      console.log('Order processed', { items: this.cartItems, total: this.total, customer: this.form })
      alert('注文が完了しました。ありがとうございます！')
      this.$store.commit('clearCart')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.checkout {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.order-summary {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.checkout-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #005a9c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #004080;
}
</style>