<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import NotFoundView from './NotFoundView.vue'
import { research } from '../data/research'
import osduArticle from '../data/articles/osdu-subsurface-data-integration.md?raw'

const route = useRoute()
const article = computed(() => research.find(item => item.slug === route.params.slug))
const markdown = new MarkdownIt({ html: false, linkify: true })
const articleHtml = computed(() => markdown.render(osduArticle))

watchEffect(() => {
  document.title = `${article.value?.title || 'Research article not found'} — Trọng / Portfolio`
})
</script>

<template>
  <template v-if="article?.slug === 'osdu-subsurface-data-integration'">
    <div class="container article-navigation">
      <RouterLink class="text-link" to="/research">← All research</RouterLink>
    </div>
    <article class="container article-body" v-html="articleHtml" />
  </template>
  <NotFoundView v-else />
</template>

<style scoped>
.article-navigation {
  padding-top: 28px;
}

.article-body {
  max-width: 900px;
  padding-block: 40px 96px;
}

.article-body :deep(h1) {
  max-width: 850px;
  margin-bottom: 24px;
  font-size: 48px;
}

.article-body :deep(h2) {
  margin-top: 56px;
  margin-bottom: 20px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-size: 30px;
}

.article-body :deep(p),
.article-body :deep(li) {
  font-size: 17px;
  line-height: 1.8;
}

.article-body :deep(p) {
  margin-block: 18px;
}

.article-body :deep(p:has(> img)) {
  margin-block: 32px 8px;
  padding: 14px;
  background: var(--soft);
}

.article-body :deep(img) {
  display: block;
  width: 100%;
  max-height: 520px;
  margin-inline: auto;
  object-fit: contain;
}

.article-body :deep(p:has(> img) + p) {
  margin-top: 0;
  color: var(--muted);
  font-size: 14px;
}

.article-body :deep(h1 + p) {
  margin-top: 0;
  color: var(--muted);
  font-size: 20px;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  padding-left: 26px;
}

.article-body :deep(li + li) {
  margin-top: 8px;
}

.article-body :deep(table) {
  width: 100%;
  margin-block: 24px;
  border-collapse: collapse;
  font-size: 15px;
}

.article-body :deep(th),
.article-body :deep(td) {
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
  line-height: 1.6;
}

.article-body :deep(th) {
  font-weight: 600;
}

.article-body :deep(pre) {
  overflow-x: auto;
  margin-block: 22px;
  padding: 22px;
  background: var(--dark);
  color: var(--white);
  font-size: 14px;
  line-height: 1.7;
}

.article-body :deep(code) {
  font-family: Consolas, 'Courier New', monospace;
}

.article-body :deep(:not(pre) > code) {
  padding: 2px 5px;
  background: var(--soft);
}

.article-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 800px) {
  .article-body {
    padding-top: 30px;
  }

  .article-body :deep(h1) {
    font-size: 38px;
  }

  .article-body :deep(h2) {
    margin-top: 42px;
    font-size: 26px;
  }

  .article-body :deep(table) {
    display: block;
    overflow-x: auto;
    white-space: normal;
  }
}
</style>