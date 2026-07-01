# Review&RATE

A full-stack MERN app for browsing companies and reading/writing reviews.

## Stack
- **Client:** React 18, Vite, React Router v6, Tailwind CSS, Axios, lucide-react, react-hot-toast
- **Server:** Node.js, Express, MongoDB, Mongoose, express-validator

## Prerequisites
- Node.js 18+
- A MongoDB connection string (local install, Docker, or MongoDB Atlas)

## Setup

`client/` and `server/` are independent apps — install and run each on its own.

1. Configure environment variables:
   ```
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
   Edit `server/.env` and set `MONGO_URI` to your MongoDB connection string
   (e.g. your Atlas URI).

2. Install and seed the server:
   ```
   cd server
   npm install
   npm run seed
   ```

3. Install the client (in a separate terminal):
   ```
   cd client
   npm install
   ```

4. Run both, each in its own terminal:
   ```
   # terminal 1
   cd server && npm run dev

   # terminal 2
   cd client && npm run dev
   ```
   - Client: http://localhost:5173
   - Server: http://localhost:5050/api

   Note: the server defaults to port 5050 instead of 5000 because on macOS
   port 5000 is often occupied by the AirPlay Receiver (ControlCenter). If
   that's not an issue on your machine, feel free to change `PORT` back to
   5000 in `server/.env` (and update `VITE_API_BASE_URL` in `client/.env`
   to match).

## Project structure
```
server/   Express API, Mongoose models, controllers, routes
client/   React app (Vite), Tailwind, components, pages, hooks
```

## API overview
- `GET /api/companies?search=&city=&sort=` — list companies with computed average rating & review count
- `GET /api/companies/:id` — single company with stats
- `POST /api/companies` — create company
- `GET /api/companies/:id/reviews?sort=` — list reviews for a company
- `POST /api/companies/:id/reviews` — add a review
- `PATCH /api/reviews/:reviewId/like` — like a review (requires auth)
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `POST /api/upload` — uploads an image to Cloudinary, returns its URL

## Deployment (free tier: Vercel + Render)

Database is already external (MongoDB Atlas), so only the client and server
need hosting. This repo is already set up for a one-click-ish deploy of each:

### 1. Push to GitHub
```
git add .
git commit -m "Initial commit"
gh repo create review-and-rate --source=. --public --push
# or: create a repo on github.com and `git remote add origin <url> && git push -u origin main`
```

### 2. Backend → Render
1. Go to [render.com](https://render.com) → sign in with GitHub.
2. **New** → **Blueprint** → pick this repo. Render will read `render.yaml`
   at the repo root and pre-fill a free web service rooted at `server/`.
3. Render will prompt you to fill in the env vars marked `sync: false`:
   `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
   `CLOUDINARY_API_SECRET`, `CLIENT_URL` (you can put a placeholder for
   `CLIENT_URL` now and update it after step 3 gives you the real frontend URL).
4. Deploy. Render assigns the port automatically (`process.env.PORT` is
   already used in `server/src/index.js`) and gives you a URL like
   `https://review-and-rate-server.onrender.com`.
5. Note: the free tier spins down after 15 minutes of inactivity — the first
   request after idle takes ~30-50s to wake up.

### 3. Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → sign in with GitHub → **Add New Project** → pick this repo.
2. Set **Root Directory** to `client`.
3. Framework preset: Vite (auto-detected).
4. Add environment variable `VITE_API_BASE_URL` = `https://<your-render-url>/api`.
5. Deploy. `client/vercel.json` is already set up to rewrite all routes to
   `index.html`, so React Router's client-side routes (e.g. `/company/:id`)
   work correctly on refresh/direct navigation.

### 4. Wire it back together
Once you have the real Vercel URL, go back to the Render service's
environment variables and set `CLIENT_URL` to that exact URL (used for CORS).
Redeploy the backend for the change to take effect.

### 5. Seed data (optional)
Run the seed script once locally against the production `MONGO_URI` to
populate sample companies/reviews:
```
cd server
MONGO_URI="<your-atlas-uri>" node src/seed/seed.js
```
