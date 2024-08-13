<template>
  <div class="shopping-cart">
    <h2 class="page-title">ショッピングカート</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      カートは空です。
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="item-image">
        <div class="item-details">
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-price">{{ formatPrice(item.price) }} x {{ item.quantity }}</p>
          <div class="quantity-control">
            <button @click="decrementQuantity(item)" class="quantity-btn" aria-label="数量を減らす">−</button>
            <input v-model.number="item.quantity" type="number" min="1" :max="maxQuantity" class="quantity-input" :aria-label="`${item.name}の数量`">
            <button @click="incrementQuantity(item)" class="quantity-btn" aria-label="数量を増やす">+</button>
          </div>
        </div>
        <button @click="removeFromCart(item)" class="remove-btn" aria-label="カートから削除">
          ✖
        </button>
      </div>
      <div class="cart-total">
        <p>合計: {{ formatPrice(cartTotal) }}</p>
      </div>
      <button @click="proceedToCheckout" class="btn checkout-btn">レジに進む</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ShoppingCartPage',
  data() {
    return {
      maxQuantity: 10
    }
  },
  computed: {
    ...mapState(['cartItems']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    ...mapActions(['incrementQuantity', 'decrementQuantity', 'removeFromCart']),
    formatPrice(price) {
      return `¥${price.toLocaleString()}`
    },
    proceedToCheckout() {
      // チェックアウト処理をここに実装
      alert('チェックアウト処理をここに実装します。')
    }
  }
}
</script>

<style scoped>
.shopping-cart {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

.page-title {
  font-size: 28px;
  margin-bottom: 20px;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  margin-top: 40px;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.item-price {
  font-weight: bold;
  margin-bottom: 10px;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-btn {
  background-color: #3498db;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-btn:hover {
  background-color: #2980b9;
}

.quantity-btn:focus {
  outline: 2px solid #2980b9;
  outline-offset: 2px;
}

.quantity-input {
  width: 50px;
  height: 30px;
  text-align: center;
  margin: 0 10px;
  border: 1px solid #ddd;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%;
}

.remove-btn:hover {
  background-color: #c0392b;
}

.remove-btn:focus {
  outline: 2px solid #c0392b;
  outline-offset: 2px;
}

.cart-total {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  text-align: right;
}

.checkout-btn {
  display: block;
  width: 200px;
  margin: 20px 0 0 auto;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #27ae60;
}

.checkout-btn:focus {
  outline: 2px solid #27ae60;
  outline-offset: 2px;
}
</style>