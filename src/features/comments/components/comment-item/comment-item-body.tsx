import { Text } from "@mantine/core";

interface CommentItemBodyProps {
  text: string;
}

export function CommentItemBody({ text }: CommentItemBodyProps) {
  return (
    <Text
      classNames={{
        root: "text-sm",
      }}
    >
      {text}
    </Text>
  );
}
