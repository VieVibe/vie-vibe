<script setup lang="ts">
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Images, LockKeyhole, PanelsTopLeft } from '@lucide/vue'
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
function stepPhoto(step: number) {
  active.value = (active.value + step + photos.length) % photos.length
}
</script>

<template>
  <header id="overview" class="gallery-hero">
    <img class="gallery-hero__photo" src="/images/projects/gallery-coast.webp" alt="" width="1280" height="720" fetchpriority="high" />
    <div class="product-wrap gallery-hero__content">
      <h1>把照片，<br />办成一场展览</h1>
      <p>阳光明媚是给个人和创作者的在线相册。整理原片，设计观看方式，再邀请别人走进你的展厅。</p>
      <div class="product-actions">
        <a class="product-button" :href="project.demo" target="_blank" rel="noopener noreferrer">进入阳光明媚 <ArrowUpRight :size="17" aria-hidden="true" /></a>
        <a class="product-button product-button--secondary" href="#experience">预览展览 <ArrowDown :size="17" aria-hidden="true" /></a>
      </div>
      <span class="gallery-hero__caption">《山海之间》 / 海岸来信</span>
    </div>
  </header>

  <section id="experience" class="gallery-exhibit product-section">
    <div class="product-wrap">
      <div class="product-section-intro gallery-exhibit__intro">
        <h2>在照片之间漫游</h2>
        <p>先翻看《山海之间》的作品。进入产品后，同一组照片还可以用环幕、螺旋和翻页画册等 10 种编排呈现。</p>
      </div>
      <figure class="gallery-exhibit__frame" aria-label="山海之间展览预览">
        <img :key="photo.src" :src="'/images/projects/' + photo.src" :alt="photo.alt" width="1280" height="720" loading="lazy" decoding="async" />
        <figcaption>
          <p aria-live="polite"><span>山海之间</span><strong>{{ photo.title }}</strong></p>
          <div class="gallery-exhibit__controls">
            <span aria-hidden="true">{{ active + 1 }} / {{ photos.length }}</span>
            <button type="button" aria-label="上一幅作品" @click="stepPhoto(-1)"><ArrowLeft :size="20" aria-hidden="true" /></button>
            <button type="button" aria-label="下一幅作品" @click="stepPhoto(1)"><ArrowRight :size="20" aria-hidden="true" /></button>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>

  <section id="capabilities" class="product-wrap product-section gallery-style">
    <div class="product-section-intro">
      <h2>为同一张照片<br />选一种表达</h2>
      <p>16 种画面风格，从琥珀胶片到月光银盐。每种效果都能调节强度，原图独立保存。</p>
    </div>
    <a class="product-image-link" href="/images/projects/vie-gallery-20261016-photo-effects.webp" target="_blank" rel="noopener noreferrer" aria-label="打开完整的 16 种风格对照图">
      <img src="/images/projects/vie-gallery-20261016-photo-effects.webp" alt="同一张海岸照片的 16 种实机渲染对照" width="1400" height="1152" loading="lazy" decoding="async" />
    </a>
  </section>

  <section id="architecture" class="gallery-workspace product-section">
    <div class="product-wrap">
      <div class="product-section-intro">
        <h2>从工作区到展厅</h2>
        <p>在同一个工作区整理作品、预览草稿、发布并管理访问权限。</p>
      </div>
      <a class="product-image-link" href="/images/projects/vie-gallery-20261017-workspace.webp" target="_blank" rel="noopener noreferrer" aria-label="打开创作者工作区截图">
        <img src="/images/projects/vie-gallery-20261017-workspace.webp" alt="创作者工作区中的照片整理、展示设计和发布分享入口" width="1270" height="714" loading="lazy" decoding="async" />
      </a>
      <ol class="product-feature-list">
        <li><Images aria-hidden="true" /><h3>整理作品</h3><p>上传原片、拖拽排序、选封面，邀请成员一起整理。</p></li>
        <li><PanelsTopLeft aria-hidden="true" /><h3>布置展览</h3><p>选画面风格与观看编排，满意后再把草稿发布。</p></li>
        <li><LockKeyhole aria-hidden="true" /><h3>邀请访客</h3><p>通过链接分享，按需设置密码、有效期和下载权限，也可恢复历史版本。</p></li>
      </ol>
    </div>
  </section>

  <section id="validation" class="product-section product-wrap product-close gallery-close">
    <div class="product-section-intro">
      <h2>把你的作品挂上墙</h2>
      <p>创建一个展览空间，从第一张照片开始。</p>
    </div>
    <div class="product-actions">
      <a class="product-button" :href="project.demo" target="_blank" rel="noopener noreferrer">打开创作工作区 <ArrowUpRight :size="17" aria-hidden="true" /></a>
      <a class="product-text-link" :href="project.github" target="_blank" rel="noopener noreferrer">GitHub 源码 <ArrowUpRight :size="15" aria-hidden="true" /></a>
    </div>
  </section>
</template>
