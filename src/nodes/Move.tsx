import { Box, Card, Flex, Heading, Slider, Inset, Separator, Text, Select } from "@radix-ui/themes";
import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

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
    'in out bounce'];

function PatternLoopNode() {
    const [velocity, setVelocity] = useState(30);
    const [position, setPosition] = useState(100);
    const [torque, setTorque] = useState(30);
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

                    <Inset side="x" my="4">
                        <Separator orientation="horizontal" size="4" />
                        <Box p="4">
                            <Flex gap="3" direction="column">
                                <Flex justify="between" align="center">
                                    <Text size="4" weight="bold">Velocity</Text>
                                    <Text size="3">{velocity}mm/s</Text>
                                </Flex>
                                <Slider onValueChange={(values) => setVelocity(values[0])} defaultValue={[100]} min={0.001} max={600} />
                            </Flex>
                        </Box>
                        <Separator orientation="horizontal" size="4" />
                        <Box p="4">
                            <Flex gap="3" direction="column">
                                <Flex justify="between" align="center">
                                    <Text size="4" weight="bold">Position</Text>
                                    <Text size="3">{position}%</Text>
                                </Flex>
                                <Slider onValueChange={(values) => setPosition(values[0])} defaultValue={[100]} />
                            </Flex>
                        </Box>
                        <Separator orientation="horizontal" size="4" />
                        <Box p="4">
                            <Flex gap="3" direction="column">
                                <Flex justify="between" align="center">
                                    <Text size="4" weight="bold">Torque</Text>
                                    <Text size="3">{torque}%</Text>
                                </Flex>
                                <Slider onValueChange={(values) => setTorque(values[0])} defaultValue={[100]} min={1} max={100} />
                            </Flex>
                        </Box>
                        <Separator orientation="horizontal" size="4" />
                        <Box p="4">
                            <Flex justify="between" align="center">
                                <Text size="4" weight="bold">Easing</Text>
                                <Select.Root defaultValue="linear">
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
                        <Separator orientation="horizontal" size="4" />
                    </Inset>
                </Box>
            </Card>
            <Handle type="source" position={Position.Left} />
            <Handle type="target" position={Position.Right} />
        </div>
    );
};

export default PatternLoopNode;