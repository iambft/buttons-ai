# Draggable Buttons with Color Toggle

Interactive Next.js + Vite application featuring draggable buttons with background color toggling and persistent dot placement.

## Features
- 10 clickable buttons with "click me" text
- Toggle between two background colors (red/blue) on click
- Manual drag functionality (without using the HTML drag/drop API)
- Dot placement at button center when mouse is released after dragging
- Persistent dots that remain when buttons are moved again (multiple dots accumulate)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

- **Click** a button to toggle its background color between red and blue
- **Drag** a button by holding down the mouse and moving it
- **Release** the mouse to drop the button and create a dot at its center
- Each time you drag and drop a button, a new dot is created, so dots accumulate over time

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
