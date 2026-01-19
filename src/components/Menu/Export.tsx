import { Button } from "@radix-ui/themes";
import { useReactFlow } from "@xyflow/react";

function Export() {
  const { toObject } = useReactFlow();

  const exportFlow = () => {
    const flowBlob = new Blob([JSON.stringify(toObject(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(flowBlob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Pattern";
    a.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={exportFlow}>Export</Button>;
}

export default Export;
