import {
  getConnectedEdges,
  getOutgoers,
  type Edge,
  type Node,
} from "@xyflow/react";

function getCurrentFlow<N extends Node, E extends Edge>(
  targetId: string,
  nodes: N[],
  edges: E[],
): {
  nodes: N[];
  edges: E[];
} {
  const visited = new Set<N>();

  const traverse = (node: N) => {
    if (visited.has(node)) return;
    visited.add(node);

    const outgoers = getOutgoers<N, E>(node, nodes, edges);

    outgoers.forEach(traverse);
  };

  const currentNode = nodes.find((node) => node.id === targetId);

  if (currentNode) {
    traverse(currentNode);
  }

  const nodesInFlow = Array.from(visited);

  return {
    nodes: nodesInFlow,
    edges: getConnectedEdges(nodesInFlow, edges),
  };
}

export default getCurrentFlow;
