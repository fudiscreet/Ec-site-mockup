<template>
  <div class="home">
    <h2>人気カテゴリー</h2>
    <div class="categories">
      <router-link 
        v-for="category in categories" 
        :key="category.id" 
        :to="{ name: 'ProductList', query: { category: category.name }}"
        class="category-item"
      >
        <img :src="require(`@/assets/${category.image}`)" :alt="category.name">
        <h3>{{ category.name }}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      categories: [
        { id: 1, name: 'スマートフォン', image: 'category-smartphone.jpg' },
        { id: 2, name: 'ノートPC', image: 'category-laptop.jpg' },
        { id: 3, name: 'スマートウォッチ', image: 'category-smartwatch.jpg' },
        { id: 4, name: 'ヘッドフォン', image: 'category-headphones.jpg' },
      ]
    }
  }
}
</script>

<style scoped>
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.category-item {
  text-decoration: none;
  color: var(--text-color);
  text-align: center;
}

.category-item img {
  max-width: 100%;
  height: auto;
}
</style>