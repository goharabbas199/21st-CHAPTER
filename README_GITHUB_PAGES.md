# Deploying this project to GitHub Pages (Vite)

This repo uses Vite and the `page-flip` npm package, so GitHub Pages must deploy the **built** output.

## One-time GitHub settings
1. In your repo, go to **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**

## Deploy
Push to `main`. GitHub Actions will build and deploy automatically.

Your site URL will be:
`https://<username>.github.io/<repo>/`
