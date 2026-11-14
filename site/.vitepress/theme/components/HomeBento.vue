<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
import { computed, ref } from 'vue'
import { data as posts } from '../../../articles.data'
import { data as projects } from '../../../projects.data'
import { tools } from '../../../tools.registry'

const categoryLabels: Record<string, string> = {
  backend: '后端开发', frontend: '前端', devops: '部署运维',
  ai: 'AI 工程', meta: '建站', notes: '笔记',
}
const latestPosts = computed(() => posts.slice(0, 3))
const linkedProjects = projects.filter((project) => project.slug)
const featured = linkedProjects.find((project) => project.featured)
const orderedProjects = featured ? [featured, ...linkedProjects.filter((project) => project !== featured)] : linkedProjects
const previews = orderedProjects.filter((project) => project.cover)
const activeProject = ref(previews[0])
const activeCover = computed(() => activeProject.value?.coverPhoto ?? activeProject.value?.cover)
</script>

<template>
  <div class="dn-page">
    <div class="dn-home-content">
      <section id="selected-work" class="dn-hero" aria-labelledby="dn-title">
        <div class="dn-hero-copy">
          <h1 id="dn-title" aria-label="写清楚每一个技术决策"><span>写清楚每一个</span><span>技术决策</span></h1>
          <p class="dn-hero-intro">我是 Vie，全栈开发者。我在这里展示自己做的产品，记录背后的实现与取舍。</p>
          <div class="dn-hero-actions">
            <a class="dn-primary-btn" href="/projects">查看项目 <ArrowRight :size="19" aria-hidden="true" /></a>
            <a class="dn-text-link" href="/articles/">阅读文章 <ArrowRight :size="18" aria-hidden="true" /></a>
          </div>
        </div>
        <div v-if="activeProject && activeCover" class="dn-hero-media">
          <div class="dn-preview-switch" role="group" aria-label="切换项目预览">
            <button
              v-for="project in previews"
              :key="project.slug"
              type="button"
              :aria-pressed="project.slug === activeProject.slug"
              aria-controls="home-project-preview"
              @click="activeProject = project"
            >{{ project.name }}</button>
          </div>
          <div id="home-project-preview" aria-live="polite">
            <a
              class="dn-preview"
              :data-project="activeProject.slug"
              :href="'/projects/' + activeProject.slug"
              target="_blank"
              rel="noopener"
              :aria-label="`在新标签页查看 ${activeProject.name} 项目介绍`"
            >
              <span class="dn-preview__visual">
                <img
                  :key="activeCover.src"
                  :src="activeCover.src"
                  :alt="activeCover.alt"
                  :width="activeCover.width"
                  :height="activeCover.height"
                  :fetchpriority="activeProject.slug === previews[0]?.slug ? 'high' : undefined"
                />
              </span>
              <span class="dn-preview__caption">
                <span>{{ activeCover.caption }}</span>
                <span>项目介绍 <ArrowUpRight :size="17" aria-hidden="true" /></span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <nav v-if="orderedProjects.length" class="dn-work-links" aria-label="项目介绍">
        <a
          v-for="project in orderedProjects"
          :key="project.slug"
          :href="'/projects/' + project.slug"
          target="_blank"
          rel="noopener"
          :aria-label="`在新标签页查看 ${project.name} 项目介绍`"
          :data-project="project.slug"
        >
          <span v-if="project.cover" class="dn-work-links__visual">
            <img :src="project.cover.src" alt="" :width="project.cover.width" :height="project.cover.height" loading="lazy" decoding="async" />
          </span>
          <span>{{ project.name }}<small>{{ project.cover?.caption }}</small></span>
          <ArrowUpRight :size="19" aria-hidden="true" />
        </a>
      </nav>

      <section class="dn-writing dn-section" aria-labelledby="latest-title">
        <div class="dn-section-head">
          <h2 id="latest-title">最近文章</h2>
          <a class="dn-text-link" href="/articles/">全部文章 <ArrowRight :size="18" aria-hidden="true" /></a>
        </div>
        <div v-if="latestPosts.length" class="dn-post-list">
          <a v-for="item in latestPosts" :key="item.url" :href="item.url" class="dn-post">
            <div class="dn-post-meta"><time :datetime="item.date.slice(0, 10)">{{ item.date.slice(0, 10) }}</time><span>{{ categoryLabels[item.category] ?? item.category }} · {{ item.readingTime }} 分钟</span></div>
            <div class="dn-post-copy"><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div>
            <ArrowUpRight :size="23" aria-hidden="true" />
          </a>
        </div>
        <p v-else class="vie-empty">暂无已发布文章。</p>
        <a class="dn-text-link dn-series-link" href="/series/">浏览系列文章 <ArrowRight :size="18" aria-hidden="true" /></a>
      </section>

      <section id="utilities" class="dn-utilities dn-section" aria-labelledby="tools-title">
        <div class="dn-tools-intro"><h2 id="tools-title">开发工具</h2><p>在浏览器本地处理数据。</p><a class="dn-text-link" href="/tools">打开工具箱 <ArrowRight :size="18" aria-hidden="true" /></a></div>
        <div class="dn-tool-list">
          <a v-for="tool in tools" :key="tool.href" :href="tool.href" class="dn-tool"><div><h3>{{ tool.name }}</h3><p>{{ tool.description }}</p></div><ArrowRight :size="18" aria-hidden="true" /></a>
        </div>
      </section>
    </div>

  </div>
</template>
