# Deploy from iPhone (no code, no Codespaces)

1. Download `dubai-tourist-pwa.zip` and open it in the **Files** app (tap to unzip).
2. In Safari, go to **github.com** and sign in. Tap **+** > **New repository**. Name it `dubai-tourist-pwa`, set **Public**, create it.
3. Tap **uploading an existing file** (or Add file > Upload files).
4. In the picker choose **Browse** and select the **contents** of the unzipped folder (all files and folders, including `.gitignore` if visible). Note: GitHub's iOS picker may not upload nested folders in one go; upload `assets`, `api`, `config`, etc. folder-by-folder if needed, or use the Desktop site (Aa > Request Desktop Website) and drag-and-drop on iPad.
5. Tap **Commit changes**.
6. Go to **Settings > Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, tap **Save**.
7. After about 1 minute your app is live at `https://YOUR-USERNAME.github.io/dubai-tourist-pwa/`.
8. Open that URL in Safari, tap **Share > Add to Home Screen**. It now works offline.
9. Replace `YOUR-USERNAME` in `sitemap.xml` and `robots.txt` with your username.
