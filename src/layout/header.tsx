"use client";

import { Button, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { ColorSchemeToggle } from "@/components/color-scheme-toggle";
import { CreatePostForm } from "@/features/posts/components/post-form/post-form";

export function Header() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group
        classNames={{
          root: "sticky top-0 z-50 bg-white dark:bg-[var(--mantine-color-body)] border-b border-gray-200 dark:border-[var(--mantine-color-dark-4)] px-4 py-3",
        }}
      >
        <Link href="/" aria-label="Go to feed">
          <Title
            order={3}
            classNames={{
              root: "cursor-pointer",
            }}
          >
            Mini Instagram
          </Title>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ColorSchemeToggle />
          <Button
            onClick={open}
            classNames={{
              root: "bg-blue-500 hover:bg-blue-600",
            }}
          >
            New Post
          </Button>
        </div>
      </Group>
      <CreatePostForm opened={opened} onClose={close} />
    </>
  );
}
