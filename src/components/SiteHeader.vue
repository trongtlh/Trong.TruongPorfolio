<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { navigation } from '../data/profile'
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => open.value = false)
const active = path => path === '/' ? route.path === '/' : route.path.startsWith(path)
</script>
<template>
  <header class="site-header container" @keydown.esc="open = false">
    <RouterLink class="brand" to="/">trọng / portfolio</RouterLink>
    <button class="menu-toggle" :aria-expanded="open" aria-controls="main-nav" @click="open = !open">{{ open ? 'Close ×' : 'Menu ☰' }}</button>
    <nav id="main-nav" :class="{ open }" aria-label="Main navigation">
      <RouterLink v-for="item in navigation" :key="item.to" :to="item.to" :class="{ active: active(item.to) }" :aria-current="active(item.to) ? 'page' : undefined">{{ item.label }}</RouterLink>
    </nav>
  </header>
</template>
