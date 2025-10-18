# マルチステージビルドを使用してイメージサイズを最適化
FROM node:20-alpine AS base

# 依存関係のインストール
FROM base AS deps
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./
COPY prisma ./prisma/

# 本番環境の依存関係のみインストール
RUN npm ci --only=production && \
    npx prisma generate

# 開発依存関係を含む全依存関係をインストール
FROM base AS build-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ビルドステージ
FROM base AS build
WORKDIR /app

# 依存関係をコピー
COPY --from=build-deps /app/node_modules ./node_modules
COPY . .

# Prismaクライアントの生成
RUN npx prisma generate

# Nuxtアプリケーションをビルド
RUN npm run build

# 本番環境用の最終イメージ
FROM base AS production
WORKDIR /app

# 本番環境で必要なファイルをコピー
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output
COPY --from=build /app/prisma ./prisma
COPY package*.json ./

# 環境変数の設定
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# ポートの公開
EXPOSE 3000

# アプリケーション起動用のスクリプト
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]
