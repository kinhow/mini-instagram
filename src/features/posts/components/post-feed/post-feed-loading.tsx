"use client";

import { Grid, Card, Skeleton, Stack  } from "@mantine/core";

export function PostFeedLoading() {
  return (
    <Grid gutter="md">
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid.Col key={`skeleton-${index}`} span={{ base: 12, sm: 6, md: 4 }}>
          <Card withBorder padding={0}>
            <Card.Section>
              <Skeleton
                classNames={{
                  root: "h-64 w-full",
                }}
                radius={0}
              />
            </Card.Section>
            <Stack
              classNames={{
                root: "p-4 gap-2",
              }}
            >
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  classNames={{
                    root: "h-4 w-full",
                  }}
                />
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
