import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Flex,
  Heading,
  Inset,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Handle, Position, useEdges, useNodes, type Node } from "@xyflow/react";
import type { NodeType, PatternNodeType } from ".";
import useCurrentFlow from "../hooks/useCurrentFlow";
import { green, red } from "@radix-ui/colors";

function validateStartAndEnd(nodes: NodeType[]) {
  const hasSingleStart =
    nodes.filter((node) => node.type === "start").length === 1;
  const hasSingleEnd = nodes.filter((node) => node.type === "end").length === 1;

  if (hasSingleStart === false || hasSingleEnd === false) {
    return "The pattern must have a single start and a single end node";
  }
}

export type EndNodeType = Node<Record<string, never>, "end">;

const EndNode: PatternNodeType<EndNodeType> = ({ id }) => {
  const nodes = useNodes<NodeType>();
  const edges = useEdges();
  const currentFlow = useCurrentFlow(id, nodes, edges);

  const startAndEndError = validateStartAndEnd(currentFlow.nodes);

  return (
    <div>
      <Card>
        <Box width="300px" flexGrow="1">
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
              {startAndEndError === undefined ? (
                <CheckCircledIcon color={green.green11} />
              ) : (
                <CrossCircledIcon color={red.red9} />
              )}
              <Text>
                {startAndEndError === undefined
                  ? "The pattern has a single start and end"
                  : startAndEndError}
              </Text>
            </Flex>
          </Inset>
        </Box>
      </Card>
      <Handle type="source" position={Position.Left} />
    </div>
  );
};

EndNode.defaultNodeData = () => ({});

export default EndNode;
