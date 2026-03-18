"use client";

import { Stack } from "@mantine/core";
import { CommentItem } from "@/features/comments/components/comment-item/comment-item";
import { useComments } from "@/features/comments/hooks/use-comments";
import { CommentListEmpty } from "./comment-list-empty";
import { CommentListHeader } from "./comment-list-header";

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const { data } = useComments(postId);

  const comments = data.items;

  return (
    <Stack
      classNames={{
        root: "gap-4 mt-4",
      }}
    >
      <CommentListHeader count={comments.length} />

      {comments.length === 0 ? (
        <CommentListEmpty />
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </Stack>
  );
}
