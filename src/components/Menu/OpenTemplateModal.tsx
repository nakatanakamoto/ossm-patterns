import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useReactFlow } from "@xyflow/react";

import simpleStroke from "../../patterns/simple-stroke.json";
import { isReactFlowState } from "../../types/ReactFlow";
import { type NodeType } from "../../nodes";

export type Template = "SimpleStroke";

type OpenTemplateModalProps = AlertDialog.RootProps & {
  template?: Template;
};

function templateToTitle(template: Template) {
  switch (template) {
    case "SimpleStroke":
      return "Simple Stroke";
    default: {
      const unknownTemplate: never = template;
      throw new Error(`Attempted to load unknown template: ${unknownTemplate}`);
    }
  }
}

function templateToFlow(template: Template) {
  switch (template) {
    case "SimpleStroke":
      return simpleStroke;
    default: {
      const unknownTemplate: never = template;
      throw new Error(`Attempted to load unknown template: ${unknownTemplate}`);
    }
  }
}

function OpenTemplateModal({ template, ...props }: OpenTemplateModalProps) {
  const { setEdges, setNodes } = useReactFlow();

  const newPattern = () => {
    if (!template) return;
    const templateFlow = templateToFlow(template);
    if (isReactFlowState<NodeType>(templateFlow) === false) {
      throw new Error("Imported pattern flow state is not valid");
    }
    setNodes(templateFlow.nodes);
    setEdges(templateFlow.edges);
  };

  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content>
        <AlertDialog.Title>
          Open {template ? templateToTitle(template) : null}
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? Unexported changes will not be saved.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={newPattern}>
            <Button variant="solid" color="ruby">
              I'm sure
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default OpenTemplateModal;
