"use client";

import { Card } from "@mantine/core";
import Image from "next/image";

interface PostCardImageProps {
  imageUrl: string;
  caption: string;
}

export function PostCardImage({ imageUrl, caption }: PostCardImageProps) {
  return (
    <Card.Section>
      <Image
        src={imageUrl}
        alt={caption || "Post image"}
        width={600}
        height={400}
        className="w-full h-64 object-cover"
      />
    </Card.Section>
  );
}
