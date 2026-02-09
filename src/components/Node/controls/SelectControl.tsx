import type { PropsWithChildren } from "react";
import Control from ".";
import { Flex, Select } from "@radix-ui/themes";

type SelectControlProps = Select.RootProps &
  PropsWithChildren<{
    label: string;
    direction?: "row" | "column";
    handles?: React.ReactNode;
  }>;

function SelectControl({
  handles,
  direction = "column",
  children,
  ...selectRootProps
}: SelectControlProps) {
  return (
    <Control handles={handles}>
      <Flex direction={direction} justify="between" gap="2">
        <Control.Label>{selectRootProps.label}</Control.Label>
        <Select.Root {...selectRootProps}>{children}</Select.Root>
      </Flex>
    </Control>
  );
}

export default SelectControl;
