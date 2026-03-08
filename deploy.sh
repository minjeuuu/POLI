#!/bin/bash
# POLI — one-command deployment
# Usage: ./deploy.sh [fly|docker]
set -e

MODE=${1:-fly}

if [ "$MODE" = "fly" ]; then
  echo "=== Deploying to fly.io ==="
  if ! command -v flyctl &>/dev/null; then
    echo "Installing flyctl..."
    curl -L https://fly.io/install.sh | sh
    export PATH="$HOME/.fly/bin:$PATH"
  fi

  # Create app if it doesn't exist yet
  if ! flyctl status &>/dev/null; then
    flyctl launch --name poli-app --region sjc --no-deploy --copy-config
    flyctl volumes create poli_uploads --region sjc --size 1
    echo ""
    echo "Set your Claude API key:"
    echo "  flyctl secrets set CLAUDE_API_KEY=sk-ant-YOUR_KEY"
    echo "Then run this script again."
    exit 0
  fi

  flyctl deploy --remote-only
  echo ""
  echo "=== Deployed! ==="
  flyctl status
  flyctl open

elif [ "$MODE" = "docker" ]; then
  echo "=== Running locally with Docker Compose ==="
  if [ -z "$CLAUDE_API_KEY" ]; then
    echo "ERROR: set CLAUDE_API_KEY in your shell first:"
    echo "  export CLAUDE_API_KEY=sk-ant-YOUR_KEY"
    exit 1
  fi
  docker compose up --build -d
  echo ""
  echo "=== POLI is running at http://localhost:3000 ==="
  docker compose logs -f

else
  echo "Usage: ./deploy.sh [fly|docker]"
  echo "  fly    — deploy to fly.io (free tier, WebSocket support)"
  echo "  docker — run locally with Docker Compose"
  exit 1
fi
