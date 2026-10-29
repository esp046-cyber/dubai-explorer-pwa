# Backend / serverless migration options

The app is static and reads `api/places.json`. To grow it:

- **Supabase / Postgres**: load `database/schema.sql`, expose a `places` view, fetch via REST.
- **Cloudflare Workers + D1/KV**: serve `/api/places` with edge caching.
- **Firebase (Firestore + Hosting)**: store places and user reviews; keep the service worker caching the API response.
- **Vercel / Netlify Functions**: wrap the JSON with filtering, pagination and review submission.

Keep the offline cache: change `dataUrl` in `config/app.config.js` and add the endpoint to `SHELL` in `service-worker.js`.
