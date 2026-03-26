# 使用国内 Docker 镜像加速
FROM docker.m.daocloud.io/library/node:latest AS builder-stage
WORKDIR /app
ENV CI=true
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm@10.32.1
RUN pnpm config set registry https://registry.npmmirror.com
COPY . .
RUN pnpm install --no-frozen-lockfile
RUN pnpm run build

FROM nginx AS production-stage
COPY --from=builder-stage /app/dist /usr/share/nginx/html
EXPOSE 8083
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
