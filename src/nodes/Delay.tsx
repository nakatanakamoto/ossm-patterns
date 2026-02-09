import { Heading, Text, TextField } from "@radix-ui/themes";
import {
  Handle,
  Position,
  useReactFlow,
  type Node as NodeType,
} from "@xyflow/react";
import type { PatternNodeType } from ".";
import Node from "../components/Node";
import TextFieldControl from "../components/Node/controls/TextFieldControl";

export type DelayNodeType = NodeType<
  {
    duration: number;
  },
  "delay"
>;

const DelayNode: PatternNodeType<DelayNodeType> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const setDuration = (duration: number) => {
    updateNodeData(id, {
      duration,
    });
  };

  return (
    <Node>
      <Node.Section
        handles={
          <>
            <Handle type="source" position={Position.Left} />
            <Handle type="target" position={Position.Right} />
          </>
        }
      >
        <Heading size="5" weight="bold">
          Delay
        </Heading>
        <Text as="div" size="2">
          Pause for effect
        </Text>
      </Node.Section>
      <Node.Separator />

      <TextFieldControl
        handles={
          <Handle id="duration" type="target" position={Position.Left} />
        }
        label="Delay"
        onChange={(e) => {
          const rawValue = e.target.value;
          const parsedValue = parseFloat(rawValue);
          setDuration(parsedValue);
        }}
        type="number"
        min={0}
        placeholder="250"
        step={50}
        value={data.duration}
        style={{ width: "100px" }}
      >
        <TextField.Slot side="right">ms</TextField.Slot>
      </TextFieldControl>
    </Node>
  );
};

DelayNode.defaultNodeData = () => ({
  duration: 300,
});

export default DelayNode;
