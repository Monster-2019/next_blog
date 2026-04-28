import siteMetadata from '@/data/siteMetadata'

export const metadata = {
  title: '隐私政策 | Monster Cone',
  description:
    'Monster Cone Blog 隐私政策，说明本站如何处理访问日志、Cookie、Google AdSense、Google Analytics、第三方链接与用户请求。',
}

const lastUpdated = '2026年4月28日'

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert">
        <h1>隐私政策</h1>
        <p>最后更新：{lastUpdated}</p>

        <p>
          欢迎访问 Monster Cone
          Blog（以下简称“本站”）。本站重视访问者的隐私。本政策说明本站在提供内容、统计访问情况、展示广告和维护网站安全时，可能如何收集、使用、共享和保护相关信息。
        </p>

        <h2>我们可能收集的信息</h2>
        <p>当你访问本站时，服务器、浏览器或第三方服务可能会自动处理以下信息：</p>
        <ul>
          <li>设备和浏览器信息，例如浏览器类型、操作系统、语言设置、屏幕尺寸和访问时间。</li>
          <li>访问日志信息，例如 IP 地址、来源页面、访问页面、停留时间和大致地区信息。</li>
          <li>Cookie、网页信标、广告标识符或类似技术产生的信息。</li>
          <li>你主动发送给本站的信息，例如通过邮件提供的姓名、邮箱地址、问题描述或附件。</li>
        </ul>

        <h2>信息用途</h2>
        <p>本站可能将上述信息用于以下目的：</p>
        <ul>
          <li>提供、维护和改进网站内容与访问体验。</li>
          <li>分析页面访问情况、排查错误、提升网站性能和安全性。</li>
          <li>回复你主动提交的咨询、反馈、版权或隐私请求。</li>
          <li>展示广告、衡量广告效果，并遵守广告平台和法律法规要求。</li>
        </ul>

        <h2>Cookie 与 Google AdSense</h2>
        <p>
          本站可能使用 Google AdSense 展示广告。Google 及其合作伙伴可能会使用 Cookie、网页信标、IP
          地址或其他标识符，在你访问本站或其他网站时收集信息，以便投放和衡量广告，包括个性化广告或非个性化广告。
        </p>
        <p>
          Google 作为第三方供应商，可能会使用 Cookie
          根据用户访问本站和互联网上其他网站的情况投放广告。你可以访问{' '}
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
            Google 广告设置
          </a>{' '}
          管理个性化广告偏好，也可以阅读{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=zh-CN"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 如何使用合作伙伴网站或应用中的信息
          </a>
          。
        </p>

        <h2>网站统计</h2>
        <p>
          本站可能使用 Google Analytics 等统计工具了解页面访问情况。这类工具可能通过 Cookie
          或类似技术收集匿名或聚合的访问数据，例如页面浏览量、访问来源、设备类型和互动情况，用于分析网站表现和改进内容质量。
        </p>

        <h2>评论与第三方服务</h2>
        <p>
          本站部分页面可能使用 GitHub Discussions
          相关的评论服务。若你使用评论功能，相关登录、头像、评论内容和互动信息将受 GitHub
          的服务条款和隐私政策约束。本站也可能包含指向第三方网站、文档、工具或开源项目的链接；这些第三方网站的隐私做法不受本站控制。
        </p>

        <h2>信息共享</h2>
        <p>
          本站不会出售你的个人信息。除非为提供网站功能、展示广告、进行统计分析、维护安全、回应你的请求或遵守适用法律法规，本站不会主动向无关第三方披露你通过邮件等方式提供的信息。
        </p>

        <h2>你的选择</h2>
        <ul>
          <li>你可以通过浏览器设置删除或阻止 Cookie，但部分功能或广告偏好可能受到影响。</li>
          <li>你可以通过 Google 广告设置管理个性化广告。</li>
          <li>如果你希望查询、更正或删除你主动发送给本站的信息，可以通过邮件联系我。</li>
        </ul>

        <h2>儿童隐私</h2>
        <p>
          本站内容面向一般技术读者，并非面向 13
          岁以下儿童。如果你认为未成年人向本站提供了个人信息，请通过邮件联系我，我会在核实后尽快处理。
        </p>

        <h2>政策更新</h2>
        <p>
          本隐私政策可能会根据网站功能、第三方服务或法律法规变化进行更新。更新后的政策会发布在本页面，并标注最新更新日期。
        </p>

        <h2>联系我们</h2>
        <p>
          如果你对本隐私政策或本站的数据处理方式有任何问题，请发送邮件至：
          <br />
          <strong>{siteMetadata.email}</strong>
        </p>
      </article>
    </div>
  )
}
