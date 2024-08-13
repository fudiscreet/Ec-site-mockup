<template>
  <div class="product-list">
    <h2 class="page-title">商品一覧</h2>
    <div class="filters">
      <div class="search-container">
        <label for="search-input" class="visually-hidden">商品を検索</label>
        <input id="search-input" v-model="searchQuery" placeholder="商品を検索" class="search-input">
        <span class="search-icon" aria-hidden="true">🔍</span>
      </div>
      <div class="category-filters">
        <fieldset>
          <legend class="visually-hidden">カテゴリーフィルター</legend>
          <div v-for="category in categories" :key="category" class="category-checkbox">
            <input :id="`category-${category}`" type="checkbox" v-model="selectedCategories" :value="category">
            <label :for="`category-${category}`">{{ category }}</label>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="products">
      <div v-for="product in filteredProducts" :key="product.id" class="product-item">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image">
          <div v-if="product.discountedPrice" class="discount-badge">SALE</div>
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-price-container">
            <p class="product-price" :class="{ 'discounted': product.discountedPrice }">
              <span v-if="product.discountedPrice" class="original-price">{{ formatPrice(product.price) }}</span>
              {{ formatPrice(product.discountedPrice || product.price) }}
            </p>
            <p v-if="product.discountedPrice" class="discount-percentage">
              {{ calculateDiscount(product.price, product.discountedPrice) }}% OFF
            </p>
          </div>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-actions">
            <button @click="addToCart(product)" class="btn btn-primary" aria-label="カートに追加">
              カートに追加
            </button>
            <router-link :to="`/product/${product.id}`" class="btn btn-secondary" aria-label="詳細を見る">
              詳細を見る
            </router-link>
          </div>
        </div>
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
      searchQuery: '',
      selectedCategories: [],
      categories: ['スマートフォン', 'ノートPC', 'スマートウォッチ', 'ヘッドフォン']
    }
  },
  computed: {
    ...mapState(['products']),
    filteredProducts() {
      return this.products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category)
        return matchesSearch && matchesCategory
      })
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    formatPrice(price) {
      return `¥${price.toLocaleString()}`
    },
    calculateDiscount(originalPrice, discountedPrice) {
      return Math.round((originalPrice - discountedPrice) / originalPrice * 100)
    }
  }
}
</script>

<style scoped>
.product-list {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
  color: #2c3e50;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 2px solid #3498db;
  border-radius: 25px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #3498db;
}

.category-filters fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.category-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.category-checkbox input {
  margin-right: 10px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.product-item {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.product-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-item:hover .product-image {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e74c3c;
  color: #fff;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 14px;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 18px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.product-price-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
  font-size: 20px;
  color: #2c3e50;
}

.product-price.discounted {
  color: #e74c3c;
}

.original-price {
  text-decoration: line-through;
  color: #7f8c8d;
  margin-right: 10px;
  font-size: 16px;
}

.discount-percentage {
  background-color: #2ecc71;
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 14px;
  margin-left: 10px;
}

.product-description {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 15px;
  line-height: 1.4;
}

.product-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.btn-primary {
  background-color: #3498db;
  color: #fff;
  margin-right: 10px;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #ecf0f1;
  color: #2c3e50;
}

.btn-secondary:hover {
  background-color: #bdc3c7;
}

.btn:focus {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}
</style>