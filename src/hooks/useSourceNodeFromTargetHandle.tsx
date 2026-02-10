import { useReactFlow, type HandleProps, type Node } from "@xyflow/react";

function useSourceNodeFromTargetHandle(node: Node, handle: HandleProps) {
  const reactFlow = useReactFlow();
  const connectedEdges = reactFlow.getEdges().filter((edge) => {
    return edge.target === node.id && edge.targetHandle === handle.id;
  });

  if (connectedEdges.length === 0) {
    return null;
  }

  const sourceNodeId = connectedEdges[0].source;
  const sourceNode = reactFlow.getNode(sourceNodeId);

  return sourceNode;
}

export default useSourceNodeFromTargetHandle;
