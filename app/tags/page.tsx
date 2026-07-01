import { redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  robots: {
    index: false,
    follow: false,
  },
})

export default async function Page() {
  redirect('/categories')
}
