import { useEffect, useState } from "react";
import { sections } from "./sections";
import type { Section } from "./sections";
import "../styles/bvim.css";

export default function BvimView({ onExit }: { onExit: () => void }) {
  const keys = Object.keys(sections) as Section[];
  const [active, setActive] = useState<Section>("home");
  const [cmdBuffer, setCmdBuffer] = useState("");

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onExit();
        return;
      }

      if (e.key === ":") {
        setCmdBuffer(":");
        return;
      }

      if (cmdBuffer.startsWith(":")) {
        if (e.key === "Enter") {
          if (
            cmdBuffer === ":q" ||
            cmdBuffer === ":quit" ||
            cmdBuffer === ":q!"
          ) {
            onExit();
          }
          setCmdBuffer("");
          return;
        }

        if (e.key === "Backspace") {
          setCmdBuffer((c) => c.slice(0, -1));
          return;
        }

        if (e.key.length === 1) {
          setCmdBuffer((c) => c + e.key);
          return;
        }
      }

      const i = keys.indexOf(active);
      if (e.key === "l") setActive(keys[(i + 1) % keys.length]);
      if (e.key === "h")
        setActive(keys[(i - 1 + keys.length) % keys.length]);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, cmdBuffer, onExit]);

  return (
    <div className="bvim">
      <div className="nav">
        {keys.map((k) => (
          <button
            key={k}
            className={k === active ? "active" : ""}
            onClick={() => setActive(k)}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="content">{sections[active].content}</div>

      {cmdBuffer && <div className="vim-command">{cmdBuffer}</div>}
    </div>
  );
}
