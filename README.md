# Actual Tennis

Prototype for booking two 24-hour tennis courts. Games are 55 minutes (`:00` to `:55`) with a 5-minute changeover.

## Run locally

```bash
npm install
npm run dev
```

The startup banner prints local and network URLs for the frontend and backend.

## Production

```bash
npm run build
npm start
```

Express serves the API and the built React app on one port (`3001` by default, or `PORT`).

## Deploy to Vercel

```bash
npx vercel
npx vercel --prod
```

1. Link the project to your Vercel account when prompted.
2. In the Vercel dashboard, add **Blob** storage to the project (Storage → Create → Blob). This sets `BLOB_READ_WRITE_TOKEN` so bookings persist on serverless.
3. Production deploys from the `main` branch when the GitHub repo is connected.
