# WYWA FI-RE Website

Static React SPA for the WYWA wildfire detection project, deployed to Netlify.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS 3
- **UI**: Radix UI + Lucide React icons + Framer Motion
- **Routing**: React Router 6 (SPA mode)
- **Deployment**: Netlify (static site)

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components
│   ├── Home.tsx          # Homepage (/)
│   ├── Technology.tsx    # Technology page (/technology)
│   ├── People.tsx        # People page (/people)
│   ├── Blog.tsx          # Blog page (/blog) — static, no CMS
│   └── NotFound.tsx      # 404 catch-all
├── components/ui/        # Pre-built UI component library (Radix-based)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions (cn helper, etc.)
├── App.tsx               # App entry point with SPA routing
└── global.css            # TailwindCSS 3 theming and global styles

public/                   # Static assets (images, videos, favicon)
```

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page |
| `/technology` | Technology | Tech and product details |
| `/people` | People | Team members |
| `/blog` | Blog | Static blog posts (no backend) |
| `*` | NotFound | 404 catch-all |

There is also a **Connect popup** (modal) accessible from the navigation.

## Development Commands

```bash
npm run dev        # Start dev server (localhost:8080)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run typecheck  # TypeScript validation
npm test           # Run Vitest tests
```

## Deployment

- **Platform**: Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA routing**: Handled via `netlify.toml` redirect rule (all routes → index.html)

## Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme tokens**: CSS variables in `client/global.css`, mapped in `tailwind.config.ts`
- **UI components**: Pre-built Radix-based library in `client/components/ui/`
- **Utility**: `cn()` function from `client/lib/utils.ts` — combines `clsx` + `tailwind-merge`

### Adding New Pages

1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

### Adding New Colors

Edit `client/global.css` (CSS variables) and `tailwind.config.ts` (Tailwind mapping).
