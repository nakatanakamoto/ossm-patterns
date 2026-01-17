import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { ReactFlowProvider } from "@xyflow/react";
import ThemeSwitcherProvider from "./providers/ThemeSwitcherProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <ThemeSwitcherProvider>
        <App />
      </ThemeSwitcherProvider>
    </ReactFlowProvider>
  </StrictMode>,
);
