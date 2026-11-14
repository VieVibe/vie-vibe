---
title: 阳光明媚
layout: page
standaloneProject: true
description: 阳光明媚是一款面向个人与创作者的在线相册。保留原始照片，用 16 种画面风格与 10 种观看编排设计展览，支持版本管理、访问保护与工作区协作。
image: /images/projects/gallery-coast.webp
aside: false
lastUpdated: false
head:
  - - link
    - rel: stylesheet
      href: https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700&display=swap
jsonLd:
  '@context': https://schema.org
  '@type': SoftwareApplication
  name: 阳光明媚
  applicationCategory: MultimediaApplication
  operatingSystem: Web
  url: https://vie-vibe.cn/projects/vie-gallery
  image: https://vie-vibe.cn/images/projects/gallery-coast.webp
  description: 阳光明媚是一款面向个人与创作者的在线相册。保留原始照片，用 16 种画面风格与 10 种观看编排设计展览，支持版本管理、访问保护与工作区协作。
---

<script setup>
import GalleryProduct from '../.vitepress/theme/components/products/GalleryProduct.vue'

const sections = [
  { href: '#experience', label: '观看展览' },
  { href: '#architecture', label: '创作与发布' },
]
</script>

<ProjectDetail slug="vie-gallery" :sections="sections" :view="GalleryProduct" />
