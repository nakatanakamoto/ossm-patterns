import { Box, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import {
  Handle,
  Position,
  useReactFlow,
  type Node as NodeType,
} from "@xyflow/react";
import type { PatternNodeType } from ".";
import Node from "../components/Node";

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

      <Node.Section
        handles={<Handle id="time" type="target" position={Position.Left} />}
      >
        <Flex justify="between" align="center">
          <Flex gap="2" align="baseline">
            <Text size="4" weight="bold">
              Time
            </Text>
          </Flex>
          <Box maxWidth="40%" flexGrow="1">
            <TextField.Root
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
            >
              <TextField.Slot side="right">ms</TextField.Slot>
            </TextField.Root>
          </Box>
        </Flex>
      </Node.Section>
    </Node>
  );
};

DelayNode.defaultNodeData = () => ({
  duration: 300,
});

export default DelayNode;
