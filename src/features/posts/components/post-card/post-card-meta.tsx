"use client";

import { Group, Text } from "@mantine/core";
import { LikesBadge } from "@/components/likes-badge";
import { UserAvatar } from "@/components/user-avatar";
import { formatRelativeTime } from "@/lib/dayjs/format-time";

interface PostCardMetaProps {
  author: string;
  likes: number;
  createdAt: string;
}

export function PostCardMeta({ author, likes, createdAt }: PostCardMetaProps) {
  return (
    <Group
      classNames={{
        root: "gap-2 justify-between",
      }}
    >
      <Group gap={8}>
        <UserAvatar name={author} size="sm" />
        <Text
          classNames={{
            root: "text-sm font-semibold truncate",
          }}
        >
          {author}
        </Text>
      </Group>
      <Group>
        <LikesBadge likes={likes} className="flex-shrink-0" />
        <Text
          classNames={{
            root: "text-xs text-gray-500 flex-shrink-0",
          }}
        >
          {formatRelativeTime(createdAt)}
        </Text>
      </Group>
    </Group>
  );
}
