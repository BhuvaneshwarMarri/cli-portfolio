import { useEffect, useState } from "react";

type Interest = {
  icon: string;
  text: string;
};

type Link = {
  icon: string;
  label: string;
  href: string;
  val: string;
  active?: boolean;
};

type Command = {
  cmd: string;
  desc: string;
  active?: boolean;
};


export default function useHomeData() {

   const [INTERESTS, setInterests] = useState<Interest[]>([]);
  const [LINKS, setLinks] = useState<Link[]>([]);
  const [COMMANDS, setCommands] = useState<Command[]>([]);

  useEffect(() => {

    fetch("http://localhost:8000/interests")
      .then(res => res.json())
      .then(data => setInterests(data))
      .catch(err => console.error("Interests error:", err));

    fetch("http://localhost:8000/links")
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.error("Links error:", err));

    fetch("http://localhost:8000/commands")
      .then(res => res.json())
      .then(data => setCommands(data))
      .catch(err => console.error("Commands error:", err));

  }, []);

  return { INTERESTS, LINKS, COMMANDS };
}