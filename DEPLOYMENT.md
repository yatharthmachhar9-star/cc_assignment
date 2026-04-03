# Deployment Guide: Autotagger to Vercel & Render

I have updated your repository to make it compatible with Vercel and Render deployments by removing hardcoded local paths and URLs. Ensure all changes are pushed to GitHub.

## 1. Deploy the Backend (Render)

Render is great for hosting your Flask Python application. 

1. Go to [Render](https://render.com/) and sign up or log in.
2. Click the **New +** button at the top right and select **Web Service**.
3. Connect your GitHub account and select the `cc_assignment` repository.
4. Fill out the configuration form:
   - **Name**: `autotagger-backend` (or similar)
   - **Region**: Any (e.g., US East)
   - **Branch**: `master`
   - **Root Directory**: `autotagger_backend` *(Critical: this tells Render to look inside your backend folder).*
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn server:app` or `python server.py`. (If asked, keeping the default is okay, as it relies on your Procfile).
5. Select the **Free instance type**.
6. Click **Create Web Service**.
7. Wait for the deployment to finish! Once it's live, copy the URL provided by Render (e.g., `https://autotagger-backend-xyz.onrender.com`).

---

## 2. Deploy the Frontend (Vercel)

Vercel is optimized specifically for Next.js applications like your frontend.

1. Go to [Vercel](https://vercel.com/) and sign up or log in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your `cc_assignment` repository.
4. In the **Configure Project** step:
   - **Project Name**: `autotagger-frontend`
   - **Framework Preset**: It should automatically detect **Next.js**.
   - **Root Directory**: Click the "Edit" button and select the `autotagger` directory! *(Critical)*
5. **Environment Variables**:
   - Open the "Environment Variables" section.
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Paste the Render URL you copied in the previous step (e.g., `https://autotagger-backend-xyz.onrender.com`). *Do not include a trailing slash.*
6. Click **Deploy**.
7. Wait around 2 minutes for Vercel to build and deploy your interface. 

> Once Vercel finishes, you will be given a `.vercel.app` link. Open it, and your full stack AutoTagger application will be live on the internet!
