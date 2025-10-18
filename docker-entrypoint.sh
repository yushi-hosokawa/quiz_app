#!/bin/sh
set -e

echo "Starting Quiz App..."

# データベースの接続を待機
echo "Waiting for database connection..."
max_retries=30
counter=0

until npx prisma db push --skip-generate 2>/dev/null || [ $counter -eq $max_retries ]; do
  counter=$((counter + 1))
  echo "Waiting for database... (attempt $counter/$max_retries)"
  sleep 2
done

if [ $counter -eq $max_retries ]; then
  echo "Error: Could not connect to database after $max_retries attempts"
  exit 1
fi

echo "Database connection established"

# Prismaマイグレーションの実行
echo "Running database migrations..."
npx prisma db push --skip-generate

echo "Database is ready"

# 渡されたコマンドを実行
exec "$@"
