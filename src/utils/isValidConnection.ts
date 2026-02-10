import type { NodeType } from "../nodes";

type IsValidConnection = (args: {
  source: NodeType;
  target: NodeType;
  sourceHandleId: string | null;
  targetHandleId: string | null;
}) => boolean;

const isValidConnection: IsValidConnection = ({
  source,
  target,
  sourceHandleId,
  targetHandleId,
}) => {
  // This skims off control node to control node connections
  if ((sourceHandleId === null) === (targetHandleId === null)) return true;

  // This is exclusively to handle data nodes
  // The target controls what can and cannot be connected to it, so we switch on the target type
  switch (target.type) {
    case "delay": {
      return sourceHandleId === "integer" && targetHandleId === "duration";
    }
    case "move": {
      return sourceHandleId === "percentage";
    }
    case "clamp": {
      return source.type === "constInt";
    }
    case "constInt":
    case "end":
    case "userInput":
    case "start":
      throw new Error(
        `Unexpected target for node type ${target.type}: this node has no data inputs, so it should never be the target of a connection`,
      );
    default: {
      const unknownTarget: never = target;

      throw new Error(`Unknown edge target ${unknownTarget}`);
    }
  }
};

export default isValidConnection;
