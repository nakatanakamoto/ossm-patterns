import { Position, type Node as NodeType } from "@xyflow/react";
import Node from "../components/Node";
import { Flex, Heading, Select, Text } from "@radix-ui/themes";
import type { PatternNodeType } from ".";

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
      <Node.Section>
        <Flex justify="between" align="center">
          <Text size="3" weight="bold">
            Value
          </Text>
          <Select.Root defaultValue="Sensation">
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                {["Sensation", "Speed"].map((ease) => (
                  <Select.Item key={ease} value={ease}>
                    {ease}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Node.Section>
    </Node>
  );
};

UserInputNode.defaultNodeData = () => ({
  type: "SENSATION",
});

export default UserInputNode;
