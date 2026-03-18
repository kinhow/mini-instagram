"use client";

import { Card, Stack } from "@mantine/core";
import Link from "next/link";
import type { Post } from "@/types/post-types";
import { PostCardCaption } from "./post-card-caption";
import { PostCardImage } from "./post-card-image";
import { PostCardMeta } from "./post-card-meta";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card
      component={Link}
      href={`/posts/${post.id}`}
      classNames={{
        root: "overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full dark:bg-white dark:text-black",
      }}
      withBorder
      padding={0}
    >
      <PostCardImage imageUrl={post.imageUrl} caption={post.caption} />

      <Stack
        classNames={{
          root: "p-3 gap-2 flex-1",
        }}
      >
        <PostCardMeta
          author={post.author}
          likes={post.likes}
          createdAt={post.createdAt}
        />
        <PostCardCaption caption={post.caption} />
      </Stack>
    </Card>
  );
}
