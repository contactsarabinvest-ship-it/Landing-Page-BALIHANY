# Run this script AFTER creating a new empty repo on GitHub.
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your GitHub username and repo name.

$repoUrl = "https://github.com/contactsarabinvest-ship-it/Landing-Page-BALIHANY.git"

Set-Location $PSScriptRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git not found. Install from https://git-scm.com and restart the terminal." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path .git)) {
    git init
    git add .
    git commit -m "Initial commit: Balihany landing page"
    git branch -M main
}

git remote remove origin 2>$null
git remote add origin $repoUrl
git push -u origin main

Write-Host "Done. Check your repo at: $repoUrl" -ForegroundColor Green
