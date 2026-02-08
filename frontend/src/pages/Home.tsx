"use client";
import { useEffect, useState } from "react";
import BvimLayout from "../components/BvimLayout";

export default function Home() {
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    fetch("/ascii-art.txt")
      .then((res) => res.text())
      .then((data) => setAsciiArt(data))
      .catch(err => console.error("Error loading ASCII:", err));
  }, []);

  return (
    <BvimLayout>
      <div className="min-h-[80vh] flex items-center px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
          
          {/* LEFT SIDE – TEXT CONTENT */}
          <div className="space-y-6 order-2 lg:order-1">
            <h1 className="text-6xl font-bold tracking-tight">
              <span className="text-white">Hi, It's </span>
              <span className="text-red-600">Bhuvaneshwar</span>
            </h1>
            <h2 className="text-3xl font-bold text-white flex items-center">
              I'm a&nbsp;<span className="text-red-600">Coder</span>
            </h2>
            <p className="max-w-lg text-gray-300 text-lg leading-relaxed">
              I'm a Python Developer who loves solving problems and exploring
              new technologies.
            </p>
            {/* Socials & Buttons (Keep your existing code here) */}
          </div>

          {/* RIGHT SIDE – ASCII ART DISPLAY */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              
              {/* The Glow Aura */}
              <div className="absolute inset-0 rounded-full blur-[60px] bg-red-600/30"></div>

              {/* The "Circle" Container for ASCII */}
              <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] 
                            rounded-full border-2 border-red-600/50 
                            flex items-center justify-center overflow-hidden bg-black shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                
                <pre className="ascii-font text-red-500 leading-none select-none pointer-events-none">
                  {asciiArt}
                </pre>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CSS to ensure ASCII doesn't break */}
      <style dangerouslySetInnerHTML={{__html: `
        .ascii-font {
          font-family: 'Courier New', Courier, monospace;
          font-size: clamp(4px, 0.8vw, 10px);
          line-height: 0.8;
          white-space: pre;
          text-align: center;
        }
      `}} />
    </BvimLayout>
  );
}