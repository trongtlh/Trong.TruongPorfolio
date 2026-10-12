<script setup>
defineProps({ home: Boolean })


import ProjectCard from './ProjectCard.vue'
import ProjectVisual from './ProjectVisual.vue'
import { projects } from '../data/projects'
const taskflow = projects.find(project => project.slug === 'taskflow')
const jobProjects = projects.filter(project => project.projectGroup === 'Job Experience')
</script>
<template>
<div v-if="home" class="container home-section-heading" id="projects"><div class="section-heading"><h2>Selected work</h2><RouterLink class="text-link" to="/projects">Explore projects ↗</RouterLink></div></div>
<section class="section container projects-section">
	<section class="project-group" aria-labelledby="job-experience-heading">
		<div class="section-heading"><h2 id="job-experience-heading">Job Experience</h2></div>
		<div class="project-grid"><ProjectCard v-for="project in jobProjects" :project="project" :key="project.slug"/></div>
	</section>
	<section class="project-group personal-projects" aria-labelledby="personal-projects-heading">
		<div class="section-heading"><h2 id="personal-projects-heading">Personal Projects</h2></div>
		<div class="taskflow-feature">
			<div>
				<p class="eyebrow">{{ taskflow.projectType }} · TEAM {{ taskflow.teamSize }}</p>
				<h2>{{ taskflow.name }}</h2>
				<p class="muted">{{ taskflow.summary }}</p>
				<p class="project-meta">Focus: {{ taskflow.focus }}</p>
				<p class="project-meta">Technologies: {{ taskflow.stack }}</p>
				<div class="taskflow-links"><RouterLink class="text-link" to="/projects/taskflow">View project ↗</RouterLink><a class="text-link" :href="taskflow.githubUrl" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
			</div>
			<RouterLink to="/projects/taskflow" aria-label="View TaskFlow project"><ProjectVisual type="taskflow"/></RouterLink>
		</div>
	</section>
</section>
</template>

<style scoped>
.taskflow-links {
	display: flex;
	flex-wrap: wrap;
	gap: 24px;
	margin-top: 16px;
}

.project-group + .project-group {
	margin-top: 72px;
}

.project-group > .section-heading {
	margin-bottom: 28px;
}

@media (max-width: 800px) {
	.project-group + .project-group {
		margin-top: 48px;
	}
}
</style>
