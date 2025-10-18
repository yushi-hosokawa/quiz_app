# プログラミング学習復習Webアプリ 要件定義書

## 1. プロジェクト概要

### 1.1 目的
プログラミングおよび関連技術の学習内容を効率的に復習するためのWebアプリケーション。フラッシュカード形式で問題を出題し、学習進捗を可視化することで継続的な学習をサポートする。

### 1.2 対象ユーザー
- 個人利用（シングルユーザー）
- プログラミング学習者

### 1.3 技術スタック
- **フロントエンド・バックエンド**: Nuxt.js 3
- **データベース**: MariaDB / MySQL
- **ORM**: Prisma
- **スタイリング**: TailwindCSS
- **その他**: CSV インポート機能

---

## 2. 実装済み機能

### 2.1 問題管理機能 ✅

#### 2.1.1 問題タイプ
以下の3種類の問題形式を実装済み：
1. **選択式問題** ✅
   - 複数の選択肢から正解を選ぶ形式
   - 単一選択に対応

2. **記述式問題** ✅
   - テキスト入力で回答する形式
   - 自己判定方式

3. **プログラミング問題** ✅
   - コードエディタ機能
   - シンタックスハイライト対応

#### 2.1.2 問題属性
各問題は以下のメタデータを持つ：
- 問題文 ✅
- 問題タイプ（選択式/記述式/プログラミング）✅
- プログラミング言語 ✅
- ジャンル ✅
- 難易度 ✅
- タグ（複数設定可能）✅
- 正解/解説 ✅
- 作成日時・更新日時 ✅

#### 2.1.3 問題の登録・管理方法
- **手動登録** ✅: Webフォームからの直接入力
- **問題編集** ✅: 既存問題の編集機能
- **問題削除** ✅: 問題の削除機能
- **CSV一括登録** ✅: CSVファイルからのインポート
  - CSVフォーマット定義
  - バリデーション機能
  - エラー時の詳細表示

### 2.2 カテゴリ管理機能 ✅

#### 2.2.1 カテゴリの種類
問題を以下の軸で分類・管理：
1. **プログラミング言語** ✅
   - 例：JavaScript, Python, Go, TypeScript, SQL など
   - 動的な追加・削除が可能

2. **ジャンル** ✅
   - 例：アルゴリズム, データ構造, Web開発, データベース など
   - 動的な追加・削除が可能

3. **問題形式** ✅
   - 選択式, 記述式, プログラミング

#### 2.2.2 カテゴリ機能
- カテゴリの追加 ✅
- カテゴリの削除 ✅
- カテゴリごとの問題数表示 ✅

### 2.3 学習機能（フラッシュカード） ✅

#### 2.3.1 フラッシュカード表示
- 問題を1枚ずつカード形式で表示 ✅
- 表面：問題文 ✅
- 裏面：解答と解説 ✅
- カードをめくるアニメーション ✅

#### 2.3.2 学習モード
- **ランダム出題** ✅: 全問題からランダムに出題
- **学習設定** ✅: 出題数、言語、ジャンル、難易度でフィルタリング
- **復習モード** ✅: 間違えた問題を優先的に出題
- **セッション機能** ✅: 一度に解く問題数を設定可能

#### 2.3.3 解答記録
各学習セッションで以下を記録：
- 解答日時 ✅
- 問題ID ✅
- 正解/不正解 ✅
- ユーザーの回答内容 ✅
- セッション開始・終了時刻 ✅

### 2.4 学習データ管理・統計機能 ✅

#### 2.4.1 学習履歴
- 問題ごとの学習回数 ✅
- 正解率 ✅
- 最終学習日 ✅
- 過去の解答履歴 ✅

#### 2.4.2 進捗可視化
以下のデータを可視化：

1. **カレンダービュー** ✅
   - 日ごとの学習実施状況
   - 解いた問題数
   - ヒートマップ表示（GitHubスタイル）
   - 過去30日/90日/180日の選択可能

2. **統計ダッシュボード** ✅
   - 総問題数
   - 総セッション数
   - 総解答数
   - 全体正答率
   - カテゴリ別（言語・ジャンル）の学習状況
   - 最近の学習セッション履歴

3. **グラフ表示** ✅
   - 日別正答率の推移（過去14日）
   - 週別学習状況（過去12週）
   - 月別学習状況（過去12ヶ月）

4. **問題別統計** ✅
   - 各問題の正解率
   - 学習回数
   - 苦手な問題トップ10
   - 全問題の詳細統計テーブル（検索機能付き）

#### 2.4.3 データのエクスポート
- 学習データをCSV形式でエクスポート ✅
- BOM付きUTF-8でExcel対応 ✅

---

## 3. 非機能要件

