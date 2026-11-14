<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import type { Component } from 'vue'
import { data as projects } from '../../../projects.data'
import { legacyProjectLogTarget, projectLogPath } from './logAnchor'

const props = defineProps<{
  slug: string
  sections: { href: string; label: string }[]
  view: Component
}>()
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
    <nav class="product-nav" :aria-label="project.name + '导航'">
      <div class="product-wrap product-nav__inner">
        <a class="product-nav__brand vp-raw" href="#overview">
          <img v-if="slug === 'glint'" src="/images/projects/glint-icon.webp" alt="" width="34" height="34" />
          <img v-else-if="slug === 'vie-gallery'" src="/images/projects/gallery-icon.svg" alt="" width="34" height="34" />
          <span v-else class="product-nav__erp" aria-hidden="true">e</span>
          {{ project.name }}
        </a>
        <div class="product-nav__links">
          <a v-for="section in sections" :key="section.href" class="product-nav__section vp-raw" :href="section.href">{{ section.label }}</a>
          <a :href="projectLogPath(slug)">开发日志</a>
        </div>
      </div>
    </nav>

    <main id="product-content" tabindex="-1">
      <component :is="view" :project="project" />
    </main>

    <footer class="product-footer">
      <nav class="product-wrap product-footer__links" :aria-label="project.name + '相关链接'">
        <a href="/projects">全部项目</a>
        <a :href="projectLogPath(slug)">开发日志</a>
        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer">GitHub 源码</a>
      </nav>
    </footer>
  </div>
  <main v-else class="vie-page">
    <p>未找到这个项目。<a href="/projects">返回项目列表</a></p>
  </main>
</template>
