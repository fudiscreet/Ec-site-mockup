<template>
  <header class="site-header">
    <div class="container">
      <h1 class="site-title">ECサイト名</h1>
      <nav class="site-nav">
        <router-link to="/" class="nav-link">ホーム</router-link>
        <router-link to="/products" class="nav-link">商品一覧</router-link>
        <router-link to="/cart" class="nav-link">カート</router-link>
        <router-link to="/order-history" class="nav-link">注文履歴</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader'
}
</script>

<style scoped>
.site-header {
  background-color: #2c3e50;
  color: #fff;
  padding: 10px 0;
}

.site-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-title {
  font-size: 24px;
  margin: 0;
}

.site-nav {
  display: flex;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3498db;
}
</style>