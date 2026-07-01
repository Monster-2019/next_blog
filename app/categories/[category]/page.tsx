import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithCategories'
import { allBlogs } from 'contentlayer/generated'
import categoryData from 'app/category-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { slug } from 'github-slugger'

const POSTS_PER_PAGE = 8

export async function generateMetadata(props: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const params = await props.params
  const categorySlug = decodeURI(params.category)
  const categories = categoryData as Record<string, { name: string; count: number }>
  const category = categories[categorySlug]

  return genPageMetadata({
    title: category?.name || categorySlug,
    description: `${siteMetadata.title} ${category?.name || categorySlug} 分类文章`,
  })
}

export const generateStaticParams = async () => {
  const categories = categoryData as Record<string, { name: string; count: number }>
  return Object.keys(categories).map((category) => ({
    category: encodeURI(category),
  }))
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params
  const categorySlug = decodeURI(params.category)
  const categories = categoryData as Record<string, { name: string; count: number }>
  const category = categories[categorySlug]

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
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
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
