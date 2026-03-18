import { Text } from "@mantine/core";

interface PostDetailCaptionProps {
  caption: string;
}

export function PostDetailCaption({ caption }: PostDetailCaptionProps) {
  return (
    <Text
      classNames={{
        root: "text-base leading-relaxed",
      }}
    >
      {caption}
    </Text>
  );
}
