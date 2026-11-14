<script setup lang="ts">
import { computed } from 'vue'
import { data as projects } from '../../../projects.data'
import ProjectSpotlight from './ProjectSpotlight.vue'

const featured = computed(() => projects.find((project) => project.featured) ?? projects[0])
const others = computed(() => projects.filter((project) => project !== featured.value))
</script>

<template>
  <div class="vie-projects vie-project-index">
    <header class="vie-project-index__heading">
      <h1>项目作品</h1>
      <p>在线相册、Windows 启动器和 ERP 智能体。</p>
    </header>

    <div v-if="featured" class="vie-project-index__grid">
      <ProjectSpotlight :project="featured" featured />
      <ProjectSpotlight v-for="project in others" :key="project.slug ?? project.name" :project="project" />
    </div>
    <p v-else class="vie-empty">项目正在整理中。</p>
  </div>
</template>
