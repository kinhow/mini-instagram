import { apiClient } from "@/lib/axios/api-client";
import type { Post } from "@/types/post-types";
import { getQueryClient } from "./get-query-client";

export function prefetchPostDetail(id: string) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const { data } = await apiClient.get<Post>(`/posts/${id}`);
      return data;
    },
  });

  return queryClient;
}
