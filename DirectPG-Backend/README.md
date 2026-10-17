# DirectPG Backend API Service

Production REST API for DirectPG, engineered with a dual-database architecture:
- **MongoDB Atlas**: Authentication, Password Encryption (`bcrypt`), JWT Sessions, and Sensitive Credentials (Masked Aadhaar/PAN e-KYC).
- **Supabase (PostgreSQL)**: Relational PG Properties, Room Inventories, Tenant Bookings, Scheduled Visits, and Reviews.

---

## 🚀 1-Click Deploy to Render

### Option A: Using Render Blueprint (Automatic)
1. Push this repository to GitHub.
2. In Render Dashboard, click **New +** -> **Blueprint**.
3. Select your repository. Render will automatically read `render.yaml` and configure the web service!
4. Add your `MONGODB_URI`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY` under Environment Variables.

### Option B: Manual Web Service Setup
1. In Render Dashboard, click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Root Directory**: `DirectPG-Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/health`
4. Add the following **Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/directpg?retryWrites=true&w=majority
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key
   FRONTEND_URL=https://your-frontend-domain.vercel.app,http://localhost:3000
   ```
5. Click **Deploy Web Service**.

---

## 🗄️ Database Setup Instructions

### 1. MongoDB Setup (Auth & Credentials)
1. Sign up for free at [MongoDB Atlas](https://cloud.mongodb.com).
2. Create a free M0 cluster.
3. Under **Database Access**, create a user with read/write privileges.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere).
5. Click **Connect** -> **Connect your application** and copy the connection string into `MONGODB_URI`.

### 2. Supabase Setup (Properties, Bookings & Visits)
1. Sign up for free at [Supabase](https://supabase.com).
2. Create a new project.
3. Go to the **SQL Editor** in your Supabase dashboard.
4. Open the [`supabase-schema.sql`](./supabase-schema.sql) file included in this directory, copy its entire contents, paste it into the Supabase SQL editor, and click **Run**.
5. Copy your **Project URL** and **anon public API key** from Project Settings -> API, and save them to `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

---

## 🛠️ Local Development
```bash
cd DirectPG-Backend
npm install
npm run dev
```
The server will start at `http://localhost:5000`.

Check health:
```bash
curl http://localhost:5000/health
```
