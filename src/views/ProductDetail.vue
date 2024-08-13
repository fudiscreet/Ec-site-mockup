<template>
  <div class="product-detail" v-if="product">
    <img :src="product.image" :alt="product.name" class="product-image">
    <div class="product-info">
      <h2 class="product-name">{{ product.name }}</h2>
      <p class="product-price" :class="{ 'discounted': product.discountedPrice }">
        <span v-if="product.discountedPrice" class="original-price">{{ formatPrice(product.price) }}</span>
        {{ formatPrice(product.discountedPrice || product.price) }}
      </p>
      <p v-if="product.discountedPrice" class="discount-percentage">
        {{ calculateDiscount(product.price, product.discountedPrice) }}% OFF
      </p>
      <p class="product-description">{{ product.description }}</p>
      <div class="quantity-control">
        <button @click="decrementQuantity" class="quantity-btn" aria-label="数量を減らす">−</button>
        <input v-model.number="quantity" type="number" min="1" :max="maxQuantity" class="quantity-input" aria-label="数量">
        <button @click="incrementQuantity" class="quantity-btn" aria-label="数量を増やす">+</button>
      </div>
      <button @click="addToCart" class="btn btn-primary add-to-cart-btn">
        カートに追加
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProductDetailPage',
  data() {
    return {
      quantity: 1,
      maxQuantity: 10 // 最大購入可能数
    }
  },
  computed: {
    ...mapState(['products']),
    product() {
      return this.products.find(p => p.id === parseInt(this.$route.params.id))
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    formatPrice(price) {
      return `¥${price.toLocaleString()}`
    },
    calculateDiscount(originalPrice, discountedPrice) {
      return Math.round((originalPrice - discountedPrice) / originalPrice * 100)
    },
    incrementQuantity() {
      if (this.quantity < this.maxQuantity) {
        this.quantity++
      }
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      this.addToCart({ ...this.product, quantity: this.quantity })
      // ユーザーにフィードバックを提供
      alert(`${this.product.name} を ${this.quantity} 個カートに追加しました。`)
    }
  }
}
</script>

<style scoped>
.product-detail {
  display: flex;
  gap: 40px;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.product-image {
  width: 50%;
  max-width: 500px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 28px;
  margin-bottom: 20px;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.original-price {
  text-decoration: line-through;
  color: #777;
  margin-right: 10px;
}

.discount-percentage {
  background-color: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-block;
}

.product-description {
  margin-bottom: 20px;
  line-height: 1.6;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

.add-to-cart-btn {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;
}

.add-to-cart-btn:hover {
  background-color: #27ae60;
}

.add-to-cart-btn:focus {
  outline: 2px solid #27ae60;
  outline-offset: 2px;
}
</style>