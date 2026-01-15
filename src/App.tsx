import { useState } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, type Node, type Edge, type OnNodesChange, type OnEdgesChange, type OnConnect } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import "@radix-ui/themes/styles.css";
import StartNode from './nodes/Start';
import { Button, Flex, Theme } from '@radix-ui/themes';
import MoveNode from './nodes/Move';
import EndNode from './nodes/End';
import WaitNode from './nodes/Wait';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  move: MoveNode,
  wait: WaitNode,
}

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
  const onEdgesChange: OnEdgesChange = (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
  const onConnect: OnConnect = (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));

  return (
    <Theme>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Flex gap="1">
          <Button onClick={() => setNodes([
            ...nodes, { id: String(Math.random()), type: 'start', position: { x: 1, y: 3 }, data: {} }])}>Add Start</Button>
          <Button onClick={() => setNodes([
            ...nodes, { id: String(Math.random()), type: 'end', position: { x: 1, y: 3 }, data: {} }])}>Add End</Button>
          <Button onClick={() => setNodes([
            ...nodes, { id: String(Math.random()), type: 'move', position: { x: 1, y: 3 }, data: {} }])}>Add Move</Button>
          <Button onClick={() => setNodes([
          ...nodes, { id: String(Math.random()), type: 'wait', position: { x: 1, y: 3 }, data: {} }])}>Add Delay</Button>
        </Flex>

        <ReactFlow
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