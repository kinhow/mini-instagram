"use client";

import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "@/lib/axios/api-client";
import type { CreatePostPayload, Post } from "@/types/post-types";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, AxiosError, CreatePostPayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("author", payload.author);
      formData.append("caption", payload.caption);
      if (payload.image) {
        formData.append("image", payload.image);
      }
      const { data } = await apiClient.post<Post>("/posts", formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      notifications.show({
        color: "green",
        title: "Post created",
        message: "Your post has been published!",
      });
    },
  });
}
