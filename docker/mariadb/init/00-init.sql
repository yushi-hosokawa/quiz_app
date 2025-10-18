-- データベース初期化スクリプト
-- このスクリプトはコンテナの初回起動時に自動実行されます

-- デフォルトの文字セットをUTF8mb4に設定
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- データベースの存在確認（docker-compose.ymlで作成されるため、通常は不要）
-- CREATE DATABASE IF NOT EXISTS quiz_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 初期データの投入が必要な場合はここに記述
-- 例：
-- USE quiz_app;
-- INSERT INTO languages (name) VALUES ('JavaScript'), ('Python'), ('Go');
