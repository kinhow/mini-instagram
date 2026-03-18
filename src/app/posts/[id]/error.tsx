"use client";

import { Alert, Button, Text } from "@mantine/core";

export default function PostDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Alert
      title="Failed to load post"
      color="red"
      classNames={{
        root: "mt-4",
      }}
    >
      <Text
        classNames={{
          root: "text-sm",
        }}
      >
        {error.message || "An unexpected error occurred."}
      </Text>
      <Button
        onClick={reset}
        variant="outline"
        color="red"
        classNames={{
          root: "mt-2",
        }}
      >
        Try again
      </Button>
    </Alert>
  );
}
