import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text } from "@radix-ui/themes";
import {
  Handle,
  Position,
  useEdges,
  useNodes,
  type Node as NodeType,
} from "@xyflow/react";
import type { NodeType as NodeTypes, PatternNodeType } from ".";
import useCurrentFlow from "../hooks/useCurrentFlow";
import { green, red } from "@radix-ui/colors";
import Node from "../components/Node";

function validateStartAndEnd(nodes: NodeType[]) {
  const hasSingleStart =
    nodes.filter((node) => node.type === "start").length === 1;
  const hasSingleEnd = nodes.filter((node) => node.type === "end").length === 1;

  if (hasSingleStart === false || hasSingleEnd === false) {
    return "The pattern must have a single start and a single end node";
  }
}

export type EndNodeType = NodeType<Record<string, never>, "end">;

const EndNode: PatternNodeType<EndNodeType> = ({ id }) => {
  const nodes = useNodes<NodeTypes>();
  const edges = useEdges();
  const currentFlow = useCurrentFlow(id, nodes, edges);

  const startAndEndError = validateStartAndEnd(currentFlow.nodes);

  return (
    <Node>
      <Node.Section handles={<Handle type="source" position={Position.Left} />}>
        <Heading size="5" weight="bold">
          Pattern End
        </Heading>
        <Text as="div" size="2">
          End here
        </Text>
      </Node.Section>
      <Node.Separator />
      <Node.Section>
        <Flex gap="2" align="center">
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
      </Node.Section>
    </Node>
  );
};

EndNode.defaultNodeData = () => ({});

export default EndNode;
