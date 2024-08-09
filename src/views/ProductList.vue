<template>
  <div class="product-list">
    <h2 class="page-title">商品一覧</h2>
    <input v-model="searchQuery" placeholder="商品を検索" class="search-input">
    <div class="products">
      <div v-for="product in filteredProducts" :key="product.id" class="product-item">
        <img :src="product.image" :alt="product.name" class="product-image">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }}円</p>
        <p class="product-description">{{ product.description }}</p>
        <button @click="addToCart(product)" class="btn add-to-cart-btn">カートに追加</button>
        <router-link :to="`/product/${product.id}`" class="btn details-btn">詳細を見る</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProductListPage',
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapState(['products']),
    filteredProducts() {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    ...mapActions(['addToCart'])
  }
}
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.product-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 10px;
}

.product-description {
  margin-bottom: 15px;
}

.add-to-cart-btn, .details-btn {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
</style>