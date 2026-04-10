import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

// 建议移除 force-static，让 Next.js 根据内容自动判断，或者保持 static 但确保路径完全正确
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl.endsWith('/')
    ? siteMetadata.siteUrl.slice(0, -1)
    : siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      // 确保 path 前面有斜杠，且 siteUrl 后面没斜杠
      url: `${siteUrl}/${post.path.replace(/^\//, '')}`,
      // 使用完整的 Date 对象，Next.js 会自动转为标准 ISO 格式
      lastModified: new Date(post.lastmod || post.date),
      changeFrequency: 'weekly' as const, // 建议显式声明，对 GSC 更友好
      priority: 0.8,
    }))

  const routes = ['', 'about', 'privacy', 'contact', 'terms', 'blog', 'projects', 'tags'].map(
    (route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1.0 : 0.6,
    })
  )

  return [...routes, ...blogRoutes]
}
