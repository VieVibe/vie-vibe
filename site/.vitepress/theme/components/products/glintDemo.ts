const apps = [
  { name: '微信', aliases: ['weixin', 'wx', 'wechat'] },
  { name: '计算器', aliases: ['jisuanqi', 'jsq', 'calculator', 'calc'] },
  { name: '记事本', aliases: ['jishiben', 'jsb', 'notepad'] },
  { name: '文件资源管理器', aliases: ['wenjian', 'wj', 'explorer'] },
]

export function searchDemoApps(query: string) {
  const term = query.trim().toLowerCase()
  return apps.filter((app) => [app.name, ...app.aliases].some((alias) => alias.startsWith(term)))
}
