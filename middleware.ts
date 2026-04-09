import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. 定义 CSP 策略
  // 关键点：
  // script-src: 允许 AdSense 和流量质量检测脚本
  // connect-src: 允许脚本回传监测数据
  // frame-ancestors: 允许 google.com 嵌入你的网站（修复广告预览报错）
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' 
      https://*.adtrafficquality.google 
      https://pagead2.googlesyndication.com 
      https://www.google.com 
      https://www.gstatic.com
      https://static.cloudflareinsights.com;
    connect-src 'self' 
      https://*.adtrafficquality.google 
      https://pagead2.googlesyndication.com 
      https://www.google.com
      https://cloudflareinsights.com;
    img-src 'self' blob: data: 
      https://*.adtrafficquality.google 
      https://pagead2.googlesyndication.com 
      https://www.gstatic.com;
    frame-src 'self' 
      https://googleads.g.doubleclick.net 
      https://tpc.googlesyndication.com 
      https://www.google.com;
    frame-ancestors 'self' 
      https://www.google.com 
      https://admanager.google.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)

  // 2. 预设响应
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // 3. 将 CSP 注入响应头
  response.headers.set('Content-Security-Policy', cspHeader)

  return response
}

// 4. 配置 Matcher 以跳过静态资源，只拦截页面请求
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
