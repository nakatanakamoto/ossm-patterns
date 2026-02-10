import { Heading, Text } from "@radix-ui/themes";
import { Position, useReactFlow, type Node as NodeType } from "@xyflow/react";
import type { PatternNodeType } from ".";
import Node from "../components/Node";
import TextFieldControl from "../components/Node/controls/TextFieldControl";
import type { IntegerValue } from "../types/Value";

export type ConstIntNodeType = NodeType<
  {
    output?: IntegerValue;
  },
  "constInt"
>;

const ConstIntNode: PatternNodeType<ConstIntNodeType> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const setValue = (value: number) => {
    if (isNaN(value)) {
      updateNodeData(id, {
        output: undefined,
      });
      return;
    }
    updateNodeData(id, {
      output: {
        type: "INTEGER",
        value,
      },
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
        handles={[{ id: "output", type: "source", position: Position.Right }]}
        label="Value"
        onChange={(e) => {
          const rawValue = e.target.value;
          const parsedValue = parseInt(rawValue, 10);
          setValue(parsedValue);
        }}
        type="number"
        min={0}
        step={1}
        placeholder="250"
        value={data.output?.value ?? ""}
        style={{ width: "100px" }}
      />
    </Node>
  );
};

ConstIntNode.defaultNodeData = () => ({
  output: {
    type: "INTEGER",
    value: 0,
  },
});

export default ConstIntNode;
