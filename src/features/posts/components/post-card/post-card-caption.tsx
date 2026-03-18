import { Text } from "@mantine/core";

interface PostCardCaptionProps {
  caption: string;
}

export function PostCardCaption({ caption }: PostCardCaptionProps) {
  return (
    <Text
      classNames={{
        root: "line-clamp-2 text-sm text-gray-800",
      }}
    >
      {caption}
    </Text>
  );
}
