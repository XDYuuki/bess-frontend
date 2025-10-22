#!/bin/sh
set -e

echo "Starting Next.js application..."

# Verificar se o build existe
if [ ! -d ".next" ]; then
  echo "Build not found, running build..."
  npm run build
fi

# Iniciar o servidor
echo "Starting server on port ${PORT:-3000}..."
npm start
