<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { computed } from 'vue'
import type { Project } from '../../../projects.source'
import ProjectStatus from './ProjectStatus.vue'

const props = withDefaults(
  defineProps<{
    project: Project
    titleTag?: 'h2' | 'h3'
    compact?: boolean
    showTech?: boolean
  }>(),
  { titleTag: 'h2', compact: false, showTech: false },
)

const detailHref = computed(() =>
  props.project.slug ? `/projects/${props.project.slug}` : '/projects',
)
</script>

<template>
  <article class="vie-spotlight" :class="{ 'vie-spotlight--compact': compact }">
    <component :is="titleTag" class="vie-spotlight__name">{{ project.name }}</component>
    <ProjectStatus :status="project.status" />
    <p class="vie-spotlight__summary">{{ project.description }}</p>
    <ul v-if="showTech" class="vie-project-tech" aria-label="技术栈">
      <li v-for="tag in project.tags.slice(0, compact ? 4 : 5)" :key="tag">{{ tag }}</li>
    </ul>
    <a
      class="vie-cta vie-cta--primary"
      :href="detailHref"
      :target="project.slug ? '_blank' : undefined"
      :rel="project.slug ? 'noopener' : undefined"
      :aria-label="project.slug ? `在新标签页查看 ${project.name} 项目介绍` : '查看项目列表'"
    >项目介绍 <ArrowUpRight :size="16" aria-hidden="true" /></a>
  </article>
</template>
