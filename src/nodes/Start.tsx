import { Box, Card, Flex, Heading, Inset, Separator, Text, TextArea, TextField } from "@radix-ui/themes";
import { Handle, Position, useReactFlow, type Node, type NodeProps } from "@xyflow/react";

type StartNodeProps = NodeProps<Node<{
    name: string;
    description: string;
}>>;

function StartNode({ id, data }: StartNodeProps) {
    const { updateNodeData } = useReactFlow();

    const updateName = (newName: string) => {
        updateNodeData(id, {
            name: newName,
        })
    }

    const updateDescription = (newDescription: string) => {
        updateNodeData(id, {
            description: newDescription,
        })
    }

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

                    <Inset side="x" mt="4">
                        <Separator orientation="horizontal" size="4" />

                        <Box width="100%" p="3">
                            <Flex justify="between" align="center">
                                <Text size="4" weight="bold">Name</Text>
                                <TextField.Root onChange={
                                    (e) => {
                                        const value = e.target.value;
                                        updateName(value)
                                    }}
                                    placeholder="Simple stroke"
                                    value={data.name}
                                />
                            </Flex>
                        </Box>
                        <Separator orientation="horizontal" size="4" />
                        <Flex width="100%" p="3" pb="0" gap="2" direction="column">
                            <Text size="4" weight="bold">Description</Text>
                            <TextArea onChange={
                                (e) => {
                                        const value = e.target.value;
                                        updateDescription(value)
                                    }
                            } placeholder="Describe the sensation" />
                        </Flex>
                    </Inset>
                </Box>
            </Card>
            <Handle type="target" position={Position.Right} />
        </div>
    );
};

export default StartNode;