import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import Export from "./Export";
import Import from "./Import";
import AddNode from "./AddNode";

function Menu() {
  return (
    <Flex gap="3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button>File</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content style={{ minWidth: "150px" }}>
          <Export />
          <Import />
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
  );
}

export default Menu;
