# astro-starwind-template

Starter template for Ikigai Flow client sites built with [Astro](https://astro.build) and
[Starwind UI](https://starwind.dev) (Tailwind CSS v4). Uses **Bun** as the package manager and runtime.

## Starting a new client site

1. Create a new repo from this template (GitHub **Use this template**) or clone it:

   ```sh
   git clone https://github.com/Ikigai-Flow/astro-starwind-template.git client-site
   cd client-site
   rm -rf .git && git init
   ```

2. Install dependencies and start the dev server:

   ```sh
   bun install
   bun run dev
   ```

3. Work through the [new-site checklist](#new-site-checklist).

## Scripts

| Command                | Action                                            |
| :--------------------- | :------------------------------------------------ |
| `bun install`          | Install dependencies                              |
| `bun run dev`          | Start the local dev server at `localhost:4321`    |
| `bun run build`        | Type-check (`astro check`) and build to `./dist/` |
| `bun run preview`      | Preview the production build locally              |
| `bun run check`        | Run Astro/TypeScript diagnostics only             |
| `bun run format`       | Format the codebase with Prettier                 |
| `bun run format:check` | Verify formatting (useful in CI)                  |

Hosting, the web server, and deployment are handled by the hosting platform. The build output is a
static site in `dist/`.

## Project structure

```text
├── public/                       # Static assets served as-is (favicon, images, og-image)
├── src/
│   ├── components/
│   │   ├── layout/               # Header (with mobile Sheet nav), Footer, ThemeToggle
│   │   └── starwind/             # Starwind UI components (managed by the Starwind CLI)
│   ├── config/site.ts            # Per-client name, SEO defaults, nav, contact, social
│   ├── layouts/BaseLayout.astro  # <head>, SEO/OG tags, theme script, header/footer shell
│   ├── pages/                    # File-based routes (index, 404, robots.txt)
│   └── styles/starwind.css       # Tailwind v4 entry + Starwind theme tokens (light/dark)
├── astro.config.mjs              # Astro config: site URL, sitemap, Tailwind Vite plugin
├── starwind.config.json          # Starwind CLI config
└── bun.lock                      # Bun lockfile (commit this)
```

`@/*` is aliased to `src/*` (see `tsconfig.json`).

## New-site checklist

- [ ] `astro.config.mjs`: set `site` to the client's production URL (drives sitemap, canonical URLs, robots.txt).
- [ ] `src/config/site.ts`: name, title, description, nav links, contact info, social links.
- [ ] `package.json`: rename `name`.
- [ ] `src/styles/starwind.css`: set brand colors in `:root` and `.dark` (e.g. `--primary`) and `--radius`.
- [ ] `public/favicon.svg`: replace with the client's favicon.
- [ ] Add a 1200×630 `public/og-image.png` and set `ogImage: "/og-image.png"` in `site.ts`.
- [ ] Replace placeholder content in `src/pages/index.astro`; wire the contact form to a real handler.
- [ ] Copy `.env.example` to `.env` if the site needs environment variables (never commit `.env`).
- [ ] Update this README for the client project.

## Starwind UI

Included components: `badge`, `button`, `card`, `input`, `label`, `separator`, `sheet`, `textarea`.
Browse the rest at [starwind.dev/docs/components](https://starwind.dev/docs/components).

Add components with:

```sh
bunx starwind@latest add dialog accordion
```

> **Bun note:** the Starwind CLI currently detects Bun only through the legacy `bun.lockb` file, not
> Bun's text `bun.lock`, and otherwise falls back to `npm`. Without `npm` installed, `starwind add`
> fails at the dependency-install step. Work around it with a throwaway `bun.lockb` (it is gitignored):
>
> ```sh
> touch bun.lockb && bunx starwind@latest add dialog; rm -f bun.lockb
> ```

Import components from their folder:

```astro
---
import { Button } from "@/components/starwind/button";
---

<Button href="/contact" variant="primary">
  Contact us
</Button>
```

## Theming and dark mode

Theme tokens live in `src/styles/starwind.css` as CSS variables, with a `.dark` override block. Dark
mode is class-based: an inline script in `BaseLayout.astro` applies the saved or system preference
before first paint, and `ThemeToggle.astro` switches it and saves the choice to `localStorage`. To ship
a site without dark mode, remove `<ThemeToggle />` from the header and the inline theme script.

## Notes

- TypeScript is pinned to v6 because `@astrojs/check` does not yet support TypeScript 7.
- Line endings are normalized to LF via `.gitattributes` and `.editorconfig`, so contributors on
  Windows and macOS produce identical diffs.
