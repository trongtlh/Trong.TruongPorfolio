<script setup>
const pixels = [
  { x: 0, y: 22, color: 'gold', delay: 0.2, mark: '' },
  { x: 19, y: 3, color: 'violet', delay: 0.8, mark: '' },
  { x: 39, y: 3, color: 'orange', delay: 0.1, mark: ')' },
  { x: 58, y: 3, color: 'gold', delay: 1.1, mark: '' },
  { x: 78, y: 3, color: 'violet', delay: 0.5, mark: '.' },
  { x: 113, y: 3, color: 'pink', delay: 1.4, mark: '&' },
  { x: 151, y: 22, color: 'lavender', delay: 0.3, mark: '.' },
  { x: 171, y: 42, color: 'lavender', delay: 1, mark: '' },
  { x: 191, y: 61, color: 'lavender', delay: 0.6, mark: '.' },
  { x: 0, y: 61, color: 'gold', delay: 1.3, mark: '' },
  { x: 38, y: 80, color: 'violet', delay: 0.7, mark: '' },
  { x: 192, y: 100, color: 'gold', delay: 0.4, mark: '.' },
]
</script>

<template>
  <div class="pixel-orbit" aria-hidden="true">
    <span
      v-for="(pixel, index) in pixels"
      :key="index"
      class="pixel"
      :class="`pixel-${pixel.color}`"
      :style="{
        left: `${pixel.x}px`,
        top: `${pixel.y}px`,
        '--pixel-delay': `${pixel.delay}s`,
      }"
    >{{ pixel.mark }}</span>
  </div>
</template>

<style scoped>
.pixel-orbit {
  position: absolute;
  z-index: -1;
  top: -20px;
  right: 5%;
  width: 230px;
  height: 130px;
  pointer-events: none;
}

.pixel {
  position: absolute;
  display: grid;
  width: 19px;
  height: 19px;
  place-items: center;
  color: #242033;
  font: 700 10px/1 Inter, sans-serif;
  animation: pixel-drift 3.2s ease-in-out var(--pixel-delay) infinite alternate;
}

.pixel-gold {
  background: #d3bb00;
}

.pixel-violet {
  background: #6848ff;
}

.pixel-orange {
  background: #d57b00;
}

.pixel-pink {
  background: #ff3f82;
}

.pixel-lavender {
  background: #b278ff;
}

@keyframes pixel-drift {
  from {
    transform: translate3d(0, 0, 0) rotate(0);
    opacity: 0.82;
  }

  to {
    transform: translate3d(0, -7px, 0) rotate(4deg);
    opacity: 1;
  }
}

@media (max-width: 800px) {
  .pixel-orbit {
    top: 0;
    right: 0;
    transform: scale(0.62);
    transform-origin: top right;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pixel {
    animation: none;
  }
}
</style>
