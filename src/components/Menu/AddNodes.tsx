import { Button, DropdownMenu } from "@radix-ui/themes";
import { useReactFlow } from "@xyflow/react";
import { nodeTypes } from "../../nodes";

function AddNodes() {
  const { getNodesBounds, getNodes, setNodes } = useReactFlow();

  const addNode = (type: keyof typeof nodeTypes) => {
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button>
          Add Nodes
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={{ minWidth: "150px" }}>
        <DropdownMenu.Item onSelect={() => addNode("start")}>
          Start
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => addNode("end")}>
          End
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onSelect={() => addNode("move")}>
          Move
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => addNode("delay")}>
          Pause
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default AddNodes;
