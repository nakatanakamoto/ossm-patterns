import type { PatternNodeType } from ".";
import Node from "../components/Node";
import { Position, useReactFlow, type Node as NodeType } from "@xyflow/react";
import Control from "../components/Node/controls";
import { Badge, Flex, Grid, TextField } from "@radix-ui/themes";
import { useId } from "react";

export type ClampNodeType = NodeType<
  {
    min: number;
    max: number;
  },
  "clamp"
>;

const ClampNode: PatternNodeType<ClampNodeType> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const minId = useId();
  const maxId = useId();

  const setMin = (min: number) => {
    updateNodeData(id, {
      min,
    });
  };

  const setMax = (max: number) => {
    updateNodeData(id, {
      max,
    });
  };

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
          <Control.Label htmlFor={maxId}>Min</Control.Label>
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
            min={0}
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
          <Control.Value>
            <Badge>Disconnected input</Badge>
          </Control.Value>
        </Flex>
      </Node.Section>
    </Node>
  );
};

ClampNode.defaultNodeData = () => ({
  value: 0,
  min: 0,
  max: 1,
});

export default ClampNode;
