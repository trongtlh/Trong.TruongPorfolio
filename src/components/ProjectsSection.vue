<script setup>
defineProps({ home: Boolean })


import ProjectCard from './ProjectCard.vue'
import ProjectVisual from './ProjectVisual.vue'
import { projects } from '../data/projects'
</script>
<template>
<div v-if="home" class="container home-section-heading" id="projects"><div class="section-heading"><h2>Selected work</h2><RouterLink class="text-link" to="/projects">Explore projects ↗</RouterLink></div></div>
<section class="section container projects-section"><div class="project-grid"><ProjectCard v-for="project in projects.slice(0, 2)" :project="project" :key="project.slug"/></div><div class="taskflow-feature"><div><p class="eyebrow">03 / PERSONAL PROJECT</p><h2>TaskFlow</h2><p class="muted">A quieter place to get things done. Tasks, notes and work logs in one personal workspace.</p><RouterLink class="text-link" to="/projects/taskflow">View project ↗</RouterLink></div><RouterLink to="/projects/taskflow" aria-label="View TaskFlow project"><ProjectVisual type="taskflow"/></RouterLink></div></section><section class="soft-band section"><div class="container"><h2>Beyond the screenshot</h2><div class="three-columns"><article v-for="project in projects" :key="project.slug"><h3>{{ project.name }}</h3><p class="muted">{{ project.summary }}</p></article></div></div></section>
</template>
