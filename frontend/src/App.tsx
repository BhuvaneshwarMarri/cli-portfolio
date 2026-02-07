import { useState } from "react";
import TerminalView from "./components/TerminalView";
import BvimView from "./components/BvimView";

export default function App() {
  const [mode, setMode] = useState<"terminal" | "bvim">("terminal");

  // ✅ Persisted terminal state
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");

  return mode === "terminal" ? (
    <TerminalView
      history={history}
      setHistory={setHistory}
      input={input}
      setInput={setInput}
      onEnterBvim={() => setMode("bvim")}
    />
  ) : (
    <BvimView onExit={() => setMode("terminal")} />
  );
}
