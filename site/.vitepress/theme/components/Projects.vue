<script setup lang="ts">
import { computed } from 'vue'
import { data as projects } from '../../../projects.data'
import ProjectSpotlight from './ProjectSpotlight.vue'
import ProjectMediaStrip from './ProjectMediaStrip.vue'

const flagship = computed(() => projects.find((p) => p.featured) ?? projects[0])
const others = computed(() => projects.filter((p) => p !== flagship.value))
</script>

<template>
  <div class="vie-page vie-projects">
    <header class="vie-projects-heading">
      <h1>项目</h1>
      <p>从照片展览、桌面启动器到 ERP 智能体。</p>
    </header>
    <section v-if="flagship" class="vie-flagship">
      <div class="vie-flagship__top">
        <ProjectSpotlight :project="flagship" title-tag="h2" show-tech />
        <div class="vie-flagship__media">
          <ProjectMediaStrip :media="flagship.media ?? []" variant="flagship" eager />
        </div>
      </div>
    </section>
    <p v-else class="vie-empty">项目正在整理中。</p>

    <section v-if="others.length" class="vie-more" aria-labelledby="vie-more-title">
      <h2 id="vie-more-title" class="vie-more__title">更多实践</h2>
      <div class="vie-more__grid">
        <ProjectSpotlight
          v-for="p in others"
          :key="p.slug ?? p.name"
          :project="p"
          title-tag="h3"
          compact
          show-tech
          class="vie-project-row"
        />
      </div>
    </section>
  </div>
</template>
