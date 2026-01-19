import { Flex } from "@radix-ui/themes";
import AddNodes from "./AddNodes";
import Export from "./Export";
import Import from "./Import";

function Menu() {
  return (
    <Flex gap="3" align="center">
      <AddNodes />
      <Export />
      <Import />
    </Flex>
  );
}

export default Menu;
