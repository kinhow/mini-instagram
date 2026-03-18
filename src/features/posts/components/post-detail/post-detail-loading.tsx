"use client";

import { Skeleton, Stack } from "@mantine/core";

export function PostDetailLoading() {
  return (
    <Stack
      classNames={{
        root: "gap-4",
      }}
    >
      <Skeleton
        classNames={{
          root: "h-96 w-full rounded-lg",
        }}
      />
      <Skeleton
        classNames={{
          root: "h-6 w-3/4",
        }}
      />
      <Skeleton
        classNames={{
          root: "h-4 w-1/2",
        }}
      />
    </Stack>
  );
}
