import {
  ReactFlow,
  Background,
  Controls,
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
import { nodeTypes, type NodeType } from "./nodes";
import isValidConnection from "./utils/isValidConnection";
import { SharedValueProvider } from "./context/userInput";

const proOptions: ProOptions = {
  /// We don't have pro but it is OSS, so [this is allowed](https://reactflow.dev/learn/troubleshooting/remove-attribution)
  hideAttribution: true,
};

export default function App() {
  const [appearance] = useAppearance();

  const [nodes, , onNodesChange] = useNodesState<NodeType>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect: OnConnect = (params) =>
    setEdges((eds) => addEdge(params, eds));

  return (
    <Theme accentColor="crimson">
      <SharedValueProvider>
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

          <ReactFlow<NodeType>
            colorMode={appearance}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            proOptions={proOptions}
            isValidConnection={(edge) => {
              const source = nodes.find((n) => n.id === edge.source);
              const target = nodes.find((n) => n.id === edge.target);
              if (!source || !target) return false;
              return isValidConnection({
                source,
                target,
                sourceHandleId: edge.sourceHandle ?? null,
                targetHandleId: edge.targetHandle ?? null,
              });
            }}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </SharedValueProvider>
    </Theme>
  );
}
