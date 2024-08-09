<template>
  <div class="product-detail" v-if="product">
    <img :src="product.image" :alt="product.name" class="product-image">
    <h2 class="product-name">{{ product.name }}</h2>
    <p class="product-price">{{ product.price }}円</p>
    <p class="product-description">{{ product.description }}</p>
    <div class="quantity">
      <button @click="decrementQuantity" class="btn quantity-btn">-</button>
      <input v-model.number="quantity" type="number" min="1" class="quantity-input">
      <button @click="incrementQuantity" class="btn quantity-btn">+</button>
    </div>
    <button @click="addToCart" class="btn add-to-cart-btn">カートに追加</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProductDetailPage',
  data() {
    return {
      quantity: 1
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
    incrementQuantity() {
      this.quantity++
    },
    decrementQuantity() {
      if (this.quantity > 1) this.quantity--
    },
    addToCart() {
      this.addToCart({ ...this.product, quantity: this.quantity })
    }
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.product-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 10px;
}

.product-description {
  margin-bottom: 20px;
}

.quantity {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.quantity-input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.quantity-btn {
  padding: 5px 10px;
}

.add-to-cart-btn {
  width: 100%;
}
</style>