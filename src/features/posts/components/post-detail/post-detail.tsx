"use client";

import { Stack } from "@mantine/core";
import { Suspense } from "react";
import { CommentList } from "@/features/comments/components/comment-list/comment-list";
import { CommentListLoading } from "@/features/comments/components/comment-list/comment-list-loading";
import { usePost } from "@/features/posts/hooks/use-post";
import { PostDetailAuthor } from "./post-detail-author";
import { PostDetailCaption } from "./post-detail-caption";
import { PostDetailImage } from "./post-detail-image";

interface PostDetailProps {
  postId: string;
}

export function PostDetail({ postId }: PostDetailProps) {
  const { data: post } = usePost(postId);

  return (
    <Stack
      classNames={{
        root: "gap-6",
      }}
    >
      <PostDetailImage imageUrl={post.imageUrl} caption={post.caption} />

      <PostDetailAuthor
        author={post.author}
        createdAt={post.createdAt}
        likes={post.likes}
      />

      <PostDetailCaption caption={post.caption} />

      <Suspense fallback={<CommentListLoading />}>
        <CommentList postId={postId} />
      </Suspense>
    </Stack>
  );
}
