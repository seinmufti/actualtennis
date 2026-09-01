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
