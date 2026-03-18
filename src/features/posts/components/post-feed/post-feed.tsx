"use client";

import { Box, Grid, Loader } from "@mantine/core";
import { useEffect, useRef } from "react";
import { ScrollToTopAffix } from "@/components/scroll-to-top-affix";
import { PostCard } from "@/features/posts/components/post-card/post-card";
import { usePosts } from "@/features/posts/hooks/use-posts";
import { PostFeedEmpty } from "./post-feed-empty";
import { PostFeedEnd } from "./post-feed-end";

export function PostFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data.pages.flatMap((page) => page.items);

  if (posts.length === 0) {
    return <PostFeedEmpty />;
  }

  return (
    <>
      <Grid gutter="md">
        {posts.map((post) => (
          <Grid.Col key={post.id} span={{ base: 12, sm: 6, md: 4 }}>
            <PostCard post={post} />
          </Grid.Col>
        ))}
      </Grid>

      <Box ref={sentinelRef} className="h-4" />

      {isFetchingNextPage && (
        <Loader
          color="blue"
          classNames={{
            root: "mx-auto my-4 w-full",
          }}
        />
      )}

      {!hasNextPage && posts.length > 0 && <PostFeedEnd />}

      <ScrollToTopAffix />
    </>
  );
}
