import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue'), meta: { title: 'Home' } },
    { path: '/about', component: () => import('../views/AboutView.vue'), meta: { title: 'About' } },
    { path: '/projects', component: () => import('../views/ProjectsView.vue'), meta: { title: 'Projects' } },
    { path: '/projects/:slug', component: () => import('../views/ProjectDetailView.vue'), meta: { title: 'Project' } },
    { path: '/research', component: () => import('../views/ResearchView.vue'), meta: { title: 'Research' } },
    { path: '/research/:slug', component: () => import('../views/ResearchArticleView.vue'), meta: { title: 'Research article' } },
    { path: '/contact', component: () => import('../views/ContactView.vue'), meta: { title: 'Contact' } },
    { path: '/:pathMatch(.*)*', component: () => import('../views/NotFoundView.vue'), meta: { title: 'Page not found' } },
  ],
  scrollBehavior(to, from, savedPosition) { return savedPosition || { top: 0 } },
})
router.afterEach(async to => {
  document.title = `${to.meta.title} — Trọng / Portfolio`
  await nextTick()
  document.querySelector('main')?.focus({ preventScroll: true })
})
export default router
