"use client";

import { Grid } from "@mantine/core";
import { PostCardSkeleton } from "@/features/posts/components/post-card/post-card-skeleton";

export function PostFeedLoading() {
  return (
    <Grid gutter="md">
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid.Col key={`skeleton-${index}`} span={{ base: 12, sm: 6, md: 4 }}>
          <PostCardSkeleton />
        </Grid.Col>
      ))}
    </Grid>
  );
}
