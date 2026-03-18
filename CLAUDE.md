# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mini Instagram — a Next.js frontend that consumes a live REST API for browsing, viewing, and creating posts (feed with infinite scroll, post detail with comments, and post creation with image upload). Supports light/dark mode via Mantine color scheme.

## Commands

- **Dev server:** `pnpm dev` (uses Turbopack)
- **Build:** `pnpm build`
- **Lint:** `pnpm lint` (runs `biome check`)
- **Format:** `pnpm format` (runs `biome format --write`)

Package manager is **pnpm** (lockfile: pnpm-lock.yaml).

## Workflow

- **Always enter Plan Mode before writing any code.** Outline the approach, identify affected files, and get alignment before implementation.
- After significant code changes, run `pnpm lint` to catch issues early.
- Validate builds with `pnpm build` before considering work complete.

## Stack

- Next.js 16 App Router, React 19, TypeScript 5
- Tailwind CSS v4 (via `@tailwindcss/postcss`, configured with `@theme inline` in globals.css)
- Mantine v8 for UI components (Modal, Button, Dropzone, Notifications, etc.)
- TanStack Query v5 for server state (suspense queries, infinite queries, mutations)
- axios for all HTTP requests
- dayjs for relative time formatting
- Biome 2 for linting and formatting (2-space indent, organized imports)
- Path alias: `@/*` → `./src/*`

## Architecture

Feature-based folder structure under `src/`:

```
src/
  app/              # Next.js App Router pages, layouts, error boundaries
  lib/              # Infrastructure (API client, query client, prefetching, dayjs)
  features/         # Feature modules (posts/, comments/) each with:
    <feature>/
      components/   # UI components scoped to the feature
      hooks/        # TanStack Query hooks
  components/       # Shared UI components (UserAvatar, LikesBadge, ColorSchemeToggle, etc.)
  layout/           # Layout components (Header, PageContainer)
  providers/        # Client-side providers (TanStack Query)
  types/            # TypeScript types for API responses
  utils/            # Pure utility functions
```

### Data Flow

1. **SSR prefetching:** Pages call `prefetchPostFeed()` / `prefetchPostDetail(id)` in server components, passing data via `HydrationBoundary` + `dehydrate()`.
2. **Client rendering:** Components use `useSuspenseQuery` / `useSuspenseInfiniteQuery` — data is always defined, loading handled by `<Suspense>` boundaries in pages, errors by `error.tsx` files.
3. **Mutations:** `useCreatePost` sends FormData via axios, invalidates queries on success, shows Mantine notifications.

### Query Client Configuration

- `staleTime: 60_000` (1 minute)
- `retry: 1`
- `refetchOnWindowFocus: false`
- Dehydration includes pending queries for SSR streaming
- Singleton on browser, new instance per server request

### Styling: Tailwind + Mantine Integration

- CSS layer order: `theme, base, mantine, components, utilities`
- `tailwind-preset-mantine` bridges Mantine CSS variables into Tailwind
- Dark mode: `@variant dark` targets `data-mantine-color-scheme="dark"` so Tailwind `dark:` utilities sync with Mantine's color scheme
- Use Mantine CSS variables (e.g., `var(--mantine-color-dimmed)`, `var(--mantine-color-default-border)`) for theme-aware colors instead of hardcoded Tailwind colors
- PostCard uses `dark:bg-white dark:text-black` to maintain white cards in dark mode

## API Integration

- Use **axios** via the shared instance at `src/lib/axios/api-client.ts` — never use raw `fetch`.
- API base URL and key are in `.env.local` as `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_API_KEY`.
- API returns cursor-based pagination (`nextCursor`, `hasMore`) — use `useSuspenseInfiniteQuery` for paginated lists.
- Handle API errors: 400 (invalid input), 413 (image too large, >1 MB), 415 (unsupported file type).

## Coding Conventions

### Component rules
- Components must be purely presentational — render UI, accept props/callbacks, no inline business logic.
- No form validation, error mapping, data transformation, or submit handling inside components.
- Container components may use hooks and manage layout concerns (Suspense, infinite scroll) but delegate data logic to hooks.

### Hook rules
- All business logic belongs in custom hooks under `features/<feature>/hooks/`.
- This includes: form setup + validation, submit/mutation handlers, error mapping, state orchestration.
- Data-fetching hooks return query/mutation objects; form hooks return form state + handlers.

### Export rules
- Named exports for everything; default exports only for Next.js page/layout/error files.

### Styling rules
- Use Tailwind utility classes — no CSS modules or inline styles.
- Use Mantine's `classNames` prop (not `className`) to apply Tailwind utilities to Mantine component internals.
- Use Mantine CSS variables (e.g., `var(--mantine-color-dimmed)`) for theme-aware colors instead of hardcoded Tailwind colors.

### Other rules
- Server components for pages/layouts; `"use client"` for interactive UI.
- For hydration-sensitive components (e.g., color scheme toggle), use `useMounted` from `@mantine/hooks` to avoid server/client mismatch.
- Biome rules: recommended + Next.js + React domains; `noUnknownAtRules` off (for Tailwind v4 `@theme`), `noArrayIndexKey` off.
