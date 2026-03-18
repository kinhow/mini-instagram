import { Group, Stack, Text } from "@mantine/core";
import { LikesBadge } from "@/components/likes-badge";
import { UserAvatar } from "@/components/user-avatar";
import { formatRelativeTime } from "@/lib/dayjs/format-time";

interface PostDetailAuthorProps {
  author: string;
  createdAt: string;
  likes: number;
}

export function PostDetailAuthor({
  author,
  createdAt,
  likes,
}: PostDetailAuthorProps) {
  return (
    <Group
      classNames={{
        root: "gap-3",
      }}
    >
      <UserAvatar name={author} />
      <Stack
        classNames={{
          root: "gap-0",
        }}
      >
        <Text
          classNames={{
            root: "font-semibold",
          }}
        >
          {author}
        </Text>
        <Text
          classNames={{
            root: "text-xs text-gray-600",
          }}
        >
          {formatRelativeTime(createdAt)}
        </Text>
      </Stack>
      <LikesBadge likes={likes} className="ml-auto" />
    </Group>
  );
}
