<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ProjectVisual from '../components/ProjectVisual.vue'
import NotFoundView from './NotFoundView.vue'
import { projects } from '../data/projects'
const route = useRoute()
const project = computed(() => projects.find(p => p.slug === route.params.slug))
const storySections = computed(() => {
	if (!project.value) return []
	if (project.value.sections) return project.value.sections

	return [
		{
			label: 'THE CHALLENGE',
			title: `${project.value.name}, in context.`,
			paragraphs: [project.value.challenge],
		},
		{
			label: 'MY CONTRIBUTION',
			title: 'What I focused on.',
			bullets: project.value.contribution,
		},
		{
			label: 'THE APPROACH',
			title: 'Decisions with purpose.',
			paragraphs: [project.value.decision],
		},
		{
			label: 'WHAT I LEARNED',
			title: 'The takeaway.',
			paragraphs: [project.value.learning],
		},
	]
})
watchEffect(() => { document.title = `${project.value?.name || 'Project not found'} — Trọng / Portfolio` })
</script>
<template>
	<template v-if="project">
		<div class="container back-link"><RouterLink to="/projects">← All projects</RouterLink></div>
		<section v-reveal class="container project-detail-hero">
			<div class="project-detail-copy">
				<p class="eyebrow accent"><span class="project-live-dot"></span>{{ project.category }}</p>
				<h1 :class="{ 'project-detail-title-long': project.name.length > 18 }">{{ project.name }}</h1>
				<p class="project-detail-summary">{{ project.summary }}</p>
				<div class="project-detail-actions">
					<a v-if="project.githubUrl" class="button" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">Explore on GitHub ↗</a>
					<a v-if="project.projectUrl" class="button" :href="project.projectUrl" target="_blank" rel="noopener noreferrer">Visit project ↗</a>
					<span v-if="!project.githubUrl && !project.projectUrl" class="project-private-note">Professional project · Details shared selectively</span>
				</div>
			</div>
			<div class="project-detail-visual">
				<div class="project-visual-label"><span>PROJECT OVERVIEW</span><span>{{ project.projectGroup || project.projectType }}</span></div>
				<ProjectVisual :type="project.visual" />
				<p class="project-visual-caption">{{ project.productName || project.name }}<span>{{ project.stack }}</span></p>
			</div>
		</section>

		<section v-reveal class="container project-facts">
			<template v-if="project.facts">
				<div v-for="fact in project.facts" :key="fact.label">
					<p class="eyebrow accent">{{ fact.label }}</p>
					<p>{{ fact.value }}</p>
				</div>
			</template>
			<template v-else>
				<div>
					<p class="eyebrow accent">PROJECT TYPE</p>
					<p>{{ project.projectType || project.category }}</p>
				</div>
				<div>
					<p class="eyebrow accent">TEAM</p>
					<p>{{ project.teamSize === '1' ? 'Solo project' : `${project.teamSize} people` }}</p>
				</div>
				<div>
					<p class="eyebrow accent">MY FOCUS</p>
					<p>{{ project.focus }}</p>
				</div>
				<div>
					<p class="eyebrow accent">BUILT WITH</p>
					<p>{{ project.stack }}</p>
				</div>
			</template>
		</section>

		<section class="section container case-study project-story">
			<header class="project-story-heading">
				<p class="eyebrow accent">INSIDE THE PROJECT</p>
				<h2>From the first question<br>to the details that matter.</h2>
			</header>
			<article v-for="(section, index) in storySections" :key="section.title" v-reveal class="story-section">
				<div class="story-copy">
					<p class="eyebrow accent"><span class="story-index">{{ String(index + 1).padStart(2, '0') }}</span> / {{ section.label }}</p>
					<h2>{{ section.title }}</h2>
				</div>
				<div class="story-detail">
					<p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
					<ul v-if="section.bullets" class="story-bullets">
						<li v-for="item in section.bullets" :key="item">{{ item }}</li>
					</ul>
					<p v-if="index === 1 && project.contributionSummary" class="story-highlight">{{ project.contributionSummary }}</p>
					<div v-if="section.figures" class="story-figures">
						<figure v-for="figure in section.figures" :key="figure.src">
							<img :src="figure.src" :alt="figure.alt" loading="lazy" />
							<figcaption>{{ figure.caption }}</figcaption>
						</figure>
					</div>
				</div>
			</article>
			<RouterLink class="project-next-link" to="/projects">Explore all projects <span aria-hidden="true">↗</span></RouterLink>
		</section>
	</template>
	<NotFoundView v-else />
