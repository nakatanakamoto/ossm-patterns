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
  type ProOptions,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "@radix-ui/themes/styles.css";
import { Theme, Text, Badge, Flex, Button, Link } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import useAppearance from "./hooks/useAppearance";
import Menu from "./components/Menu";
import { nodeTypes } from "./nodes";
import SimpleStroke from "./patterns/simple-stroke.json";

const initialNodes: Node[] = SimpleStroke.nodes as Node[];
const initialEdges: Edge[] = SimpleStroke.edges;

const proOptions: ProOptions = {
  /// We don't have pro but it is OSS, so [this is allowed](https://reactflow.dev/learn/troubleshooting/remove-attribution)
  hideAttribution: true,
};

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

        <Panel position="top-right">
          <Button asChild>
            <Link
              target="_blank"
              href="https://github.com/nakatanakamoto/ossm-patterns"
            >
              <GitHubLogoIcon /> ossm-patterns
            </Link>
          </Button>
        </Panel>

        <Panel position="top-center">
          <Flex gap="3" align="baseline">
            <Text size="4" weight="bold">
              OSSM Patterns
            </Text>
            <Badge color="ruby">ALPHA</Badge>
          </Flex>
        </Panel>

        <ReactFlow
          colorMode={appearance}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </Theme>
  );
}
