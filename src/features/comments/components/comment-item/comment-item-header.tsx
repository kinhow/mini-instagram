"use client";

import { Group, Text } from "@mantine/core";
import { formatRelativeTime } from "@/lib/dayjs/format-time";

interface CommentItemHeaderProps {
  author: string;
  createdAt: string;
}

export function CommentItemHeader({
  author,
  createdAt,
}: CommentItemHeaderProps) {
  return (
    <Group
      classNames={{
        root: "gap-2",
      }}
    >
      <Text
        classNames={{
          root: "text-sm font-semibold",
        }}
      >
        {author}
      </Text>
      <Text
        classNames={{
          root: "text-xs text-[var(--mantine-color-dimmed)]",
        }}
      >
        {formatRelativeTime(createdAt)}
      </Text>
    </Group>
  );
}
