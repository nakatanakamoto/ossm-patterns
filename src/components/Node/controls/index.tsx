import { Flex, Text } from "@radix-ui/themes";
import type { PropsWithChildren, ReactNode } from "react";
import Node from "../index";

export type ControlProps = PropsWithChildren<{
  handles: ReactNode;
}>;

function Control({ handles, children }: ControlProps) {
  return (
    <Node.Section handles={handles}>
      <Flex gap="3" direction="column">
        {children}
      </Flex>
    </Node.Section>
  );
}

type LabelProps = PropsWithChildren;

const Label = ({ children }: LabelProps) => (
  <Text size="3" weight="bold">
    {children}
  </Text>
);

type ValueProps = PropsWithChildren;

const Value = ({ children }: ValueProps) => <Text size="3">{children}</Text>;

Control.Label = Label;
Control.Value = Value;

export default Control;
