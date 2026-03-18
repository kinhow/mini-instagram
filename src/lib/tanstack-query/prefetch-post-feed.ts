import { apiClient } from "@/lib/axios/api-client";
import type { PostsResponse } from "@/types/post-types";
import { getQueryClient } from "./get-query-client";

export function prefetchPostFeed() {
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery({
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
    getNextPageParam: (lastPage: PostsResponse) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    pages: 1,
  });

  return queryClient;
}
