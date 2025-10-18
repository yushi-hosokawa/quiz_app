# Quiz App - プログラミング学習復習アプリ

プログラミングおよび関連技術の学習内容を効率的に復習するためのWebアプリケーションです。フラッシュカード形式で問題を出題し、学習進捗を可視化します。

## 主な機能

- **3種類の問題形式**
  - 選択式問題（複数選択肢から選ぶ）
  - 記述式問題（テキスト入力）
  - プログラミング問題（コード入力）

- **カテゴリ管理**
  - プログラミング言語（JavaScript, Python, Go など）
  - ジャンル（アルゴリズム, データ構造, Web開発 など）
  - 問題形式による分類

- **学習機能**
  - フラッシュカード形式の学習
  - ランダム出題
  - 学習履歴の記録
  - 正解率の表示

- **データ管理**
  - CSVファイルからの一括インポート
  - 問題の作成・編集・削除

## 技術スタック

- **フロントエンド・バックエンド**: Nuxt.js 3
- **データベース**: MariaDB / MySQL
- **ORM**: Prisma
- **スタイリング**: TailwindCSS

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env`ファイルを確認し、データベース接続情報を設定してください：

```env
DATABASE_URL="mysql://root:password@localhost:3306/quiz_app"
```

### 3. データベースのセットアップ

MariaDBまたはMySQLをインストールし、データベースを作成します：

```bash
# MariaDB/MySQLにログイン
mysql -u root -p

# データベースを作成
CREATE DATABASE quiz_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Prismaマイグレーション

データベーススキーマを作成します：

```bash
npx prisma migrate dev --name init
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは `http://localhost:3000` で起動します。

## 使い方

### 問題の追加

#### 手動で追加
1. 画面上部の「問題一覧」をクリック
2. 「新規問題を追加」ボタンをクリック
3. 問題情報を入力して保存

#### CSVで一括追加
CSVファイルを用意して、問題をまとめてインポートできます。

**CSVフォーマット例：**
```csv
question_type,question_text,answer_text,explanation,language,genre,difficulty,tags,choice1,choice2,choice3,choice4,correct_choice
choice,"JavaScriptでの配列の宣言方法として正しいものは？","","配列は[]を使って宣言します","JavaScript","基礎文法","easy","配列;基礎","let arr = []","let arr = {}","let arr = ()","let arr = <>",1
text,"CSSでフレックスボックスを有効にするプロパティは？","display: flex","display: flexを指定することでフレックスボックスレイアウトが有効になります","CSS","レイアウト","easy","CSS;フレックスボックス","","","","",""
code,"Pythonでリストの要素を逆順にする関数を書いてください","def reverse_list(lst):\n    return lst[::-1]","スライス記法[::-1]を使うことでリストを逆順にできます","Python","基礎文法","medium","Python;リスト","","","","",""
```

### 学習の開始

1. トップページで「学習開始」をクリック
2. ランダムに10問が出題されます
3. 問題に答えた後、「解答を見る」をクリック
4. 正解・不正解を自己判定して次の問題へ進みます
5. 全問終了後、正答率が表示されます

## プロジェクト構造

```
quiz/
├── app.vue                 # アプリケーションのエントリーポイント
├── nuxt.config.ts         # Nuxt設定ファイル
├── prisma/
│   └── schema.prisma      # Prismaスキーマ定義
├── server/
│   ├── api/               # APIエンドポイント
│   │   ├── languages/     # 言語API
│   │   ├── genres/        # ジャンルAPI
│   │   ├── problems/      # 問題API
│   │   └── sessions/      # 学習セッションAPI
│   └── utils/
│       └── prisma.ts      # Prisma Clientのシングルトン
├── pages/
│   ├── index.vue          # ホームページ
│   └── study.vue          # 学習画面
├── layouts/
│   └── default.vue        # デフォルトレイアウト
├── components/            # Vue コンポーネント
├── assets/
│   └── css/
│       └── main.css       # TailwindCSSメイン
├── types/
│   └── index.ts           # TypeScript型定義
└── requirements.md        # 要件定義書
```

## データベーススキーマ

主要なテーブル：

- **languages** - プログラミング言語
- **genres** - ジャンル
- **problems** - 問題
- **choices** - 選択肢
- **problem_tags** - タグ
- **study_sessions** - 学習セッション
- **study_records** - 学習記録

詳細は `prisma/schema.prisma` を参照してください。

## 今後の拡張予定

- 統計ダッシュボード（カレンダービュー、グラフ表示）
- CSVインポート機能のUI実装
- 問題一覧・編集画面
- 間隔反復学習アルゴリズム（SM-2）
- カテゴリ別フィルタリング
- 検索機能
- データエクスポート

## ライセンス

MIT

## 作者

個人利用向けのプロジェクトです。
