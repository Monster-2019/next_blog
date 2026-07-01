import { redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return genPageMetadata({
    title: 'Tags',
    robots: {
      index: false,
      follow: false,
    },
  })
}

export default async function TagPage() {
  redirect('/categories')
}
