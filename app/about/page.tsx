// app/about/page.tsx

import siteMetadata from '@/data/siteMetadata'

export const metadata = {
  title: '关于我 | Monster Cone',
  description:
    '了解 Monster Cone Blog 的作者、内容方向、编辑原则与联系方式。本博客专注前端开发、工程化、Next.js、React 与个人技术实践记录。',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert">
        <h1>关于我</h1>

        <p>
          你好，我是 <strong>{siteMetadata.author}</strong>，一名关注前端开发、工程化和 Web
          产品体验的开发者。这里是我的个人技术博客，用来记录我在真实项目、日常学习和问题排查中的经验与思考。
        </p>

        <h2>网站内容</h2>
        <p>
          Monster Cone Blog 主要发布原创技术文章，内容覆盖
          React、Next.js、TypeScript、前端工程化、浏览器能力、自动化部署、移动端适配、性能优化以及开发工具使用心得。我会尽量把每篇文章写成可复现、可验证、可参考的实践记录，而不是只停留在概念介绍。
        </p>

        <h2>编辑原则</h2>
        <p>
          本站内容基于个人实践、公开文档和技术社区资料整理而成。文章会尽量注明关键背景、适用场景和限制条件；如果内容后续发现错误或过时，我会在能力范围内进行修正。本站不会发布误导性内容、恶意软件下载、侵权资源或以诱导点击广告为目的的页面。
        </p>

        <h2>为什么建立这个博客</h2>
        <p>
          技术问题往往不只是一段代码的问题，还包括环境、工具链、性能、兼容性和取舍。我希望把这些解决过程沉淀下来，帮助同样在开发路上探索的读者少走一些弯路，也方便自己持续复盘。
        </p>

        <h2>联系我</h2>
        <p>
          如果你对文章内容有疑问、发现错误、希望补充资料，或者需要就版权、隐私、合作等事项与我联系，可以发送邮件至：
          <br />
          <strong>{siteMetadata.email}</strong>
        </p>

        <p>感谢你的阅读。希望这里的内容能对你的开发工作有所帮助。</p>
      </article>
    </div>
  )
}
