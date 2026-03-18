import { Skeleton, Stack } from "@mantine/core";

export function CommentListLoading() {
  return (
    <Stack
      classNames={{
        root: "gap-3 mt-4",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          classNames={{
            root: "h-12 w-full",
          }}
        />
      ))}
    </Stack>
  );
}
