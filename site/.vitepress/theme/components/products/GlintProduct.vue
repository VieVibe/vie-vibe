<script setup lang="ts">
import { ArrowDown, ArrowUpRight, Calculator, FileText, FolderOpen, MessageCircle, Search } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import type { Project } from '../../../../projects.source'
import { searchDemoApps } from './glintDemo'

defineProps<{ project: Project }>()

const icons = { 微信: MessageCircle, 计算器: Calculator, 记事本: FileText, 文件资源管理器: FolderOpen }
const query = ref('jsb')
const selected = ref(0)
const launched = ref('')
const showSource = ref(false)
const previewImage = '/images/projects/glint-preview.webp'
const readme = {
  title: '轻启 Glint',
  intro: 'Windows 应用启动器与文件快速预览。',
  shortcuts: [
    'Alt+Space 搜索并打开应用',
    'Space 预览资源管理器中选中的文件',
    'Ctrl+M 切换 Markdown 排版与源码',
  ],
  note: '这份 README 用于演示文件预览。',
}
const readmeSource = [
  `# ${readme.title}`, '', readme.intro, '', '## 键盘操作', '',
  ...readme.shortcuts.map((shortcut) => `- ${shortcut}`), '', `> ${readme.note}`,
].join('\n')
const results = computed(() => searchDemoApps(query.value))
watch(query, () => { selected.value = 0; launched.value = '' })

function move(step: number) {
  const count = results.value.length
  if (count) {
    selected.value = (selected.value + step + count) % count
    launched.value = ''
  }
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
  <header id="overview" class="glint-hero" tabindex="-1">
    <div class="product-wrap glint-hero__stage">
      <div class="glint-hero__copy">
        <h1>应用随键而来</h1>
        <p>轻启是 Windows 上的应用启动器。输入中文、拼音或首字母，按回车打开应用。</p>
        <div class="product-actions">
          <a class="product-button" :href="project.download">下载 Windows x64 版</a>
          <a class="product-text-link vp-raw" href="#experience">试一次搜索 <ArrowDown :size="16" aria-hidden="true" /></a>
        </div>
      </div>
      <figure class="glint-hero__window">
        <img src="/images/projects/glint-launcher.webp" alt="轻启原生应用窗口中，输入 jsb 查到记事本" width="1152" height="612" fetchpriority="high" />
        <figcaption><span>Windows 原生窗口</span><span class="glint-hero__keys"><kbd>Alt</kbd> + <kbd>Space</kbd></span></figcaption>
      </figure>
    </div>
  </header>

  <section id="experience" class="product-section glint-search" tabindex="-1">
    <div class="product-wrap glint-search__grid">
      <div class="product-section-intro">
        <h2>用习惯的方式搜索</h2>
        <p>试试输入「记事本」或「jsb」。用方向键选择结果，按 Enter 模拟打开。</p>
      </div>
      <div class="glint-launcher" data-ui>
        <label for="glint-search-input">搜索示例应用</label>
        <div class="glint-launcher__input">
          <Search :size="21" aria-hidden="true" />
          <input
            id="glint-search-input"
            v-model="query"
            type="search"
            placeholder="输入应用名、拼音或首字母"
            autocomplete="off"
            spellcheck="false"
            @keydown="handleSearchKey"
          />
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
          <template v-else>网页演示使用预置应用<span v-if="results[selected]" class="glint-announcement">。当前选中{{ results[selected].name }}。</span></template>
        </div>
        <div class="glint-launcher__examples" role="group" aria-label="示例搜索词">
          <button v-for="example in ['微信', 'weixin', 'wx', 'calc']" :key="example" type="button" :aria-pressed="query === example" @click="query = example">{{ example }}</button>
        </div>
      </div>
      <dl id="architecture" class="glint-keymap" aria-label="Glint 快捷键">
        <div><dt><kbd>Alt</kbd> + <kbd>Space</kbd></dt><dd>唤出启动器</dd></div>
        <div><dt><kbd>Ctrl</kbd> + <kbd>D</kbd></dt><dd>固定或取消固定应用</dd></div>
        <div><dt><kbd>Ctrl</kbd> + <kbd>E</kbd></dt><dd>添加自己的搜索别名</dd></div>
        <div><dt><kbd>Alt</kbd> + <kbd>1–8</kbd></dt><dd>直接启动对应结果</dd></div>
      </dl>
    </div>
  </section>

  <section id="capabilities" class="glint-preview product-section" tabindex="-1">
    <div class="product-wrap glint-preview__grid">
      <div class="product-section-intro">
        <h2>选中文件，<br />按空格就能看</h2>
        <p>在资源管理器或桌面预览图片、视频、PDF、Markdown 和源码。Office 文件也可以查看文字内容。</p>
        <p>再按 <kbd>Space</kbd> 收起，按 <kbd>Enter</kbd> 用默认应用打开。</p>
      </div>
      <figure class="glint-preview__window" data-ui>
        <figcaption class="glint-preview__bar">
          <strong>README.md</strong>
          <div class="glint-preview__views" role="group" aria-label="Markdown 视图">
            <button type="button" :aria-pressed="!showSource" aria-controls="glint-preview-body" @click="showSource = false">排版</button>
            <button type="button" :aria-pressed="showSource" aria-controls="glint-preview-body" @click="showSource = true">源码</button>
          </div>
        </figcaption>
        <div id="glint-preview-body" class="glint-preview__paper" aria-live="polite">
          <pre v-if="showSource"><code>{{ readmeSource }}</code></pre>
          <template v-else>
            <a class="product-image-link" :href="previewImage" target="_blank" rel="noopener noreferrer" aria-label="放大查看 Glint 原生 Markdown 预览">
              <img :src="previewImage" alt="" width="1152" height="741" loading="lazy" decoding="async" />
            </a>
            <div class="visually-hidden">
              <p><strong>{{ readme.title }}</strong></p>
              <p>{{ readme.intro }}</p>
              <p><strong>键盘操作</strong></p>
              <ul><li v-for="shortcut in readme.shortcuts" :key="shortcut">{{ shortcut }}</li></ul>
              <p>{{ readme.note }}</p>
            </div>
          </template>
        </div>
      </figure>
    </div>
  </section>

  <section id="validation" class="product-close">
    <div class="product-wrap product-close__inner">
      <div class="product-section-intro">
        <h2>解压，即可使用</h2>
        <p>适用于 Windows 10 版本 2004 及以上。完整解压后运行 <code>Glint.exe</code>，便携包自带 .NET 运行时。</p>
      </div>
      <div class="product-actions">
        <a class="product-button" :href="project.download">下载便携版</a>
        <a class="product-text-link" :href="project.github + '/releases'" target="_blank" rel="noopener noreferrer">查看版本记录 <ArrowUpRight :size="15" aria-hidden="true" /></a>
      </div>
    </div>
  </section>
</template>
