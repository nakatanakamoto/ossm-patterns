import { Flex, TextField } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import Control from ".";
import type { HandleProps } from "@xyflow/react";

type TextFieldControlProps = TextField.RootProps &
  PropsWithChildren<{
    label: string;
    handles?: HandleProps[];
  }>;

function TextFieldControl({
  handles,
  children,
  ...textFieldRootProps
}: TextFieldControlProps) {
  return (
    <Control handles={handles}>
      <Flex direction="row" align="center" justify="between">
        <Control.Label>{textFieldRootProps.label}</Control.Label>
        <TextField.Root {...textFieldRootProps}>{children}</TextField.Root>
      </Flex>
    </Control>
  );
}

export default TextFieldControl;