### 3.1 パフォーマンス ✅
- ページ読み込み時間: 3秒以内
- 問題の切り替え: 1秒以内
- CSVインポート: 高速処理

### 3.2 使いやすさ ✅
- レスポンシブデザイン（PC・タブレット・スマートフォン対応）
- 直感的なUI/UX
- グラデーション・アニメーション効果
- トースト通知

### 3.3 セキュリティ ✅
- SQLインジェクション対策（Prisma使用）
- XSS対策
- CSVインポート時のバリデーション

### 3.4 拡張性 ✅
- 将来的な機能追加に対応できる設計
- モジュール化されたAPI構造

---

## 4. データベース設計

### 4.1 主要テーブル（実装済み）

#### 4.1.1 problems（問題テーブル） ✅
- id (Primary Key, Auto Increment)
- question_type (choice/text/code)
- question_text (TEXT)
- answer_text (TEXT, nullable)
- explanation (TEXT, nullable)
- language_id (Foreign Key, nullable)
- genre_id (Foreign Key, nullable)
- difficulty (VARCHAR, nullable)
- created_at (DateTime)
- updated_at (DateTime)

#### 4.1.2 languages（プログラミング言語テーブル） ✅
- id (Primary Key, Auto Increment)
- name (VARCHAR(50), unique)
- created_at (DateTime)

#### 4.1.3 genres（ジャンルテーブル） ✅
- id (Primary Key, Auto Increment)
- name (VARCHAR(100), unique)
- created_at (DateTime)

#### 4.1.4 choices（選択肢テーブル） ✅
- id (Primary Key, Auto Increment)
- problem_id (Foreign Key, Cascade Delete)
- choice_text (TEXT)
- is_correct (Boolean)
- display_order (Integer)

#### 4.1.5 study_sessions（学習セッションテーブル） ✅
- id (Primary Key, Auto Increment)
- session_start (DateTime)
- session_end (DateTime, nullable)
- total_questions (Integer)

#### 4.1.6 study_records（学習記録テーブル） ✅
- id (Primary Key, Auto Increment)
- session_id (Foreign Key, Cascade Delete)
- problem_id (Foreign Key)
- is_correct (Boolean)
- user_answer (TEXT, nullable)
- answered_at (DateTime)
- time_spent (Integer, nullable) // 秒単位

#### 4.1.7 problem_tags（タグテーブル） ✅
- id (Primary Key, Auto Increment)
- problem_id (Foreign Key, Cascade Delete)
- tag_name (VARCHAR(50))

---

## 5. 画面構成（実装済み）

### 5.1 実装済み画面

1. **ホーム画面** (`/`) ✅
   - アプリケーション概要
   - クイックスタートボタン
   - 主要機能へのナビゲーション

2. **問題一覧画面** (`/problems`) ✅
   - 問題のリスト表示
   - 言語・ジャンル・問題タイプでのフィルタリング
   - 検索機能
   - 問題の編集・削除
   - ページネーション

3. **問題作成画面** (`/problems/create`) ✅
   - 問題タイプの選択（選択式/記述式/コード）
   - 問題文・解答・解説の入力
   - カテゴリ・タグの設定
   - 選択肢の動的追加（選択式問題）

4. **問題編集画面** (`/problems/[id]/edit`) ✅
   - 既存問題の編集
   - 問題タイプに応じたフォーム
   - プレビュー機能

5. **学習画面** (`/study`) ✅
   - カード形式の問題表示
   - フリップアニメーション
   - 解答入力エリア
   - 自己判定機能
   - 学習セッションの進捗表示
   - 結果画面

6. **学習設定画面** (`/study/settings`) ✅
   - 出題数の設定
   - 言語フィルター
   - ジャンルフィルター
   - 難易度フィルター

7. **復習画面** (`/review`) ✅
   - 間違えた問題の一覧
   - 問題別統計情報
   - 復習セッションの開始

8. **統計画面** (`/stats`) ✅
   - タブナビゲーション
     - 概要タブ：全体統計・カテゴリ別統計・最近のセッション
     - カレンダータブ：ヒートマップカレンダー
     - グラフタブ：日別・週別・月別グラフ
     - 問題別統計タブ：苦手な問題・詳細統計テーブル
   - データエクスポート機能

9. **CSVインポート画面** (`/problems/import`) ✅
   - ファイルアップロード
   - フォーマットの説明
   - プレビュー機能
   - バリデーション
   - インポート実行
   - エラー表示

10. **カテゴリ管理画面** (`/categories`) ✅
    - 言語の一覧・追加・削除
    - ジャンルの一覧・追加・削除
    - 各カテゴリの問題数表示

---

## 6. API エンドポイント（実装済み）

