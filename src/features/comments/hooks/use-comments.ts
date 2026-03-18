"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios/api-client";
import type { CommentsResponse } from "@/types/comment-types";

export function useComments(postId: string) {
  return useSuspenseQuery<CommentsResponse>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<CommentsResponse>(
        `/comments/${postId}`,
      );
      return data;
    },
  });
}
