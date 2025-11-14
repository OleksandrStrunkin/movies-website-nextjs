# Movies Website (Next.js)

A simple movie discovery website built with Next.js (App Router) and TypeScript. This repository demonstrates a small full‑stack app with server and client components, Next.js API routes, MongoDB (Mongoose), NextAuth authentication, and TMDB integration.

**Quick Links**
- **Dev:** `npm run dev`
- **Build:** `npm run build` then `npm start`
- **Tests:** `npm test`
- **Lint:** `npm run lint`

**Prerequisites**
- Node.js v18+ and npm
- A running MongoDB instance (connection string in `MONGODB_URI`)

**Environment variables**
Create a `.env.local` with at least the following values:

- `MONGODB_URI` : MongoDB connection string
- `TMDB_API_KEY` : TMDB API key (used by `lib/api/tmdb.ts`)
- `NEXTAUTH_URL` : Base URL for NextAuth
- `NEXTAUTH_SECRET` : Secret for NextAuth
- (Optional) OAuth client IDs/secrets for Google login — check `app/api/auth/google-login/route.ts` for exact names

**Run locally**
1. Install dependencies:

```bash
npm install
```

2. Start development server (uses Turbopack):

```bash
npm run dev
```

If you have issues with Turbopack, run `npx next dev` (without `--turbopack`) to fall back to the classic dev server.

**Build & Run (production)**

```bash
npm run build
npm start
```

**Testing**
- Unit and component tests use Jest and Testing Library. Example tests live in `components/__tests__/` and `app/api/auth/__test__/`.
- Run all tests: `npm test`.

**Project structure (important files)**
- `app/` — Next.js App Router pages, layouts, and `app/api/**/route.ts` API handlers.
- `components/` — React components and client UI. Tests in `components/__tests__/`.
- `lib/` — data access and API wrappers:
  - `lib/mongodb.ts` — MongoDB connection helper
  - `lib/models/` — Mongoose models (e.g., `User.ts`)
  - `lib/api/tmdb.ts` — TMDB wrapper
  - `lib/api/*.ts` — client/server helpers for auth, favorites, trending
- `lib/hook/` — React Query hooks and mutation hooks used across components.
- `lib/providers/QueryClientProviderWrapper.tsx` — React Query provider used by client code.
- `store/` — client-side Zustand stores (`themeStore.ts`, `useAuthStore.ts`).
- `next.config.ts` — Next.js configuration.
- `package.json` — scripts and dependency list.

**Architecture notes & conventions**
- App Router first: prefer server components for pages and data fetching. Add `"use client"` to components that require browser APIs or hooks.
- Centralize external API calls in `lib/api/` rather than calling axios in components.
- Use React Query hooks in `lib/hook/queries` for client caching and mutations; wrap the app with `QueryClientProviderWrapper`.
- API routes follow Next.js route handler conventions. See `app/api/favorite/route.ts` for favorites and `app/api/auth/[...nextauth]/route.ts` for NextAuth.

**Common tasks (examples)**
- Add a new API route: create `app/api/<feature>/route.ts` and export `GET` / `POST` handlers returning `NextResponse` or `Response`.
- Add a client component: put file in `components/`, add `"use client"` at top if it uses hooks/state.
- Add a data hook: create a hook in `lib/hook/queries` and use React Query patterns.

**Integration points**
- TMDB integration: `lib/api/tmdb.ts` — uses `TMDB_API_KEY`.
- MongoDB: `lib/mongodb.ts` expects `MONGODB_URI`.
- NextAuth: configured in `app/api/auth/[...nextauth]/route.ts` and uses `NEXTAUTH_SECRET`.

**Notes for contributors / maintainers**
- Before changing runtime behavior, review `next.config.ts` and `package.json` scripts (Turbopack flags).
- Keep API wrappers in `lib/api` to avoid duplicating third-party call logic.

**Contact / feedback**
If anything in this README is incorrect or missing (env names, scripts, secrets), please update the file or open an issue. If you want, I can add badges, a demo screenshot, or an example `.env.local` template.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).