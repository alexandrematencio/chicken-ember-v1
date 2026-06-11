#!/bin/bash
# Déploiement manuel GitHub Pages (utile tant que GitHub Actions est verrouillé côté billing)
set -e
cd "$(dirname "$0")/.."
rm -rf .output
NUXT_APP_BASE_URL=/chicken-ember-v1/ npx nuxi generate
touch .output/public/.nojekyll
cd .output/public
rm -rf .git
git init -q && git checkout -q -b gh-pages
git add -A && git commit -q -m "deploy: $(date '+%Y-%m-%d %H:%M')"
git push -f https://github.com/alexandrematencio/chicken-ember-v1.git gh-pages
echo "✓ https://alexandrematencio.github.io/chicken-ember-v1/"
