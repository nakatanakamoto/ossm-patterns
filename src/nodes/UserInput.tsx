import { Position, type Node as NodeType } from "@xyflow/react";
import Node from "../components/Node";
import { Heading, Select, Text } from "@radix-ui/themes";
import type { PatternNodeType } from ".";
import SelectControl from "../components/Node/controls/SelectControl";

export type UserInputType = "DEPTH" | "SPEED" | "SENSATION";

export type UserInputNodeType = NodeType<
  {
    type: UserInputType;
  },
  "userInput"
>;

const UserInputNode: PatternNodeType<UserInputNodeType> = () => {
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
        defaultValue="Sensation"
        label="Input Type"
        direction="row"
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {["Sensation", "Speed", "Depth"].map((inputType) => (
              <Select.Item key={inputType} value={inputType}>
                {inputType}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </SelectControl>
    </Node>
  );
};

UserInputNode.defaultNodeData = () => ({
  type: "SENSATION",
});

export default UserInputNode;
