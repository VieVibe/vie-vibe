<script setup lang="ts">
import { ArrowLeft, ArrowRight, Sun } from '@lucide/vue'
import { computed, onMounted, onUnmounted } from 'vue'
import type { Component } from 'vue'
import { data as projects } from '../../../projects.data'
import { legacyProjectLogTarget, projectLogPath } from './logAnchor'

const props = defineProps<{ slug: string; feature: string; view: Component }>()
const project = computed(() => projects.find((item) => item.slug === props.slug))

function followLegacyLink() {
  const { search, hash } = window.location
  const target = legacyProjectLogTarget(props.slug, search, hash)
  if (project.value && target) window.location.replace(target)
}

onMounted(() => {
  followLegacyLink()
  window.addEventListener('hashchange', followLegacyLink)
})
onUnmounted(() => window.removeEventListener('hashchange', followLegacyLink))
</script>

<template>
  <div v-if="project" class="product-site" :class="'product-site--' + slug">
    <a class="product-skip vp-raw" href="#product-content">跳到产品介绍</a>
    <nav class="product-nav" :aria-label="project.name + ' 导航'">
      <div class="product-wrap product-nav__inner">
        <a class="product-nav__brand" href="/projects" :aria-label="'全部项目，当前项目 ' + project.name">
          <ArrowLeft class="product-nav__back" :size="17" aria-hidden="true" />
          <img v-if="slug === 'glint'" src="/images/projects/glint-icon.webp" alt="" width="28" height="28" />
          <Sun v-else-if="slug === 'vie-gallery'" :size="23" aria-hidden="true" />
          <span v-else class="product-nav__erp" aria-hidden="true">e</span>
          {{ project.name }}
        </a>
        <div class="product-nav__links">
          <a class="product-nav__feature" href="#experience">{{ feature }}</a>
          <a :href="projectLogPath(slug)">开发日志 <ArrowRight :size="15" aria-hidden="true" /></a>
        </div>
      </div>
    </nav>

    <main id="product-content" tabindex="-1">
      <component :is="view" :project="project" />
    </main>

    <footer class="product-log-link">
      <div class="product-wrap product-log-link__inner">
        <div>
          <h2>开发日志</h2>
          <p v-if="project.log?.length">{{ project.log.length }} 篇记录，最近更新于 <time :datetime="project.log[0].date">{{ project.log[0].date }}</time></p>
        </div>
        <a class="product-button product-button--secondary" :href="projectLogPath(slug)">阅读开发日志 <ArrowRight :size="17" aria-hidden="true" /></a>
      </div>
    </footer>
  </div>
  <main v-else class="vie-page">
    <p>未找到这个项目。<a href="/projects">返回项目列表</a></p>
  </main>
</template>
