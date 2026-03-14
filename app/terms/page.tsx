export const metadata = { title: '服务条款' }

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert">
        <h1>服务条款</h1>
        <h2>内容使用</h2>
        <p>本站提供的所有内容仅供参考。未经授权，禁止将本站内容进行商业转载或非法抓取。</p>

        <h2>免责声明</h2>
        <p>
          我们尽力确保数据的准确性，但不保证信息的绝对实时性或准确性。对于因使用本站信息而产生的任何直接或间接损失，本站概不负责。
        </p>

        <h2>用户行为</h2>
        <p>用户在访问本站时，不得利用本站进行任何非法活动或破坏系统运行的行为。</p>
      </article>
    </div>
  )
}
