import { Flex, Slider, Text, type SliderProps } from "@radix-ui/themes";
import type { ReactNode } from "react";
import Node from "./index";

type SliderControl = SliderProps & {
  label: string;
  handles: ReactNode;
  formatValue: (value: Exclude<SliderProps["value"], undefined>) => string;
};

function SliderControl({
  label,
  handles,
  formatValue = (value) => String(value),
  ...sliderProps
}: SliderControl) {
  return (
    <Node.Section handles={handles}>
      <Flex gap="3" direction="column">
        <Flex justify="between" align="center">
          <Text size="3" weight="bold">
            {label}
          </Text>
          <Text size="3">
            {sliderProps.value ? formatValue(sliderProps.value) : null}
          </Text>
        </Flex>
        <Slider {...sliderProps} />
      </Flex>
    </Node.Section>
  );
}

export default SliderControl;
