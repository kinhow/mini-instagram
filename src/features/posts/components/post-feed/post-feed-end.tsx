"use client";

import { Text } from "@mantine/core";

export function PostFeedEnd() {
  return (
    <Text
      classNames={{
        root: "text-center text-[var(--mantine-color-dimmed)] text-sm py-4",
      }}
    >
      You have reached the end
    </Text>
  );
}
