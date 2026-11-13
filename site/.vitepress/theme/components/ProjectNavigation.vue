<script setup lang="ts">
import { projectLogPath } from './logAnchor'

defineProps<{ slug: string; current: 'intro' | 'log' }>()
</script>

<template>
  <nav class="vie-project-nav" aria-label="项目导航">
    <a :href="`/projects/${slug}`" :aria-current="current === 'intro' ? 'page' : undefined">项目介绍</a>
    <a :href="projectLogPath(slug)" :aria-current="current === 'log' ? 'page' : undefined">开发日志</a>
  </nav>
</template>
