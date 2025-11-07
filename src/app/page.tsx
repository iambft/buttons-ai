"use client";

import { useState, useRef, MouseEvent } from "react";

interface Dot {
  x: number;
  y: number;
}

interface ButtonState {
  id: number;
  x: number;
  y: number;
  isRed: boolean;
  isDragging: boolean;
}

export default function Home() {
  const [buttons, setButtons] = useState<ButtonState[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: 50 + (i % 5) * 150,
      y: 50 + Math.floor(i / 5) * 150,
      isRed: false,
      isDragging: false,
    }))
  );
  
  const [dots, setDots] = useState<Dot[]>([]);
  const dragRef = useRef<{ buttonId: number; startX: number; startY: number } | null>(null);

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>, buttonId: number) => {
    e.preventDefault();
    const button = buttons.find((b) => b.id === buttonId);
    if (!button) return;

    dragRef.current = {
      buttonId,
      startX: e.clientX - button.x,
      startY: e.clientY - button.y,
    };

    setButtons((prev) =>
      prev.map((b) =>
        b.id === buttonId ? { ...b, isDragging: true } : b
      )
    );
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;

    const { buttonId, startX, startY } = dragRef.current;

    setButtons((prev) =>
      prev.map((b) =>
        b.id === buttonId
          ? { ...b, x: e.clientX - startX, y: e.clientY - startY }
          : b
      )
    );
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;

    const { buttonId } = dragRef.current;
    const button = buttons.find((b) => b.id === buttonId);

    if (button) {
      // Place a dot at the center of the button
      const centerX = button.x + 50; // Button width is 100px, so center is at 50px
      const centerY = button.y + 20; // Button height is 40px, so center is at 20px
      setDots((prev) => [...prev, { x: centerX, y: centerY }]);
    }

    setButtons((prev) =>
      prev.map((b) =>
        b.id === buttonId ? { ...b, isDragging: false } : b
      )
    );

    dragRef.current = null;
  };

  const handleClick = (buttonId: number) => {
    if (dragRef.current) return; // Don't toggle color if dragging

    setButtons((prev) =>
      prev.map((b) =>
        b.id === buttonId ? { ...b, isRed: !b.isRed } : b
      )
    );
  };

  return (
    <div
      className="relative w-screen h-screen bg-gray-100 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Render dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute w-2 h-2 bg-black rounded-full pointer-events-none"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Render buttons */}
      {buttons.map((button) => (
        <button
          key={button.id}
          className={`absolute w-24 h-10 text-white font-semibold rounded cursor-move select-none ${
            button.isRed ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{
            left: `${button.x}px`,
            top: `${button.y}px`,
          }}
          onMouseDown={(e) => handleMouseDown(e, button.id)}
          onClick={() => handleClick(button.id)}
        >
          click me
        </button>
      ))}
    </div>
  );
}
