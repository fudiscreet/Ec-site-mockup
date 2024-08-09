<template>
  <div class="order-history">
    <h2 class="page-title">注文履歴</h2>
    <div v-if="orders.length === 0" class="no-orders">
      注文履歴がありません。
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order-item">
        <h3>注文 #{{ order.id }}</h3>
        <p>注文日時: {{ formatDate(order.date) }}</p>
        <div class="order-details">
          <div class="order-summary">
            <h4>注文内容</h4>
            <div v-for="item in order.items" :key="item.id">
              {{ item.name }} x {{ item.quantity }} - {{ item.price * item.quantity }}円
            </div>
            <p class="order-total">合計: {{ order.total }}円</p>
          </div>
          <div class="shipping-info">
            <h4>配送情報</h4>
            <p>配送先: {{ order.shippingInfo.address }}</p>
            <p>配送予定日: {{ order.shippingInfo.deliveryDate }}</p>
          </div>
          <div class="payment-info">
            <h4>支払い情報</h4>
            <p>支払い方法: {{ getPaymentMethod(order.paymentInfo.method) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OrderHistoryPage',
  computed: {
    ...mapState(['orders'])
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('ja-JP')
    },
    getPaymentMethod(method) {
      return method === 'credit_card' ? 'クレジットカード' : '銀行振込'
    }
  }
}
</script>

<style scoped>
.order-history {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.no-orders {
  text-align: center;
  font-size: 18px;
  margin-top: 40px;
}

.order-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.order-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.order-summary, .shipping-info, .payment-info {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

.order-total {
  font-weight: bold;
  color: #e74c3c;
}
</style>