### 6.1 問題管理API
- `GET /api/problems` - 問題一覧取得（フィルタリング・検索対応） ✅
- `GET /api/problems/[id]` - 問題詳細取得 ✅
- `POST /api/problems` - 問題作成 ✅
- `PUT /api/problems/[id]` - 問題更新 ✅
- `DELETE /api/problems/[id]` - 問題削除 ✅
- `GET /api/problems/random` - ランダム問題取得 ✅
- `GET /api/problems/review` - 復習問題取得 ✅
- `POST /api/problems/import` - CSVインポート ✅

### 6.2 カテゴリ管理API
- `GET /api/languages` - 言語一覧取得 ✅
- `POST /api/languages` - 言語追加 ✅
- `DELETE /api/languages/[id]` - 言語削除 ✅
- `GET /api/genres` - ジャンル一覧取得 ✅
- `POST /api/genres` - ジャンル追加 ✅
- `DELETE /api/genres/[id]` - ジャンル削除 ✅

### 6.3 学習セッションAPI
- `GET /api/sessions` - セッション一覧取得 ✅
- `POST /api/sessions` - セッション作成 ✅
- `POST /api/sessions/[id]/end` - セッション終了 ✅
- `POST /api/sessions/[id]/records` - 学習記録追加 ✅

### 6.4 統計API
- `GET /api/stats` - 全体統計取得 ✅
- `GET /api/stats/daily` - 日別統計（過去30日） ✅
- `GET /api/stats/calendar` - カレンダー統計（30/90/180日） ✅
- `GET /api/stats/weekly` - 週別統計（過去12週） ✅
- `GET /api/stats/monthly` - 月別統計（過去12ヶ月） ✅
- `GET /api/stats/recent-sessions` - 最近のセッション ✅
- `GET /api/stats/problems` - 問題別統計 ✅
- `GET /api/stats/weak-problems` - 苦手な問題トップN ✅
- `GET /api/stats/export` - 学習データCSVエクスポート ✅

---

## 7. CSVインポート仕様

### 7.1 CSVフォーマット ✅
```csv
question_type,question_text,answer_text,explanation,language,genre,difficulty,tags,choice1,choice2,choice3,choice4,correct_choice
```

### 7.2 フィールド説明
- **question_type**: "choice"(選択式) / "text"(記述式) / "code"(プログラミング)
- **question_text**: 問題文（必須）
- **answer_text**: 正解（記述式・プログラミングの場合）
- **explanation**: 解説
- **language**: プログラミング言語名
- **genre**: ジャンル名
- **difficulty**: 難易度（easy/medium/hard）
- **tags**: タグ（セミコロン区切り）
- **choice1-4**: 選択肢（選択式の場合のみ）
- **correct_choice**: 正解の選択肢番号（選択式の場合のみ、1-4）

### 7.3 サンプルCSV
```csv
question_type,question_text,answer_text,explanation,language,genre,difficulty,tags,choice1,choice2,choice3,choice4,correct_choice
choice,"JavaScriptでの配列の宣言方法として正しいものは？","","配列は[]を使って宣言します","JavaScript","基礎文法","easy","配列;基礎","let arr = []","let arr = {}","let arr = ()","let arr = <>",1
text,"CSSでフレックスボックスを有効にするプロパティは？","display: flex","display: flexを指定することでフレックスボックスレイアウトが有効になります","CSS","レイアウト","easy","CSS;フレックスボックス","","","","",""
code,"Pythonでリストの要素を逆順にする関数を書いてください","def reverse_list(lst):\n    return lst[::-1]","スライス記法[::-1]を使うことでリストを逆順にできます","Python","基礎文法","medium","Python;リスト","","","","",""
```

---

## 8. 開発フェーズ（完了状況）

### Phase 1: 基本機能（MVP） ✅ 完了
- データベース設計・構築 ✅
- 問題の手動登録機能 ✅
- 基本的なフラッシュカード学習機能 ✅
- 簡単な統計表示 ✅

### Phase 2: データ管理機能 ✅ 完了
- CSVインポート機能 ✅
- カテゴリ管理機能 ✅
- 問題の検索・フィルタリング ✅
- 問題の編集・削除 ✅

### Phase 3: 学習支援機能 ✅ 完了
- 学習履歴の記録 ✅
- カレンダービュー（ヒートマップ） ✅
- 統計ダッシュボード（4タブ構成） ✅
- 日別・週別・月別グラフ ✅
- 問題別詳細統計 ✅
- 苦手な問題リスト ✅
- CSVエクスポート機能 ✅

### Phase 4: 最適化・拡張 🔄 一部実装
- UI/UXの改善 ✅
- レスポンシブデザイン ✅
- アニメーション効果 ✅
- パフォーマンス最適化 ⏳
- 復習アルゴリズムの実装（間隔反復学習） ⏳

---

## 9. 今後の拡張案（未実装）

