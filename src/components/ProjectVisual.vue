<script setup>
import layers from '../assets/reservoir-layers.svg'
defineProps({ type: String })
const columns = [['To do', ['Plan the next iteration', 'Review ideas']], ['In progress', ['Build something useful']], ['Done', ['Connect the pieces', 'Keep learning']]]
</script>
<template>
  <div v-if="type === 'workspace'" class="project-art workspace-art" role="img" aria-label="Concept illustration of a document and data workspace">
    <div class="window-bar"><span>● ● ●</span><span>SUBSURFACE / WORKSPACE</span></div>
    <div class="app-preview"><div class="explorer"><b>EXPLORER</b><span>⌄ Projects</span><span>Data library</span><span>Documents</span><span>Well logs</span><span>3D models</span></div>
      <div class="app-canvas"><strong>Everything in its place.</strong><p>Explore data. Open documents. Stay in flow.</p><div class="mini-tabs"><span>Overview</span><span>Documents</span><span>Model</span></div><div class="mini-panels"><div v-for="name in ['Data library', 'Document viewer']" :key="name"><b>{{ name }}</b><small>{{ name === 'Data library' ? 'Organized by context' : 'One connected workspace' }}</small><i/><i/><i/></div></div></div>
    </div>
  </div>
  <div v-else-if="type === 'reservoir'" class="project-art reservoir-art"><span class="art-label">02 / DATA VISUALIZATION</span><div class="layers-slot"><img :src="layers" width="400" height="255" alt="Conceptual geological layers" /></div><strong>Layers of insight.</strong></div>
  <div v-else class="project-art taskflow-art" role="img" aria-label="Concept illustration of a TaskFlow task board"><div class="kanban-column" v-for="[title, tasks] in columns" :key="title"><span>{{ title }}</span><div v-for="task in tasks" :key="task">{{ task }}</div></div></div>
</template>
