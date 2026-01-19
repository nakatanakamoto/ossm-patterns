import { getConnectedEdges, getOutgoers, useEdges, useNodeId, useNodes, type Node } from "@xyflow/react";

function useCurrentFlow() {
    const nodes = useNodes();
    const edges = useEdges();
    const currentId = useNodeId();

    const visited = new Set<Node>();

    const traverse = (node: Node) => {
        if(visited.has(node)) return;
        visited.add(node);

        const outgoers = getOutgoers(node, nodes, edges);

        outgoers.forEach(traverse);
    }

    const currentNode = nodes.find((node) => node.id === currentId);

    if(currentNode) {
        traverse(currentNode);
    }

    const nodesInFlow = Array.from(visited);

    return {
        nodes: nodesInFlow,
        edges: getConnectedEdges(nodesInFlow, edges),
    };
}

export default useCurrentFlow;