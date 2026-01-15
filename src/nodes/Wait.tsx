import { Box, Card, Flex, Heading, Inset, Separator, Text, TextField } from "@radix-ui/themes";
import { Handle, Position } from "@xyflow/react";

function WaitNode() {
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

                    <Inset side="x" my="4">
                        <Separator orientation="horizontal" size="4" />

                        <Box width="100%" p="2">
                            <Flex justify="between" align="center">
                                <Box flexGrow="1">
                                    <Text size="4" weight="bold">Time</Text>
                                </Box>
                                <Box maxWidth="50%" flexGrow="1">
                                    <TextField.Root type="number" min={0} placeholder="10">
                                        <TextField.Slot side="right">Seconds</TextField.Slot>
                                    </TextField.Root>
                                </Box>
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

export default WaitNode;