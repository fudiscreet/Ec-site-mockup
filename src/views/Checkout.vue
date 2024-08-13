<template>
  <div class="checkout">
    <h2 class="page-title">チェックアウト</h2>
    <div class="order-summary">
      <h3>注文内容</h3>
      <div v-for="item in cartItems" :key="item.id">
        {{ item.name }} x {{ item.quantity }} - {{ formatPrice(item.price * item.quantity) }}
      </div>
      <p>小計: {{ formatPrice(cartTotal) }}円</p>
      <p>送料: {{ formatPrice(shippingFee) }}円</p>
      <p>合計: {{ formatPrice(cartTotal + shippingFee) }}円</p>
    </div>
    <form @submit.prevent="submitOrder" class="checkout-form">
      <div class="shipping-info">
        <h3>配送情報</h3>
        <input v-model="shippingInfo.name" placeholder="氏名" required>
        <input v-model="shippingInfo.phone" placeholder="電話番号" required>
        <input v-model="shippingInfo.postalCode" placeholder="郵便番号" required>
        <input v-model="shippingInfo.address" placeholder="住所" required>
        <input v-model="shippingInfo.email" placeholder="メールアドレス" required>
        <input v-model="shippingInfo.deliveryDate" type="date" placeholder="配送希望日" required>
      </div>
      <div class="payment-info">
        <h3>支払い情報</h3>
        <select v-model="paymentInfo.method" required>
          <option value="">支払い方法を選択</option>
          <option value="credit_card">クレジットカード</option>
          <option value="bank_transfer">銀行振込</option>
        </select>
        <input v-if="paymentInfo.method === 'credit_card'" v-model="paymentInfo.cardHolder" placeholder="カード名義人" required>
        <input v-if="paymentInfo.method === 'credit_card'" v-model="paymentInfo.cardNumber" placeholder="カード番号" required>
        <input v-if="paymentInfo.method === 'credit_card'" v-model="paymentInfo.expiryDate" placeholder="有効期限 (MM/YY)" required>
        <input v-if="paymentInfo.method === 'credit_card'" v-model="paymentInfo.cvv" placeholder="CVV" required>
      </div>
      <button type="submit" class="btn place-order-btn">注文を確定する</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CheckoutPage',
  data() {
    return {
      shippingFee: 500,
      shippingInfo: {
        name: '',
        phone: '',
        postalCode: '',
        address: '',
        email: '',
        deliveryDate: ''
      },
      paymentInfo: {
        method: '',
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      }
    }
  },
  computed: {
    ...mapState(['cartItems']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    ...mapActions(['placeOrder']),
    formatPrice(price) {
      return price.toLocaleString()
    },
    async submitOrder() {
      try {
        await this.placeOrder({
          items: this.cartItems,
          total: this.cartTotal + this.shippingFee,
          shippingInfo: this.shippingInfo,
          paymentInfo: this.paymentInfo
        })
        this.$router.push('/order-complete')
      } catch (error) {
        console.error('注文処理中にエラーが発生しました:', error)
      }
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