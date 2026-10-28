<script setup>
import SocialLinks from '../components/SocialLinks.vue'
import AboutBand from '../components/AboutBand.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ResearchSection from '../components/ResearchSection.vue'
import ContactSection from '../components/ContactSection.vue'
import PixelOrbit from '../components/PixelOrbit.vue'
</script>
<template><section v-reveal class="hero container"><PixelOrbit /><div class="hero-meta eyebrow"><span>SOFTWARE DEVELOPER</span></div><div class="hero-grid"><div><p class="hello">Hello, I’m</p><h1>Trọng.</h1></div><div class="hero-description"><h2>Thoughtful interfaces.<br>Useful software.</h2><p>I bring ideas to life through web and desktop applications — with a focus on clarity, craft and how people work.</p><a class="button" href="#projects">Explore my work ↘</a></div></div><div class="hero-bottom"><p>Vue / Electron / Technical research</p><SocialLinks /></div></section>
<section v-reveal class="soft-band section"><div class="container summary-grid"><h2>The person<br>behind the work.</h2><div><p class="lead">A software engineering graduate, building web and desktop experiences and learning through real product challenges.</p><p class="muted">My work spans Vue interfaces, connected workspaces and technical data visualization. I also research the choices behind the code.</p><RouterLink class="button" to="/about">More about me ↗</RouterLink></div></div></section>
<ProjectsSection home />
<AboutBand />
<ExperienceSection home />
<ResearchSection home />
<ContactSection home />
</template>
