import type { MantineSize } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { getInitials } from "@/utils/get-initials/get-initials";

interface UserAvatarProps {
  name: string;
  size?: MantineSize;
  className?: string;
}

export function UserAvatar({
  name,
  size,
  className = "bg-blue-500",
}: UserAvatarProps) {
  return (
    <Avatar
      classNames={{
        root: `${className} flex-shrink-0`,
        placeholder: `text-white ${size === "sm" ? "text-xs" : ""} font-semibold`,
      }}
      radius="xl"
      size={size}
    >
      {getInitials(name)}
    </Avatar>
  );
}
