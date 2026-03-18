import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { PostFeed } from "@/features/posts/components/post-feed/post-feed";
import { PostFeedLoading } from "@/features/posts/components/post-feed/post-feed-loading";
import { prefetchPostFeed } from "@/lib/tanstack-query/prefetch-post-feed";

export default function Home() {
  const queryClient = prefetchPostFeed();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<PostFeedLoading />}>
        <PostFeed />
      </Suspense>
    </HydrationBoundary>
  );
}
