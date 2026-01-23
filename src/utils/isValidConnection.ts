import type { NodeType } from "../nodes";

type IsValidConnection = (args: {
  source: NodeType;
  target: NodeType;
  sourceHandleId: string | null;
  targetHandleId: string | null;
}) => boolean;

const isValidConnection: IsValidConnection = ({
  target,
  sourceHandleId,
  targetHandleId,
}) => {
  if (sourceHandleId === null && targetHandleId !== null) return false;
  if (sourceHandleId !== null && targetHandleId === null) return false;

  switch (target.type) {
    case "delay": {
      return sourceHandleId === "duration" && targetHandleId === "duration";
    }
    case "move": {
      return sourceHandleId === "percentage";
    }
    case "userInput":
    case "start":
    case "end":
      return true;
    default: {
      const unknownTarget: never = target;

      throw new Error(`Unknown edge target ${unknownTarget}`);
    }
  }
};

export default isValidConnection;
