import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithCategories'
import { allBlogs } from 'contentlayer/generated'
import categoryData from 'app/category-data.json'
import { notFound } from 'next/navigation'
import { slug } from 'github-slugger'

const POSTS_PER_PAGE = 8

export const generateStaticParams = async () => {
  const categories = categoryData as Record<string, { name: string; count: number }>
  return Object.entries(categories).flatMap(([category, data]) => {
    const totalPages = Math.max(1, Math.ceil(data.count / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      category: encodeURI(category),
      page: (i + 1).toString(),
    }))
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

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
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
