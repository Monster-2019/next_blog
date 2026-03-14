import siteMetadata from '@/data/siteMetadata'

export const metadata = { title: '联系我们' }

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert">
        <h1>联系我们</h1>
        <p>如果您有任何问题、反馈或需要寻求帮助，请通过以下方式与我们取得联系：</p>
        <ul>
          <li>
            电子邮箱：<strong>{siteMetadata.email}</strong>
          </li>
          <li>处理时间：我们通常会在 48 小时内回复您的邮件。</li>
        </ul>
        <p>感谢您对本站的关注与支持！</p>
      </article>
    </div>
  )
}
