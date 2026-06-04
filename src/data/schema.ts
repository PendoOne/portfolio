export type WorkCategory = 'video' | 'motion' | 'dev'

export interface WorkLink {
  label: string
  url: string
}

export interface WorkItem {
  id: string
  title: string
  category: WorkCategory
  tags: string[]
  description: string
  year: number
  featured: boolean

  // 视频 / 动效类
  videoSrc?: string
  posterSrc?: string
  vertical?: boolean   // 竖屏视频

  // 开发类
  thumbnail?: string
  links?: WorkLink[]
}

export const categoryLabels: Record<WorkCategory, string> = {
  video: '视频作品',
  motion: '动效作品',
  dev: 'AI 产品',
}
