<template>
  <header class="site-header">
    <div class="container">
      <router-link to="/" class="site-title">TechGear Shop</router-link>
      <nav class="site-nav">
        <router-link to="/products" class="nav-link">商品一覧</router-link>
        <router-link to="/order-history" class="nav-link">購入履歴</router-link>
        <router-link to="/cart" class="nav-link cart-icon" aria-label="カート">
          🛒
          <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SiteHeader',
  computed: {
    ...mapGetters(['cartItemCount'])
  }
}
</script>

<style scoped>
.site-header {
  background-color: #2c3e50;
  color: #fff;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.site-title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.site-title:hover {
  color: #3498db;
}

.site-nav {
  display: flex;
  align-items: center;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  margin-left: 30px;
  font-weight: bold;
  transition: color 0.3s ease;
  font-size: 16px;
}

.nav-link:hover {
  color: #3498db;
}

.cart-icon {
  font-size: 24px;
  position: relative;
  display: flex;
  align-items: center;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
}
</style>