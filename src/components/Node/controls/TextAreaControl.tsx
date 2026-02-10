import { TextArea, type TextAreaProps } from "@radix-ui/themes";
import { useId, type PropsWithChildren } from "react";
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
  const textAreaId = useId();
  return (
    <Control handles={handles}>
      <Control.Label htmlFor={textAreaId}>
        {textFieldRootProps.label}
      </Control.Label>
      <TextArea id={textAreaId} {...textFieldRootProps}>
        {children}
      </TextArea>
    </Control>
  );
}

export default TextAreaControl;
