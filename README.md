# Wobb Frontend Assignment — Submission

A redesigned influencer search application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Zustand**.

## 🚀 Live Deployment

**Deployed app:** **[https://wobb-six.vercel.app/](https://wobb-six.vercel.app/)**

Deployed on Vercel with a production build (`vite build`) and SPA rewrites configured (`vercel.json`) so client-side routing (`/profile/:username`) works correctly on direct navigation and refresh.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## What I Changed

### Bug fixes & code quality
- Fixed and re-organized the project structure into clear `components/`, `components/pages/`, `hooks/`, `store/`, `types/`, and `utils/` folders instead of one flat folder.
- Added proper TypeScript types for profile summaries and profile detail responses (`types/index.ts`) instead of relying on `any`.
- Extracted data-loading and filtering logic into pure, testable utility functions (`utils/dataHelpers.ts`, `utils/profileLoader.ts`, `utils/profileContent.ts`, `utils/formatters.ts`).
- Added unit tests for the core data utilities (`dataHelpers.test.ts`, `profileContent.test.ts`) using Vitest.

### State management
- Replaced React Context with **Zustand** (`store/useInfluencerStore.ts`) for the selected-profiles list.
- Used Zustand's `persist` middleware so the selected list survives a page refresh (backed by `localStorage`).

### "Select Profile & Add to List" feature
- Implemented the previously-stubbed "Add to List" button end-to-end:
  - Add / remove profiles from the list directly from a profile card
  - Duplicate entries are prevented (deduped by `user_id`)
  - Selected profiles are shown in a dedicated panel (`SelectedList.tsx`) with avatar, name, and a quick-remove action
  - List persists across page refreshes via Zustand's persist middleware

### UI/UX redesign
- Rebuilt the interface with a modern purple-to-pink gradient theme, rounded cards, hover/lift micro-interactions, and consistent spacing.
- Added full **dark mode** support throughout (`dark:` variants on all components).
- Added a results summary bar ("X of Y creators on [platform]") and a verified badge, follower-count formatting, and profile avatars with graceful fallbacks.
- Focused on visual hierarchy: gradient headline, clear card layout, and a persistent "Selected Profiles" panel so users always know what they've picked.

### Performance
- Search/platform data is imported statically and filtered client-side with a single memo-free pass (`filterProfiles`) since dataset size is small; this avoids over-engineering for what is effectively a static dataset.
- Profile detail JSON files are loaded eagerly via `import.meta.glob` at build time rather than fetched at runtime, avoiding network waterfalls for local demo data.

## Libraries Added

| Library | Why |
|---|---|
| `zustand` | Required replacement for React Context; simple, minimal-boilerplate state management with built-in persistence middleware. |
| `tailwindcss` v4 + `@tailwindcss/vite` | Utility-first styling for the redesign, including dark mode. |
| `vitest` | Unit testing for data utilities. |

## Assumptions

- Treated the local JSON files under `src/assets/data/` as the full, static dataset — no backend/API integration was assumed to be in scope.
- Assumed "list" in task 4 refers to a single selected-profiles list (not multiple named lists), since the assignment didn't specify multi-list support.
- Assumed persistence via `localStorage` (through Zustand's `persist` middleware) satisfies "persistent after page refresh," rather than requiring server-side storage.

## Trade-offs

- Prioritized clarity and correctness of the Zustand store and Add-to-List flow over adding more UI chrome (e.g. toast notifications, undo actions).
- Did not add a global loading/skeleton state since all data is loaded synchronously at build time — trading a bit of "handles async gracefully" polish for simplicity, since there's no real network latency to mask here.
- Kept filtering logic simple (substring match on username/fullname) rather than adding fuzzy search, since the dataset is small.

## Remaining Improvements

- Could add more granular loading/error states if this were backed by a real API instead of static JSON.
- Could add e2e tests (Playwright/Cypress) covering the Add to List flow, in addition to the existing unit tests.
- Accessibility could be extended further (e.g. full keyboard navigation audit, live region announcements when a profile is added/removed).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Zustand (with persist middleware)
- React Router v7
- Vitest

## Deployment Notes (Bonus)

- Diagnosed and fixed a real deployment issue where the Vercel project's root directory wasn't pointed at the app folder, and where the `vite` CLI wasn't resolving during the build — both are resolved in the current deployment.
- Live app: **https://wobb-six.vercel.app/**
