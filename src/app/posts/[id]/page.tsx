import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { PostDetail } from "@/features/posts/components/post-detail/post-detail";
import { PostDetailLoading } from "@/features/posts/components/post-detail/post-detail-loading";
import { prefetchPostDetail } from "@/lib/tanstack-query/prefetch-post-detail";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = prefetchPostDetail(id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<PostDetailLoading />}>
        <PostDetail postId={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
