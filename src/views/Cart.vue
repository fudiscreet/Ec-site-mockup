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
          <p class="item-price">{{ item.price }}円 x {{ item.quantity }}</p>
          <div class="quantity">
            <button @click="decrementQuantity(item)" class="btn quantity-btn">-</button>
            <input v-model.number="item.quantity" type="number" min="1" class="quantity-input">
            <button @click="incrementQuantity(item)" class="btn quantity-btn">+</button>
          </div>
          <button @click="removeFromCart(item)" class="btn remove-btn">削除</button>
        </div>
      </div>
      <div class="cart-total">
        <p>合計: {{ cartTotal }}円</p>
      </div>
      <router-link to="/checkout" class="btn checkout-btn">レジに進む</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ShoppingCartPage',
  computed: {
    ...mapState(['cartItems']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    ...mapActions(['incrementQuantity', 'decrementQuantity', 'removeFromCart'])
  }
}
</script>

<style scoped>
.shopping-cart {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  margin-top: 40px;
}

.cart-item {
  display: flex;
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

.quantity {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity-input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.quantity-btn {
  padding: 5px 10px;
}

.remove-btn {
  background-color: #e74c3c;
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
  text-align: center;
}
</style>