import { Box, Card, Separator } from "@radix-ui/themes";
import type { PropsWithChildren, ReactNode } from "react";

import styles from "./styles.module.css";

type NodeProps = PropsWithChildren;

function Node({ children }: NodeProps) {
  return <Card className={styles.card}>{children}</Card>;
}

type SectionProps = PropsWithChildren<{
  handles?: ReactNode;
}>;

function Section({ handles, children }: SectionProps) {
  return (
    <Box position="relative">
      <Box p="3">{children}</Box>
      {handles}
    </Box>
  );
}

Node.Section = Section;
Node.Separator = () => <Separator orientation="horizontal" size="4" />;

export default Node;
