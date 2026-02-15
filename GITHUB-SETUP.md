# Push this project to GitHub

## 1. Install Git (if needed)

- Download: **https://git-scm.com/download/win**
- Run the installer (keep default options).
- **Restart Cursor** (or open a new terminal) so `git` is recognized.

## 2. Create a new repo on GitHub

1. Go to **https://github.com** → sign in.
2. Click **+** → **New repository**.
3. Name it (e.g. `balihany-landing`). Leave "Add a README" **unchecked**.
4. Click **Create repository**.
5. Copy the repo URL, e.g. `https://github.com/yourusername/balihany-landing.git`

## 3. Run these commands in the project folder

Open a terminal in **Landing page Balihany** and run:

```powershell
cd "c:\Users\benki\OneDrive\Documents\Landing page Balihany"

git init
git add .
git commit -m "Initial commit: Balihany landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

## Or use the script

1. Edit **push-to-github.ps1** and set `$repoUrl` to your repo URL.
2. In PowerShell:
   ```powershell
   cd "c:\Users\benki\OneDrive\Documents\Landing page Balihany"
   .\push-to-github.ps1
   ```
