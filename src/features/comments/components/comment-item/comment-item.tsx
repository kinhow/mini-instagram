import { Group, Stack } from "@mantine/core";
import { UserAvatar } from "@/components/user-avatar";
import type { Comment } from "@/types/comment-types";
import { CommentItemBody } from "./comment-item-body";
import { CommentItemHeader } from "./comment-item-header";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <Group
      wrap="nowrap"
      classNames={{
        root: "items-start gap-3",
      }}
    >
      <UserAvatar name={comment.author} size="sm" className="bg-gray-400" />
      <Stack
        classNames={{
          root: "gap-0 flex-1 min-w-0",
        }}
      >
        <CommentItemHeader
          author={comment.author}
          createdAt={comment.createdAt}
        />
        <CommentItemBody text={comment.text} />
      </Stack>
    </Group>
  );
}
