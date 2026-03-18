import { Text } from "@mantine/core";

interface CreatePostCaptionCounterProps {
  current: number;
  max: number;
}

export function CreatePostCaptionCounter({
  current,
  max,
}: CreatePostCaptionCounterProps) {
  return (
    <Text
      classNames={{
        root: "text-xs text-gray-400 text-right",
      }}
    >
      {current}/{max}
    </Text>
  );
}
