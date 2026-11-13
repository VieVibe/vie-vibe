import { projectsSource } from '../../projects.source'

export default {
  paths() {
    return projectsSource.flatMap((project) => project.slug ? [{
      params: { slug: project.slug },
      content: [
        '---',
        `title: ${JSON.stringify(`${project.name} 开发日志`)}`,
        `description: ${JSON.stringify(`按时间阅读 ${project.name} 的功能更新、修复、技术决策与里程碑。`)}`,
        ...(project.image ? [`image: ${JSON.stringify(project.image)}`] : []),
        'aside: false',
        'lastUpdated: false',
        '---',
      ].join('\n'),
    }] : [])
  },
}
