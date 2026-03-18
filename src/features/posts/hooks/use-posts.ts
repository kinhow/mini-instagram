"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios/api-client";
import type { PostsResponse } from "@/types/post-types";

export function usePosts() {
  return useSuspenseInfiniteQuery<PostsResponse>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      const params: Record<string, string | number> = { limit: 10 };
      if (pageParam) {
        params.cursor = pageParam as string;
      }
      const { data } = await apiClient.get<PostsResponse>("/posts", {
        params,
      });
      return data;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });
}
