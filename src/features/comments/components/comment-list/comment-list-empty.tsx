import { Text } from "@mantine/core";

export function CommentListEmpty() {
  return (
    <Text
      classNames={{
        root: "text-gray-500 text-sm",
      }}
    >
      No comments yet.
    </Text>
  );
}
