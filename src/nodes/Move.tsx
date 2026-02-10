import { Heading, Text } from "@radix-ui/themes";
import { Position, useReactFlow, type Node as NodeType } from "@xyflow/react";
import type { PatternNodeType } from ".";
import Node from "../components/Node";
import SliderControl from "../components/Node/controls/SliderControl";

export type MoveNodeType = NodeType<
  {
    velocity: number;
    position: number;
    torque: number;
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

  return (
    <Node>
      <Node.Section
        handles={[
          { type: "source", position: Position.Left },
          {
            type: "target",
            position: Position.Right,
          },
        ]}
      >
        <Heading size="5" weight="bold">
          Move
        </Heading>
        <Text size="2">Actuate</Text>
      </Node.Section>

      <Node.Separator />

      <SliderControl
        label="Velocity"
        handles={[{ id: "velocity", type: "source", position: Position.Left }]}
        formatValue={(value) => `${Math.round(value[0] * 100)}%`}
        onValueChange={(values) => setVelocity(values[0])}
        min={0}
        max={1}
        step={0.01}
        value={[data.velocity]}
      />

      <Node.Separator />

      <SliderControl
        label="Position"
        handles={[
          {
            id: "position",
            type: "source",
            position: Position.Left,
          },
        ]}
        formatValue={(value) => `${Math.round(value[0] * 100)}%`}
        onValueChange={(values) => setPosition(values[0])}
        min={0}
        max={1}
        step={0.01}
        value={[data.position]}
      />

      <Node.Separator />

      <SliderControl
        label="Torque"
        handles={[{ id: "torque", type: "source", position: Position.Left }]}
        formatValue={(value) => `${Math.round(value[0] * 100)}%`}
        onValueChange={(values) => setTorque(values[0])}
        min={0}
        max={1}
        step={0.01}
        value={[data.torque]}
      />
    </Node>
  );
};

PatternLoopNode.defaultNodeData = () => ({
  velocity: 0.4,
  position: 0.5,
  torque: 0.5,
  easing: "linear",
});

export default PatternLoopNode;
