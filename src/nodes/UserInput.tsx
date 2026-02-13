import { Position, useReactFlow, type Node as NodeType } from "@xyflow/react";
import Node from "../components/Node";
import { Heading, Select, Text } from "@radix-ui/themes";
import type { PatternNodeType } from ".";
import SelectControl from "../components/Node/controls/SelectControl";
import SliderControl from "../components/Node/controls/SliderControl";
import type { FloatValue } from "../types/Value";
import { useUserInput, type UserInput } from "../context/userInput";
import { useCallback, useEffect } from "react";
import type { UserInputType } from "../types/UserInput";
import { match } from "ts-pattern";

export type UserInputNodeType = NodeType<
  {
    type: UserInputType;
    output?: FloatValue;
  },
  "userInput"
>;

function inputConstToKey(input: UserInputType): keyof UserInput {
  return match(input)
    .returnType<keyof UserInput>()
    .with("SPEED", () => "speed")
    .with("DEPTH", () => "depth")
    .with("STROKE", () => "stroke")
    .with("SENSATION", () => "sensation")
    .exhaustive();
}

function inputConstToLabel(input: UserInputType): string {
  return match(input)
    .returnType<string>()
    .with("SPEED", () => "Speed")
    .with("DEPTH", () => "Depth")
    .with("STROKE", () => "Stroke")
    .with("SENSATION", () => "Sensation")
    .exhaustive();
}

const UserInputNode: PatternNodeType<UserInputNodeType> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const [userInput, setUserInput] = useUserInput();

  const setType = (type: UserInputType) => {
    updateNodeData(id, {
      type,
    });
  };

  const setValue = useCallback(
    (value: number) => {
      updateNodeData(id, {
        output: {
          type: "FLOAT",
          value,
        },
      });
    },
    [id, updateNodeData],
  );

  useEffect(() => {
    const value = userInput[inputConstToKey(data.type)];
    setValue(value);
  }, [data.type, setValue, userInput]);

  return (
    <Node>
      <Node.Section
        handles={[
          { type: "source", position: Position.Right, id: "percentage" },
        ]}
      >
        <Heading size="5" weight="bold">
          User Input
        </Heading>
        <Text size="2">Outputs value as a percentage</Text>
      </Node.Section>
      <Node.Separator />
      <SelectControl
        value={data.type}
        label="Input"
        direction="row"
        onValueChange={setType}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {(["SPEED", "DEPTH", "STROKE", "SENSATION"] as const).map(
              (inputType) => (
                <Select.Item key={inputType} value={inputType}>
                  {inputConstToLabel(inputType)}
                </Select.Item>
              ),
            )}
          </Select.Group>
        </Select.Content>
      </SelectControl>
      <Node.Separator />
      <SliderControl
        label="Simulate Input"
        formatValue={(value) => `${Math.round(value[0] * 100)}%`}
        onValueChange={(values) =>
          setUserInput({
            [inputConstToKey(data.type)]: values[0],
          })
        }
        min={0}
        max={1}
        step={0.01}
        value={[data.output?.value ?? 0]}
      />
    </Node>
  );
};

UserInputNode.defaultNodeData = () => ({
  type: "SENSATION",
});

export default UserInputNode;
