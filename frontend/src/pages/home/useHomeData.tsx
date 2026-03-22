import { useEffect, useState } from "react";

type Interest = { icon: string; text: string };
type Link     = { icon: string; label: string; href: string; val: string; active?: boolean };
type Command  = { cmd: string; desc: string; active?: boolean };

export default function useHomeData() {
  const [INTERESTS, setInterests] = useState<Interest[]>([]);
  const [LINKS,     setLinks]     = useState<Link[]>([]);
  const [COMMANDS,  setCommands]  = useState<Command[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/home/interests")
      .then(res => res.json())
      .then(setInterests)
      .catch(err => console.error("Interests error:", err));

    fetch("http://localhost:8000/home/links")
      .then(res => res.json())
      .then(setLinks)
      .catch(err => console.error("Links error:", err));

    fetch("http://localhost:8000/home/commands")
      .then(res => res.json())
      .then(setCommands)
      .catch(err => console.error("Commands error:", err));
  }, []);

  return { INTERESTS, LINKS, COMMANDS };
}