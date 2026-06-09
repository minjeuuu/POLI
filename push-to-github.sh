#!/usr/bin/env bash
set -e

echo "=== POLI GitHub Push Helper ==="
read -p "Enter your GitHub username: " username
read -p "Enter your GitHub repository name: " repo

# Check if remote already exists
if git remote | grep -q 'origin'; then
    git remote remove origin
fi

git remote add origin "https://github.com/${username}/${repo}.git"
git branch -M main

echo "Staging any late changes..."
git add .
if ! git diff-index --quiet HEAD --; then
    git commit -m "Save latest before pushing"
fi

echo "Pushing main branch to GitHub..."
echo "Note: You will be prompted for your GitHub password. Use your GitHub Personal Access Token (PAT) as the password."
git push -u origin main

echo "=== SUCCESS ==="
echo "Code pushed successfully to https://github.com/${username}/${repo}"
