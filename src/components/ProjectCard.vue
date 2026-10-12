<script setup>
import ProjectVisual from './ProjectVisual.vue'
defineProps({ project: Object })
</script>
<template>
	<RouterLink class="project-card" :to="`/projects/${project.slug}`">
		<ProjectVisual :type="project.visual" />
		<div class="project-title"><h3>{{ project.name }}</h3><span aria-hidden="true">↗</span></div>
		<template v-if="project.company">
			<p class="project-meta">Company: {{ project.company }} · Team size: {{ project.teamSize }}</p>
			<p class="project-meta">Focus: {{ project.focus }}</p>
			<p class="project-summary">{{ project.summary }}</p>
			<p class="project-meta">{{ project.keyAreas ? 'Key areas' : 'Technologies' }}: {{ project.keyAreas || project.stack }}</p>
		</template>
		<p v-else class="project-meta">{{ project.category }} / {{ project.stack }}</p>
	</RouterLink>
</template>

<style scoped>
.project-gallery {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 10px;
	margin-bottom: 20px;
}

.project-gallery figure {
	min-width: 0;
	margin: 0;
}

.project-gallery img {
	display: block;
	width: 100%;
	height: 150px;
	padding: 8px;
	border: 1px solid var(--line);
	border-radius: 4px;
	background: #fff;
	object-fit: contain;
}

.project-gallery figcaption {
	margin-top: 7px;
	color: var(--muted);
	font-size: 12px;
	line-height: 1.4;
}

.project-summary {
	margin-top: 10px;
	color: var(--muted);
}

@media (max-width: 800px) {
	.project-gallery img {
		height: 110px;
	}
}
</style>
