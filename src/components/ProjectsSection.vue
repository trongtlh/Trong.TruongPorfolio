<script setup>
defineProps({ home: Boolean })


import ProjectCard from './ProjectCard.vue'
import ProjectVisual from './ProjectVisual.vue'
import { projects } from '../data/projects'
import { experiences } from '../data/experience'
const taskflow = projects.find(project => project.slug === 'taskflow')
const professionalProjects = projects.filter(project => project.projectGroup === 'Professional Projects')
const essExperience = experiences.find(experience => experience.company === 'ESS')
</script>
<template>
<div v-if="home" v-reveal class="container home-section-heading" id="projects"><div class="section-heading"><h2>Selected work</h2><RouterLink class="text-link" to="/projects">Explore projects ↗</RouterLink></div></div>
<section v-reveal class="section container projects-section">
	<section class="project-group" aria-labelledby="professional-projects-heading">
		<div class="section-heading"><h2 id="professional-projects-heading">Professional Projects</h2></div>
		<div class="company-project-group">
			<div class="company-project-heading">
				<div>
					<p class="eyebrow accent">PROJECTS AT</p>
					<h3>ESS</h3>
				</div>
				<p v-if="essExperience" class="project-meta">{{ essExperience.role }} · {{ essExperience.period }}</p>
			</div>
			<div class="project-grid"><ProjectCard v-for="(project, index) in professionalProjects" :project="project" :index="index" :key="project.slug"/></div>
		</div>
	</section>
	<section class="project-group personal-projects" aria-labelledby="personal-projects-heading">
		<div class="section-heading"><h2 id="personal-projects-heading">Personal Projects</h2></div>
		<div class="taskflow-feature">
			<div class="taskflow-feature-copy">
				<p class="eyebrow">{{ taskflow.projectType }} <span>·</span> SOLO BUILD</p>
				<h2>{{ taskflow.name }}<span class="taskflow-title-period">.</span></h2>
				<p class="taskflow-summary">{{ taskflow.summary }}</p>
				<p class="taskflow-focus"><span>THE FOCUS</span>{{ taskflow.focus }}</p>
				<div class="project-tags taskflow-tags"><span v-for="technology in taskflow.stack.split(' · ')" :key="technology">{{ technology }}</span></div>
				<div class="taskflow-links"><RouterLink class="text-link" to="/projects/taskflow">Explore project ↗</RouterLink><a class="text-link" :href="taskflow.githubUrl" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
			</div>
			<RouterLink class="taskflow-feature-visual" to="/projects/taskflow" aria-label="View TaskFlow project"><ProjectVisual type="taskflow"/></RouterLink>
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

.company-project-group {
	padding: 24px;
	border: 1px solid var(--line);
	border-radius: 22px;
	background: linear-gradient(145deg,#fff,#faf9fd);
}

.company-project-heading {
	display: flex;
	align-items: end;
	justify-content: space-between;
	gap: 20px;
	margin-bottom: 20px;
	padding: 0 4px 18px;
	border-bottom: 1px solid var(--line);
}

.company-project-heading h3 {
	margin-top: 5px;
	font-size: 28px;
}

.company-project-heading .project-meta {
	text-align: right;
}

.taskflow-feature-copy {
	min-width: 0;
}

.taskflow-feature-copy h2 {
	margin-block: 20px 14px;
	font-size: clamp(38px, 5vw, 64px);
}

.taskflow-title-period {
	color: var(--accent);
}

.taskflow-summary {
	max-width: 460px;
	color: var(--muted);
	font-size: 16px;
	line-height: 1.7;
}

.taskflow-focus {
	display: grid;
	gap: 8px;
	margin-top: 24px;
	font-size: 14px;
}

.taskflow-focus > span,
.project-focus > span {
	color: var(--accent);
	font-size: 10px;
	font-weight: 700;
	letter-spacing: .12em;
}

.taskflow-tags {
	margin-top: 18px;
}

.taskflow-feature-visual {
	display: block;
	min-width: 0;
}

@media (max-width: 800px) {
	.project-group + .project-group {
		margin-top: 48px;
	}

	.company-project-group {
		padding: 16px;
		border-radius: 18px;
	}

	.company-project-heading {
		align-items: start;
		flex-direction: column;
		gap: 8px;
		padding-inline: 2px;
	}

	.company-project-heading .project-meta {
		text-align: left;
	}

	.taskflow-feature-copy h2 {
		margin-top: 14px;
		font-size: 42px;
	}
}
</style>
