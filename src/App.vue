<template>
  <div id="app">
    <SiteHeader />
    <main class="container">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <p>&copy; 2023 ECサイト名. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import SiteHeader from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    SiteHeader
  }
}
</script>

<style>
:root {
  --primary-color: #005a9c;
  --primary-color-dark: #004080;
  --text-color: #333;
  --background-color: #fff;
  --accent-color: #e74c3c;
}

body {
  font-family: Arial, sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.6;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex: 1;
}

.btn {
  display: inline-block;
  background: #3498db;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-color-dark);
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
}
</style>