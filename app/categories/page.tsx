import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'
import categoryData from 'app/category-data.json'

export const metadata = genPageMetadata({
  title: '分类',
  description: '按主题浏览所有文章分类',
})

export default async function Page() {
  const categoryCounts = categoryData as Record<string, { name: string; count: number }>
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1].count - a[1].count)

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
            分类
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {sortedCategories.length === 0 && '暂无分类。'}
          {sortedCategories.map(([categorySlug, category]) => {
            return (
              <div key={categorySlug} className="mt-2 mr-5 mb-2">
                <Link
                  href={`/categories/${categorySlug}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-semibold uppercase"
                  aria-label={`查看 ${category.name} 分类下的文章`}
                >
                  {`${category.name} (${category.count})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
