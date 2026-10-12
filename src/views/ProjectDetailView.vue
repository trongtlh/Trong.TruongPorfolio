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
<template>
	<template v-if="project">
		<div class="container back-link"><RouterLink to="/projects">← All projects</RouterLink></div>
		<PageIntro :eyebrow="project.category" :title="project.name" :description="project.summary" />
		<div class="container detail-visual">
			<ProjectVisual :type="project.visual" />
			<p class="caption">{{ project.productName || 'Concept illustration' }} · {{ project.stack }}</p>
		</div>
		<div v-if="project.projectType || project.githubUrl" class="container project-links">
			<p v-if="project.projectType" class="project-meta">{{ project.projectType }} · Team size: {{ project.teamSize }} · Focus: {{ project.focus }}</p>
			<a v-if="project.githubUrl" class="text-link" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>
		</div>

		<section v-if="project.sections" class="container project-facts">
			<template v-if="project.facts">
				<div v-for="fact in project.facts" :key="fact.label">
					<p class="eyebrow accent">{{ fact.label }}</p>
					<p>{{ fact.value }}</p>
				</div>
			</template>
			<template v-else>
			<div>
				<p class="eyebrow accent">PROJECT</p>
				<h2>{{ project.productName || project.name }}</h2>
			</div>
			<div>
				<p class="eyebrow accent">MY CONTRIBUTION</p>
				<p>{{ project.contributionSummary }}</p>
			</div>
			<div>
				<p class="eyebrow accent">CORE TECHNOLOGIES</p>
				<p>{{ project.stack }}</p>
			</div>
			</template>
		</section>

		<section v-if="project.sections" class="section container case-study rich-case-study">
			<article v-for="(section, index) in project.sections" :key="section.title" class="story-section">
				<div class="story-copy">
					<p class="eyebrow accent">{{ String(index + 1).padStart(2, '0') }} / {{ section.label }}</p>
					<h2>{{ section.title }}</h2>
					<p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
				</div>
				<div v-if="section.figures" class="story-figures">
					<figure v-for="figure in section.figures" :key="figure.src">
						<img :src="figure.src" :alt="figure.alt" loading="lazy" />
						<figcaption>{{ figure.caption }}</figcaption>
					</figure>
				</div>
			</article>
			<RouterLink class="button" to="/projects">Back to projects ↗</RouterLink>
		</section>

		<section v-else class="section container case-study">
			<article><p class="eyebrow accent">01 / CONTEXT</p><h2>The challenge</h2><p>{{ project.challenge }}</p></article>
			<article><p class="eyebrow accent">02 / CONTRIBUTION</p><h2>My focus</h2><ul><li v-for="item in project.contribution" :key="item">{{ item }}</li></ul></article>
			<article><p class="eyebrow accent">03 / DECISION</p><h2>The approach</h2><p>{{ project.decision }}</p></article>
			<article><p class="eyebrow accent">04 / REFLECTION</p><h2>What I learned</h2><p>{{ project.learning }}</p></article>
			<RouterLink class="button" to="/projects">Back to projects ↗</RouterLink>
		</section>
	</template>
	<NotFoundView v-else />
</template>

<style scoped>
.project-facts {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
	gap: 32px;
	padding-block: 32px;
	border-block: 1px solid var(--line);
}

.project-links {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 12px 24px;
	margin-top: 20px;
}

.project-facts h2 {
	margin-top: 8px;
	font-size: 25px;
	overflow-wrap: anywhere;
}

.project-facts > div > p:last-child {
	margin-top: 8px;
}

.rich-case-study .story-section {
	display: grid;
	grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
	gap: 48px;
	align-items: start;
	margin-bottom: 72px;
}

.story-copy h2 {
	margin-block: 12px 20px;
	font-size: 34px;
}

.story-copy > p:not(.eyebrow) + p {
	margin-top: 16px;
}

.story-figures {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
	gap: 20px;
}

.story-figures figure {
	min-width: 0;
	margin: 0;
}

.story-figures img {
	display: block;
	width: 100%;
	height: 300px;
	padding: 12px;
	border: 1px solid var(--line);
	border-radius: 4px;
	background: #fff;
	object-fit: contain;
}

.story-figures figcaption {
	margin-top: 10px;
	color: var(--muted);
	font-size: 13px;
	line-height: 1.5;
}

@media (max-width: 800px) {
	.project-facts,
	.rich-case-study .story-section {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.rich-case-study .story-section {
		margin-bottom: 48px;
	}

	.story-copy h2 {
		font-size: 29px;
	}
}
</style>
