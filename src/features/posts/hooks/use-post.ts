"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios/api-client";
import type { Post } from "@/types/post-types";

export function usePost(id: string) {
  return useSuspenseQuery<Post>({
    queryKey: ["posts", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Post>(`/posts/${id}`);
      return data;
    },
  });
}
