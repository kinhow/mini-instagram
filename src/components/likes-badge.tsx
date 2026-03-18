"use client";

import { Badge } from "@mantine/core";

interface LikesBadgeProps {
  likes: number;
  className?: string;
}

export function LikesBadge({ likes, className }: LikesBadgeProps) {
  return (
    <Badge
      variant="light"
      classNames={{
        root: className,
      }}
    >
      {likes} {likes === 1 ? "like" : "likes"}
    </Badge>
  );
}
