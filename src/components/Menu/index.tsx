import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import Export from "./Export";
import AddNode from "./AddNode";
import NewPatternDialog from "./NewPatternDialog";
import { useState } from "react";
import ImportDialog from "./ImportDialog";

function Menu() {
  const [newPatternDialogOpen, setNewPatternDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
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
            <DropdownMenu.Separator />
            <Export />
            <DropdownMenu.Item onSelect={() => setImportDialogOpen(true)}>
              Import
            </DropdownMenu.Item>
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
            <AddNode type="userInput">User Input</AddNode>
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
    </>
  );
}

export default Menu;
