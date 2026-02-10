import { Box, Card, Separator } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";

import styles from "./styles.module.css";
import { Handle, type HandleProps } from "@xyflow/react";

type NodeProps = PropsWithChildren;

function Node({ children }: NodeProps) {
  return <Card className={styles.card}>{children}</Card>;
}

type SectionProps = PropsWithChildren<{
  handles?: HandleProps[];
}>;

function Section({ handles, children }: SectionProps) {
  return (
    <Box position="relative">
      <Box p="3">{children}</Box>
      {handles?.map((handle) => (
        <Handle key={handle.id} {...handle} />
      ))}
    </Box>
  );
}

Node.Section = Section;
Node.Separator = () => <Separator orientation="horizontal" size="4" />;

export default Node;
