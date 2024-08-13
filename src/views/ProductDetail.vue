<template>
  <div class="product-detail" v-if="product">
    <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image">
    <div class="product-info">
      <h2>{{ product.name }}</h2>
      <p class="price">{{ formatPrice(product.price) }}円</p>
      <p>{{ product.description }}</p>
      <div class="quantity">
        <button @click="decrementQuantity" aria-label="数量を減らす">-</button>
        <input v-model.number="quantity" type="number" min="1" aria-label="数量">
        <button @click="incrementQuantity" aria-label="数量を増やす">+</button>
      </div>
      <button @click="addToCartHandler" class="btn btn-primary">カートに追加</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProductDetail',
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
    formatPrice(price) {
      return price.toLocaleString()
    },
    incrementQuantity() {
      this.quantity++
    },
    decrementQuantity() {
      if (this.quantity > 1) this.quantity--
    },
    addToCartHandler() {
      this.addToCart({ ...this.product, quantity: this.quantity })
      alert('商品がカートに追加されました')
    },
    getImageUrl(imageName) {
      return require(`@/assets/${imageName}`)
    }
  }
}

</script>

<style scoped>
.product-detail {
  display: flex;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.product-image {
  max-width: 50%;
  height: auto;
}

.product-info {
  flex: 1;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
  color: #005a9c;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.quantity button {
  background-color: #005a9c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.quantity input {
  width: 50px;
  text-align: center;
}

.btn-primary {
  background-color: #005a9c;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #004080;
}
</style>