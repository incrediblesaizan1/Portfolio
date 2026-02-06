"use client";

import { useEffect, useRef, useState } from "react";

export default function TerminalAnimation({ onAnimationComplete }) {
  const canvasRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const chars = "0123456789";
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    let drops = Array(Math.floor(columns)).fill(canvas.height);

    let animationId;
    let lastTime = 0;
    const fps = 30;
    const intervalTime = 1000 / fps;

    function drawRain(time) {
      if (time - lastTime < intervalTime) {
        animationId = requestAnimationFrame(drawRain);
        return;
      }
      lastTime = time;

      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = `rgba(0,255,153,${Math.random() * 0.5 + 0.5})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(drawRain);
    }

    animationId = requestAnimationFrame(drawRain);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const commands = [
      { type: "command", text: "npm install dependencies" },
      { type: "output", text: "✓ Installing packages..." },
      { type: "command", text: "npm run build" },
      { type: "output", text: "✓ Building project..." },
      { type: "command", text: "npm start" },
      { type: "status", text: "Server running on port 3000" },
      { type: "ready", text: "Ready for development" },
    ];

    const pathEl = document.getElementById("path");
    const commandsEl = document.getElementById("commands");
    const codeLineEl = document.getElementById("code-line");
    const dusterEl = document.getElementById("duster");
    const mainContainer = document.querySelector(".main-container");
    const landingPage = document.querySelector(".landing-page");

    function typeWriter(text, element, delay = 30) {
      return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
          if (i < text.length) {
            element.textContent += text[i];
            i++;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, delay);
      });
    }

    async function runTerminal() {
      await new Promise((r) => setTimeout(r, 100));

      if (!pathEl) return;
      await typeWriter("~/developer/workspace", pathEl, 10);

      for (const cmd of commands) {
        await new Promise((r) => setTimeout(r, 40));

        const div = document.createElement("div");
        if (cmd.type === "command") {
          div.className = "command-line";
          const prompt = document.createElement("span");
          prompt.className = "prompt";
          prompt.textContent = "❯";
          div.appendChild(prompt);

          const command = document.createElement("span");
          command.className = "command";
          div.appendChild(command);
          commandsEl.appendChild(div);
          await typeWriter(cmd.text, command, 5);
        } else if (cmd.type === "output") {
          div.className = "output";
          commandsEl.appendChild(div);
          await typeWriter(cmd.text, div, 2);
        } else if (cmd.type === "status") {
          div.className = "status";
          const checkmark = document.createElement("span");
          checkmark.className = "checkmark";
          checkmark.textContent = "✓";
          div.appendChild(checkmark);
          const text = document.createElement("span");
          text.textContent = cmd.text;
          div.appendChild(text);
          commandsEl.appendChild(div);
          await new Promise((r) => setTimeout(r, 50));
        } else if (cmd.type === "ready") {
          div.className = "status";
          const bolt = document.createElement("span");
          bolt.textContent = "⚡";
          div.appendChild(bolt);
          const text = document.createElement("span");
          text.className = "ready-text";
          text.textContent = cmd.text;
          div.appendChild(text);
          commandsEl.appendChild(div);
          await new Promise((r) => setTimeout(r, 50));
        }
      }

      await new Promise((r) => setTimeout(r, 200));

      if (codeLineEl) {
        codeLineEl.innerHTML = `
            <span class="keyword">const</span>
            <span class="function-name"> createAwesome</span>
            <span class="operator"> = (</span>
            <span class="param">idea</span>
            <span class="operator">) => </span>
            <span class="method">build</span>
            <span class="operator">(</span>
            <span class="param">idea</span>
            <span class="operator">);</span>
          `;
        codeLineEl.classList.add("visible");
      }

      await new Promise((r) => setTimeout(r, 900));

      if (dusterEl) dusterEl.classList.add("active");

      await new Promise((r) => setTimeout(r, 500));

      if (mainContainer) mainContainer.classList.add("slide-up");
      if (landingPage) landingPage.classList.add("active");

      await new Promise((r) => setTimeout(r, 800));

      await new Promise((r) => setTimeout(r, 600));

      setIsAnimationComplete(true);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }

    runTerminal();
  }, [onAnimationComplete]);

  if (isAnimationComplete) {
    return null;
  }

  return (
    <div className="intro-wrapper">
      <canvas ref={canvasRef} id="rain-canvas" />

      <div className="main-container">
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-dots">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="terminal-title">terminal</div>
          </div>

          <div className="terminal-content">
            <div className="path" id="path"></div>
            <div id="commands"></div>
          </div>
        </div>
      </div>

      <div className="code-line" id="code-line"></div>
      <div className="duster-line" id="duster"></div>

      <div className="landing-page"></div>
    </div>
  );
}
