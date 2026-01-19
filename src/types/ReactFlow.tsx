import { isEdge, isNode, type Node, type ReactFlowState } from "@xyflow/react";
import isObject from "lodash/isObject";

function isReactFlowState<FlowState extends Node>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test: any,
): test is ReactFlowState<FlowState> {
  if (isObject(test) === false) {
    return false;
  }

  if (
    "nodes" in test === false ||
    Array.isArray(test.nodes) === false ||
    test.nodes.every(isNode) === false
  ) {
    return false;
  }

  if (
    "edges" in test === false ||
    Array.isArray(test.edges) === false ||
    test.edges.every(isEdge) === false
  ) {
    return false;
  }

  return true;
}

export { isReactFlowState };
