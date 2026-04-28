import siteMetadata from '@/data/siteMetadata'

export const metadata = {
  title: '联系方式 | Monster Cone',
  description:
    '通过电子邮件联系 Monster Cone Blog，用于文章反馈、技术交流、版权与隐私请求、网站问题报告等事项。',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert">
        <h1>联系方式</h1>

        <p>
          欢迎你与我联系。无论是文章反馈、技术讨论、网站问题、版权请求、隐私请求，还是其他与本站相关的事项，都可以通过邮件发送给我。
        </p>

        <h2>电子邮件</h2>
        <p>
          <strong>{siteMetadata.email}</strong>
        </p>

        <h2>适合联系的事项</h2>
        <ul>
          <li>文章内容的错误更正、补充建议或技术讨论。</li>
          <li>网站功能、页面显示、链接失效或访问异常反馈。</li>
          <li>版权、引用、转载、署名或内容移除请求。</li>
          <li>隐私政策、Cookie、广告展示或数据处理相关问题。</li>
          <li>合理的合作、访谈或项目交流邀请。</li>
        </ul>

        <h2>回复时间</h2>
        <p>
          我通常会在 2 至 5
          个工作日内查看并回复邮件。为便于处理，请在邮件中尽量说明相关页面链接、问题描述和你希望获得的处理方式。
        </p>

        <h2>重要说明</h2>
        <p>
          本站不会通过邮件要求你提供账号密码、验证码、银行卡信息或其他敏感凭证。如果你收到冒用本站名义的可疑信息，请不要点击其中的链接，并可以将情况转发到上述邮箱核实。
        </p>
      </article>
    </div>
  )
}
