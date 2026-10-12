<script setup>defineProps({ eyebrow: String, title: String, description: String })</script>
<template><section class="container page-intro"><p class="eyebrow accent">{{ eyebrow }}</p><h1>{{ title }}</h1><p v-if="description" class="intro-description">{{ description }}</p></section></template>