### 優先度: 高
- 間隔反復学習アルゴリズム（SM-2など）
- 解答時間の計測と表示
- 学習ストリーク機能
- 学習目標設定機能

### 優先度: 中
- 問題のお気に入り機能
- 問題のタグ検索
- カスタム学習モード
- 問題のインポート/エクスポート（個別）

### 優先度: 低（長期）
- マルチユーザー対応
- コード実行機能（サンドボックス環境）
- 画像・動画の問題への埋め込み
- 学習リマインダー機能
- スマートフォンアプリ化（PWA）
- 他のユーザーとの問題共有機能

---

## 10. プロジェクト構造

```
quiz/
├── app.vue                     # アプリケーションルート
├── nuxt.config.ts             # Nuxt設定
├── prisma/
│   └── schema.prisma          # データベーススキーマ
├── server/
│   ├── api/                   # APIエンドポイント
│   │   ├── languages/         # 言語管理API
│   │   ├── genres/            # ジャンル管理API
│   │   ├── problems/          # 問題管理API
│   │   ├── sessions/          # 学習セッションAPI
│   │   └── stats/             # 統計API
│   └── utils/
│       └── prisma.ts          # Prisma Client
├── pages/                     # ページコンポーネント
│   ├── index.vue              # ホーム
│   ├── study.vue              # 学習画面
│   ├── review.vue             # 復習画面
│   ├── stats.vue              # 統計画面
│   ├── categories/
│   │   └── index.vue          # カテゴリ管理
│   ├── problems/
│   │   ├── index.vue          # 問題一覧
│   │   ├── create.vue         # 問題作成
│   │   ├── import.vue         # CSVインポート
│   │   └── [id]/
│   │       └── edit.vue       # 問題編集
│   └── study/
│       └── settings.vue       # 学習設定
├── layouts/
│   └── default.vue            # デフォルトレイアウト
├── components/                # 再利用可能コンポーネント
│   └── Toast.vue              # トースト通知
├── composables/               # Composition API
├── assets/
│   └── css/
│       └── main.css           # TailwindCSSメイン
├── types/
│   └── index.ts               # TypeScript型定義
└── utils/                     # ユーティリティ関数
```

---

## 11. セットアップ手順

### 11.1 依存パッケージのインストール
```bash
npm install
```

### 11.2 環境変数の設定
`.env`ファイルを作成し、データベース接続情報を設定：
```env
DATABASE_URL="mysql://root:password123@localhost:3306/quiz_app"
```

### 11.3 データベースのセットアップ
```bash
# MariaDB/MySQLにログイン
mysql -u root -p

# データベースを作成
CREATE DATABASE quiz_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 11.4 Prismaマイグレーション
```bash
npx prisma migrate dev --name init
```

### 11.5 開発サーバーの起動
```bash
npm run dev
```

アプリケーションは `http://localhost:3000` で起動します。

---

## 12. 備考

- 本アプリは個人利用を想定しているため、ユーザー認証機能は実装していません
- データベースのrootパスワード: `password123`（開発環境用）
- CSVフォーマットはNotionやExcelからのエクスポートに対応
- すべての主要機能は実装済みで、動作確認済みです

---
学習設定画面の詳細設定について現在はクリックしないと表示されないような仕様になっていますが、常に表示されるように修正してほしいです。この時、無駄に学習開始ボタンまでにスクロールが発生しないようにしたいので、コンパクトに表示するようにしたいです。
具体的に出題数とランダムに出題するボタンを横並びで一行で表示してほしいです。また、出題数はデフォルトは空欄で、指定がない限りは条件に合うすべての問題を出題するようにしてください。
難易度については初級、中級、上級を一列すべてにチェックボックスが入った状態をデフォルトにして表示してください。
その下にタグを追加する部分を入れてください。


細かい画面の修正をお願いしたいです。
1. ホーム画面で「主な機能」は一番下に移動してください。
2. 学習統計のカレンダーをもう少しコンパクトなUIにしてください。また、デフォルトの表示を３０日にしてください。各日付が日の数字しかないので、10/1のように月もわかるようにしてください。tailwindのカレンダーとか使えないでしょうか？
3. グラフが表示されていません。縦軸の設定が固定値になっているかもしれません。取得できる内容に応じてください。必要あれば安全なライブラリをインストールしてください。

現在のプロジェクトを別の環境で利用できるようにdocker化したいです。docker化に必要なdockerファイルおよびdockercomposeファイルを作成して下さい。

## 13. バージョン履歴

### v1.0.0 (2025-10-16) - 初回リリース
- Phase 1-3の全機能実装完了
- 問題管理、学習機能、統計機能がすべて動作
- CSVインポート/エクスポート機能実装
- レスポンシブデザイン対応
- 統計ダッシュボード（4タブ構成）実装
