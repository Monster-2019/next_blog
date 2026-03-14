export const metadata = { title: '隐私政策' }

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert">
        <h1>隐私政策</h1>
        <p>欢迎访问本站。我们高度重视您的隐私权。本政策旨在说明我们如何处理您的信息。</p>

        <h2>Cookie 和广告</h2>
        <p>
          本站使用 Google AdSense 投放广告。Google 作为第三方供应商，会使用 Cookie
          根据您访问本站及互联网其他网站的情况向您投放个性化广告。
        </p>
        <p>
          您可以访问{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google 广告设置
          </a>{' '}
          来停用个性化广告。
        </p>

        <h2>信息收集</h2>
        <p>
          本站可能会自动收集非个人身份信息（如浏览器类型、访问时间、页面浏览路径），以用于优化用户体验和网站性能分析。
        </p>

        <h2>第三方链接</h2>
        <p>本站可能包含指向外部站点的链接。我们对这些外部网站的内容或隐私做法不承担任何责任。</p>
      </article>
    </div>
  )
}
