import { useEffect, useRef, useState } from "react";
import "../styles/terminal.css";

type Props = {
    history: string[];
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onEnterBvim: (section?: string) => void;
    onNavigate: (section: string) => void;
};

export default function TerminalView({
    history,
    setHistory,
    input,
    setInput,
    onEnterBvim,
    onNavigate,
}: Props) {
    const [cursorVisible, setCursorVisible] = useState(true);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

const banner = `
 ██████╗ ██╗  ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗███████╗██╗  ██╗██╗    ██╗ █████╗ ██████╗ 
 ██╔══██╗██║  ██║██║   ██║██║   ██║██╔══██╗████╗  ██║██╔════╝██╔════╝██║  ██║██║    ██║██╔══██╗██╔══██╗
 ██████╔╝███████║██║   ██║██║   ██║███████║██╔██╗ ██║█████╗  ███████╗███████║██║ █╗ ██║███████║██████╔╝
 ██╔══██╗██╔══██║██║   ██║╚██╗ ██╔╝██╔══██║██║╚██╗██║██╔══╝  ╚════██║██╔══██║██║███╗██║██╔══██║██╔══██╗
 ██████╔╝██║  ██║╚██████╔╝ ╚████╔╝ ██║  ██║██║ ╚████║███████╗███████║██║  ██║╚███╔███╔╝██║  ██║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝

 [ Bhuvaneshwar Marri | CLI Portfolio ]

 Welcome! Type 'help' to see available commands.
`;


    /* Focus on load */
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    /* Blinking cursor */
    useEffect(() => {
        const id = setInterval(() => {
            setCursorVisible((v) => !v);
        }, 530);
        return () => clearInterval(id);
    }, []);

    /* Auto scroll */
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, input]);

    /* Keyboard shortcuts */
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            // Ctrl + L clears
            if (e.ctrlKey && e.key.toLowerCase() === "l") {
                e.preventDefault();
                setHistory([]);
                setInput("");
                setHistoryIndex(-1);
            }

            // Arrow up - previous command
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (commandHistory.length > 0) {
                    const newIndex = Math.min(
                        historyIndex + 1,
                        commandHistory.length - 1
                    );
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }

            // Arrow down - next command
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                } else {
                    setHistoryIndex(-1);
                    setInput("");
                }
            }

            // Tab completion
            if (e.key === "Tab") {
                e.preventDefault();
                const commands = [
                    "help",
                    "clear",
                    "bvim",
                    "home",
                    "education",
                    "skills",
                    "projects",
                    "experience",
                    "contact",
                ];
                const matches = commands.filter((cmd) =>
                    cmd.startsWith(input.toLowerCase())
                );
                if (matches.length === 1) {
                    setInput(matches[0]);
                } else if (matches.length > 1) {
                    setHistory((h) => [
                        ...h,
                        `$ ${input}`,
                        matches.join("  "),
                        "",
                    ]);
                }
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [input, commandHistory, historyIndex, setHistory, setInput]);

    /* Command data */
    const commandData = {
        home: {
            title: "About Me",
            content: [
                "Hi! I'm Bhuvan, a passionate developer and technology enthusiast.",
                "I love building innovative solutions and learning new technologies.",
                "",
                "💡 For the full experience, type 'bvim' to explore my interactive portfolio!",
            ],
        },
        education: {
            title: "Education",
            content: [
                "🎓 View my educational background and achievements.",
                "",
                "💡 Type 'bvim' to see the complete details in the interactive UI!",
            ],
        },
        skills: {
            title: "Technical Skills",
            content: [
                "💻 Programming languages, frameworks, and tools I work with.",
                "",
                "💡 Type 'bvim' to explore my full skillset in the interactive UI!",
            ],
        },
        projects: {
            title: "Projects",
            content: [
                "🚀 Check out the cool things I've built.",
                "",
                "💡 Type 'bvim' to see detailed project descriptions and demos!",
            ],
        },
        experience: {
            title: "Work Experience",
            content: [
                "💼 My professional journey and roles.",
                "",
                "💡 Type 'bvim' to view my complete work history in the interactive UI!",
            ],
        },
        contact: {
            title: "Contact Information",
            content: [
                "📧 Let's connect!",
                "",
                "💡 Type 'bvim' to see all my contact details and social links!",
            ],
        },
    };

    function runCommand(e: React.FormEvent) {
        e.preventDefault();
        const cmd = input.trim();
        const cmdLower = cmd.toLowerCase();

        /* Ignore empty commands */
        if (!cmd) {
            setHistory((h) => [...h, "$ "]);
            setInput("");
            return;
        }

        /* Add to command history */
        if (cmd && !cmd.startsWith(":")) {
            setCommandHistory((prev) => [...prev, cmd]);
            setHistoryIndex(-1);
        }

        /* Ignore vim commands in terminal */
        if (cmd.startsWith(":")) {
            setInput("");
            return;
        }

        /* Clear */
        if (cmdLower === "clear" || cmdLower === "cls") {
            setHistory([]);
            setInput("");
            return;
        }

        /* Help */
        if (cmdLower === "help" || cmdLower === "?") {
            setHistory((h) => [
                ...h,
                `$ ${cmd}`,
                "",
                "+------------------------------------------------------+",
                "|                    AVAILABLE COMMANDS               |",
                "+------------------------------------------------------+",
                "|                                                      |",
                "|  help, ?        show this help message               |",
                "|  clear, cls     clear the terminal                   |",
                "|  bvim           open full TUI portfolio              |",
                "|                                                      |",
                "+------------------------------------------------------+",
                "|                    SECTIONS                          |",
                "+------------------------------------------------------+",
                "|                                                      |",
                "|  home           about me                             |",
                "|  education      education details                    |",
                "|  skills         technical skills                     |",
                "|  projects       projects overview                    |",
                "|  experience     work experience                     |",
                "|  contact        contact information                  |",
                "|                                                      |",
                "+------------------------------------------------------+",
                "|                    SHORTCUTS                         |",
                "+------------------------------------------------------+",
                "|                                                      |",
                "|  Ctrl + L       clear screen                         |",
                "|  ↑ / ↓          command history                      |",
                "|  Tab            autocomplete                         |",
                "|                                                      |",
                "+------------------------------------------------------+",
                "|  note: run 'bvim' for full interactive view          |",
                "+------------------------------------------------------+",
                "",
            ]);
            setInput("");
            return;
        }

        /* Section shortcuts */
        if (cmdLower in commandData) {
            const section = commandData[cmdLower as keyof typeof commandData];
            setHistory((h) => [
                ...h,
                `$ ${cmd}`,
                "",
                `═══ ${section.title.toUpperCase()} ═══`,
                "",
                ...section.content,
                "",
            ]);
            setInput("");
            // Navigate to the section route
            onNavigate(cmdLower);
            return;
        }

        /* Enter BVIM */
        if (cmdLower === "bvim") {
            setHistory((h) => [
                ...h,
                `$ ${cmd}`,
                "",
                "🚀 Launching BVIM...",
                "",
            ]);
            setInput("");
            setTimeout(() => {
                onEnterBvim();
            }, 300);
            return;
        }

        /* Easter eggs */
        if (cmdLower === "whoami") {
            setHistory((h) => [
                ...h,
                `$ ${cmd}`,
                "bhuvan",
                "",
            ]);
            setInput("");
            return;
        }

        if (cmdLower === "pwd") {
            setHistory((h) => [
                ...h,
                `$ ${cmd}`,
                "/home/bhuvan/portfolio",
                "",
            ]);
            setInput("");
            return;
        }

        if (cmdLower === "ls" || cmdLower === "dir") {
            setHistory((h) => [
                ...h,
                `$ ${cmd}`,
                "home/  education/  skills/  projects/  experience/  contact/",
                "",
                "💡 Tip: Type section names to explore, or 'bvim' for full UI",
                "",
            ]);
            setInput("");
            return;
        }

        if (cmdLower === "echo hello" || cmdLower === "hello") {
            setHistory((h) => [
                ...h,
                `$ ${cmd}`,
                "Hello! Welcome to my portfolio! 👋",
                "",
            ]);
            setInput("");
            return;
        }

        /* Unknown command */
        setHistory((h) => [
            ...h,
            `$ ${cmd}`,
            `bash: ${cmd}: command not found`,
            "",
            "💡 Type 'help' to see available commands",
            "",
        ]);

        setInput("");
    }

    return (
        <div className="terminal" onClick={() => inputRef.current?.focus()}>
            <pre className="banner">{banner}</pre>

            {history.map((line, i) => (
                <div key={i} className="history-line">
                    {line}
                </div>
            ))}

            <form onSubmit={runCommand} className="prompt">
                <div className="prompt-line">
                    <span className="cyan">┌──(</span>
                    <span className="green bold">bhuvaneshwar㉿marri</span>
                    <span className="cyan">)-[</span>
                    <span className="blue">portfolio</span>
                    <span className="cyan">]</span>
                </div>

                <div className="prompt-line">
                    <span className="cyan">└─</span>
                    <span className="red">$</span>
                    <span className="input-text"> {input}</span>
                    <span
                        className="cursor"
                        style={{ opacity: cursorVisible ? 1 : 0 }}
                    />
                </div>

                <input
                    ref={inputRef}
                    className="hidden-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoComplete="off"
                    spellCheck="false"
                />
            </form>

            <div ref={endRef} />
        </div>
    );
}