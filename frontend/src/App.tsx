import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TerminalView from "./components/TerminalView";
import BvimView from "./components/BvimView";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<"terminal" | "bvim">("terminal");

  // ✅ Persisted terminal state
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // Handler to navigate to sections
  const handleNavigate = (section: string) => {
    navigate(`/${section}`);
  };

  // Handler to enter Bvim mode
  const handleEnterBvim = (section?: string) => {
    setMode("bvim");
    if (section) {
      navigate(`/${section}`);
    } else if (location.pathname === '/') {
      navigate('/home');
    }
  };

  // Handler to exit Bvim mode
  const handleExitBvim = () => {
    setMode("terminal");
  };

  return mode === "terminal" ? (
    <TerminalView
      history={history}
      setHistory={setHistory}
      input={input}
      setInput={setInput}
      onEnterBvim={handleEnterBvim}
      onNavigate={handleNavigate}
    />
  ) : (
    <BvimView onExit={handleExitBvim} />
  );
}