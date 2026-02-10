import { useReactFlow } from "@xyflow/react";
import useNode from "./useNode";

function useConnectedEdges() {
  const reactFlow = useReactFlow();
  const node = useNode();

  if (!node) {
    return [];
  }

  const connectedEdges = reactFlow.getEdges().filter((edge) => {
    return edge.source === node.id || edge.target === node.id;
  });

  return connectedEdges;
}

export default useConnectedEdges;
