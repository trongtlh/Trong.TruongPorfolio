<script setup>
defineProps({ home: Boolean })
; import { research } from '../data/research'
</script>
<template>
<div v-if="home" class="container home-section-heading" id="research"><div class="section-heading"><h2>Research & exploration</h2><RouterLink class="text-link" to="/research">Explore research ↗</RouterLink></div></div>
<section class="dark-band section"><div class="container equal-grid"><h2>Ask better questions.<br>Build with more clarity.</h2><p class="muted">Research is part of development: understanding trade-offs, trying an approach and checking whether it fits the actual workflow.</p></div></section><section class="section container research-list" aria-label="Research topics"><details v-for="(item, index) in research.slice(0, home ? 3 : research.length)" :key="item.title" :open="Boolean(item.slug)"><summary><span class="topic-number">0{{ index + 1 }}</span><div><h3>{{ item.title }}</h3><p class="muted">{{ item.description }}</p><span class="topic-tags">{{ item.tags }}</span></div><span class="expand" aria-hidden="true">+</span></summary><RouterLink v-if="item.slug" class="research-read-link" :to="`/research/${item.slug}`">Read full article ↗</RouterLink><p v-else class="research-note">{{ item.notes }}</p></details></section>
</template>
