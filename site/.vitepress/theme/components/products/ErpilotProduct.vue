<script setup lang="ts">
import { ArrowDown, ArrowRight, ArrowUpRight, ClipboardCheck, Database, FileText, ShieldCheck } from '@lucide/vue'
import { computed, ref } from 'vue'
import type { Project } from '../../../../projects.source'

defineProps<{ project: Project }>()

const steps = [
  { title: '准备草稿', icon: FileText, status: '草稿 v2', description: '核对客户、商品、报价和预算，保存可编辑的订单草稿。保存时库存保持原状。' },
  { title: '人工审批', icon: ClipboardCheck, status: '等待人工批准', description: '审批绑定指定草稿版本。审批人可核对金额、商品明细和库存影响，再决定批准或拒绝。' },
  { title: '执行与对账', icon: Database, status: '已建单 · 待付款', description: '批准后在事务内复核版本、价格和库存。结果不明时，系统用同一个幂等键核对订单是否已写入。' },
]
const current = ref(0)
const step = computed(() => steps[current.value])
</script>

<template>
  <header id="overview" class="erp-hero">
    <div class="product-wrap erp-hero__grid">
      <div class="erp-hero__copy">
        <h1>会请示的<br />ERP 智能体</h1>
        <p>把一句下单需求变成可核对的订单草稿。人工批准指定版本后，Erpilot 才提交订单并扣减库存。</p>
        <div class="product-actions">
          <a class="product-button" href="#experience">体验审批流程 <ArrowDown :size="17" aria-hidden="true" /></a>
          <a class="product-text-link" :href="project.github + '/blob/main/docs/demo-guide.md'" target="_blank" rel="noopener noreferrer">本地演示指南 <ArrowUpRight :size="15" aria-hidden="true" /></a>
        </div>
      </div>
      <figure class="erp-hero__figure">
        <a class="product-image-link" href="/images/projects/erpilot-approval.webp" target="_blank" rel="noopener noreferrer" aria-label="打开 Erpilot 真实工作台截图">
          <img src="/images/projects/erpilot-approval.webp" width="1193" height="825" alt="Erpilot 工作台右侧展示待审批的订单草稿版本 2，左侧会话暂停并等待人工确认" fetchpriority="high" />
        </a>
        <figcaption><span>Erpilot 工作台</span><span>本地离线演示截图</span></figcaption>
      </figure>
    </div>
  </header>

  <section id="experience" class="erp-flow product-section">
    <div class="product-wrap">
      <div class="product-section-intro">
        <h2>从一句需求到一张订单</h2>
        <p>用本地演示中的同一份草稿，查看每一步能核对什么。</p>
      </div>
      <div class="erp-flow__grid">
        <div class="erp-flow__steps" role="group" aria-label="订单流程步骤">
          <button v-for="(item, index) in steps" :key="item.title" type="button" :aria-pressed="index === current" aria-controls="erp-flow-preview" @click="current = index">
            <component :is="item.icon" :size="21" aria-hidden="true" /><span>{{ item.title }}</span><ArrowRight :size="17" aria-hidden="true" />
          </button>
        </div>
        <div id="erp-flow-preview" class="erp-flow__preview" data-ui aria-live="polite">
          <div class="erp-order__head"><strong>演示客户的订单</strong><span>{{ step.status }}</span></div>
          <dl class="erp-order__lines">
            <div><dt>青瓷茶具 <span>A1001</span></dt><dd>10 件</dd></div>
            <div><dt>宣纸礼盒 <span>B2001</span></dt><dd>50 件</dd></div>
            <div><dt>订单金额</dt><dd><strong>¥3,355.00</strong></dd></div>
          </dl>
          <p><ShieldCheck :size="20" aria-hidden="true" />{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="capabilities" class="product-wrap product-section erp-evidence">
    <div class="product-section-intro">
      <h2>结论有出处，建议有依据</h2>
      <p>除了处理订单，Erpilot 还可以查政策和分析补货。两种查询都把计算或引用的依据留给人核对。</p>
    </div>
    <div class="erp-evidence__grid">
      <article>
        <a class="product-image-link" href="/images/projects/erpilot-evidence.webp" target="_blank" rel="noopener noreferrer" aria-label="打开政策证据截图">
          <img src="/images/projects/erpilot-evidence.webp" width="702" height="509" alt="政策证据卡包含原文、来源与版本信息" loading="lazy" decoding="async" />
        </a>
        <h3>引用有效政策</h3>
        <p>展示适用条款、来源和版本。证据不足时，明确说明缺口。</p>
      </article>
      <article>
        <a class="product-image-link" href="/images/projects/erpilot-replenishment.webp" target="_blank" rel="noopener noreferrer" aria-label="打开补货建议截图">
          <img src="/images/projects/erpilot-replenishment.webp" width="702" height="595" alt="补货建议展示当前库存、销量、覆盖天数和建议补货量" loading="lazy" decoding="async" />
        </a>
        <h3>先算清楚再补货</h3>
        <p>结合销量、库存和采购周期给出只读建议，由人决定后续采购。</p>
      </article>
    </div>
  </section>

  <section id="architecture" class="erp-close product-section">
    <div id="validation" class="product-wrap product-close">
      <div class="product-section-intro">
        <h2>在本机跑一遍</h2>
        <p>离线演示用脚本模型和临时数据，经过实际的 API、LangGraph、MCP 与 ERP 业务事务。无需模型密钥。</p>
      </div>
      <div class="product-actions">
        <a class="product-button" :href="project.github + '/blob/main/docs/demo-guide.md'" target="_blank" rel="noopener noreferrer">打开演示指南 <ArrowUpRight :size="16" aria-hidden="true" /></a>
        <a class="product-text-link" :href="project.github" target="_blank" rel="noopener noreferrer">GitHub 源码 <ArrowUpRight :size="15" aria-hidden="true" /></a>
      </div>
    </div>
  </section>
</template>
