import type { Node, NodeProps } from "@xyflow/react";
import type { JSX } from "react";
import StartNode, { type StartNodeType } from "./Start";
import EndNode, { type EndNodeType } from "./End";
import DelayNode, { type DelayNodeType } from "./Delay";
import MoveNode, { type MoveNodeType } from "./Move";
import UserInputNode, { type UserInputNodeType } from "./UserInput";
import ConstantIntNode, { type ConstIntNodeType } from "./ContInt";

export type NodeType =
  | StartNodeType
  | EndNodeType
  | MoveNodeType
  | DelayNodeType
  | UserInputNodeType
  | ConstIntNodeType;

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  move: MoveNode,
  delay: DelayNode,
  userInput: UserInputNode,
  constInt: ConstantIntNode,
} satisfies {
  // Any is needed here to allow for the different node types, as they all have different data shapes.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [nodeType: string]: PatternNodeType<any>;
};

export type NodeId = NodeType["type"];

export type PatternNodeType<N extends Node> = ((
  props: NodeProps<N>,
) => JSX.Element) & {
  defaultNodeData: () => N["data"];
};
