# syntax=docker.io/docker/dockerfile:1

# 基础镜像：保留node:18-alpine，解决libc兼容问题
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat curl && \
    npm i -g npm@latest

# ===== 依赖安装阶段：放弃npm ci，使用npm install，适配跨平台环境 =====
FROM base AS deps
WORKDIR /app

# 复制包配置文件（优先锁文件，保留缓存优化）
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# 关键优化：
# 1. 放弃npm ci，使用npm install（灵活兼容跨平台原生依赖，自动生成适配容器环境的锁文件）
# 2. 移除--force和--legacy-peer-deps（避免与npm用法冲突）
# 3. 移除npm ls（避免冗余依赖校验导致的报错）
# 4. 清除缓存后安装，确保依赖完整
RUN npm cache clean --force && \
    npm install --legacy-peer-deps && \
    # 清理缓存，减小deps阶段镜像体积
    rm -rf ~/.npm/_cacache

# ===== 构建阶段：保留原有优化，确保原生依赖可编译 =====
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 环境变量配置（保留原有功能）
ARG NEXT_PUBLIC_GISCUS_REPO
ARG NEXT_PUBLIC_GISCUS_REPOSITORY_ID
ARG NEXT_PUBLIC_GISCUS_CATEGORY
ARG NEXT_PUBLIC_GISCUS_CATEGORY_ID
ENV NEXT_PUBLIC_GISCUS_REPO=${NEXT_PUBLIC_GISCUS_REPO}
ENV NEXT_PUBLIC_GISCUS_REPOSITORY_ID=${NEXT_PUBLIC_GISCUS_REPOSITORY_ID}
ENV NEXT_PUBLIC_GISCUS_CATEGORY=${NEXT_PUBLIC_GISCUS_CATEGORY}
ENV NEXT_PUBLIC_GISCUS_CATEGORY_ID=${NEXT_PUBLIC_GISCUS_CATEGORY_ID}
ENV NEXT_TELEMETRY_DISABLED=1

# 安装编译工具链，解决lightningcss等原生依赖编译问题
RUN apk add --no-cache g++ make py3-pip && \
    npm run build && \
    # 清理构建缓存
    rm -rf node_modules/.cache && \
    rm -rf .next/cache

# ===== 生产运行阶段：保留原有安全优化和体积优化 =====
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制生产所需文件
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 运行时环境变量
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

ENV PORT=80
ENV HOSTNAME=0.0.0.0
EXPOSE 80

# 健康检查（可选，若未实现/api/health可注释）
HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
  CMD curl -f http://localhost:${PORT}/api/health || exit 1

USER nextjs
CMD ["node", "server.js"]