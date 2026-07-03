import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithCategories'
import { allBlogs } from 'contentlayer/generated'
import categoryData from 'app/category-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { slug } from 'github-slugger'

const POSTS_PER_PAGE = 8

export const generateStaticParams = async () => {
  const categories = categoryData as Record<string, { name: string; count: number }>
  return Object.entries(categories).flatMap(([category, data]) => {
    const totalPages = Math.max(1, Math.ceil(data.count / POSTS_PER_PAGE))
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      category: encodeURI(category),
      page: (i + 2).toString(),
    }))
  })
}

export async function generateMetadata(props: {
  params: Promise<{ category: string; page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const categorySlug = decodeURI(params.category)
  const categories = categoryData as Record<string, { name: string; count: number }>
  const category = categories[categorySlug]
  const pageNumber = parseInt(params.page)
  const categoryName = category?.name || categorySlug

  return genPageMetadata({
    title: `${categoryName} - 第 ${pageNumber} 页`,
    description: `阅读 Monster Cone Blog ${categoryName} 分类第 ${pageNumber} 页的技术文章，继续浏览相关开发经验、工具实践、问题排查和项目记录。`,
  })
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string; page: string }>
}) {
  const params = await props.params
  const categorySlug = decodeURI(params.category)
  const categories = categoryData as Record<string, { name: string; count: number }>
  const category = categories[categorySlug]
  const pageNumber = parseInt(params.page)

  if (!category) {
    return notFound()
  }

  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => !post.draft && post.category && slug(post.category || '') === categorySlug
      )
    )
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  if (pageNumber <= 1 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={category.name}
    />
  )
}
