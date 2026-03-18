import Image from "next/image";

interface PostDetailImageProps {
  imageUrl: string;
  caption: string;
}

export function PostDetailImage({ imageUrl, caption }: PostDetailImageProps) {
  return (
    <Image
      priority
      width={400}
      height={400}
      src={imageUrl}
      alt={caption || "Post image"}
      className="w-full rounded-lg object-cover h-100"
    />
  );
}
