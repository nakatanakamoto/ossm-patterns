import {
  Box,
  Card,
  Flex,
  Heading,
  Inset,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Handle, Position, useReactFlow, type Node } from "@xyflow/react";
import type { PatternNodeType } from ".";

export type DelayNodeType = Node<
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
    <div>
      <Card>
        <Box minWidth="320px" flexGrow="1">
          <Box>
            <Heading size="5" weight="bold">
              Delay
            </Heading>
            <Text as="div" size="2">
              Pause for effect
            </Text>
          </Box>

          <Inset side="x" mt="4">
            <Separator orientation="horizontal" size="4" />

            <Box width="100%" p="3" pb="0">
              <Flex justify="between" align="center">
                <Box flexGrow="1">
                  <Text size="4" weight="bold">
                    Time
                  </Text>
                </Box>
                <Box maxWidth="50%" flexGrow="1">
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
                    <TextField.Slot side="right">Milliseconds</TextField.Slot>
                  </TextField.Root>
                </Box>
              </Flex>
            </Box>
          </Inset>
        </Box>
      </Card>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
};

DelayNode.defaultNodeData = () => ({
  duration: 300,
});

export default DelayNode;
