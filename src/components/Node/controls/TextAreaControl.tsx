import { TextArea, type TextAreaProps } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import Control from ".";
import type { HandleProps } from "@xyflow/react";

type TextAreaControlProps = TextAreaProps &
  PropsWithChildren<{
    label: string;
    handles?: HandleProps[];
  }>;

function TextAreaControl({
  handles,
  children,
  ...textFieldRootProps
}: TextAreaControlProps) {
  return (
    <Control handles={handles}>
      <Control.Label>{textFieldRootProps.label}</Control.Label>
      <TextArea {...textFieldRootProps}>{children}</TextArea>
    </Control>
  );
}

export default TextAreaControl;
