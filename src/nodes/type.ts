import type { Node, NodeProps } from "@xyflow/react";
import type { JSX } from "react";

type EmptyObject = Record<string, never>;

export type PatternNodeType<D extends Record<string, unknown> = EmptyObject> =
  ((props: NodeProps<Node<D>>) => JSX.Element) & {
    defaultNodeData: () => D;
  };
