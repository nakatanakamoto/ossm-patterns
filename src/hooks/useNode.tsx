import { useNodeId, useReactFlow } from "@xyflow/react";

function useNode() {
  const reactFlowWrapper = useReactFlow();
  const nodeId = useNodeId();

  const node = nodeId ? reactFlowWrapper.getNode(nodeId) : undefined;

  return node;
}

export default useNode;
