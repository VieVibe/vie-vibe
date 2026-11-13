<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { data as projects } from '../../../projects.data'
import type { LogEntryType } from '../../../projects.source'
import ProjectMilestoneList from './ProjectMilestoneList.vue'
import ProjectNavigation from './ProjectNavigation.vue'
import ProjectToc from './ProjectToc.vue'

const props = defineProps<{ slug: string }>()
const project = computed(() => projects.find((p) => p.slug === props.slug))
const entries = computed(() => project.value?.log ?? [])
const logFilter = ref<LogEntryType | 'all'>('all')
watch(() => props.slug, () => { logFilter.value = 'all' })
</script>

<template>
  <div class="vie-page vie-project-page">
    <p v-if="!project" class="vie-empty">未找到这个项目。<a href="/projects">返回项目列表</a></p>
    <template v-else>
      <nav class="vie-detail-crumb" aria-label="面包屑">
        <a href="/projects">全部项目</a>
        <span aria-hidden="true">/</span>
        <a :href="`/projects/${slug}`">{{ project.name }}</a>
      </nav>

      <header id="devlog" class="vie-detail-hero vie-detail-hero--log">
        <h1 class="vie-detail-title">{{ project.name }} 开发日志</h1>
        <div v-if="entries.length" class="vie-detail-meta">
          <span>{{ entries.length }} 篇开发记录</span>
          <span>更新于 <time :datetime="entries[0].date">{{ entries[0].date }}</time></span>
        </div>
      </header>
      <ProjectNavigation :slug="slug" current="log" />

      <div class="vie-project-layout">
        <ProjectToc v-if="entries.length" :entries="entries" :filter="logFilter" @select-log="logFilter = 'all'" />
        <section class="vie-project-detail" aria-labelledby="project-timeline-title">
          <h2 id="project-timeline-title" class="vie-timeline-heading">开发时间线</h2>
          <ProjectMilestoneList v-if="entries.length" v-model:filter="logFilter" :entries="entries" />
          <p v-else class="vie-empty">暂无开发记录。</p>
        </section>
      </div>
    </template>
  </div>
</template>
