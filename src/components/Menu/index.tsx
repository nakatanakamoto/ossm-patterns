import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import Export from "./Export";
import AddNode from "./AddNode";
import NewPatternDialog from "./NewPatternDialog";
import { useState } from "react";
import ImportDialog from "./ImportDialog";
import OpenTemplateModal, { type Template } from "./OpenTemplateModal";

function Menu() {
  const [newPatternDialogOpen, setNewPatternDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [templateModalTarget, setTemplateModalTarget] = useState<Template>();
  return (
    <>
      <Flex gap="3">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button>File</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content style={{ minWidth: "150px" }}>
            <DropdownMenu.Item onSelect={() => setNewPatternDialogOpen(true)}>
              New
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Open template</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item
                  onSelect={() => setTemplateModalTarget("SimpleStroke")}
                >
                  Simple Stroke
                </DropdownMenu.Item>
                <DropdownMenu.Item disabled>Teasing Pounding</DropdownMenu.Item>
                <DropdownMenu.Item disabled>Half Half</DropdownMenu.Item>
                <DropdownMenu.Item disabled>Deeper</DropdownMenu.Item>
                <DropdownMenu.Item disabled>Stop 'N Go</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={() => setImportDialogOpen(true)}>
              Import
            </DropdownMenu.Item>
            <Export />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button>Insert</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content style={{ minWidth: "150px" }}>
            <AddNode type="start">Start</AddNode>
            <AddNode type="end">End</AddNode>
            <DropdownMenu.Separator />
            <AddNode type="move">Move</AddNode>
            <AddNode type="delay">Delay</AddNode>
            <DropdownMenu.Separator />
            <AddNode type="userInput">User input</AddNode>
            <DropdownMenu.Separator />
            <AddNode type="constInt">Constant integer</AddNode>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
      <NewPatternDialog
        open={newPatternDialogOpen}
        onOpenChange={setNewPatternDialogOpen}
      />
      <ImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
      />
      <OpenTemplateModal
        open={Boolean(templateModalTarget)}
        // The modal can only ask to close
        onOpenChange={() => setTemplateModalTarget(undefined)}
        template={templateModalTarget!}
      />
    </>
  );
}

export default Menu;
