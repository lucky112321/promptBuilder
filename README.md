# 🔥 Prompt Builder – AI Prompt Builder for Creators & Businesses

Production-style MERN SaaS application for generating high-converting AI prompts with authentication, plan limits, payment flows, and polished frontend UX.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Axios, React Router
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, MVC architecture
- **AI Layer:** OpenAI abstraction service with deterministic fallback formatting
- **Payments:** Razorpay order + verification routes for subscription monetization

## Project Structure

```txt
/backend
  /config
  /controllers
  /middleware
  /models
  /routes
  /services
  /utils
/frontend
  /src
    /api
    /components
    /hooks
    /layouts
    /pages
```

## Features Implemented

- Secure JWT authentication (`register`, `login`, `me`)
- User model fields:
  - `name`, `email`, `password` (bcrypt)
  - `plan`, `planExpiry`, `promptsUsedToday`, `purchasedPacks[]`, `createdAt`
- Prompt generation engine (`POST /api/prompt/generate`) with:
  1. auth guard
  2. daily plan limit checks
  3. system prompt strategy
  4. AI service call
  5. guaranteed code-block formatted output
- Razorpay monetization routes:
  - `POST /api/payment/create-order`
  - `POST /api/payment/verify`
- Subscription plans:
  - Free: 5/day
  - Starter ₹49/month: 50/day
  - Pro ₹149/month: unlimited
  - Yearly ₹999/year: unlimited + badge support in UI
- Premium-style UI:
  - hero section + template starter cards
  - auth screens
  - pricing cards with highlight
  - dashboard prompt generator panel

## Setup

### 1) Install dependencies

```bash
npm run install:all
```

### 2) Configure environment

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Fill your values in `backend/.env`:
- `MONGO_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY` (optional, fallback mock formatter is used if omitted)
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` (optional for live checkout)

### 3) Run apps

```bash
npm run dev:backend
npm run dev:frontend
```

Backend runs on `http://localhost:5000` and frontend on `http://localhost:5173`.

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Prompt
- `POST /api/prompt/generate`

### Payment
- `POST /api/payment/create-order`
- `POST /api/payment/verify`

## Notes

- If Razorpay keys are absent, backend returns a mock order to keep local development unblocked.
- If OpenAI key is absent, prompt generation still returns structured conversion-focused prompt output in code blocks.
