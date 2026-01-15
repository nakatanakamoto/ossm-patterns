import { ReactFlow, Background, Controls, type Node, type Edge, Panel, useNodesState, useEdgesState, addEdge, type OnConnect, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import "@radix-ui/themes/styles.css";
import StartNode from './nodes/Start';
import { Button, Theme, DropdownMenu, Text, Flex } from '@radix-ui/themes';
import MoveNode from './nodes/Move';
import EndNode from './nodes/End';
import WaitNode from './nodes/Wait';
import useAppearance from './hooks/useAppearance';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  move: MoveNode,
  wait: WaitNode,
}

export default function App() {
  const [appearance] = useAppearance();

  const { getNodesBounds, getNodes } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = (params) => setEdges((eds) => addEdge(params, eds));

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
        data: {},
      }
    ]);
  }

  return (
    <Theme accentColor="crimson">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Panel position="top-left">
          <Flex gap="3" align="center">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button>
                Add Nodes
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content style={{ minWidth: '150px' }}>
              <DropdownMenu.Item onSelect={() => addNode('start')}>Start</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => addNode('end')}>End</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onSelect={() => addNode('move')}>Move</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => addNode('wait')}>Pause</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Button>Export Pattern</Button>
          </Flex>
        </Panel>

        <Panel position="top-center">
          <Text size="4" weight="bold">OSSM Patterns</Text>
        </Panel>

        <ReactFlow
          colorMode={appearance}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </Theme>
  );
}