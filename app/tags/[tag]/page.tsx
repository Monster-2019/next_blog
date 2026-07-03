import { redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tagName = decodeURI(params.tag)

  return genPageMetadata({
    title: `${tagName} 标签`,
    description: `${tagName} 标签页已合并到分类浏览体验，请前往分类页面查看 Monster Cone Blog 的相关技术文章。`,
    robots: {
      index: false,
      follow: true,
    },
  })
}

export default async function TagPage() {
  redirect('/categories')
}
