import { CheckCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Flex,
  Heading,
  Inset,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Handle, Position } from "@xyflow/react";

function EndNode() {
  return (
    <div>
      <Card>
        <Box minWidth="100px" flexGrow="1">
          <Box>
            <Heading size="5" weight="bold">
              Pattern End
            </Heading>
            <Text as="div" size="2">
              End here
            </Text>
          </Box>

          <Inset side="x" mt="4">
            <Separator orientation="horizontal" size="4" />
            <Flex gap="2" p="3" align="center">
              <CheckCircledIcon color="#1FD8A4" />
              <Text>Starts and ends at position 0</Text>
            </Flex>
            <Separator orientation="horizontal" size="4" />
            <Flex gap="2" p="3" align="center">
              <CheckCircledIcon color="#1FD8A4" />
              <Text>
                Does not make dangerous accelerations or use excessive torque
              </Text>
            </Flex>
            <Separator orientation="horizontal" size="4" />
            <Flex gap="2" p="3" pb="0" align="center">
              <CheckCircledIcon color="#1FD8A4" />
              <Text>Does not have dangling nodes</Text>
            </Flex>
          </Inset>
        </Box>
      </Card>
      <Handle type="source" position={Position.Left} />
    </div>
  );
}

export default EndNode;
