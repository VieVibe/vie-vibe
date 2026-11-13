<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
import { computed, onMounted, onUnmounted } from 'vue'
import { data as projects } from '../../../projects.data'
import ProjectStatus from './ProjectStatus.vue'
import ProjectMediaStrip from './ProjectMediaStrip.vue'
import ProjectCapabilityList from './ProjectCapabilityList.vue'
import ProjectNavigation from './ProjectNavigation.vue'
import ProjectToc from './ProjectToc.vue'
import { legacyProjectLogTarget, projectLogPath } from './logAnchor'

const props = defineProps<{ slug: string }>()

const project = computed(() => projects.find((p) => p.slug === props.slug))
const latest = computed(() => project.value?.log?.[0])

const tocSections: { id: string; label: string }[] = [
  { id: 'overview', label: '项目概览' },
  { id: 'experience', label: '产品体验' },
  { id: 'capabilities', label: '核心能力' },
  { id: 'architecture', label: '系统实现' },
  { id: 'validation', label: '验证与结果' },
]

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
  <div class="vie-page vie-project-page">
    <p v-if="!project" class="vie-empty">未找到这个项目。<a href="/projects">返回项目列表</a></p>
    <template v-else>
      <nav class="vie-detail-crumb" aria-label="面包屑">
        <a href="/projects">全部项目</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ project.name }}</span>
      </nav>

      <header class="vie-detail-hero">
        <h1 class="vie-detail-title">{{ project.name }}</h1>
        <p class="vie-detail-desc">{{ project.proposition }}</p>
        <div class="vie-detail-meta">
          <ProjectStatus :status="project.status" />
          <span>更新于 <time :datetime="project.updatedAt">{{ project.updatedAt }}</time></span>
        </div>
        <div class="vie-detail-actions">
          <a
            v-if="project.download"
            class="vie-cta vie-cta--primary"
            :href="project.download"
            target="_blank"
            rel="noopener noreferrer"
          >下载 Windows x64 便携版 <ArrowUpRight :size="16" aria-hidden="true" /></a>
          <a
            v-if="project.demo"
            class="vie-cta vie-cta--primary"
            :href="project.demo"
            :aria-label="`访问 ${project.name} 线上环境（新窗口打开）`"
            target="_blank"
            rel="noopener noreferrer"
          >线上体验 <ArrowUpRight :size="16" aria-hidden="true" /></a>
          <a
            v-if="project.github"
            :class="['vie-cta', project.download || project.demo ? 'vie-cta--ghost' : 'vie-cta--primary']"
            :href="project.github"
            target="_blank"
            rel="noopener"
          >GitHub 仓库 <ArrowUpRight :size="16" aria-hidden="true" /></a>
        </div>
      </header>
      <ProjectNavigation :slug="slug" current="intro" />

      <div class="vie-project-layout">
        <ProjectToc :sections="tocSections" />
        <article class="vie-project-detail" :class="{ 'vie-project-detail--with-media': project.media?.length }">
          <section
            v-if="project.media?.length"
            class="vie-detail-section"
            aria-label="产品界面"
          >
            <ProjectMediaStrip :media="project.media" variant="strip" eager />
          </section>

          <section id="overview" class="vie-detail-section" tabindex="-1">
            <h2>项目概览</h2>
            <p class="vie-detail-summary">{{ project.description }}</p>
            <dl v-if="project.overview?.length" class="vie-facts">
              <div v-for="fact in project.overview" :key="fact.term">
                <dt>{{ fact.term }}</dt>
                <dd>{{ fact.text }}</dd>
              </div>
            </dl>
            <p v-else class="vie-empty">项目概览正在整理中。</p>
          </section>

          <section id="experience" class="vie-detail-section" tabindex="-1">
            <h2>产品体验</h2>
            <div v-if="project.flows?.length" class="vie-flows">
              <div v-for="flow in project.flows" :key="flow.title">
                <h3>{{ flow.title }}</h3>
                <ol role="list">
                  <li v-for="step in flow.steps" :key="step">{{ step }}</li>
                </ol>
              </div>
            </div>
            <p v-else class="vie-empty">产品体验正在整理中。</p>
          </section>

          <section id="capabilities" class="vie-detail-section" tabindex="-1">
            <h2>核心能力</h2>
            <ProjectCapabilityList
              v-if="project.capabilities?.length"
              :capabilities="project.capabilities"
              show-images
            />
            <p v-else class="vie-empty">能力清单正在整理中。</p>
          </section>

          <section id="architecture" class="vie-detail-section" tabindex="-1">
            <h2>系统实现</h2>
            <p v-if="project.architecture" class="vie-detail-arch">{{ project.architecture }}</p>
            <p v-else class="vie-empty">系统实现正在整理中。</p>
            <div class="vie-chip-row">
              <span v-for="t in project.tags" :key="t" class="vie-chip vie-chip--accent">{{ t }}</span>
            </div>
          </section>

          <section id="validation" class="vie-detail-section" tabindex="-1">
            <h2>验证与结果</h2>
            <ul v-if="project.validation?.length" class="vie-validation">
              <li v-for="item in project.validation" :key="item">{{ item }}</li>
            </ul>
            <p v-else class="vie-empty">验证记录正在整理中。</p>
          </section>

          <footer class="vie-project-end">
            <div>
              <h2>开发日志</h2>
              <p v-if="latest">最近更新于 <time :datetime="latest.date">{{ latest.date }}</time>，共 {{ project.log?.length }} 篇</p>
            </div>
            <a class="vie-cta vie-cta--primary" :href="projectLogPath(slug)">阅读开发日志 <ArrowRight :size="17" aria-hidden="true" /></a>
          </footer>
        </article>
      </div>
    </template>
  </div>
</template>
