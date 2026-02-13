import { Box, Card, Heading, Separator, Text } from "@radix-ui/themes";
import { useState, type PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./styles.module.css";
import {
  Handle,
  useNodeId,
  useOnSelectionChange,
  type HandleProps,
  type UseOnSelectionChangeOptions,
} from "@xyflow/react";

type NodeProps = PropsWithChildren;

function Node({ children }: NodeProps) {
  const nodeId = useNodeId();
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectionChange: UseOnSelectionChangeOptions["onChange"] = ({
    nodes,
  }) => {
    if (nodes === null) {
      setIsSelected(false);
      return;
    }
    setIsSelected(nodes.some((node) => node.id === nodeId));
  };

  useOnSelectionChange({ onChange: handleSelectionChange });

  return (
    <Card className={cx(styles.card, { [styles.selected]: isSelected })}>
      {children}
    </Card>
  );
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

function Title({ children }: PropsWithChildren) {
  return (
    <Heading size="5" weight="bold">
      {children}
    </Heading>
  );
}

function Description({ children }: PropsWithChildren) {
  return (
    <Text as="div" size="2">
      {children}
    </Text>
  );
}

Node.Section = Section;
Node.Separator = () => <Separator orientation="horizontal" size="4" />;
Node.Title = Title;
Node.Description = Description;

export default Node;
