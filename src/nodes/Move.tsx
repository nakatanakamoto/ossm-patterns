import { Box, Card, Flex, Heading, Slider, Inset, Separator, Text, Select } from "@radix-ui/themes";
import { Handle, Position, useReactFlow, type Node, type NodeProps } from "@xyflow/react";

type MoveNodeProps = NodeProps<Node<{
    velocity: number;
    position: number;
    torque: number;
    easing: typeof eases[number];
}>>;

const eases = [
    'linear',
    'in sine',
    'out sine',
    'in out sine',
    'in quad',
    'out quad',
    'in out quad',
    'in cubic',
    'out cubic',
    'in out cubic',
    'in quart',
    'out quart',
    'in out quart',
    'in quint',
    'out quint',
    'in out quint',
    'in expo',
    'out expo',
    'in out expo',
    'in circ',
    'out circ',
    'in out circ',
    'in back',
    'out back',
    'in out back',
    'in elastic',
    'out elastic',
    'in out elastic',
    'in bounce',
    'out bounce',
    'in out bounce'] as const;

function PatternLoopNode({ id, data }: MoveNodeProps) {
    const { updateNodeData } = useReactFlow();

    const setVelocity = (velocity: number) => {
        updateNodeData(id, {
            velocity,
        })
    }

    const setPosition = (position: number) => {
        updateNodeData(id, {
            position,
        })
    }

    const setTorque = (torque: number) => {
        updateNodeData(id, {
            torque,
        })
    }

    const setEasing = (easing: typeof eases[number]) => {
        updateNodeData(id, {
            easing,
        })
    }

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
                                    <Text size="3" weight="bold">Velocity</Text>
                                    <Text size="3">{data.velocity}mm/s</Text>
                                </Flex>
                                <Slider onValueChange={(values) => setVelocity(values[0])} defaultValue={[100]} min={0.001} max={600} />
                            </Flex>
                        </Box>
                        <Separator orientation="horizontal" size="4" />
                        <Box p="3">
                            <Flex gap="3" direction="column">
                                <Flex justify="between" align="center">
                                    <Text size="3" weight="bold">Position</Text>
                                    <Text size="3">{data.position}%</Text>
                                </Flex>
                                <Slider onValueChange={(values) => setPosition(values[0])} defaultValue={[100]} />
                            </Flex>
                        </Box>
                        <Separator orientation="horizontal" size="4" />
                        <Box p="3">
                            <Flex gap="3" direction="column">
                                <Flex justify="between" align="center">
                                    <Text size="3" weight="bold">Torque</Text>
                                    <Text size="3">{data.torque}%</Text>
                                </Flex>
                                <Slider onValueChange={(values) => setTorque(values[0])} defaultValue={[100]} min={1} max={100} />
                            </Flex>
                        </Box>
                        <Separator orientation="horizontal" size="4" />
                        <Box p="3" pb="0">
                            <Flex justify="between" align="center">
                                <Text size="3" weight="bold">Easing</Text>
                                <Select.Root defaultValue="linear" onValueChange={setEasing}>
                                    <Select.Trigger />
                                    <Select.Content>
                                        <Select.Group>
                                            {eases.map((ease) => (
                                                <Select.Item key={ease} value={ease}>{ease}</Select.Item>
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

export default PatternLoopNode;