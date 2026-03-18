import { Text } from "@mantine/core";

export function PostFeedEmpty() {
  return (
    <Text
      classNames={{
        root: "text-center mt-8",
      }}
    >
      No posts yet. Be the first to share something!
    </Text>
  );
}
