<template>
  <div class="order-complete">
    <h2 class="page-title">ご注文ありがとうございます！</h2>
    <p>注文が正常に完了しました。</p>
    <div class="order-info">
      <p>注文ID: {{ latestOrder.id }}</p>
      <p>注文日時: {{ formatDate(latestOrder.date) }}</p>
    </div>
    <div class="action-buttons">
      <router-link to="/order-history" class="btn">注文履歴を見る</router-link>
      <router-link to="/" class="btn">ショッピングを続ける</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'OrderCompletePage',
  computed: {
    ...mapState(['orders']),
    latestOrder() {
      return this.orders[this.orders.length - 1]
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('ja-JP')
    }
  }
}
</script>

<style scoped>
.order-complete {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #2ecc71;
}

.order-info {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin: 20px 0;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
</style>