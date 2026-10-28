<script setup>
defineProps({ home: Boolean })


import ProjectCard from './ProjectCard.vue'
import ProjectVisual from './ProjectVisual.vue'
import { projects } from '../data/projects'
import { experiences } from '../data/experience'
const taskflow = projects.find(project => project.slug === 'taskflow')
const jobProjects = projects.filter(project => project.projectGroup === 'Job Experience')
const essExperience = experiences.find(experience => experience.company === 'ESS')
const hospitalExperience = experiences.find(experience => experience.company === 'Can Tho Stroke International Services')
</script>
<template>
<div v-if="home" v-reveal class="container home-section-heading" id="projects"><div class="section-heading"><h2>Selected work</h2><RouterLink class="text-link" to="/projects">Explore projects ↗</RouterLink></div></div>
<section v-reveal class="section container projects-section">
	<section class="project-group" aria-labelledby="job-experience-heading">
		<div class="section-heading"><h2 id="job-experience-heading">Job Experience</h2></div>
		<div class="company-project-group">
			<div class="company-project-heading">
				<div>
					<p class="eyebrow accent">COMPANY PROJECTS</p>
					<h3>ESS</h3>
				</div>
				<p v-if="essExperience" class="project-meta">{{ essExperience.role }} · {{ essExperience.period }}</p>
			</div>
			<div class="project-grid"><ProjectCard v-for="(project, index) in jobProjects" :project="project" :index="index" :key="project.slug"/></div>
		</div>
		<article v-if="!home && hospitalExperience" class="hospital-experience">
			<div class="hospital-experience-heading">
				<p class="eyebrow accent">EMPLOYMENT</p>
				<p class="project-meta">{{ hospitalExperience.period }} · {{ hospitalExperience.type }}</p>
			</div>
			<div class="hospital-experience-copy">
				<a :href="hospitalExperience.url" target="_blank" rel="noopener noreferrer">
					{{ hospitalExperience.company }} <span aria-hidden="true">↗</span>
				</a>
				<h3>{{ hospitalExperience.role }}</h3>
				<ul class="responsibilities">
					<li v-for="responsibility in hospitalExperience.responsibilities" :key="responsibility">{{ responsibility }}</li>
				</ul>
				<p class="project-meta">{{ hospitalExperience.skills }}</p>
			</div>
		</article>
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

.hospital-experience {
	display: grid;
	grid-template-columns: minmax(180px, .7fr) minmax(0, 1.3fr);
	gap: 36px;
	margin-top: 28px;
	padding: 28px;
	border: 1px solid var(--line);
	border-radius: 18px;
	background: linear-gradient(145deg,#fff,#faf9fd);
}

.hospital-experience-heading {
	display: grid;
	align-content: start;
	gap: 10px;
}

.hospital-experience-copy > a {
	font-size: 19px;
	font-weight: 700;
}

.hospital-experience-copy > a:hover {
	color: var(--accent);
}

.hospital-experience-copy > a span {
	color: var(--accent);
	font-size: 14px;
}

.hospital-experience-copy h3 {
	margin-block: 8px 16px;
	font-size: 16px;
	font-weight: 500;
	color: var(--muted);
}

.responsibilities {
	display: grid;
	gap: 10px;
	margin: 0 0 18px;
	padding: 0;
	list-style: none;
}

.responsibilities li {
	position: relative;
	padding-left: 18px;
	color: var(--muted);
	font-size: 14px;
	line-height: 1.6;
}

.responsibilities li::before {
	position: absolute;
	top: .7em;
	left: 0;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: var(--accent);
	content: '';
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

	.hospital-experience {
		grid-template-columns: 1fr;
		gap: 18px;
		padding: 22px;
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
