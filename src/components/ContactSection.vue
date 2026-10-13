<script setup>
defineProps({ home: Boolean })

import { computed, ref } from 'vue'

import { profile } from '../data/profile'
const copied = ref(false)
const copyError = ref(false)
async function copyEmail() { try { await navigator.clipboard.writeText(profile.email); copied.value = true; copyError.value = false } catch { copyError.value = true } }
const channels = computed(() => [
 { name: 'Email', href: profile.email ? `mailto:${profile.email}` : '', text: profile.email || 'For project discussions and opportunities' },
 { name: 'LinkedIn', href: profile.linkedin, text: 'Experience, professional connections and updates' },
 { name: 'GitHub', href: profile.github, text: 'Code, experiments and personal projects' },
])
</script>
<template>
<div v-if="home" class="container home-section-heading" id="contact"><div class="section-heading"><h2>Let’s connect</h2><RouterLink class="text-link" to="/contact">Explore contact ↗</RouterLink></div></div>
<section class="section dark-band"><div class="container about-grid"><div><h2>Let’s build<br>something useful.</h2><p class="muted">Web & desktop applications</p></div><div class="contact-channels"><div v-for="channel in channels" :key="channel.name" class="contact-channel"><a v-if="channel.href" :href="channel.href" :target="channel.name === 'Email' ? undefined : '_blank'" rel="noopener noreferrer"><h3>{{ channel.name }} ↗</h3></a><h3 v-else>{{ channel.name }}</h3><p class="muted">{{ channel.text }}</p><small v-if="!channel.href" class="muted">Link coming soon</small></div><button v-if="profile.email" class="button" @click="copyEmail">{{ copied ? 'Email copied ✓' : 'Copy email' }}</button><p role="status" v-if="copied">Email address copied.</p><p role="status" v-if="copyError">Copy unavailable. Select the email address above instead.</p></div></div></section>
</template>
