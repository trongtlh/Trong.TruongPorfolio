<script setup>
import { profile } from '../data/profile'
defineProps({ cv: { type: Boolean, default: true }, email: Boolean })
</script>
<template><div class="social-links">
  <a v-if="profile.github" :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
  <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
  <a v-if="email && profile.email" :href="`mailto:${profile.email}`">Email ↗</a>
  <a v-if="cv && profile.cvUrl" :href="profile.cvUrl" target="_blank" rel="noopener noreferrer">View CV ↗</a>
  <button v-else-if="cv" class="cv-placeholder" type="button" disabled>View CV ↗</button>
  <RouterLink v-if="!profile.github && !profile.linkedin && !profile.cvUrl" to="/contact">Let’s connect ↗</RouterLink>
</div></template>

<style scoped>
.cv-placeholder {
  appearance: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
