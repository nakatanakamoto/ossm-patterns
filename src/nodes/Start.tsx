import { Heading, Text } from "@radix-ui/themes";
import { Position, useReactFlow, type Node as NodeType } from "@xyflow/react";
import type { PatternNodeType } from ".";
import Node from "../components/Node";
import TextFieldControl from "../components/Node/controls/TextFieldControl";
import TextAreaControl from "../components/Node/controls/TextAreaControl";

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
      <Node.Section handles={[{ type: "target", position: Position.Right }]}>
        <Heading size="5" weight="bold">
          Pattern Start
        </Heading>
        <Text as="div" size="2">
          Begin here
        </Text>
      </Node.Section>

      <Node.Separator />

      <TextFieldControl
        label="Name"
        onChange={(e) => {
          const value = e.target.value;
          updateName(value);
        }}
        placeholder="Simple stroke"
        value={data.name}
      />

      <Node.Separator />

      <TextAreaControl
        label="Description"
        onChange={(e) => {
          const value = e.target.value;
          updateDescription(value);
        }}
        placeholder="Describe the pattern"
        value={data.description}
      />
    </Node>
  );
};

StartNode.defaultNodeData = () => ({
  name: "",
  description: "",
});

export default StartNode;
