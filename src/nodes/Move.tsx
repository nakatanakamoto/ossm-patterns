import {
  Box,
  Card,
  Flex,
  Heading,
  Slider,
  Inset,
  Separator,
  Text,
  Select,
} from "@radix-ui/themes";
import { Handle, Position, useReactFlow, type Node } from "@xyflow/react";
import type { PatternNodeType } from ".";

const eases = [
  "linear",
  "in sine",
  "out sine",
  "in out sine",
  "in quad",
  "out quad",
  "in out quad",
  "in cubic",
  "out cubic",
  "in out cubic",
  "in quart",
  "out quart",
  "in out quart",
  "in quint",
  "out quint",
  "in out quint",
  "in expo",
  "out expo",
  "in out expo",
  "in circ",
  "out circ",
  "in out circ",
  "in back",
  "out back",
  "in out back",
  "in elastic",
  "out elastic",
  "in out elastic",
  "in bounce",
  "out bounce",
  "in out bounce",
] as const;

export type MoveNodeType = Node<
  {
    velocity: number;
    position: number;
    torque: number;
    easing: (typeof eases)[number];
  },
  "move"
>;

const PatternLoopNode: PatternNodeType<MoveNodeType> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();

  const setVelocity = (velocity: number) => {
    updateNodeData(id, {
      velocity,
    });
  };

  const setPosition = (position: number) => {
    updateNodeData(id, {
      position,
    });
  };

  const setTorque = (torque: number) => {
    updateNodeData(id, {
      torque,
    });
  };

  const setEasing = (easing: (typeof eases)[number]) => {
    updateNodeData(id, {
      easing,
    });
  };

  return (
    <div>
      <Card>
        <Box minWidth="320px" flexGrow="1">
          <Box>
            <Heading size="5" weight="bold">
              Move
            </Heading>
            <Text as="div" size="2">
              Actuate
            </Text>
          </Box>

          <Inset side="x" mt="4">
            <Separator orientation="horizontal" size="4" />
            <Box p="3">
              <Flex gap="3" direction="column">
                <Flex justify="between" align="center">
                  <Text size="3" weight="bold">
                    Velocity
                  </Text>
                  <Text size="3">{data.velocity}mm/s</Text>
                </Flex>
                <Slider
                  onValueChange={(values) => setVelocity(values[0])}
                  min={0.001}
                  max={600}
                  value={[data.velocity]}
                />
              </Flex>
            </Box>
            <Separator orientation="horizontal" size="4" />
            <Box p="3">
              <Flex gap="3" direction="column">
                <Flex justify="between" align="center">
                  <Text size="3" weight="bold">
                    Position
                  </Text>
                  <Text size="3">{Math.round(data.position * 100)}%</Text>
                </Flex>
                <Slider
                  onValueChange={(values) => setPosition(values[0])}
                  value={[data.position]}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </Flex>
            </Box>
            <Separator orientation="horizontal" size="4" />
            <Box p="3">
              <Flex gap="3" direction="column">
                <Flex justify="between" align="center">
                  <Text size="3" weight="bold">
                    Torque
                  </Text>
                  <Text size="3">{Math.round(data.torque * 100)}%</Text>
                </Flex>
                <Slider
                  onValueChange={(values) => setTorque(values[0])}
                  min={0}
                  max={1}
                  step={0.01}
                  value={[data.torque]}
                />
              </Flex>
            </Box>
            <Separator orientation="horizontal" size="4" />
            <Box p="3" pb="0">
              <Flex justify="between" align="center">
                <Text size="3" weight="bold">
                  Easing
                </Text>
                <Select.Root defaultValue="linear" onValueChange={setEasing}>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      {eases.map((ease) => (
                        <Select.Item key={ease} value={ease}>
                          {ease}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
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

PatternLoopNode.defaultNodeData = () => ({
  velocity: 100,
  position: 0.5,
  torque: 0.5,
  easing: "linear",
});

export default PatternLoopNode;