</template>

<style scoped>
.project-detail-hero {
	display: grid;
	grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
	align-items: center;
	gap: clamp(32px, 6vw, 88px);
	padding-block: 36px 64px;
}

.project-detail-copy {
	min-width: 0;
}

.project-detail-copy > .eyebrow {
	display: flex;
	align-items: center;
	gap: 10px;
	text-transform: uppercase;
	letter-spacing: .1em;
}

.project-live-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: var(--accent);
	box-shadow: 0 0 16px var(--accent);
}

.project-detail-copy h1 {
	margin-block: 24px;
	font-size: clamp(44px, 6vw, 82px);
	line-height: 1.02;
	overflow-wrap: anywhere;
}

.project-title-period {
	color: var(--accent);
}

.project-detail-copy h1.project-detail-title-long {
	font-size: clamp(40px, 3.8vw, 52px);
}

.project-detail-summary {
	max-width: 540px;
	color: var(--muted);
	font-size: 17px;
	line-height: 1.75;
}

.project-detail-actions {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 16px;
	margin-top: 28px;
}

.project-private-note {
	color: var(--muted);
	font-size: 13px;
}

.project-detail-visual {
	min-width: 0;
	padding: 14px;
	border: 1px solid var(--line);
	border-radius: 22px;
	background: radial-gradient(ellipse at 75% 15%,rgba(103,72,245,.1),transparent 42%),linear-gradient(145deg,#fff,#faf9fd);
	box-shadow: 0 24px 70px rgba(32,28,65,.1);
}

.project-visual-label,
.project-visual-caption {
	display: flex;
	justify-content: space-between;
	gap: 16px;
}

.project-visual-label {
	padding: 4px 4px 13px;
	color: var(--muted);
	font-size: 9px;
	font-weight: 700;
	letter-spacing: .13em;
}

.project-visual-label span:first-child {
	color: var(--accent);
}

.project-detail-visual :deep(.project-art) {
	height: clamp(270px, 34vw, 430px);
	min-height: 0;
	border-radius: 12px;
	box-shadow: 0 12px 35px rgba(32,28,65,.12);
}

.project-detail-visual :deep(.reservoir-art) {
	background: linear-gradient(135deg,#d2ff65,#a9e5c4);
}

.project-detail-visual :deep(.taskflow-art) {
	height: clamp(300px, 36vw, 460px);
}

.project-visual-caption {
	flex-wrap: wrap;
	padding: 13px 4px 3px;
	color: var(--ink);
	font-size: 12px;
	font-weight: 600;
}

.project-visual-caption span {
	color: var(--muted);
	font-size: 11px;
	font-weight: 400;
}

.project-facts {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
	gap: 32px;
	padding-block: 28px;
	border-block: 1px solid var(--line);
}

.project-facts > div {
	min-width: 0;
}

.project-facts > div > p:last-child {
	margin-top: 10px;
	color: var(--ink);
	font-size: 14px;
	line-height: 1.6;
	overflow-wrap: anywhere;
}

.project-story-heading {
	margin-bottom: 34px;
}

.project-story-heading h2 {
	margin-top: 15px;
	font-size: clamp(32px, 4vw, 50px);
}

.project-story .story-section {
	display: grid;
	grid-template-columns: minmax(0, .72fr) minmax(0, 1.28fr);
	gap: clamp(28px, 5vw, 72px);
	align-items: start;
	margin-bottom: 20px;
	padding: clamp(20px, 4vw, 44px);
	border: 1px solid var(--line);
	border-radius: 22px;
	background: linear-gradient(145deg,#fff,#fbfaff);
}

.project-story .story-section:nth-of-type(even) {
	background: radial-gradient(ellipse at 92% 0,rgba(103,72,245,.07),transparent 52%),linear-gradient(145deg,#fff,#faf9fd);
}

.story-copy h2 {
	margin-block: 18px 22px;
	font-size: clamp(28px, 3.3vw, 42px);
	line-height: 1.12;
}

.story-detail > p + p {
	margin-top: 16px;
}

.story-detail > p,
.story-bullets li {
	color: var(--muted);
	font-size: 16px;
	line-height: 1.75;
}

.story-index {
	display: inline-grid;
	width: 28px;
	height: 28px;
	margin-right: 7px;
	place-items: center;
	border: 1px solid var(--line);
	border-radius: 50%;
	color: var(--ink);
	font-size: 10px;
	letter-spacing: 0;
}

.story-highlight {
	margin-top: 24px;
	padding: 14px 16px;
	border-left: 2px solid var(--accent);
	background: rgba(103,72,245,.06);
	color: var(--ink) !important;
	font-size: 13px !important;
}

.story-bullets {
	display: grid;
	gap: 15px;
	margin: 0;
	padding: 0;
	list-style: none;
}

.story-bullets li {
	position: relative;
	padding-left: 22px;
}

.story-bullets li::before {
	position: absolute;
	top: .72em;
	left: 0;
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: var(--accent);
	content: '';
}

.story-figures {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
	gap: 16px;
	margin-top: 24px;
}

.story-figures figure {
	min-width: 0;
	margin: 0;
	padding: 10px;
	border: 1px solid var(--line);
	border-radius: 14px;
	background: #faf9fd;
}

.story-figures img {
	display: block;
	width: 100%;
	height: clamp(210px, 24vw, 310px);
	padding: 8px;
	border-radius: 8px;
	background: #f1f0fa;
	object-fit: contain;
}

.story-figures figcaption {
	margin: 10px 3px 2px;
	color: var(--muted);
	font-size: 13px;
	line-height: 1.5;
}

.project-next-link {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	padding: 22px 24px;
	border: 1px solid var(--line);
	border-radius: 14px;
	color: var(--ink);
	font-size: 16px;
	font-weight: 600;
	transition: border-color .2s,background .2s;
}

.project-next-link:hover {
	border-color: var(--accent);
	background: rgba(103,72,245,.04);
}

.project-next-link span {
	color: var(--accent);
	font-size: 22px;
}

@media (max-width: 800px) {
	.project-detail-hero {
		grid-template-columns: 1fr;
		gap: 30px;
		padding-block: 20px 42px;
	}

	.project-detail-copy h1 {
		margin-block: 18px;
		font-size: clamp(44px, 12vw, 64px);
	}

	.project-detail-copy h1.project-detail-title-long {
		font-size: clamp(39px, 10vw, 48px);
	}

	.project-detail-summary {
		font-size: 16px;
	}

	.project-detail-visual :deep(.project-art),
	.project-detail-visual :deep(.taskflow-art) {
		height: 300px;
	}

	.project-facts,
	.project-story .story-section {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.project-facts {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 22px 16px;
	}

	.project-story .story-section {
		margin-bottom: 14px;
		padding: 22px;
	}

	.story-copy h2 {
		margin-block: 14px 0;
		font-size: 28px;
	}

	.story-detail > p,
	.story-bullets li {
		font-size: 15px;
	}

	.story-figures img {
		height: 240px;
	}

	.project-story-heading h2 {
		font-size: 34px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.project-next-link {
		transition: none;
	}
}
</style>
