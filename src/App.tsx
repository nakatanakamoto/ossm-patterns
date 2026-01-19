import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "@radix-ui/themes/styles.css";
import { Theme, Text } from "@radix-ui/themes";
import useAppearance from "./hooks/useAppearance";
import Menu from "./components/Menu";
import { nodeTypes } from "./nodes";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function App() {
  const [appearance] = useAppearance();

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = (params) =>
    setEdges((eds) => addEdge(params, eds));

  return (
    <Theme accentColor="crimson">
      <div style={{ width: "100vw", height: "100vh" }}>
        <Panel position="top-left">
          <Menu />
        </Panel>

        <Panel position="top-center">
          <Text size="4" weight="bold">
            OSSM Patterns
          </Text>
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
