# salon3

Luxury salon showcase app built with React + Vite + Tailwind.

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Build output is generated in `dist/`.

## Hosting

The project is ready for static hosting.

### Vercel
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback is configured in `vercel.json`

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback is configured in `netlify.toml`

### GitHub Pages (optional)
You can also deploy `dist/` with any static deploy flow.

## Notes
- This project currently has 2 moderate npm audit warnings in transitive dependencies.
- They do not block build/deploy; update dependencies periodically.
