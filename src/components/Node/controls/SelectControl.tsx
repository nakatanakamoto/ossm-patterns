import type { PropsWithChildren } from "react";
import Control from ".";
import { Flex, Select } from "@radix-ui/themes";
import type { HandleProps } from "@xyflow/react";

type SelectControlProps = Select.RootProps &
  PropsWithChildren<{
    label: string;
    direction?: "row" | "column";
    handles?: HandleProps[];
  }>;

function SelectControl({
  handles,
  direction = "column",
  children,
  ...selectRootProps
}: SelectControlProps) {
  return (
    <Control handles={handles}>
      <Flex direction={direction} justify="between" gap="2" align="center">
        <Control.Label>{selectRootProps.label}</Control.Label>
        <Select.Root {...selectRootProps}>{children}</Select.Root>
      </Flex>
    </Control>
  );
}

export default SelectControl;
