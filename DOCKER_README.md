# Docker セットアップガイド

このプロジェクトをDockerで実行するためのガイドです。

## 📋 目次

- [アーキテクチャ概要](#アーキテクチャ概要)
- [前提条件](#前提条件)
- [クイックスタート](#クイックスタート)
- [環境別セットアップ](#環境別セットアップ)
- [コマンド一覧](#コマンド一覧)
- [トラブルシューティング](#トラブルシューティング)
- [ファイル構成](#ファイル構成)

## アーキテクチャ概要

このプロジェクトは、以下の3つのコンテナで構成されています：

### 本番環境 (docker-compose.yml)

```
┌─────────────────────────────────────────────┐
│ ホスト (localhost)                          │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Nginx (Port 80/443)                  │  │
│  │ - リバースプロキシ                   │  │
│  │ - 静的ファイルキャッシュ             │  │
│  │ - SSL/TLS終端                        │  │
│  └──────┬───────────────────────────────┘  │
│         │                                   │
│  ┌──────▼───────────────────────────────┐  │
│  │ Nuxt App (Port 3000)                 │  │
│  │ - フロントエンド (SSR/SSG)           │  │
│  │ - APIサーバー (/api/*)               │  │
│  │ - Prisma ORM                         │  │
│  └──────┬───────────────────────────────┘  │
│         │                                   │
│  ┌──────▼───────────────────────────────┐  │
│  │ MariaDB (Port 3306)                  │  │
│  │ - データベース                       │  │
│  │ - データ永続化                       │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### 開発環境 (docker-compose.dev.yml)

```
┌─────────────────────────────────────────────┐
│ ホスト (localhost)                          │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Nginx Dev (Port 8080) - オプション   │  │
│  └──────┬───────────────────────────────┘  │
│         │                                   │
│  ┌──────▼───────────────────────────────┐  │
│  │ Nuxt Dev Server (Port 3000)          │  │
│  │ - ホットリロード                     │  │
│  │ - ソースマップ                       │  │
│  │ - ボリュームマウント                 │  │
│  └──────┬───────────────────────────────┘  │
│         │                                   │
│  ┌──────▼───────────────────────────────┐  │
│  │ MariaDB Dev (Port 3306)              │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## 前提条件

- Docker Engine 20.10以上
- Docker Compose 2.0以上
- 空きメモリ: 最低2GB推奨

## クイックスタート

### 1. 環境変数ファイルの作成

```bash
cp .env.docker.example .env.docker
```

`.env.docker`ファイルを編集して、パスワードなどを変更してください（特に本番環境では必須）。

### 2. 本番環境で起動

```bash
# ビルドして起動
docker-compose --env-file .env.docker up -d --build

# ログを確認
docker-compose --env-file .env.docker logs -f
```

### 3. アプリケーションへのアクセス

- **Nginxリバースプロキシ経由**: http://localhost (ポート80)
- **直接アクセス**: http://localhost:3000

## 環境別セットアップ

### 本番環境

本番環境では、Nginx + Nuxt App + MariaDBの3コンテナ構成で動作します。

```bash
# 起動
docker-compose --env-file .env.docker up -d --build

# 停止
docker-compose --env-file .env.docker down

# ログ確認
docker-compose --env-file .env.docker logs -f nginx app db
```

**特徴:**
- マルチステージビルドによる最適化
- Nginxによるリバースプロキシ
- 静的ファイルのキャッシュ
- ヘルスチェック機能

### 開発環境

開発環境では、ホットリロード対応のNuxt開発サーバーを使用します。

```bash
# 起動
docker-compose -f docker-compose.dev.yml --env-file .env.docker up -d --build

# 停止
docker-compose -f docker-compose.dev.yml --env-file .env.docker down

# ログ確認（リアルタイム）
docker-compose -f docker-compose.dev.yml --env-file .env.docker logs -f app
```

**特徴:**
- ソースコードのボリュームマウント（自動リロード）
- デバッグモード有効
- Nginxはオプション（Port 8080）
- WebSocketサポート（HMR用）

**アクセスURL:**
- **Nuxt直接**: http://localhost:3000
- **Nginx経由**: http://localhost:8080

## コマンド一覧

### 基本操作

```bash
# コンテナの起動（本番）
docker-compose --env-file .env.docker up -d

# コンテナの起動（開発）
docker-compose -f docker-compose.dev.yml --env-file .env.docker up -d

# コンテナの停止
docker-compose --env-file .env.docker down

# コンテナの再起動
docker-compose --env-file .env.docker restart

# コンテナの状態確認
docker-compose --env-file .env.docker ps
```

### ログ確認

```bash
# 全てのコンテナのログ
docker-compose --env-file .env.docker logs -f

# 特定のコンテナのログ
docker-compose --env-file .env.docker logs -f app
docker-compose --env-file .env.docker logs -f db
docker-compose --env-file .env.docker logs -f nginx

# 最新100行のログを表示
docker-compose --env-file .env.docker logs --tail=100 app
```

### データベース操作

```bash
# データベースに接続
docker-compose --env-file .env.docker exec db mysql -u quizapp -p quiz_app

# Prismaスキーマをデータベースに適用
docker-compose --env-file .env.docker exec app npx prisma db push

# Prisma Clientを再生成
docker-compose --env-file .env.docker exec app npx prisma generate

# Prisma Studio起動（開発環境）
docker-compose -f docker-compose.dev.yml --env-file .env.docker exec app npx prisma studio

# データベースバックアップ
docker-compose --env-file .env.docker exec db mysqldump -u quizapp -p quiz_app > backup.sql

# データベースリストア
docker-compose --env-file .env.docker exec -T db mysql -u quizapp -p quiz_app < backup.sql
```

### シェルアクセス

```bash
# アプリケーションコンテナ
docker-compose --env-file .env.docker exec app sh

# データベースコンテナ
docker-compose --env-file .env.docker exec db bash

# Nginxコンテナ
docker-compose --env-file .env.docker exec nginx sh
```

### ビルド・再構築

```bash
# 再ビルド（変更を反映）
docker-compose --env-file .env.docker up -d --build --force-recreate

# キャッシュなしでビルド
docker-compose --env-file .env.docker build --no-cache

# 特定のサービスのみビルド
docker-compose --env-file .env.docker build app
```

## データの永続化

以下のDockerボリュームが作成され、データが永続化されます：

### 本番環境
- `mariadb_data`: MariaDBのデータファイル
- `uploads`: アップロードされたファイル
- `nginx_cache`: Nginxのキャッシュ

### 開発環境
- `mariadb_dev_data`: MariaDB開発用データファイル

### ボリューム操作

```bash
# ボリュームの一覧表示
docker volume ls

# ボリュームの詳細確認
docker volume inspect quiz_mariadb_data

# ボリュームとコンテナを全て削除（警告：データも削除されます！）
docker-compose --env-file .env.docker down -v
```

## トラブルシューティング

### ポートが既に使用されている場合

`.env.docker`ファイルで以下の値を変更してください：

```env
APP_PORT=3001          # Nuxtアプリケーションのポート
DB_PORT=3307           # データベースのポート
NGINX_HTTP_PORT=8080   # Nginxのポート
```

### データベース接続エラー

1. データベースコンテナが起動しているか確認：
```bash
docker-compose --env-file .env.docker ps db
```

2. データベースのログを確認：
```bash
docker-compose --env-file .env.docker logs db
```

3. ヘルスチェックの状態を確認：
```bash
docker-compose --env-file .env.docker ps
```

`healthy` と表示されるまで待ってください（通常10-30秒）。

### Nginxが502 Bad Gatewayを返す場合

1. アプリケーションコンテナが起動しているか確認：
```bash
docker-compose --env-file .env.docker ps app
```

2. アプリケーションのヘルスチェックを確認：
```bash
docker-compose --env-file .env.docker exec app wget -q -O- http://localhost:3000/
```

3. Nginxの設定をテスト：
```bash
docker-compose --env-file .env.docker exec nginx nginx -t
```

### ホットリロードが動作しない（開発環境）

1. ボリュームマウントを確認：
```bash
docker-compose -f docker-compose.dev.yml --env-file .env.docker ps
```

2. node_modulesが正しくマウントされているか確認：
```bash
docker-compose -f docker-compose.dev.yml --env-file .env.docker exec app ls -la /app/node_modules
```

3. コンテナを再作成：
```bash
docker-compose -f docker-compose.dev.yml --env-file .env.docker down
docker-compose -f docker-compose.dev.yml --env-file .env.docker up -d --force-recreate
```

### メモリ不足エラー

Docker Desktopの設定でメモリを増やしてください（推奨: 4GB以上）。

### ディスク容量不足

```bash
# 未使用のイメージ・コンテナ・ボリュームを削除
docker system prune -a

# ビルドキャッシュも削除
docker builder prune
```

## 本番環境での注意事項

### 1. セキュリティ

- [ ] `.env.docker`の全てのパスワードを強力なものに変更
- [ ] 不要なポートの公開を避ける（本番環境ではNginxの80/443のみ公開）
- [ ] SSL証明書の設定（`docker/nginx/ssl/`に配置）
- [ ] ファイアウォールの設定
- [ ] 定期的なセキュリティアップデート

### 2. パフォーマンス

- [ ] 適切なリソース制限の設定
- [ ] ログローテーションの設定
- [ ] データベースの最適化（インデックス、クエリチューニング）
- [ ] Nginxのキャッシュ設定の調整

### 3. 監視・バックアップ

- [ ] ヘルスチェックの監視（死活監視）
- [ ] リソース使用状況の監視（CPU、メモリ、ディスク）
- [ ] ログの監視・集約
- [ ] データベースの自動バックアップ設定
- [ ] バックアップからのリストアテスト

### 4. SSL証明書の設定

1. SSL証明書を取得（Let's Encryptなど）
2. 証明書を配置：
```bash
mkdir -p docker/nginx/ssl
cp cert.pem docker/nginx/ssl/
cp key.pem docker/nginx/ssl/
```

3. `docker/nginx/prod.conf`のSSL設定のコメントを解除
4. Nginxを再起動：
```bash
docker-compose --env-file .env.docker restart nginx
```

## ファイル構成

```
.
├── Dockerfile                      # 本番環境用Dockerfile
├── Dockerfile.dev                  # 開発環境用Dockerfile
├── docker-compose.yml              # 本番環境構成
├── docker-compose.dev.yml          # 開発環境構成
├── docker-entrypoint.sh            # コンテナ起動スクリプト
├── .dockerignore                   # ビルド時除外ファイル
├── .env.docker.example             # 環境変数テンプレート
├── .env.docker                     # 実際の環境変数（gitignore対象）
└── docker/
    ├── nginx/
    │   ├── prod.conf               # 本番環境Nginx設定
    │   ├── dev.conf                # 開発環境Nginx設定
    │   └── ssl/                    # SSL証明書ディレクトリ
    └── mariadb/
        └── init/
            └── 00-init.sql         # データベース初期化スクリプト
```

## よくある質問

### Q: 本番環境と開発環境の違いは？

- **本番環境**: 最適化されたビルド、Nginxリバースプロキシ、キャッシュ有効
- **開発環境**: ホットリロード、ソースマップ、ボリュームマウント

### Q: データベースのデータはどこに保存される？

Dockerボリューム内に保存されます。`docker volume ls`で確認できます。

### Q: SSL証明書はどう設定する？

`docker/nginx/ssl/`に証明書を配置し、`docker/nginx/prod.conf`のSSL設定を有効化してください。

### Q: 複数の環境を同時に起動できる？

可能です。開発環境と本番環境は異なるコンテナ名とネットワークを使用します。ただし、ポートの競合に注意してください。

### Q: 問題を削除するとどうなる？

問題を削除すると、関連する以下のデータが自動的に削除されます（カスケード削除）：
- 選択肢（choices）
- タグ（problem_tags）
- 学習記録（study_records）

これはデータの整合性を保つための設計です。

### Q: データベーススキーマを更新するには？

1. `prisma/schema.prisma`を編集
2. 以下のコマンドでスキーマを適用：
```bash
docker-compose --env-file .env.docker exec app npx prisma db push
```

**注意**: このプロジェクトではマイグレーションファイルを使用せず、`prisma db push`でスキーマを直接同期しています。

## サポート

問題が発生した場合は、以下を確認してください：

1. [トラブルシューティング](#トラブルシューティング)セクション
2. ログの確認: `docker-compose logs -f`
3. コンテナの状態: `docker-compose ps`
