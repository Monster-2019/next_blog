import { redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: '标签索引',
  description: '标签索引页已合并到分类页，请前往分类页面按主题浏览 Monster Cone Blog 的技术文章。',
  robots: {
    index: false,
    follow: true,
  },
})

export default async function Page() {
  redirect('/categories')
}
