import { createApp } from 'vue'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/manrope/800.css'
import '@fontsource/manrope/vietnamese-800.css'
import './assets/styles.css'
import App from './App.vue'
import router from './router'

const revealObservers = new WeakMap()
const revealDirective = {
  mounted(element) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    element.classList.add('reveal-pending')
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      element.classList.add('reveal-visible')
      observer.unobserve(element)
    }, { threshold: 0.12 })

    revealObservers.set(element, observer)
    observer.observe(element)
  },
  unmounted(element) {
    revealObservers.get(element)?.disconnect()
    revealObservers.delete(element)
  },
}

createApp(App).directive('reveal', revealDirective).use(router).mount('#app')
