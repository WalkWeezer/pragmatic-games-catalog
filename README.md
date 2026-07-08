# Pragmatic Play Games Catalog

Test task implementation for a Middle Frontend Developer position.

## Stack

- React + TypeScript
- Vite
- Redux Toolkit + RTK Query
- React Router
- SCSS Modules
- Oxlint

## Features

- Game catalog with image and title
- Lazy loading of games on scroll (native `IntersectionObserver`, no external libraries)
- Search by game name or ID (client-side)
- Filter by `gameTypeID` (client-side)
- Layout based on the provided Figma design

## Project Structure

```
src/
  api/                 # RTK Query API layer
  app/                 # Store, router, app shell
  entities/game/       # Game entity UI
  features/filters/    # Search and filter state
  pages/home/          # Home page
  shared/              # Config, hooks, styles, utilities
  widgets/             # Composed UI blocks
  types/               # Shared TypeScript types
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

## API

Games list:

```
GET https://belparyaj.com/pragmatic/game/list?partner_name=belparyaj
```

Game image URL:

```
https://bsw-dk1.pragmaticplay.net/game_pic/square/200/{gameID}.png
```

During development and preview, requests are proxied through Vite (`/api/*`) to avoid CORS issues.

For production deployment on Vercel, `vercel.json` includes the same API rewrite.

## Notes

- Search is applied after clicking the `SEARCH` button or pressing Enter.
- Game type filter is applied immediately.
- Infinite scroll resets when search or filter changes.
