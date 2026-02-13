import Control from "./";
import { Flex, Slider, type SliderProps } from "@radix-ui/themes";
import type { HandleProps } from "@xyflow/react";

type SliderControl = SliderProps & {
  label: string;
  handles?: HandleProps[];
  formatValue?: (value: Exclude<SliderProps["value"], undefined>) => string;
};

function SliderControl({
  label,
  handles,
  formatValue = (value) => value.toString(),
  ...sliderProps
}: SliderControl) {
  return (
    <Control handles={handles}>
      <Flex justify="between" align="center">
        <Control.Label>{label}</Control.Label>
        <Control.Value>
          {sliderProps.value ? formatValue(sliderProps.value) : null}
        </Control.Value>
      </Flex>
      <Slider {...sliderProps} />
    </Control>
  );
}

export default SliderControl;
