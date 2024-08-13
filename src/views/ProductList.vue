<template>
  <div class="product-list">
    <h2 class="page-title">商品一覧</h2>
    <div class="content">
      <aside class="sidebar">
        <div class="search-bar">
          <input v-model="searchQuery" placeholder="商品を検索" aria-label="商品を検索">
        </div>
        <div class="category-filters">
          <h3>カテゴリー</h3>
          <div v-for="category in categories" :key="category" class="category-filter">
            <input 
              :id="category" 
              type="checkbox" 
              v-model="selectedCategories" 
              :value="category"
            >
            <label :for="category">{{ category }}</label>
          </div>
        </div>
      </aside>
      <main class="products">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image">
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price" :class="{ 'discounted': product.discountedPrice }">
              <span v-if="product.discountedPrice" class="original-price">{{ formatPrice(product.price) }}</span>
              {{ formatPrice(product.discountedPrice || product.price) }}
            </p>
            <p v-if="product.discountedPrice" class="discount-percentage">
              {{ calculateDiscount(product.price, product.discountedPrice) }}% OFF
            </p>
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
      </main>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    },
    getImageUrl(imageName) {
  try {
    return require(`@/assets/${imageName}`);
  } catch (e) {
    console.warn(`Image not found: ${imageName}`);
    return require('@/assets/placeholder.jpg'); // プレースホルダー画像を用意してください
  }
}
  },
  created() {   
    const categoryFromQuery = this.$route.query.category
    if (categoryFromQuery) {
      this.selectedCategories = [categoryFromQuery]
    }
  }
}
</script>

<style scoped>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

.content {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 250px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.category-filters h3 {
  margin-bottom: 10px;
}

.category-filter {
  margin-bottom: 10px;
}

.category-filter label {
  margin-left: 5px;
}

.products {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.product-price.discounted {
  color: #e74c3c;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 5px;
}

.discount-percentage {
  background-color: #e74c3c;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
  display: inline-block;
  margin-bottom: 10px;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  text-align: center;
  flex: 1;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  margin-right: 10px;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #ecf0f1;
  color: #34495e;
}

.btn-secondary:hover {
  background-color: #bdc3c7;
}
</style>