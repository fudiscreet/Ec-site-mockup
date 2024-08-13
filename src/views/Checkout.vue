<template>
  <div class="checkout">
    <h2 class="page-title">チェックアウト</h2>
    <div class="checkout-container">
      <div class="order-summary">
        <h3>注文内容</h3>
        <!-- 注文内容の部分は変更なし -->
      </div>
      <div class="checkout-form-container">
        <form @submit.prevent="submitOrder" class="checkout-form">
          <div class="shipping-info">
            <h3>配送情報</h3>
            <div class="form-group">
              <label for="name">氏名</label>
              <input id="name" v-model="shippingInfo.name" required>
            </div>
            <div class="form-group">
              <label for="phone">電話番号</label>
              <input id="phone" v-model="shippingInfo.phone" required>
            </div>
            <div class="form-group">
              <label for="postalCode">郵便番号</label>
              <input id="postalCode" v-model="shippingInfo.postalCode" required>
            </div>
            <div class="form-group">
              <label for="address">住所</label>
              <input id="address" v-model="shippingInfo.address" required>
            </div>
            <div class="form-group">
              <label for="email">メールアドレス</label>
              <input id="email" v-model="shippingInfo.email" type="email" required>
            </div>
            <div class="form-group">
              <label for="deliveryDate">配送希望日</label>
              <input id="deliveryDate" v-model="shippingInfo.deliveryDate" type="date" required>
            </div>
          </div>
          <div class="payment-info">
            <h3>支払い情報</h3>
            <!-- 支払い情報の部分は変更なし -->
          </div>
          <button type="submit" class="btn place-order-btn">注文を確定する</button>
        </form>
      </div>
    </div>
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
    getImageUrl(imageName) {
      return require(`@/assets/${imageName}`)
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

.checkout-container {
  display: flex;
  gap: 40px;
}

.order-summary {
  flex: 1;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.checkout-form-container {
  flex: 2;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.shipping-info, .payment-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.place-order-btn {
  background-color: #2ecc71;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.place-order-btn:hover {
  background-color: #27ae60;
}

@media (max-width: 768px) {
  .checkout-container {
    flex-direction: column;
  }
  
  .order-summary, .checkout-form-container {
    flex: none;
    width: 100%;
  }
}
</style>