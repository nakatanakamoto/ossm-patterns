import type { Node, NodeProps } from "@xyflow/react";
import type { JSX } from "react";
import StartNode, { type StartNodeType } from "./Start";
import EndNode, { type EndNodeType } from "./End";
import WaitNode, { type WaitNodeType } from "./Wait";
import MoveNode, { type MoveNodeType } from "./Move";

export type NodeType =
  | StartNodeType
  | EndNodeType
  | MoveNodeType
  | WaitNodeType;

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  move: MoveNode,
  wait: WaitNode,
} satisfies {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [nodeType: string]: PatternNodeType<any>;
};

export type PatternNodeType<N extends Node> = ((
  props: NodeProps<N>,
) => JSX.Element) & {
  defaultNodeData: () => N["data"];
};
