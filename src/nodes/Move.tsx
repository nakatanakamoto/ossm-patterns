import { Flex, Heading, Slider, Text, Select } from "@radix-ui/themes";
import {
  Handle,
  Position,
  useReactFlow,
  type Node as NodeType,
} from "@xyflow/react";
import type { PatternNodeType } from ".";
import Node from "../components/Node";

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

export type MoveNodeType = NodeType<
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
          Move
        </Heading>
        <Text as="div" size="2">
          Actuate
        </Text>
      </Node.Section>

      <Node.Separator />

      <Node.Section
        handles={
          <Handle id="velocity" type="source" position={Position.Left} />
        }
      >
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
      </Node.Section>

      <Node.Separator />

      <Node.Section
        handles={
          <Handle id="velocity" type="source" position={Position.Left} />
        }
      >
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
      </Node.Section>

      <Node.Separator />

      <Node.Section
        handles={
          <Handle id="velocity" type="source" position={Position.Left} />
        }
      >
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
      </Node.Section>

      <Node.Separator />

      <Node.Section>
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
      </Node.Section>
    </Node>
  );
};

PatternLoopNode.defaultNodeData = () => ({
  velocity: 100,
  position: 0.5,
  torque: 0.5,
  easing: "linear",
});

export default PatternLoopNode;
