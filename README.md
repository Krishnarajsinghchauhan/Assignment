# Review&RATE — Project Documentation

_A company review and rating platform, built as a full-stack web application._

This document explains the project from the very beginning to how it's hosted online, in plain language. You don't need a technical background to follow it — anything that requires a bit of developer knowledge is explained as we go.

---

## 1. What is this project?

**Review&RATE** is a website where people can:

- Browse a list of companies
- Search for a company by name or filter by city
- Add a new company to the list (with its own logo, address, and a short description)
- Open any company's page to read what people are saying about it
- Write their own review with a star rating (1 to 5 stars)
- Like or share a review they found helpful
- Create an account and log in, so the site knows who's reviewing what

Think of it like a mini version of Google Reviews or Glassdoor, but focused specifically on companies.

It's built as a **MERN** application — a common way of building modern websites using four technologies:

- **M**ongoDB — where all the data (companies, reviews, users) is stored
- **E**xpress — the "back office" that handles requests and talks to the database
- **R**eact — what actually renders on your screen and reacts to your clicks
- **N**ode.js — the engine that runs the back-office code

---

## 2. What you can do in the app (Features)

| Feature               | What it does                                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Browse companies      | See every company with its logo, address, rating, and number of reviews                                                                               |
| Search                | Type a company's name in the top search bar — the list filters instantly as you type                                                                  |
| Filter by city        | Type a city name and pick it from the suggestions that pop up (works for any major Indian city) — the list narrows to just that city                  |
| Sort                  | Reorder the list by Name, Average rating, Rating, or Location                                                                                         |
| Add a company         | Fill in a short form (name, address, city, founding date, an optional logo photo, and an optional description) and it appears in the list immediately |
| View a company's page | Click "Detail Review" on any company to see its full profile and every review it has received                                                         |
| Add a review          | Give your name, a short subject line, your review, and a star rating — it's posted instantly and the company's average rating updates automatically   |
| Sort reviews          | Arrange a company's reviews by Newest, Rating, or Relevance (most-liked first)                                                                        |
| Like a review         | Click the heart icon to show you found a review helpful (you need to be logged in to do this)                                                         |
| Share a review        | Click Share to copy a link to that company's page (or open your phone's native share menu, if available)                                              |
| Sign up / Log in      | Create an account with your name, email, and password, or log back in later — your session is remembered even if you close the browser                |

---

## 3. Bonus features (things added beyond the original brief)

While building this, a number of extra touches were added that weren't explicitly asked for, but make the app feel more complete and production-ready:

1. **Full user accounts (Sign Up / Login)** — with secure password storage and session tokens, not just placeholder buttons.
2. **Real photo uploads** — company logos are uploaded to **Cloudinary** (a cloud image hosting service), so logos are real images, not just placeholder text.
3. **"Like" requires an account** — this stops anonymous spam-liking and ties activity to a real user, with a friendly prompt to log in if you try to like while logged out.
4. **Smart city search** — instead of a plain text box, typing a city shows live suggestions from a list of 130+ Indian cities, and clicking one instantly filters the list — no extra button click needed.
5. **Extra data-quality checks**, beyond just "this field can't be empty":
   - A company can't be added twice under the same name
   - A company's "founded on" date can't be in the future
   - Names, locations, and review text all have sensible minimum lengths, so no one-letter junk entries slip through
6. **Company descriptions** — an optional short description of the company, shown both in the list and on its full profile page.
7. **Polished, responsive design** — the whole site is designed to look right on a phone, a tablet, and a desktop screen, with loading skeletons (soft gray placeholder shapes) while data is being fetched, instead of a blank page.
8. **Deployed live on the internet** — see Section 8 below for the actual links.

---

## 4. How the pieces fit together (Project flow)

Here's what happens, in plain terms, when someone uses the site:

