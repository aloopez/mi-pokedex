# Mi Pokedex

Mi Pokedex is a lightweight, responsive Pokédex web app built with TypeScript, JavaScript, HTML and CSS. It provides an interactive way to browse Pokémon, view details, and manage favorites — ideal as a learning project or a starter template for a more feature-rich Pokédex.

- Primary languages: TypeScript, CSS, JavaScript, HTML
- Repository: aloopez/mi-pokedex

## Live demo
If you publish the app, include the demo URL here (GitHub Pages, Netlify, Vercel, etc.).

## Features
- Browse Pokémon list with pagination or infinite scroll
- Search by name and filter by type
- View detailed Pokémon pages (stats, abilities, types, sprites)
- Mark/unmark favorites (persisted in localStorage)
- Responsive UI for desktop and mobile
- Clean TypeScript codebase with modular components

## Screenshots
Add screenshots to the `docs/` or `assets/` folder and reference them here:
- docs/screenshot-list.png
- docs/screenshot-details.png

## Technologies
- TypeScript
- JavaScript
- HTML5 & CSS3 (Flexbox / Grid)
- Fetch API (or axios)
- Optional: build tools (Vite / Webpack / Parcel), ESLint, Prettier

## Getting started

Prerequisites
- Node.js >= 16
- npm or yarn

Install
```bash
# using npm
npm install

# or using yarn
yarn
```

Development
```bash
# start the dev server (replace with your actual script name)
npm run dev

# or
yarn dev
```

Build for production
```bash
npm run build
# or
yarn build
```

Preview production build locally
```bash
npm run preview
# or
yarn preview
```

Run tests (if any)
```bash
npm test
# or
yarn test
```

Lint & format
```bash
npm run lint
npm run format
```

## Environment variables
If your app uses an API endpoint (e.g., PokéAPI), you can configure it via environment variables:
- .env
  - VITE_API_BASE_URL=https://pokeapi.co/api/v2

Adjust names according to your build tool (Vite uses VITE_ prefix).

## Project structure (suggested)
```
src/
  assets/          # images, sprites, icons
  components/      # reusable UI components
  pages/           # list, details, favorites pages
  services/        # API calls (e.g., pokeApi.ts)
  store/           # state management or hooks
  styles/          # global and component styles
  main.ts          # app entry
public/
  index.html
```

Adjust according to the actual repository layout.

## API
This project commonly uses the PokéAPI:
- https://pokeapi.co/

Example request (in code):
```ts
const res = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);
const data = await res.json();
```

## Contributing
Contributions are welcome!

1. Fork the repository
2. Create a feature branch: git checkout -b feat/my-feature
3. Commit your changes: git commit -m "Add my feature"
4. Push to your branch: git push origin feat/my-feature
5. Open a Pull Request describing your changes

Please follow the existing code style. If you add significant functionality, include tests and update the README where appropriate.

## Issues & Roadmap
Use GitHub Issues to propose features or report bugs. A suggested roadmap may include:
- Add unit/integration tests
- Improve accessibility (a11y)
- Add offline support / service worker
- Add user authentication and sync favorites

## License
Add a LICENSE file in the repo and update this section. Common choice: MIT.

## Contact
Maintainer: aloopez
- GitHub: https://github.com/aloopez

Acknowledgements
- PokéAPI (https://pokeapi.co) — great free Pokémon data API
- Any design or tutorial resources you referenced

