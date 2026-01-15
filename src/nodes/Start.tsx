import { Box, Card, Flex, Heading, Inset, Separator, Text, TextArea, TextField } from "@radix-ui/themes";
import { Handle, Position } from "@xyflow/react";

function StartNode() {
    return (
        <div>
            <Card>
                <Box minWidth="320px" flexGrow="1">
                    <Box>
                        <Heading size="5" weight="bold">
                            Pattern Start
                        </Heading>
                        <Text as="div" size="2">
                            Begin here
                        </Text>
                    </Box>

                    <Inset side="x" my="4">
                        <Separator orientation="horizontal" size="4" />

                        <Box width="100%" p="2">
                            <Flex justify="between" align="center">
                                <Text size="4" weight="bold">Name</Text>
                                <TextField.Root placeholder="Buzzy buzz" />
                            </Flex>
                        </Box>
                        <Separator orientation="horizontal" size="4" />
                        <Flex width="100%" p="2" gap="2" direction="column">
                            <Text size="4" weight="bold">Description</Text>

                            <TextArea placeholder="Describe the sensation" />
                        </Flex>
                        <Separator orientation="horizontal" size="4" />
                    </Inset>
                </Box>
            </Card>
            <Handle type="target" position={Position.Right} />
        </div>
    );
};

export default StartNode;