1. **You open the website.** Your browser downloads the React app and shows you the company list page.
2. **The React app asks the server for data.** It sends a request like "give me all companies" to the backend server.
3. **The server asks the database.** It fetches the companies from MongoDB, does a bit of math (like calculating each company's average star rating from all its reviews), and sends the results back.
4. **The page fills in with real data.** Cards appear showing each company's name, logo, address, and rating.
5. **When you click "Add Company" or "Add Review"**, a popup form appears. When you hit Save, the browser sends your new data to the server, the server saves it to the database, and the page refreshes to show your new entry — all within a second or two.
6. **When you upload a logo**, the image itself is sent to Cloudinary (not stored on our own server), and only the resulting image _link_ is saved in our database — this keeps things fast and reliable.
7. **When you sign up or log in**, the server checks your details, and if they're correct, hands your browser a small "pass" (called a token) that proves who you are for future actions — like liking a review — without asking you to log in again every time.

---

## 5. Technology used (and why)

| Layer                   | Technology                        | Why                                                                                                                 |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Frontend (what you see) | React + Vite                      | React builds interactive interfaces; Vite makes the development and build process very fast                         |
| Styling                 | Tailwind CSS                      | A toolkit for consistent, clean styling without writing custom CSS files for every element                          |
| Frontend routing        | React Router                      | Lets the site have different pages (list, company detail) without full page reloads                                 |
| Backend (server logic)  | Node.js + Express                 | A lightweight, widely-used way to build the API that the frontend talks to                                          |
| Database                | MongoDB (hosted on MongoDB Atlas) | Stores all companies, reviews, and user accounts — Atlas means it's hosted in the cloud, not on a personal computer |
| Image hosting           | Cloudinary                        | Stores uploaded company logos reliably and serves them quickly                                                      |
| Authentication          | JWT (JSON Web Tokens) + bcrypt    | Industry-standard way to keep passwords encrypted and sessions secure                                               |
| Hosting (frontend)      | Vercel                            | Free hosting built specifically for sites like this React app                                                       |
| Hosting (backend)       | Render                            | Free hosting for the Node.js server                                                                                 |

---

## 6. Project folder structure (in simple terms)

```
Assignment/
├── client/       →  Everything the user's browser downloads and sees (the React app)
├── server/       →  The backend API that the browser talks to (Node.js + Express)
├── render.yaml   →  A config file that tells Render how to run the backend
└── README.md     →  A shorter, developer-focused version of this document
```

Inside `client/src/`, code is organized by purpose: `pages/` (full screens), `components/` (reusable pieces like buttons and cards), `api/` (code that talks to the backend), `context/` and `hooks/` (shared app state, like "is the user logged in").

Inside `server/src/`, the organization follows a standard backend pattern: `models/` (what the data looks like), `controllers/` (what happens when a request comes in), `routes/` (which URL triggers which controller), and `middleware/` (checks that run before the main logic, like "is this person logged in").

---

## 7. Environment variables (the settings/credentials the app needs)

The app needs a small set of secret settings to run — things like the database address and API keys. These are never written directly into the code; instead, they live in a file called `.env` that is **never uploaded to GitHub** (it's deliberately excluded for security).

> **Important:** Never share your real `.env` values (passwords, API keys, secrets) in an email, a document, or a public repository. Below is what each variable _is for_ — you generate your own real values when you set the project up.

### Server (`server/.env`)

| Variable                | What it's for                                                                              | Where you get it                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `PORT`                  | Which port the server listens on locally                                                   | You choose one, e.g. `5050`                                                                                      |
| `MONGO_URI`             | The address + login for your MongoDB database                                              | From [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — create a free cluster and copy the connection string |
| `CLIENT_URL`            | The website address that's allowed to talk to this server (a security measure called CORS) | Your frontend's URL (e.g. your Vercel address)                                                                   |
| `CLOUDINARY_CLOUD_NAME` | Identifies your Cloudinary account                                                         | From your [Cloudinary](https://cloudinary.com) dashboard                                                         |
| `CLOUDINARY_API_KEY`    | Authenticates image upload requests                                                        | Same Cloudinary dashboard                                                                                        |
| `CLOUDINARY_API_SECRET` | The private key paired with the API key above                                              | Same Cloudinary dashboard — keep this one especially private                                                     |
| `JWT_SECRET`            | A random string used to encrypt login sessions                                             | You generate this yourself — any long, random, unguessable string                                                |

### Client (`client/.env`)

| Variable            | What it's for                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | The web address of the backend server, so the frontend knows where to send requests (e.g. `https://your-backend.onrender.com/api`) |

A template for each of these already exists in the project as `server/.env.example` and `client/.env.example` — you just copy them and fill in your own real values.

---

## 8. Live demo

- **Live website (frontend):** `https://assignment-mu-ebon.vercel.app` _(replace with your current production URL — Vercel may issue a new one on each fresh project setup)_
- **Live backend API:** `https://assignment-915l.onrender.com/api`
- **Source code (GitHub):** `https://github.com/Krishnarajsinghchauhan/Assignment`

> **Note on first load:** the backend is hosted on a free tier that "sleeps" after 15 minutes without any visitors. If the site feels slow to load data the very first time, that's expected — it takes about 30-50 seconds to wake up, and every request after that is fast.

---

## 9. Running the project on your own computer

You don't need to know how to code to follow these steps — just a terminal (Command Prompt / Terminal app) and about 10 minutes.

### What you need first

- [Node.js](https://nodejs.org) installed (version 18 or newer)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for the database)
- A free [Cloudinary](https://cloudinary.com) account (for logo image uploads)

### Step-by-step

1. **Download the project** (either `git clone` the GitHub repo, or download the ZIP and extract it).

2. **Set up the backend:**

   ```
   cd server
   cp .env.example .env
   ```

   Open the new `.env` file in any text editor and fill in your real MongoDB, Cloudinary, and JWT values (see Section 7 above).

   Then install and start it:

   ```
   npm install
   npm run seed     (optional — fills the database with sample companies/reviews)
   npm run dev
   ```

   You should see `Server running on port 5050` in the terminal.

3. **Set up the frontend** (open a _second_ terminal window, keep the first one running):

   ```
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```

   You should see a message with a local address, usually `http://localhost:5173`.

4. **Open your browser** to `http://localhost:5173` — the site should load and work fully, including adding companies, reviews, signing up, and logging in.

---

## 10. How it's deployed online

The two halves of the app are hosted separately (this is completely normal for this style of app):

- **The backend (server) is hosted on [Render](https://render.com)** — it's connected directly to the GitHub repository, so every time new code is pushed to the `main` branch, Render automatically rebuilds and redeploys it.
- **The frontend (client) is hosted on [Vercel](https://vercel.com)** — same idea: connected to GitHub, auto-deploys on every push.
- **The database lives on MongoDB Atlas**, which is already a cloud service, so there was nothing extra to host for it.
- **Uploaded images live on Cloudinary**, also already cloud-hosted.

In short: pushing new code to GitHub is the only step needed to update the live site — both Render and Vercel pick it up automatically.

---

## 11. API routes (what the backend can do)

These are the "doors" the frontend knocks on to get or send data. All of them start with the base address (e.g. `https://assignment-915l.onrender.com/api`).

### Companies

| Method | Route            | What it does                                                                               |
| ------ | ---------------- | ------------------------------------------------------------------------------------------ |
| GET    | `/companies`     | Get the full list of companies. Supports `?search=`, `?city=`, and `?sort=` to filter/sort |
| GET    | `/companies/:id` | Get one specific company's full details                                                    |
| POST   | `/companies`     | Add a new company                                                                          |
| PATCH  | `/companies/:id` | Update a company's details                                                                 |
| DELETE | `/companies/:id` | Remove a company (and its reviews)                                                         |

### Reviews

| Method | Route                     | What it does                                                            |
| ------ | ------------------------- | ----------------------------------------------------------------------- |
| GET    | `/companies/:id/reviews`  | Get all reviews for one company. Supports `?sort=date/rating/relevance` |
| POST   | `/companies/:id/reviews`  | Add a new review to a company                                           |
| PATCH  | `/reviews/:reviewId/like` | Like a review _(you must be logged in)_                                 |

### Accounts

| Method | Route            | What it does                                                                            |
| ------ | ---------------- | --------------------------------------------------------------------------------------- |
| POST   | `/auth/register` | Create a new account                                                                    |
| POST   | `/auth/login`    | Log into an existing account                                                            |
| GET    | `/auth/me`       | Check who's currently logged in _(used internally to keep you logged in across visits)_ |

### Images

| Method | Route     | What it does                                         |
| ------ | --------- | ---------------------------------------------------- |
| POST   | `/upload` | Upload a logo image, get back a permanent link to it |

---

## 12. A note on submitting this task

When you send this back to Gitika, it's worth including all three of these together, so whoever reviews it can see the code, run it themselves, and try the live version without any setup:

1. The **GitHub repository link**
2. The **live website link** (Vercel)
3. This **documentation file** (either as a link to it on GitHub, or attached)

That combination shows both that the app genuinely works (live link) and that the code behind it is solid and readable (GitHub + docs).
