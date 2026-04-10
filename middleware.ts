import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; 
    connect-src 'self' https:;
    img-src 'self' data: blob: https:;
    frame-src 'self' https:;
    frame-ancestors 'self' https://www.google.com https://admanager.google.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self' data:;
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
