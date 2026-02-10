import { Heading, Text } from "@radix-ui/themes";
import { Position, useReactFlow, type Node as NodeType } from "@xyflow/react";
import type { PatternNodeType } from ".";
import Node from "../components/Node";
import TextFieldControl from "../components/Node/controls/TextFieldControl";

export type ConstIntNodeType = NodeType<
  {
    value: number;
  },
  "constInt"
>;

const ConstIntNode: PatternNodeType<ConstIntNodeType> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const setValue = (value: number) => {
    updateNodeData(id, {
      value,
    });
  };

  return (
    <Node>
      <Node.Section>
        <Heading size="5" weight="bold">
          Constant Integer
        </Heading>
        <Text as="div" size="2">
          Pipe this value into other nodes
        </Text>
      </Node.Section>
      <Node.Separator />

      <TextFieldControl
        handles={[{ id: "value", type: "target", position: Position.Right }]}
        label="Value"
        onChange={(e) => {
          const rawValue = e.target.value;
          const parsedValue = parseFloat(rawValue);
          setValue(parsedValue);
        }}
        type="number"
        min={0}
        placeholder="250"
        step={50}
        value={data.value}
        style={{ width: "100px" }}
      />
    </Node>
  );
};

ConstIntNode.defaultNodeData = () => ({
  value: 1,
});

export default ConstIntNode;
