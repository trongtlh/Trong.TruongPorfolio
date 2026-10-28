<script setup>
import ProjectVisual from './ProjectVisual.vue'
defineProps({ project: Object, index: Number })
</script>
<template>
	<RouterLink class="project-card" :to="`/projects/${project.slug}`">
		<div class="project-card-visual">
			<ProjectVisual :type="project.visual" />
			<span class="project-card-number">0{{ index + 1 }}</span>
			<span class="project-card-arrow" aria-hidden="true">↗</span>
		</div>
		<div class="project-card-content">
			<div class="project-card-kicker">
				<span>{{ project.category }}</span>
				<span v-if="project.teamSize">Team · {{ project.teamSize }}</span>
			</div>
			<div class="project-title"><h3>{{ project.name }}</h3><span aria-hidden="true">↗</span></div>
			<p class="project-summary">{{ project.summary }}</p>
			<div v-if="project.stack" class="project-tags" aria-label="Technologies">
				<span v-for="technology in project.stack.split(' · ')" :key="technology">{{ technology }}</span>
			</div>
			<p v-if="project.focus" class="project-focus"><span>MY FOCUS</span>{{ project.focus }}</p>
		</div>
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
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 4;
}

@media (max-width: 800px) {
	.project-gallery img {
		height: 110px;
	}
}
</style>
