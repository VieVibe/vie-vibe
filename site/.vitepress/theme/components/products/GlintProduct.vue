<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Calculator, Download, FileText, FolderOpen, MessageCircle, Pin, Search } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import type { Project } from '../../../../projects.source'
import { searchDemoApps } from './glintDemo'

defineProps<{ project: Project }>()

const icons = { 微信: MessageCircle, 计算器: Calculator, 记事本: FileText, 文件资源管理器: FolderOpen }
const query = ref('wx')
const selected = ref(0)
const launched = ref('')
const showSource = ref(false)
const results = computed(() => searchDemoApps(query.value))
watch(query, () => { selected.value = 0; launched.value = '' })

function move(step: number) {
  const count = results.value.length
  if (count) selected.value = (selected.value + step + count) % count
}

function launch(index = selected.value) {
  const app = results.value[index]
  if (app) {
    selected.value = index
    launched.value = app.name
  }
}

function handleSearchKey(event: KeyboardEvent) {
  if (event.isComposing || event.keyCode === 229) return
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault()
    move(event.key === 'ArrowUp' ? -1 : 1)
  }
  if (event.key === 'Enter') launch()
  if (event.key === 'Escape') query.value = ''
}
</script>

<template>
  <header id="overview" class="glint-hero">
    <div class="product-wrap glint-hero__grid">
      <div class="glint-hero__copy">
        <h1>按键即达<span>。</span></h1>
        <p>轻启 Glint 是给 Windows 的键盘启动器。用中文或拼音打开应用，在资源管理器里用空格预览文件。</p>
        <div class="product-actions">
          <a class="product-button" :href="project.download"><Download :size="18" aria-hidden="true" />下载 Windows x64 版</a>
          <a class="product-text-link" :href="project.github" target="_blank" rel="noopener noreferrer">GitHub 源码 <ArrowUpRight :size="16" aria-hidden="true" /></a>
        </div>
        <p class="glint-platform">Windows 10（2004）及以上 · 便携版 · MIT</p>
      </div>

      <div id="experience" class="glint-stage">
        <div class="glint-stage__keys" aria-label="Alt 加空格唤出"><kbd>Alt</kbd><span>+</span><kbd>Space</kbd></div>
        <div class="glint-launcher" data-ui aria-label="Glint 网页搜索演示">
          <div class="glint-launcher__input">
            <Search :size="23" aria-hidden="true" />
            <input
              v-model="query"
              aria-label="搜索示例应用"
              placeholder="搜索应用…"
              autocomplete="off"
              spellcheck="false"
              @keydown="handleSearchKey"
            />
            <img src="/images/projects/glint-icon.webp" alt="" width="24" height="24" />
          </div>
          <ul v-if="results.length" class="glint-launcher__results">
            <li v-for="(app, index) in results" :key="app.name">
              <button type="button" :class="{ 'is-selected': index === selected }" :aria-label="'模拟打开' + app.name" @click="launch(index)">
                <span class="glint-app-icon"><component :is="icons[app.name as keyof typeof icons]" :size="18" aria-hidden="true" /></span>
                <strong>{{ app.name }}</strong>
                <kbd v-if="index === selected" aria-hidden="true">Enter</kbd>
              </button>
            </li>
          </ul>
          <p v-else class="glint-launcher__empty">没有找到示例应用。</p>
          <div class="glint-launcher__footer" role="status">
            <template v-if="launched">模拟启动：{{ launched }}</template>
            <template v-else>网页演示 · 使用预置应用<span v-if="results[selected]" class="glint-announcement">。当前选中{{ results[selected].name }}。</span></template>
          </div>
        </div>
        <div class="glint-stage__examples" aria-label="试试不同的搜索词">
          <span>试着输入</span>
          <button v-for="example in ['微信', 'weixin', 'wx']" :key="example" type="button" :aria-pressed="query === example" @click="query = example">{{ example }}</button>
        </div>
      </div>
    </div>
  </header>

  <section id="capabilities" class="glint-preview product-section">
    <div class="product-wrap glint-preview__grid">
      <div class="product-section-intro">
        <h2>选中文件，<br />空格预览</h2>
        <p>在资源管理器或桌面按 <kbd>Space</kbd>，直接看图片、视频、PDF、Markdown 和源码。再按空格收起，按 Enter 用默认应用打开。</p>
        <p class="product-note">Office 文件支持文字预览。</p>
      </div>
      <figure class="glint-preview__window" data-ui aria-label="Markdown 快速预览示意">
        <figcaption><FileText :size="17" aria-hidden="true" /><strong>README.md</strong><span>Markdown 预览示意</span></figcaption>
        <div class="glint-preview__views" role="group" aria-label="Markdown 视图">
          <button type="button" :aria-pressed="!showSource" aria-controls="glint-preview-body" @click="showSource = false">排版</button>
          <button type="button" :aria-pressed="showSource" aria-controls="glint-preview-body" @click="showSource = true">源码</button>
        </div>
        <div id="glint-preview-body" class="glint-preview__paper" aria-live="polite">
          <pre v-if="showSource"><code># 轻启 Glint

Windows 应用搜索与文件预览

- Alt+Space 搜索应用
- Space 快速预览文件
- Ctrl+M 切换 Markdown 排版与源码</code></pre>
          <template v-else>
            <img src="/images/projects/glint-icon.webp" alt="" width="48" height="48" loading="lazy" />
            <strong>轻启 Glint</strong>
            <p>Windows 应用搜索与文件预览</p>
            <ul>
              <li><kbd>Alt</kbd> + <kbd>Space</kbd> 搜索应用</li>
              <li><kbd>Space</kbd> 快速预览文件</li>
              <li><kbd>Ctrl</kbd> + <kbd>M</kbd> 切换 Markdown 排版与源码</li>
            </ul>
          </template>
        </div>
      </figure>
    </div>
  </section>

  <section id="architecture" class="product-wrap product-section glint-shortcuts">
    <div class="product-section-intro">
      <h2>常用应用，顺手就到</h2>
      <p>搜索支持英文、中文、全拼和首字母。固定、别名和使用次数都保存在本机。</p>
    </div>
    <dl class="glint-keymap">
      <div><dt><kbd>Ctrl</kbd> <kbd>D</kbd></dt><dd><Pin :size="18" aria-hidden="true" /><span>固定或取消固定应用</span></dd></div>
      <div><dt><kbd>Ctrl</kbd> <kbd>E</kbd></dt><dd><FileText :size="18" aria-hidden="true" /><span>编辑自定义搜索别名</span></dd></div>
      <div><dt><kbd>Alt</kbd> <kbd>1–8</kbd></dt><dd><ArrowRight :size="18" aria-hidden="true" /><span>直接启动对应结果</span></dd></div>
    </dl>
  </section>

  <section id="validation" class="glint-close product-section">
    <div class="product-wrap product-close">
      <div class="product-section-intro">
        <h2>解压，即可使用</h2>
        <p>完整解压 ZIP 后运行 <code>Glint.exe</code>。便携版自带 .NET 运行时，移动时请保留整个文件夹。</p>
      </div>
      <div class="product-actions">
        <a class="product-button" :href="project.download"><Download :size="18" aria-hidden="true" />下载便携版</a>
        <a class="product-text-link" :href="project.github + '/releases'" target="_blank" rel="noopener noreferrer">查看版本记录 <ArrowUpRight :size="15" aria-hidden="true" /></a>
      </div>
    </div>
  </section>
</template>
