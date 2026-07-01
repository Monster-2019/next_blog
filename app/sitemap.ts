import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import categoryData from './category-data.json'

export const dynamic = 'force-static'

const POSTS_PER_PAGE = 8

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl.endsWith('/')
    ? siteMetadata.siteUrl.slice(0, -1)
    : siteMetadata.siteUrl

  const publishedPosts = allBlogs.filter((post) => !post.draft)

  // 博客文章详情页
  const blogRoutes = publishedPosts.map((post) => ({
    url: `${siteUrl}/${post.path.replace(/^\//, '')}`,
    lastModified: new Date(post.lastmod || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 博客列表分页 /blog/page/2, /blog/page/3 ...
  const blogTotalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE)
  const blogPaginationRoutes = Array.from({ length: Math.max(0, blogTotalPages - 1) }, (_, i) => ({
    url: `${siteUrl}/blog/page/${i + 2}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }))

  // 分类首页 /categories/[slug]
  const categories = categoryData as Record<string, { name: string; count: number }>
  const categoryRoutes = Object.keys(categories).map((categorySlug) => ({
    url: `${siteUrl}/categories/${categorySlug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // 分类分页 /categories/[slug]/page/2, /categories/[slug]/page/3 ...
  const categoryPaginationRoutes = Object.entries(categories).flatMap(([categorySlug, data]) => {
    const totalPages = Math.ceil(data.count / POSTS_PER_PAGE)
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      url: `${siteUrl}/categories/${categorySlug}/page/${i + 2}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    }))
  })

  // 静态页面
  const routes = ['', 'about', 'privacy', 'contact', 'terms', 'blog', 'projects', 'categories'].map(
    (route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1.0 : 0.6,
    })
  )

  return [
    ...routes,
    ...blogPaginationRoutes,
    ...categoryRoutes,
    ...categoryPaginationRoutes,
    ...blogRoutes,
  ]
}
