"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useMounted } from "@mantine/hooks";

export function ColorSchemeToggle() {
  const mounted = useMounted();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  if (!mounted) {
    return (
      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      />
    );
  }

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {colorScheme === "dark" ? "☀️" : "🌙"}
    </ActionIcon>
  );
}
