<template>
  <div class="home">
    <div class="hero-slider">
      <div class="slide">
        <img src="@/assets/hero-image.jpg" alt="TechGear Shop" class="hero-image">
        <div class="slide-content">
          <h2>最新のテクノロジーギアを探索</h2>
          <p>革新的なデバイスと最先端のガジェットをお届けします</p>
          <router-link to="/products" class="btn btn-primary">商品を見る</router-link>
        </div>
      </div>
    </div>
    <div class="featured-categories">
      <h3>人気カテゴリー</h3>
      <div class="category-list">
        <div class="category-item" v-for="category in categories" :key="category.id">
          <img :src="category.image" :alt="category.name">
          <h4>{{ category.name }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      categories: [
        { id: 1, name: 'スマートフォン', image: require('@/assets/category-smartphone.jpg') },
        { id: 2, name: 'ノートPC', image: require('@/assets/category-laptop.jpg') },
        { id: 3, name: 'スマートウォッチ', image: require('@/assets/category-smartwatch.jpg') },
        { id: 4, name: 'ヘッドフォン', image: require('@/assets/category-headphones.jpg') },
      ]
    }
  }
}
</script>

<style scoped>
.home {
  padding-top: 20px;
}

.hero-slider {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.slide {
  position: relative;
  height: 100%;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.slide-content h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.slide-content p {
  font-size: 18px;
  margin-bottom: 30px;
}

.featured-categories {
  padding: 50px 0;
  background-color: #f8f9fa;
}

.featured-categories h3 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
}

.category-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.category-item {
  text-align: center;
  margin-bottom: 20px;
}

.category-item img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.category-item h4 {
  font-size: 18px;
}
</style>