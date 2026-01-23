import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useReactFlow } from "@xyflow/react";

type NewPatternDialogProps = AlertDialog.RootProps;

function NewPatternDialog(props: NewPatternDialogProps) {
  const { setEdges, setNodes } = useReactFlow();
  const newPattern = () => {
    setNodes([]);
    setEdges([]);
  };
  return (
    <AlertDialog.Root {...props}>
      <AlertDialog.Content>
        <AlertDialog.Title>Create new pattern</AlertDialog.Title>
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
            <Button variant="solid" color="red">
              I'm sure
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default NewPatternDialog;
