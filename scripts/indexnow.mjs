import { readFileSync } from 'fs'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'

const POSTS_PER_PAGE = 8
const DEFAULT_ENDPOINT = 'https://api.indexnow.org/indexnow'

const normalizeSiteUrl = (siteUrl) => siteUrl.replace(/\/$/, '')
const toUrl = (siteUrl, route = '') => `${siteUrl}/${route.replace(/^\//, '')}`.replace(/\/$/, '')

const chunk = (items, size) => {
  const chunks = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

const getCategoryData = () => {
  const categoryDataPath = new URL('../app/category-data.json', import.meta.url)
  return JSON.parse(readFileSync(categoryDataPath, 'utf8'))
}

const createIndexNowUrls = () => {
  const siteUrl = normalizeSiteUrl(siteMetadata.siteUrl)
  const publishedPosts = allBlogs.filter((post) => !post.draft)
  const categories = getCategoryData()

  const staticRoutes = [
    '',
    'about',
    'privacy',
    'contact',
    'terms',
    'blog',
    'projects',
    'categories',
  ]
  const staticUrls = staticRoutes.map((route) => toUrl(siteUrl, route))

  const blogUrls = publishedPosts.map((post) => toUrl(siteUrl, post.path))

  const blogTotalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE)
  const blogPaginationUrls = Array.from({ length: Math.max(0, blogTotalPages - 1) }, (_, i) =>
    toUrl(siteUrl, `blog/page/${i + 2}`)
  )

  const categoryUrls = Object.keys(categories).map((categorySlug) =>
    toUrl(siteUrl, `categories/${categorySlug}`)
  )

  const categoryPaginationUrls = Object.entries(categories).flatMap(([categorySlug, data]) => {
    const totalPages = Math.ceil(data.count / POSTS_PER_PAGE)
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) =>
      toUrl(siteUrl, `categories/${categorySlug}/page/${i + 2}`)
    )
  })

  return [
    ...new Set([
      ...staticUrls,
      ...blogPaginationUrls,
      ...categoryUrls,
      ...categoryPaginationUrls,
      ...blogUrls,
    ]),
  ]
}

async function submitBatch({ endpoint, host, key, urlList }) {
  const controller = new AbortController()
  const timeout = setTimeout(
    () => controller.abort(),
    Number(process.env.INDEXNOW_TIMEOUT_MS || 10000)
  )

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host,
        key,
        urlList,
      }),
      signal: controller.signal,
    })

    if (response.status === 200 || response.status === 202) {
      console.log(`IndexNow submitted ${urlList.length} URLs (${response.status}).`)
      return
    }

    const body = await response.text().catch(() => '')
    console.warn(
      `IndexNow submission returned ${response.status}${body ? `: ${body.slice(0, 200)}` : ''}`
    )
  } catch (error) {
    console.warn(`IndexNow submission skipped: ${error.message}`)
  } finally {
    clearTimeout(timeout)
  }
}

export default async function indexNow() {
  const key = process.env.INDEXNOW_KEY || siteMetadata.indexNowKey

  if (!key) {
    console.log('IndexNow skipped: missing INDEXNOW_KEY or siteMetadata.indexNowKey.')
    return
  }

  if (process.env.INDEXNOW_SUBMIT === 'false') {
    console.log('IndexNow skipped: INDEXNOW_SUBMIT=false.')
    return
  }

  const siteUrl = normalizeSiteUrl(siteMetadata.siteUrl)
  const host = new URL(siteUrl).host
  const endpoint = process.env.INDEXNOW_ENDPOINT || DEFAULT_ENDPOINT
  const urls = createIndexNowUrls()

  if (!urls.length) {
    console.log('IndexNow skipped: no URLs to submit.')
    return
  }

  if (process.env.INDEXNOW_SUBMIT === 'dry-run') {
    console.log(`IndexNow dry run: ${urls.length} URLs ready for ${host}.`)
    return
  }

  for (const urlList of chunk(urls, 10000)) {
    await submitBatch({ endpoint, host, key, urlList })
  }
}
