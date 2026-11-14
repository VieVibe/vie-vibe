<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Project } from '../../../../projects.source'

defineProps<{ project: Project }>()

const steps = [
  { title: '准备草稿', state: 'draft', status: '草稿 v2', description: '保存带版本的订单草稿。核对客户、商品、数量和报价后，可以送交人工审批。', inventory: '库存保持不变' },
  { title: '等待审批', state: 'pending', status: '待人工批准', description: '审批绑定草稿 v2。审批人核对商品、金额和库存影响后，可以批准或拒绝。', inventory: '库存保持不变' },
  { title: '批准并执行', state: 'approved', status: '已建单 · 待付款', description: '批准后再次核对版本、价格和库存，提交一张订单。结果不明时，先查询业务记录。', inventory: '库存扣减青瓷茶具 10 件、宣纸礼盒 50 件' },
  { title: '拒绝', state: 'rejected', status: '已拒绝', description: '本次提交结束，草稿仍可修改。核对完毕后，可以重新发起审批。', inventory: '库存保持不变' },
]
const current = ref(0)
const step = computed(() => steps[current.value])
const approvalImage = '/images/projects/erpilot-approval.webp'
const orderTotal = '¥3,355.00'
</script>

<template>
  <header id="overview" class="erp-hero" tabindex="-1">
    <div class="product-wrap erp-hero__grid">
      <div class="erp-hero__copy">
        <h1>订单提交前，<br />让人先确认</h1>
        <p>Erpilot 将下单需求整理成订单草稿。审批人核对商品、报价和库存影响，批准后才提交。</p>
        <div class="product-actions">
          <a class="product-button vp-raw" href="#experience">走一遍审批流程</a>
          <a class="product-text-link" :href="project.github + '/blob/main/docs/demo-guide.md'" target="_blank" rel="noopener noreferrer">本地演示指南</a>
        </div>
      </div>
      <figure class="erp-hero__figure">
        <a class="product-image-link" :href="approvalImage" target="_blank" rel="noopener noreferrer" aria-label="放大查看 Erpilot 审批工作台">
          <img :src="approvalImage" width="1193" height="825" alt="Erpilot 会话停在待审批状态，业务面板显示草稿版本 2、商品、金额和审批入口" fetchpriority="high" />
        </a>
        <figcaption>
          <span class="erp-hero__receipt">
            <strong>{{ orderTotal }}</strong>
            <span>草稿 v2 · 等待人工批准</span>
          </span>
          <span>Erpilot 工作台 / 本地演示</span>
        </figcaption>
      </figure>
    </div>
  </header>

  <section id="experience" class="erp-flow product-section" tabindex="-1">
    <div class="product-wrap">
      <div class="product-section-intro">
        <h2>同一份草稿，四种状态</h2>
        <p>切换示例订单的状态，看看哪一步需要确认，什么时候会扣减库存。</p>
      </div>
      <div class="erp-flow__steps" role="group" aria-label="订单审批状态">
        <button v-for="(item, index) in steps" :key="item.state" type="button" :aria-pressed="index === current" aria-controls="erp-flow-preview" @click="current = index">
          {{ item.title }}
        </button>
      </div>
      <div id="erp-flow-preview" class="erp-flow__preview" :data-state="step.state" data-ui aria-live="polite">
        <div>
          <div class="erp-order__head"><h3>演示客户的订单</h3><span>{{ step.status }}</span></div>
          <dl class="erp-order__lines">
            <div><dt>青瓷茶具 <span>A1001</span></dt><dd>10 件</dd></div>
            <div><dt>宣纸礼盒 <span>B2001</span></dt><dd>50 件</dd></div>
            <div><dt>订单金额</dt><dd><strong>{{ orderTotal }}</strong></dd></div>
          </dl>
        </div>
        <div class="erp-order__note">
          <p>{{ step.description }}</p>
          <p><strong>{{ step.inventory }}</strong></p>
        </div>
      </div>
    </div>
  </section>

  <section id="capabilities" class="product-section erp-evidence" tabindex="-1">
    <div class="product-wrap">
      <div class="product-section-intro">
        <h2>每个答案都能核对</h2>
        <p>查政策时回到原文。看补货建议时保留计算依据。</p>
      </div>
      <div class="erp-evidence__grid">
        <figure>
          <a class="product-image-link" href="/images/projects/erpilot-evidence.webp" target="_blank" rel="noopener noreferrer" aria-label="放大查看政策证据截图">
            <img src="/images/projects/erpilot-evidence.webp" width="702" height="509" alt="政策证据卡展示适用条款、来源、版本和原文" loading="lazy" decoding="async" />
          </a>
          <figcaption><h3>政策原文</h3><p>查看适用条款、来源和版本。证据不足时，页面会指出缺口。</p></figcaption>
        </figure>
        <figure>
          <a class="product-image-link" href="/images/projects/erpilot-replenishment.webp" target="_blank" rel="noopener noreferrer" aria-label="放大查看补货建议截图">
            <img src="/images/projects/erpilot-replenishment.webp" width="702" height="595" alt="补货建议展示库存、销量、覆盖天数和建议补货量" loading="lazy" decoding="async" />
          </a>
          <figcaption><h3>补货建议</h3><p>结合销量、库存和采购周期给出只读建议，由人决定后续采购。</p></figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section id="architecture" class="product-close">
    <div id="validation" class="product-wrap product-close__inner">
      <div class="product-section-intro">
        <h2>在本机跑一遍</h2>
        <p>用脚本模型和临时 ERP 数据走一遍真实的 API、LangGraph、MCP 和业务事务。无需模型密钥。</p>
      </div>
      <div class="product-actions">
        <a class="product-button" :href="project.github + '/blob/main/docs/demo-guide.md'" target="_blank" rel="noopener noreferrer">打开本地演示指南</a>
      </div>
    </div>
  </section>
</template>
