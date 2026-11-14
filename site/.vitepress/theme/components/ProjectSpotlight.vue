<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { Project } from '../../../projects.source'
import ProjectStatus from './ProjectStatus.vue'

defineProps<{ project: Project; featured?: boolean }>()
</script>

<template>
  <article class="vie-work" :class="{ 'vie-work--featured': featured }" :data-project="project.slug">
    <div v-if="project.cover" class="vie-work__visual">
      <img
        :src="project.cover.src"
        :alt="project.cover.alt"
        :width="project.cover.width"
        :height="project.cover.height"
        :loading="featured ? 'eager' : 'lazy'"
        :fetchpriority="featured ? 'high' : undefined"
        decoding="async"
      />
    </div>
    <div class="vie-work__body">
      <h2>{{ project.name }}</h2>
      <div class="vie-work__meta">
        <span v-if="project.cover">{{ project.cover.caption }}</span>
        <ProjectStatus :status="project.status" />
      </div>
      <p>{{ project.description }}</p>
      <ul v-if="project.tags.length" class="vie-project-tech" aria-label="技术栈">
        <li v-for="tag in project.tags.slice(0, 4)" :key="tag">{{ tag }}</li>
      </ul>
      <a
        v-if="project.slug"
        class="vie-cta vie-cta--primary"
        :href="'/projects/' + project.slug"
        target="_blank"
        rel="noopener"
        :aria-label="`在新标签页查看 ${project.name} 项目介绍`"
      >查看项目介绍 <ArrowUpRight :size="17" aria-hidden="true" /></a>
    </div>
  </article>
</template>
