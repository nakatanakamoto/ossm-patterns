import {
  DropdownMenu,
  Callout,
  DataList,
  Dialog,
  Flex,
  Button,
} from "@radix-ui/themes";
import { useReactFlow, type ReactFlowState } from "@xyflow/react";
import { useEffect, useMemo, useState } from "react";
import type { NodeType } from "../../nodes";
import { isReactFlowState } from "../../types/ReactFlow";

type ImportError = "INCORRECT_FILE_TYPE" | "PARSING_ERROR" | "EMPTY_FILE";

function Import() {
  const { setNodes, setEdges, fitView } = useReactFlow();
  const [draggingOver, setDraggingOver] = useState(false);
  const [incomingData, setIncomingData] = useState<ReactFlowState<NodeType>>();
  const [error, setError] = useState<ImportError>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const onDrop = async (e: DragEvent) => {
    e.preventDefault();
    setDraggingOver(false);
    setDialogOpen(true);

    if (e.dataTransfer?.files?.length !== 1) {
      return;
    }

    const file = e.dataTransfer.files[0]; // We don't support multiple files

    let parsedFile;

    try {
      parsedFile = JSON.parse(await file.text());
    } catch {
      setError("PARSING_ERROR");
    }

    if (isReactFlowState<NodeType>(parsedFile) === false) {
      setError("PARSING_ERROR");
      return;
    }

    if (parsedFile.nodes.length === 0) {
      setError("EMPTY_FILE");
      return;
    }

    setError(undefined);
    setIncomingData(parsedFile);
  };

  useEffect(() => {
    const preventDefaultDropBehavior = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener("dragover", preventDefaultDropBehavior);
    window.addEventListener("drop", onDrop);

    return () => {
      window.removeEventListener("dragover", preventDefaultDropBehavior);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  const restore = () => {
    if (incomingData === undefined) return;
    setNodes(incomingData.nodes || []);
    setEdges(incomingData.edges || []);
    fitView();
  };

  const label = useMemo(() => {
    if (draggingOver) {
      return "Drop it like it's hot";
    }
    switch (error) {
      case "PARSING_ERROR":
        return "Unable to parse pattern, please check and try again";
      case "EMPTY_FILE":
        return "The pattern contains no nodes, please check and try again";
      case "INCORRECT_FILE_TYPE":
        return "This isn't a supported pattern type, please check and try again";
      case undefined:
        break;
      default: {
        const unknownError: never = error;
        console.error(
          `An unknown error occurred during an import`,
          unknownError,
        );
        return "An unknown error has occurred";
      }
    }

    if (incomingData === undefined) {
      return "Drop a pattern file to begin";
    }

    const patternName =
      incomingData.nodes.find((node) => node.type === "start")?.data.name ||
      "Unknown Pattern";

    return (
      <DataList.Root>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Name</DataList.Label>
          <DataList.Value>{patternName}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Nodes</DataList.Label>
          <DataList.Value>{incomingData.nodes.length}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Edges</DataList.Label>
          <DataList.Value>{incomingData.edges.length}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Size</DataList.Label>
          <DataList.Value>
            {JSON.stringify(incomingData).length} bytes
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    );
  }, [draggingOver, error, incomingData]);

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger>
        <DropdownMenu.Item>Import</DropdownMenu.Item>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Import a OSSM Pattern</Dialog.Title>
        <Dialog.Description size="2" mb="5">
          Drop an exported OSSM Pattern below to begin editing
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <Callout.Root color={error ? "ruby" : "gray"}>
            <label>
              {typeof label === "string" ? (
                <Callout.Text>{label}</Callout.Text>
              ) : (
                label
              )}
              <input
                type="file"
                accept="application/json"
                multiple={false}
                style={{ display: "none" }}
              />
            </label>
          </Callout.Root>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button disabled={incomingData === undefined} onClick={restore}>
              Import
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default Import;
