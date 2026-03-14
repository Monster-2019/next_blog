# 使用 Node 20-alpine 作为基础镜像
FROM node:20-alpine AS base

# 安装必要的工具，只在构建阶段需要
RUN apk add --no-cache g++ make py3-pip libc6-compat curl && \
    npm i -g npm@latest

# ===== 依赖安装阶段：使用 npm install 适配跨平台环境 =====
FROM base AS deps
WORKDIR /app

# 复制包配置文件（优先锁文件，保留缓存优化）
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# 使用 npm install 安装依赖
RUN npm cache clean --force && \
    npm install --legacy-peer-deps && \
    # 清理缓存，减小 deps 阶段镜像体积
    rm -rf ~/.npm/_cacache

# ===== 构建阶段：保留原有优化，确保原生依赖可编译 =====
FROM base AS builder
WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules

# 复制源代码
COPY . .

# 安装环境变量
ARG NEXT_PUBLIC_GISCUS_REPO
ARG NEXT_PUBLIC_GISCUS_REPOSITORY_ID
ARG NEXT_PUBLIC_GISCUS_CATEGORY
ARG NEXT_PUBLIC_GISCUS_CATEGORY_ID

ENV NEXT_PUBLIC_GISCUS_REPO=${NEXT_PUBLIC_GISCUS_REPO}
ENV NEXT_PUBLIC_GISCUS_REPOSITORY_ID=${NEXT_PUBLIC_GISCUS_REPOSITORY_ID}
ENV NEXT_PUBLIC_GISCUS_CATEGORY=${NEXT_PUBLIC_GISCUS_CATEGORY}
ENV NEXT_PUBLIC_GISCUS_CATEGORY_ID=${NEXT_PUBLIC_GISCUS_CATEGORY_ID}
ENV NEXT_TELEMETRY_DISABLED=1

# 构建项目
RUN npm run build && \
    # 清理构建缓存，减小镜像体积
    rm -rf node_modules/.cache && \
    rm -rf .next/cache

# ===== 生产运行阶段：保留原有安全优化和体积优化 =====
FROM base AS runner
WORKDIR /app

# 设置为生产环境
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制构建后的生产文件
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 配置运行时环境变量
ARG NEXT_PUBLIC_GISCUS_REPO
ARG NEXT_PUBLIC_GISCUS_REPOSITORY_ID
ARG NEXT_PUBLIC_GISCUS_CATEGORY
ARG NEXT_PUBLIC_GISCUS_CATEGORY_ID
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

ENV NEXT_PUBLIC_GISCUS_REPO=${NEXT_PUBLIC_GISCUS_REPO}
ENV NEXT_PUBLIC_GISCUS_REPOSITORY_ID=${NEXT_PUBLIC_GISCUS_REPOSITORY_ID}
ENV NEXT_PUBLIC_GISCUS_CATEGORY=${NEXT_PUBLIC_GISCUS_CATEGORY}
ENV NEXT_PUBLIC_GISCUS_CATEGORY_ID=${NEXT_PUBLIC_GISCUS_CATEGORY_ID}
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}

# 配置运行端口和主机
ENV PORT=80
ENV HOSTNAME=0.0.0.0
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
  CMD curl -f http://localhost:${PORT}/api/health || exit 1

# 切换到非 root 用户运行
USER nextjs

# 运行服务
CMD ["node", "server.js"]