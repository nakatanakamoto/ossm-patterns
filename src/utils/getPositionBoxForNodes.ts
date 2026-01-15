import { type Node } from "@xyflow/react";

function getPositionBoxForNodes(nodes: Node[]) {
    if(nodes.length === 0) {
        return null;
    }

    const AABB = nodes.reduce((acc, node) => {
        return {
            min: {
                x: Math.min(acc.min.x, node.position.x),
                y: Math.min(acc.min.y, node.position.y),
            },
            max: {
                x: Math.max(acc.max.x, node.position.x + (node.measured?.width ?? 0)),
                y: Math.max(acc.max.y, node.position.y + (node.measured?.height ?? 0)),
            }
        }
    }, {
        min: {
            x: Infinity,
            y: Infinity,
        },
        max: {
            x: -Infinity,
            y: -Infinity,
        },
    })

    return {
        ...AABB,
        width: AABB.max.x - AABB.min.x,
        height: AABB.max.y - AABB.min.y,
    }
}

export default getPositionBoxForNodes;