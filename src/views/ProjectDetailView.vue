<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PageIntro from '../components/PageIntro.vue'
import ProjectVisual from '../components/ProjectVisual.vue'
import NotFoundView from './NotFoundView.vue'
import { projects } from '../data/projects'
const route = useRoute()
const project = computed(() => projects.find(p => p.slug === route.params.slug))
watchEffect(() => { document.title = `${project.value?.name || 'Project not found'} — Trọng / Portfolio` })
</script>
<template><template v-if="project"><div class="container back-link"><RouterLink to="/projects">← All projects</RouterLink></div><PageIntro :eyebrow="project.category" :title="project.name" :description="project.summary"/><div class="container detail-visual"><ProjectVisual :type="project.visual"/><p class="caption">Concept illustration · {{ project.stack }}</p></div><section class="section container case-study"><article><p class="eyebrow accent">01 / CONTEXT</p><h2>The challenge</h2><p>{{ project.challenge }}</p></article><article><p class="eyebrow accent">02 / CONTRIBUTION</p><h2>My focus</h2><ul><li v-for="item in project.contribution" :key="item">{{ item }}</li></ul></article><article><p class="eyebrow accent">03 / DECISION</p><h2>The approach</h2><p>{{ project.decision }}</p></article><article><p class="eyebrow accent">04 / REFLECTION</p><h2>What I learned</h2><p>{{ project.learning }}</p></article><RouterLink class="button" to="/projects">Back to projects ↗</RouterLink></section></template><NotFoundView v-else/></template>
