import { Title } from "@mantine/core";

interface CommentListHeaderProps {
  count: number;
}

export function CommentListHeader({ count }: CommentListHeaderProps) {
  return (
    <Title
      order={4}
      classNames={{
        root: "border-t border-[var(--mantine-color-default-border)] pt-4",
      }}
    >
      Comments ({count})
    </Title>
  );
}
