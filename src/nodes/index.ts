import type { Node, NodeProps } from "@xyflow/react";
import type { JSX } from "react";
import StartNode, { type StartNodeType } from "./Start";
import EndNode, { type EndNodeType } from "./End";
import DelayNode, { type DelayNodeType } from "./Delay";
import MoveNode, { type MoveNodeType } from "./Move";

export type NodeType =
  | StartNodeType
  | EndNodeType
  | MoveNodeType
  | DelayNodeType;

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  move: MoveNode,
  delay: DelayNode,
} satisfies {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [nodeType: string]: PatternNodeType<any>;
};

export type PatternNodeType<N extends Node> = ((
  props: NodeProps<N>,
) => JSX.Element) & {
  defaultNodeData: () => N["data"];
};
