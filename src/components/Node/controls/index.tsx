import { Flex, Text } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import Node from "../index";
import type { HandleProps } from "@xyflow/system";

export type ControlProps = PropsWithChildren<{
  handles?: Array<HandleProps>;
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

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, ...labelProps }: LabelProps) => (
  <Text size="3" weight="bold" asChild>
    <label {...labelProps}>{children}</label>
  </Text>
);

type ValueProps = PropsWithChildren;

const Value = ({ children }: ValueProps) => <Text size="3">{children}</Text>;

Control.Label = Label;
Control.Value = Value;

export default Control;
