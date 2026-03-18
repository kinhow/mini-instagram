---
name: Mini Instagram Architecture Patterns
description: Key architectural patterns, known issues, and conventions in the mini-instagram codebase for code review context
type: project
---

Project uses TanStack Query v5 with `useSuspenseQuery`/`useSuspenseInfiniteQuery` for data fetching, paired with server-side prefetching via `prefetchQuery`/`prefetchInfiniteQuery` + `HydrationBoundary`.

Uses streaming SSR pattern: prefetch is NOT awaited, and `shouldDehydrateQuery` includes `pending` status to dehydrate in-flight queries. This is intentional per TanStack Query v5 docs.

**Why:** SSR prefetch pattern avoids client waterfalls and provides instant content via streaming.

**How to apply:** When reviewing new queries, verify: (1) prefetch in server components follows streaming pattern (no await, pending dehydration enabled), (2) suspense queries have a wrapping `<Suspense>` boundary, (3) query keys and `queryFn` match between prefetch and hook to avoid cache misses.

CSS layering uses `@layer theme, base, mantine, components, utilities` with `tailwind-preset-mantine` for dark mode integration.

API key is exposed client-side via `NEXT_PUBLIC_` prefix -- flagged as security concern in initial review.

Dead code exists: several components (PostFeedError, PostDetailError, PostDetailNotFound, CommentListLoading, CommentListError) are defined but never imported/used.
