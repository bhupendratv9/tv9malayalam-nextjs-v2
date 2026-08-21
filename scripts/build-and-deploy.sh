#!/bin/bash
# ─────────────────────────────────────────────────────────────
# build-and-deploy.sh
# Builds the Next.js app, deploys static assets, and restarts PM2
# ─────────────────────────────────────────────────────────────
# Usage:
#   ./scripts/build-and-deploy.sh
#   OR
#   npm run deploy
# ─────────────────────────────────────────────────────────────

set -e  # Exit on any error

# ─── Configuration ───
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STATIC_DEPLOY_DIR="/var/www/html/alphapublish/tv9up-nextjs"
PM2_APP_NAME="${PM2_APP_NAME:-tv9up-nextjs}"  # Override via env or change default here

echo "================================================"
echo " TV9 Tamil — Build & Deploy"
echo "================================================"
echo ""
echo "📁 Project: $APP_DIR"
echo "📦 Static:  $STATIC_DEPLOY_DIR"
echo "🔄 PM2:     $PM2_APP_NAME"
echo ""

# ─── Step 1: Build ───
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔨 Step 1: Building Next.js app..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd "$APP_DIR"
npx next build

echo ""
echo "✅ Build completed successfully"
echo ""

# ─── Step 2: Deploy static assets ───
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📂 Step 2: Deploying static assets..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

SOURCE_DIR="$APP_DIR/.next/static"
TARGET_DIR="$STATIC_DEPLOY_DIR/_next/static"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Error: .next/static not found!"
  exit 1
fi

# Create target directory
mkdir -p "$TARGET_DIR"

# Sync static files (delete old files that no longer exist)
rsync -a --delete "$SOURCE_DIR/" "$TARGET_DIR/"

echo "✅ Static assets deployed to $TARGET_DIR"
echo ""

# ─── Step 3: Restart PM2 ───
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔄 Step 3: Restarting PM2 process..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if pm2 describe "$PM2_APP_NAME" > /dev/null 2>&1; then
  pm2 reload "$PM2_APP_NAME"
  echo "✅ PM2 reloaded ($PM2_APP_NAME)"
else
  echo "⚠️  PM2 process '$PM2_APP_NAME' not found. Starting fresh..."
  pm2 start npm --name "$PM2_APP_NAME" -- start
  pm2 save
  echo "✅ PM2 started ($PM2_APP_NAME)"
fi
echo ""

# ─── Done ───
echo "================================================"
echo "🎉 Deploy complete!"
echo "================================================"
echo ""
echo "  App:    https://app.tv9tamil.com"
echo "  Static: https://appstatic.tv9tamil.com/_next/static/"
echo ""
pm2 status "$PM2_APP_NAME"
