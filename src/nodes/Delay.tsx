import { Heading, Text, TextField } from "@radix-ui/themes";
import {
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
  type Node as NodeType,
} from "@xyflow/react";
import type { IntNodeType, PatternNodeType } from ".";
import Node from "../components/Node";
import TextFieldControl from "../components/Node/controls/TextFieldControl";
import { useEffect } from "react";
import type { IntegerValue } from "../types/Value";

export type DelayNodeType = NodeType<
  {
    duration?: IntegerValue;
  },
  "delay"
>;

const DelayNode: PatternNodeType<DelayNodeType> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const connections = useNodeConnections({
    handleType: "target",
    handleId: "duration",
  });

  const inputNode = useNodesData<IntNodeType>(connections[0]?.source);
  const inputData = inputNode?.data ?? null;

  useEffect(() => {
    if (inputData === null) return;
    if (inputData?.output === undefined) {
      updateNodeData(id, {
        duration: undefined,
      });
      return;
    }

    updateNodeData(id, {
      duration: {
        type: "INTEGER",
        value: inputData.output.value,
      },
    });
  }, [id, inputData, updateNodeData]);

  const setDuration = (duration: number) => {
    updateNodeData(id, {
      duration: {
        type: "INTEGER",
        value: duration,
      },
    });
  };

  return (
    <Node>
      <Node.Section
        handles={[
          { type: "target", position: Position.Left },
          {
            type: "source",
            position: Position.Right,
          },
        ]}
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
        handles={[
          {
            id: "duration",
            type: "target",
            position: Position.Left,
          },
        ]}
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
        value={data.duration?.value ?? ""}
        style={{ width: "100px" }}
        disabled={inputData?.output !== undefined}
      >
        <TextField.Slot side="right">ms</TextField.Slot>
      </TextFieldControl>
    </Node>
  );
};

DelayNode.defaultNodeData = () => ({});

export default DelayNode;
