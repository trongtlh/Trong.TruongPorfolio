<script setup>
import ProjectVisual from './ProjectVisual.vue'
defineProps({ project: Object })
</script>
<template><RouterLink class="project-card" :to="`/projects/${project.slug}`"><ProjectVisual :type="project.visual"/><div class="project-title"><h3>{{ project.name }}</h3><span aria-hidden="true">↗</span></div><p class="project-meta">{{ project.category }} / {{ project.stack }}</p></RouterLink></template>
