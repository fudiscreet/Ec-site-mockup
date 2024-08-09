import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/Home.vue'
import ProductListPage from '@/views/ProductList.vue'
import ProductDetailPage from '@/views/ProductDetail.vue'
import ShoppingCartPage from '@/views/Cart.vue'
import CheckoutPage from '@/views/Checkout.vue'
import OrderCompletePage from '@/views/OrderComplete.vue'
import OrderHistoryPage from '@/views/OrderHistory.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/products', name: 'ProductList', component: ProductListPage },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetailPage },
  { path: '/cart', name: 'Cart', component: ShoppingCartPage },
  { path: '/checkout', name: 'Checkout', component: CheckoutPage },
  { path: '/order-complete', name: 'OrderComplete', component: OrderCompletePage },
  { path: '/order-history', name: 'OrderHistory', component: OrderHistoryPage }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router