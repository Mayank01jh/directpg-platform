# DirectPG Web

The official web platform for **DirectPG** — Find Your Perfect PG Accommodation.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Custom CSS
- **State**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Maps**: Google Maps API
- **Payments**: Razorpay
- **Auth**: NextAuth.js

## Getting Started

1. Install dependencies:
   \\\ash
   npm install
   \\\

2. Copy environment variables:
   \\\ash
   cp .env.example .env.local
   \\\

3. Run development server:
   \\\ash
   npm run dev
   \\\

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\\\
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth routes (login, register)
│   ├── (main)/             # Main user routes (listings, booking, profile)
│   ├── (owner)/            # Owner routes (dashboard, properties)
│   ├── (admin)/            # Admin routes
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Reusable UI components (Button, Input, Modal)
│   ├── layout/             # Layout components (Navbar, Footer, Hero)
│   ├── listings/           # Listing-specific components
│   ├── booking/            # Booking flow components
│   ├── auth/               # Auth forms
│   ├── profile/            # Profile components
│   ├── owner/              # Owner dashboard components
│   ├── maps/               # Map components
│   └── shared/             # Shared utilities (Providers, SearchBar)
├── services/               # API service layer
├── hooks/                  # Custom React hooks
├── store/                  # Zustand stores
├── types/                  # TypeScript type definitions
├── constants/              # App constants
├── utils/                  # Helper utilities
└── styles/                 # Global styles
\\\

## Key Features

- 🏠 PG Listings with advanced search & filters
- 🗺️ Map-based search
- 📅 Online booking & payments (Razorpay)
- 👤 Tenant & Owner dashboards
- ⭐ Reviews & ratings
- 💬 Real-time chat
- 📱 Fully responsive design
- 🔒 Authentication (Email + Google OAuth)
- ❤️ Wishlist
- 🔔 Push notifications