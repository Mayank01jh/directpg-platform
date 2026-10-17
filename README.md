# DirectPG — Full-Stack PG & Coliving Platform

DirectPG is a high-performance, zero-brokerage PG & hostel accommodation platform engineered with a decoupled architecture for independent scaling:
- **Frontend (`DirectPG-Web`)**: Next.js 15 App Router designed for **Vercel** deployment.
- **Backend (`DirectPG-Backend`)**: Express REST API designed for **Render** deployment.
- **Dual Database Architecture**:
  - 🍃 **MongoDB Atlas**: Manages user accounts, authentication, bcrypt security, JWT sessions, and sensitive KYC credentials (masked Aadhaar, PAN, emergency contacts).
  - ⚡ **Supabase (PostgreSQL)**: Manages relational PG property listings, room inventories, tenant bookings, scheduled walkthrough visits, and verified tenant reviews.

---

## 📁 Repository Structure

```
PG APP/
├── DirectPG-Web/                  # Frontend Next.js 15 Web Application
│   ├── src/app/                   # App Router pages (Home, Listings, Booking, Dashboard, Auth)
│   ├── src/components/            # UI, Layout, Listings & Auth components
│   ├── src/services/              # API clients calling Render backend
│   ├── vercel.json                # Vercel 1-click deployment configuration
│   └── .env.example               # Frontend environment variables template
│
├── DirectPG-Backend/              # Backend REST API Service
│   ├── src/server.js              # Express server with CORS & rate limiting
│   ├── src/config/db.js           # MongoDB Atlas connection (Auth & KYC)
│   ├── src/config/supabase.js     # Supabase PostgreSQL client (Properties & Bookings)
│   ├── src/models/User.js         # MongoDB Mongoose Schema for Users & Credentials
│   ├── src/routes/auth.js         # MongoDB Auth (Register, Login, Me, KYC)
│   ├── src/routes/properties.js   # Supabase Properties & Room Plans
│   ├── src/routes/bookings.js     # Supabase Bookings & Payment tracking
│   ├── src/routes/visits.js       # Supabase In-Person & Virtual visits
│   ├── supabase-schema.sql        # Full DDL schema, RLS policies & initial seed data
│   ├── render.yaml                # Render Blueprint deployment configuration
│   └── .env.example               # Backend environment variables template
│
├── .gitignore                     # Monorepo git ignore rules
└── README.md                      # Deployment & setup documentation
```

---

## 🚀 How to Push to Your New GitHub Repository

Run these commands in your terminal from the project root:

```bash
# 1. Check git status
git status

# 2. Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# 3. Rename branch to main if needed
git branch -M main

# 4. Push your code to GitHub
git push -u origin main
```

---

## ☁️ Backend Deployment: Render (Node.js Web Service)

### Method A: Automated via Render Blueprint (`render.yaml`)
1. Log in to [Render](https://render.com).
2. Click **New +** -> **Blueprint**.
3. Select your newly pushed GitHub repository.
4. Render will read `render.yaml` automatically and configure the service.
5. In the Environment Variables step, enter your MongoDB and Supabase credentials.

### Method B: Manual Web Service
1. In Render, click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Set the following settings:
   - **Name**: `directpg-backend`
   - **Region**: Singapore (or nearest to your audience)
   - **Root Directory**: `DirectPG-Backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/health`
4. Add Environment Variables:
   | Variable | Example Value | Description |
   |---|---|---|
   | `NODE_ENV` | `production` | Production environment |
   | `PORT` | `10000` | Render internal port |
   | `JWT_SECRET` | `generate-a-random-32-char-string` | JWT auth secret |
   | `JWT_REFRESH_SECRET` | `generate-a-random-32-char-string` | JWT refresh secret |
   | `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/directpg` | MongoDB Atlas URI |
   | `SUPABASE_URL` | `https://xyzproject.supabase.co` | Supabase Project URL |
   | `SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Supabase anon key |
   | `FRONTEND_URL` | `https://your-app.vercel.app,http://localhost:3000` | CORS allowed origins |
5. Click **Create Web Service**. Your API will be live at `https://directpg-backend.onrender.com`.

---

## ⚡ Frontend Deployment: Vercel (Next.js 15)

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Under **Root Directory**, click **Edit** and select **`DirectPG-Web`**.
5. Framework Preset will automatically detect **Next.js**.
6. Under **Environment Variables**, add:
   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_APP_NAME` | `DirectPG` |
   | `NEXT_PUBLIC_APP_URL` | `https://your-vercel-domain.vercel.app` |
   | `NEXT_PUBLIC_API_BASE_URL` | `https://directpg-backend.onrender.com/api` |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xyzproject.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_supabase_anon_key` |
7. Click **Deploy**. Your frontend is live with automatic SSL and edge CDN caching!

---

## 🗄️ Database Setup & Dual-DB Architecture

### 1. MongoDB Atlas Setup (Authentication & Sensitive Credentials)
1. Register for free at [MongoDB Atlas](https://cloud.mongodb.com).
2. Create an **M0 Free Cluster**.
3. Under **Database Access**, add a database user with password.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allows Render to connect).
5. Click **Connect** -> **Drivers (Node.js)** and copy your connection string.
6. Replace `<password>` with your database user password and paste into `MONGODB_URI`.

### 2. Supabase Setup (Properties, Rooms, Bookings, Visits, Reviews)
1. Register for free at [Supabase](https://supabase.com).
2. Create a new project.
3. In the left navigation, open the **SQL Editor**.
4. Open [`DirectPG-Backend/supabase-schema.sql`](./DirectPG-Backend/supabase-schema.sql) in this repository, copy all contents, paste it into the Supabase SQL editor, and click **Run**.
5. This script creates:
   - `properties` table with indices
   - `room_plans` table
   - `bookings` table
   - `scheduled_visits` table
   - `reviews` table
   - Row Level Security (RLS) policies
   - Sample verified seed listings in Bangalore, Hyderabad, and Pune.
6. Navigate to **Project Settings** -> **API** and copy:
   - **Project URL** -> `SUPABASE_URL`
   - **Project API Keys (`anon` `public`)** -> `SUPABASE_ANON_KEY`

---

## 💻 Local Development

### 1. Run the Backend API:
```bash
cd DirectPG-Backend
npm install
npm run dev
# Server running at http://localhost:5000
# Health check: http://localhost:5000/health
```

### 2. Run the Next.js Frontend:
```bash
cd DirectPG-Web
npm install
npm run dev
# Frontend running at http://localhost:3000
```
