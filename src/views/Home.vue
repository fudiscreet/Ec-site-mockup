<template>
  <div class="home">
    <h2 class="page-title">ホーム画面</h2>
    <p>ようこそ、ECサイトへ！</p>
    <router-link to="/products" class="btn">商品を見る</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px 0;
}

.page-title {
  font-size: 32px;
  margin-bottom: 20px;
}
</style>