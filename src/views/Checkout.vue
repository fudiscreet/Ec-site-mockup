<template>
  <div class="checkout">
    <h2 class="page-title">チェックアウト</h2>
    <div class="order-summary">
      <h3>注文内容</h3>
      <div v-for="item in cartItems" :key="item.id" class="order-item">
        {{ item.name }} x {{ item.quantity }} - {{ item.price * item.quantity }}円
      </div>
      <p class="subtotal">小計: {{ cartTotal }}円</p>
      <p class="shipping-fee">送料: {{ shippingFee }}円</p>
      <p class="total">合計: {{ cartTotal + shippingFee }}円</p>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.order-summary {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.order-item {
  margin-bottom: 10px;
}

.subtotal, .shipping-fee, .total {
  font-weight: bold;
}

.total {
  font-size: 18px;
  color: #e74c3c;
}

.checkout-form {
  display: grid;
  gap: 20px;
}

.shipping-info, .payment-info {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

input, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.place-order-btn {
  width: 100%;
  font-size: 18px;
  padding: 15px;
}
</style>