# Deployment Guide: IMS Prototype

This guide will help you host your IMS Prototype live on the web using **Vercel**, which is free and optimized for React/Vite applications.

## Prerequisites
- A [GitHub](https://github.com/) account.
- A [Vercel](https://vercel.com/) account (you can sign up with GitHub).
- The project code pushed to a GitHub repository.

---

## Option 1: Deploy via Vercel Dashboard (Recommended)

This is the easiest method and sets up automatic deployments whenever you push code changes.

1.  **Push to GitHub**:
    - Ensure your latest code is committed and pushed to a GitHub repository.
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2.  **Import Project in Vercel**:
    - Go to your [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Select your GitHub repository from the list and click **"Import"**.

3.  **Configure Build Settings**:
    - Vercel usually detects Vite automatically.
    - **Framework Preset**: `Vite`
    - **Root Directory**: `./` (default)
    - **Build Command**: `npm run build` (default)
    - **Output Directory**: `dist` or `build` (Vite defaults to `dist`, but check your `vite.config.ts` if changed. Our project uses `build` based on recent logs).
        - *Note:* If the build fails saying "Output directory not found", change the Output Directory setting in Vercel to `build`.

4.  **Deploy**:
    - Click **"Deploy"**.
    - Wait for the build to complete (approx. 1-2 minutes).
    - Once done, you will get a live URL (e.g., `ims-prototype.vercel.app`).

---

## Option 2: Deploy via Vercel CLI

If you prefer using the terminal:

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Login**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run the following command in your project root:
    ```bash
    vercel
    ```
    - Follow the prompts (Accept defaults for most questions).
    - When asked `Which settings should be used?`, verify that "Output Directory" is set to `build` (since our local build output to `build/`).

4.  **Production Deploy**:
    To deploy to production (not a preview URL):
    ```bash
    vercel --prod
    ```

---

## Troubleshooting

### "404 Not Found" on Refresh
Single Page Applications (SPAs) like this one need a special configuration file to handle routing on the server side.

If you face 404 errors when refreshing pages (e.g., `/student/dashboard`), create a file named `vercel.json` in your root directory with this content:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Then push the changes to GitHub.

### Build Fails
- Check the "Build Logs" in Vercel.
- Ensure `npm run build` works locally (we verified this!).
- Ensure all dependencies are in `package.json`.
