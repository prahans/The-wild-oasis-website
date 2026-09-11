# 🌲 The Wild Oasis Website

A modern full-stack cabin reservation website built with **Next.js**, **React**, **TypeScript**, **Supabase**, and **Auth.js / NextAuth**.

The Wild Oasis allows guests to explore luxury cabins in the Italian Dolomites, view cabin details and availability, authenticate with Google, create reservations, manage existing bookings, and update their guest profile.

## 🌐 Live Demo

**Live Website:** https://the-wild-oasis-website-zeta-puce.vercel.app/

**GitHub Repository:** https://github.com/prahans/The-wild-oasis-website

---

## ✨ Features

- 🏕️ Browse available luxury cabins
- 🔎 Filter cabins by guest capacity
- 📄 View detailed information for individual cabins
- 📅 Select reservation dates with an interactive date picker
- 🔐 Sign in securely with Google
- 👤 Protected guest account area
- 🛏️ Create cabin reservations
- ✏️ Edit existing reservations
- 🗑️ Delete reservations
- 🧑 Update guest profile information
- 🌍 Store nationality and country information
- ⚡ Server Actions for secure server-side mutations
- 🔄 Revalidation after profile and reservation updates
- 🧭 Dynamic routes for individual cabin pages
- 🚀 Static generation for cabin detail routes
- ⏳ Loading, error, and not-found states
- 📱 Responsive modern UI
- ☁️ Supabase-powered database
- ▲ Deployed on Vercel

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Heroicons**
- **React Day Picker**
- **date-fns**

### Backend / Data

- **Next.js Server Actions**
- **Supabase**
- **Supabase JavaScript Client**

### Authentication

- **Auth.js / NextAuth v5**
- **Google OAuth**

### Deployment

- **Vercel**

---

## 🧠 Concepts Used

This project demonstrates several important modern Next.js concepts:

- Next.js App Router
- React Server Components
- Client Components
- Server Actions
- Dynamic Routes
- `generateMetadata`
- `generateStaticParams`
- Suspense and loading states
- Route protection
- Authentication and authorization
- Form handling and validation
- Database CRUD operations
- Cache revalidation
- URL search parameters
- Environment variables
- TypeScript type safety

---

## 📂 Project Structure

```text
The-wild-oasis-website/
├── app/
│   ├── _components/
│   ├── _lib/
│   │   ├── actions.ts
│   │   ├── auth.ts
│   │   ├── data-service.ts
│   │   └── supabase.ts
│   ├── _styles/
│   ├── _types/
│   ├── about/
│   ├── account/
│   │   ├── profile/
│   │   └── reservations/
│   ├── api/
│   │   └── auth/
│   ├── cabins/
│   │   ├── [cabinId]/
│   │   └── thankyou/
│   ├── login/
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── middleware.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/prahans/The-wild-oasis-website.git
cd The-wild-oasis-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory.

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

AUTH_SECRET=your_auth_secret
```

> Never commit your real environment-variable values to GitHub.

### 4. Run the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint.

---

## 🔐 Authentication Flow

Authentication is handled using **Auth.js / NextAuth** with the **Google OAuth provider**.

When a user signs in:

1. Google authenticates the user.
2. The application checks whether a guest with that email already exists.
3. If not, a new guest record is created in Supabase.
4. The guest ID is attached to the authenticated session.
5. Protected account and reservation features become available.

---

## 🛏️ Reservation Flow

Guests can:

1. Browse and filter cabins.
2. Open a cabin details page.
3. Select check-in and check-out dates.
4. Choose the number of guests.
5. Add optional observations.
6. Create the reservation.
7. View reservations from their account.
8. Edit or delete reservations later.

Reservation mutations are performed on the server and validated against the authenticated guest before updates or deletions are allowed.

---

## 🗄️ Database

The application uses **Supabase** for persistent data storage.

The main application data includes:

- Cabins
- Guests
- Bookings
- Settings

Database access is centralized through the application's data-service layer and server actions.

---

## 🚀 Deployment

The application is deployed on **Vercel**.

Production environment variables should be configured in the Vercel project settings before deploying.

---

## 🎯 What I Learned

While building this project, I practiced and improved my understanding of:

- Building full-stack applications with Next.js
- Server Components and Client Components
- Server-side data fetching
- Authentication with Google OAuth
- Protecting authenticated routes
- Working with Supabase
- Building reservation workflows
- Secure CRUD operations
- Server Actions and cache revalidation
- Dynamic routing and static generation
- TypeScript in a production-style Next.js application
- Deploying a full-stack Next.js application to Vercel

---

## 👨‍💻 Author

**Anurag Panuhar**

- GitHub: https://github.com/prahans
- LinkedIn: https://www.linkedin.com/in/prahans-panuhar-786265381/

---

If you like this project, consider giving the repository a ⭐.
