import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ButtonOutline() {
  const [fanState, setFanState] = useState(false);

  const toogleFan = () => {
    setFanState(!fanState);
    fetch("http://192.168.15.178:3334/toggle_manual_fan", { method: "POST" })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error toggling fan:", error));
  };

  return (
    <Button onClick={toogleFan} variant="outline">
      {fanState ? 'Turn Off Fan' : 'Turn On Fan'}
    </Button>
  );
}
