<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { LogEntryType, ProjectLogEntry } from '../../../projects.source'
import { logAnchorId } from './logAnchor'

interface TocSection {
  id: string
  label: string
}

const props = defineProps<{
  sections?: TocSection[]
  entries?: ProjectLogEntry[]
  filter?: LogEntryType | 'all'
}>()
const emit = defineEmits<{ 'select-log': [] }>()
const mobileMenu = ref<HTMLDetailsElement>()

async function navigate(event: MouseEvent, id: string) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (mobileMenu.value) mobileMenu.value.open = false
  if (props.entries) emit('select-log')
  // A filtered entry may only get a layout box after the filter resets.
  event.preventDefault()
  await nextTick()
  const target = document.getElementById(id)
  if (!target) return
  if (location.hash !== `#${id}`) history.pushState({}, '', `#${id}`)
  target.focus({ preventScroll: true })
  target.scrollIntoView({ behavior: 'instant', block: 'start' })
  queueMeasure()
}

const items = computed(() => {
  const entries = props.entries ?? []
  return props.sections ?? entries.map((e, i) => ({
    id: logAnchorId(entries.length, i),
    label: e.title,
  }))
})
const activeId = ref(items.value[0]?.id ?? '')
const label = computed(() => props.entries ? '日志索引' : '本页目录')

let rafId = 0

const measure = () => {
  rafId = 0
  const targets = items.value.map(({ id }) => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el?.getClientRects().length))
  if (!targets.length) return
  // A section owns the highlight while its heading sits near the viewport
  // top. The page tail (last log entry + footer) is too short to ever reach
  // that band, so hand the highlight to the last anchor at max scroll.
  const doc = document.documentElement
  if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
    activeId.value = targets[targets.length - 1].id
    return
  }
  let current = targets[0]
  for (const target of targets) {
    if (target.getBoundingClientRect().top > 180) break
    current = target
  }
  activeId.value = current.id
}

const queueMeasure = () => {
  if (!rafId) rafId = requestAnimationFrame(measure)
}

watch(() => [props.filter, props.entries], () => nextTick(queueMeasure))

onMounted(() => {
  measure()
  window.addEventListener('scroll', queueMeasure, { passive: true })
  window.addEventListener('resize', queueMeasure, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', queueMeasure)
  window.removeEventListener('resize', queueMeasure)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <nav class="vp-raw vie-detail-toc" :class="{ 'vie-detail-toc--log': entries }" :aria-label="label">
    <details ref="mobileMenu" class="vie-toc-mobile">
      <summary>{{ label }}</summary>
      <ul class="vie-toc-list" role="list">
        <li v-for="item in items" :key="item.id">
          <a
            :href="'#' + item.id"
            class="vie-toc-link"
            :aria-current="activeId === item.id ? 'location' : undefined"
            @click="navigate($event, item.id)"
          >{{ item.label }}</a>
        </li>
      </ul>
    </details>
    <div class="vie-toc-desktop">
      <p class="vie-detail-toc__label">{{ label }}</p>
      <ul class="vie-toc-list" role="list">
        <li v-for="item in items" :key="item.id">
          <a
            :href="'#' + item.id"
            class="vie-toc-link"
            :aria-current="activeId === item.id ? 'location' : undefined"
            @click="navigate($event, item.id)"
          >{{ item.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
