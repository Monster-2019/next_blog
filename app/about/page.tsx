// app/about/page.tsx

import siteMetadata from '@/data/siteMetadata'

export const metadata = {
  title: '关于我 | Monster Cone',
  description: '前端开发工程师 Monster Cone 的技术博客，记录实战心得与探索。',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert">
        <h1>关于我</h1>

        <p>
          你好！我是 <strong>Monster Cone</strong>，一名沉浸在代码世界里的
          <strong>前端开发工程师</strong>。
        </p>

        <p>
          创建这个博客的初衷很简单：在这个技术更新迭代极快的时代，我希望将自己平时在
          <strong>前端工程化、现代框架（如 React/Next.js）以及日常开发中</strong>
          遇到的问题和解决方案整理成文。在这里，我记录的不仅仅是代码，更是我解决复杂需求、优化性能时的思维过程。
        </p>

        <h2>我的博客定位</h2>
        <p>
          这里主要分享我个人在技术实践中的深度思考。我不追求大而全的教程，更倾向于分享
          <strong>实战经验、避坑指南以及对前端前沿技术的探索</strong>
          。我希望这些分享能为同样在编程道路上奋斗的你，提供一点点启发或解决方案。
        </p>

        <h2>联系与交流</h2>
        <p>
          代码之外，我也很喜欢与志同道合的朋友探讨技术。如果你对我的文章有任何疑问、建议，或者想探讨技术方案，非常欢迎通过邮件联系我：
          <br />
          <strong>Email: {siteMetadata.email}</strong>
        </p>

        <p>感谢你的阅读，愿我们都能在编码中不断进化。</p>
      </article>
    </div>
  )
}
