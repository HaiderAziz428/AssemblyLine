# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build (also runs next-sitemap via postbuild)
npm run start     # Start production server
npm run lint      # Run Next.js ESLint
```

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DISCORD_WEBHOOK_URL` | Yes | Receives booking form submissions as Discord messages |
| `NEXT_PUBLIC_GOOGLE_PLACE_ID` | No | Google Places ID for the business |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | No | Google Maps embed |

## Architecture

This is a **Next.js 15 App Router** marketing/booking website for Assembly Line Car Workshop (Multan, Pakistan).

### Key Architectural Decisions

- **next.config.mjs** disables ESLint and TypeScript error checks during builds (`ignoreDuringBuilds: true`) — type errors won't block production builds.
- **Images are unoptimized** — external image optimization is assumed.
- All page components are React Server Components by default; client interactivity is isolated to specific components with `"use client"`.

### Routes

- `/` — Landing page; imports all section components sequentially (Navbar → Hero → Services → About → WhyChooseUs → Testimonials → Contact → Footer → FloatingCta)
- `/faq` — FAQ page
- `/api/booking` — POST endpoint; validates fields and POSTs a formatted embed to `DISCORD_WEBHOOK_URL`

### Booking Flow

1. `BookingForm` (client component) manages form state with **React Hook Form** + **Zod** schema validation
2. On submit, POSTs to `/api/booking`
3. API route formats data as a Discord embed and sends it via webhook
4. Client shows success/error toast

### Styling

- **Tailwind CSS** with two custom palettes: `gold` (primary accent, base `#FFC300`) and `navy` (backgrounds, base `#002D5F`)
- Both palettes have 9 shades (`50`–`900`) defined as CSS HSL variables in `app/globals.css`
- **Fonts:** Inter (default sans) and Oswald — both loaded from Google Fonts in `app/layout.tsx`
- **shadcn/ui** component library (Radix UI primitives + Tailwind) — components live in `components/ui/`
- Dark mode is class-based (`darkMode: "class"` in tailwind config) but not currently toggled in the UI

### Component Organization

- `components/ui/` — shadcn/ui primitives (don't edit directly; regenerate via `shadcn` CLI if needed)
- `components/` (root) — page sections and business-logic components (BookingForm, GoogleMap, Navbar, etc.)
- `app/` — Next.js App Router pages and API routes
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
