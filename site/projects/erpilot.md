---
title: Erpilot
layout: page
description: 会请示的 ERP 智能体，支持版本化订单草稿、LangGraph 持久化审批、幂等对账、政策证据与只读补货建议，附真实模型验收结果。
image: /images/projects/erpilot-approval.webp
aside: false
lastUpdated: false
jsonLd:
  '@context': https://schema.org
  '@type': SoftwareApplication
  name: Erpilot
  applicationCategory: DeveloperApplication
  operatingSystem: Web
  url: https://vie-vibe.cn/projects/erpilot
  description: 会请示的 ERP 智能体，支持版本化订单草稿、LangGraph 持久化审批、幂等对账、政策证据与只读补货建议，附真实模型验收结果。
---

<script setup>
import ErpilotProduct from '../.vitepress/theme/components/products/ErpilotProduct.vue'
</script>

<ProjectDetail slug="erpilot" feature="审批流程" :view="ErpilotProduct" />
