import { DropdownMenu } from "@radix-ui/themes";
import { useReactFlow } from "@xyflow/react";
import { nodeTypes, type NodeType } from "../../nodes";
import type { PropsWithChildren } from "react";

type AddNodeProps = PropsWithChildren<{
  type: NodeType["type"];
}>;

function AddNode({ type, children }: AddNodeProps) {
  const { getNodesBounds, getNodes, setNodes } = useReactFlow();

  const addNode = () => {
    const bounds = getNodesBounds(getNodes());

    const position = {
      x: bounds.x + bounds.width + 50,
      y: bounds.y + bounds.height / 2,
    };

    setNodes((nodes) => [
      ...nodes,
      {
        id: String(Math.random()),
        type,
        position,
        origin: [0, 0.5],
        data: nodeTypes[type].defaultNodeData(),
      },
    ]);
  };

  return (
    <DropdownMenu.Item onSelect={() => addNode()}>{children}</DropdownMenu.Item>
  );
}

export default AddNode;
