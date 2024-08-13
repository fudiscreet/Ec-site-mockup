<template>
  <div class="product-list">
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="商品を検索" aria-label="商品を検索">
    </div>
    <div class="content">
      <aside class="sidebar">
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
      </aside>
      <main class="products">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name">
          <h3>{{ product.name }}</h3>
          <p>{{ formatPrice(product.price) }}</p>
          <router-link :to="`/product/${product.id}`" class="btn btn-primary">詳細を見る</router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductList',
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
    formatPrice(price) {
      return `¥${price.toLocaleString()}`
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

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.content {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 200px;
}

.category-filter {
  margin-bottom: 10px;
}

.products {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
}

.btn-primary {
  display: inline-block;
  margin-top: 10px;
}
</style>