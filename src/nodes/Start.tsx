import { Flex, Heading, Text, TextArea, TextField } from "@radix-ui/themes";
import {
  Handle,
  Position,
  useReactFlow,
  type Node as NodeType,
} from "@xyflow/react";
import type { PatternNodeType } from ".";
import Node from "../components/Node";

export type StartNodeType = NodeType<
  {
    name: string;
    description: string;
  },
  "start"
>;

type StartNodeProps = PatternNodeType<StartNodeType>;

const StartNode: StartNodeProps = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const updateName = (newName: string) => {
    updateNodeData(id, {
      name: newName,
    });
  };

  const updateDescription = (newDescription: string) => {
    updateNodeData(id, {
      description: newDescription,
    });
  };

  return (
    <Node>
      <Node.Section
        handles={<Handle type="target" position={Position.Right} />}
      >
        <Heading size="5" weight="bold">
          Pattern Start
        </Heading>
        <Text as="div" size="2">
          Begin here
        </Text>
      </Node.Section>

      <Node.Separator />

      <Node.Section>
        <Flex justify="between" align="center">
          <Text size="4" weight="bold">
            Name
          </Text>
          <TextField.Root
            onChange={(e) => {
              const value = e.target.value;
              updateName(value);
            }}
            placeholder="Simple stroke"
            value={data.name}
          />
        </Flex>
      </Node.Section>

      <Node.Separator />

      <Node.Section>
        <Flex width="100%" gap="2" direction="column">
          <Text size="4" weight="bold">
            Description
          </Text>
          <TextArea
            onChange={(e) => {
              const value = e.target.value;
              updateDescription(value);
            }}
            placeholder="Describe the sensation"
            value={data.description}
          />
        </Flex>
      </Node.Section>
    </Node>
  );
};

StartNode.defaultNodeData = () => ({
  name: "",
  description: "",
});

export default StartNode;
