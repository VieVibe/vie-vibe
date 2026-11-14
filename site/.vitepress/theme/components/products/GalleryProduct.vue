<script setup lang="ts">
import { ArrowDown, ArrowLeft, ArrowRight } from '@lucide/vue'
import { computed, ref } from 'vue'
import type { Project } from '../../../../projects.source'

defineProps<{ project: Project }>()

const photos = [
  { src: 'gallery-coast.webp', title: '海岸来信', alt: '浪花拍打草坡下的海岸悬崖' },
  { src: 'gallery-forest.webp', title: '林间薄雾', alt: '薄雾漫过山谷里的树梢' },
  { src: 'gallery-lake.webp', title: '湖面微光', alt: '晨光照亮湖边的木栈桥' },
]
const active = ref(1)
const photo = computed(() => photos[active.value])
const viewerImage = '/images/projects/vie-gallery-20261017-viewer.webp'
function stepPhoto(step: number) {
  active.value = (active.value + step + photos.length) % photos.length
}
</script>

<template>
  <header id="overview" class="gallery-hero" tabindex="-1">
    <img class="gallery-hero__photo" src="/images/projects/gallery-coast.webp" alt="浪花拍打草坡下的海岸悬崖" width="1280" height="720" fetchpriority="high" />
    <div class="product-wrap gallery-hero__content">
      <h1>把照片，<br />办成一场展览</h1>
      <p>整理原片、布置展厅，再邀请别人走进你的在线相册。</p>
      <div class="product-actions">
        <a class="product-button" :href="project.demo" target="_blank" rel="noopener noreferrer">进入阳光明媚</a>
        <a class="product-text-link vp-raw" href="#experience">先看一组作品 <ArrowDown :size="16" aria-hidden="true" /></a>
      </div>
      <p class="gallery-hero__caption">《山海之间》 · 海岸来信</p>
    </div>
  </header>

  <section id="experience" class="gallery-exhibit product-section" tabindex="-1">
    <div class="product-wrap gallery-exhibit__grid">
      <div class="product-section-intro gallery-exhibit__intro">
        <h2>在照片之间漫游</h2>
        <p>翻看《山海之间》的三幅示例作品。展厅有 10&nbsp;种观看编排，包括环幕、螺旋和翻页画册。</p>
        <a class="product-text-link" :href="viewerImage" target="_blank" rel="noopener noreferrer">查看展厅截图</a>
      </div>
      <figure
        class="gallery-exhibit__frame"
        aria-label="山海之间展览预览"
        @keydown.left.prevent="stepPhoto(-1)"
        @keydown.right.prevent="stepPhoto(1)"
      >
        <img :key="photo.src" :src="'/images/projects/' + photo.src" :alt="photo.alt" width="1280" height="720" loading="lazy" decoding="async" />
        <figcaption>
          <p aria-live="polite"><span>{{ active + 1 }} / {{ photos.length }}</span><strong>{{ photo.title }}</strong></p>
          <div class="gallery-exhibit__controls">
            <button type="button" aria-label="上一幅作品" @click="stepPhoto(-1)"><ArrowLeft :size="20" aria-hidden="true" /></button>
            <button type="button" aria-label="下一幅作品" @click="stepPhoto(1)"><ArrowRight :size="20" aria-hidden="true" /></button>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>

  <section id="capabilities" class="product-section gallery-style">
    <div class="product-wrap gallery-style__grid">
      <div class="product-section-intro">
        <h2>同一张照片，<br />不同的展览气氛</h2>
        <p>从琥珀胶片到月光银盐，16 种画面风格都可以调节强度。原片独立保存，随时可以换一种表达。</p>
      </div>
      <figure>
        <a class="product-image-link" href="/images/projects/vie-gallery-20261016-photo-effects.webp" target="_blank" rel="noopener noreferrer" aria-label="放大查看 16 种画面风格对照图">
          <img src="/images/projects/vie-gallery-20261016-photo-effects.webp" alt="同一张海岸照片的 16 种实机渲染对照" width="1400" height="1152" loading="lazy" decoding="async" />
        </a>
      </figure>
    </div>
  </section>

  <section id="architecture" class="gallery-workspace product-section" tabindex="-1">
    <div class="product-wrap">
      <div class="product-section-intro">
        <h2>在工作区布置你的展厅</h2>
        <p>选封面、排顺序、设定观看方式。满意后再发布，用密码、有效期和下载权限决定作品如何分享。</p>
      </div>
      <figure>
        <a class="product-image-link" href="/images/projects/vie-gallery-20261017-workspace.webp" target="_blank" rel="noopener noreferrer" aria-label="放大查看创作工作区">
          <img src="/images/projects/vie-gallery-20261017-workspace.webp" alt="创作工作区中的照片整理、展厅预览和发布分享入口" width="1270" height="714" loading="lazy" decoding="async" />
        </a>
        <figcaption>创作工作区 / 山海之间</figcaption>
      </figure>
    </div>
  </section>

  <section id="validation" class="product-close">
    <div class="product-wrap product-close__inner">
      <h2>从第一张照片开始</h2>
      <a class="product-button" :href="project.demo" target="_blank" rel="noopener noreferrer">打开创作工作区</a>
    </div>
  </section>
</template>
