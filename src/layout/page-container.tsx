import { Container } from "@mantine/core";
import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <Container
      size="lg"
      classNames={{
        root: "py-6 px-4",
      }}
    >
      {children}
    </Container>
  );
}
