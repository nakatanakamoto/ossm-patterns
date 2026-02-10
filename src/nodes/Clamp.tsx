import type { IntNodeType, PatternNodeType } from ".";
import Node from "../components/Node";
import {
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
  type Node as NodeType,
} from "@xyflow/react";
import Control from "../components/Node/controls";
import { Badge, Flex, Grid, TextField } from "@radix-ui/themes";
import { useEffect, useId, useMemo } from "react";
import type { FloatValue, IntegerValue } from "../types/Value";

export type ClampNodeType = NodeType<
  {
    min: number;
    max: number;
    output?: IntegerValue | FloatValue;
  },
  "clamp"
>;

const ClampNode: PatternNodeType<ClampNodeType> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const minId = useId();
  const maxId = useId();

  const connections = useNodeConnections({
    handleType: "target",
    handleId: "input",
  });

  const inputNode = useNodesData<IntNodeType>(connections[0]?.source);
  const inputData = inputNode?.data ?? null;

  useEffect(() => {
    if (
      inputData?.output === undefined ||
      data.min === undefined ||
      data.max === undefined
    ) {
      updateNodeData(id, {
        output: undefined,
      });
      return;
    }

    updateNodeData(id, {
      output: {
        type: inputData.output.type,
        value: Math.min(data.max, Math.max(data.min, inputData.output.value)),
      },
    });
  }, [inputData, data.min, data.max]);

  const setMin = (min: number) => {
    updateNodeData(id, {
      min: isNaN(min) === false ? min : undefined,
    });
  };

  const setMax = (max: number) => {
    updateNodeData(id, {
      max: isNaN(max) === false ? max : undefined,
    });
  };

  const valueLabel = useMemo(() => {
    const output = data?.output;
    if (output !== undefined) {
      return output.value;
    }

    if (data.min === undefined || data.max === undefined) {
      return <Badge>No input or min/max</Badge>;
    }

    if (inputNode === null) {
      return <Badge>Awaiting input</Badge>;
    }

    return <Badge>Awaiting value</Badge>;
  }, [data?.output, data?.min, data?.max]);

  return (
    <Node>
      <Node.Section
        handles={[
          {
            type: "target",
            id: "input",
            position: Position.Left,
          },
        ]}
      >
        <Node.Title>Clamp</Node.Title>
        <Node.Description>Clamp a value between a min and max</Node.Description>
      </Node.Section>

      <Node.Separator />

      <Control>
        <Grid columns="2" gapX="3" gapY="1" align="center">
          <Control.Label htmlFor={minId}>Min</Control.Label>
          <Control.Label htmlFor={maxId}>Max</Control.Label>
          <TextField.Root
            id={minId}
            onChange={(e) => {
              const rawValue = e.target.value;
              const parsedValue = parseFloat(rawValue);
              setMin(parsedValue);
            }}
            type="number"
            min={0}
            placeholder="250"
            step={50}
            value={data.min}
          />
          <TextField.Root
            id={maxId}
            onChange={(e) => {
              const rawValue = e.target.value;
              const parsedValue = parseFloat(rawValue);
              setMax(parsedValue);
            }}
            type="number"
            min={data.min}
            placeholder="250"
            step={50}
            value={data.max}
          />
        </Grid>
      </Control>

      <Node.Separator />

      <Node.Section
        handles={[
          {
            type: "source",
            id: "integer",
            position: Position.Right,
          },
        ]}
      >
        <Flex justify="between" align="center">
          <Control.Label>Output</Control.Label>
          <Control.Value>{valueLabel}</Control.Value>
        </Flex>
      </Node.Section>
    </Node>
  );
};

ClampNode.defaultNodeData = () => ({
  min: 0,
  max: 1,
});

export default ClampNode;
