# michaelgrier.dev

Developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, and Bun.
Live at [michaelgrier.dev](https://michaelgrier.dev).

## Requirements

- Bun 1.3 or newer
- Node.js 20.9 or newer

## Develop

```sh
bun install
bun run dev
```

Site copy, navigation, projects, and contact links live in `src/content/site.ts`.
The resume page reads `src/content/resume.json`; regenerating the PDF and Word
downloads from it is covered in `scripts/README.md`.

## Check

```sh
bun run check   # lint, typecheck, tests
bun run build   # production build
```

`bun run test` runs the Vitest suite on its own. Tests cover the content
invariants, the sitemap and robots output, and the navigation's active link.

## Ship

CI runs `check` and `build` on every pull request and on pushes to `main`.
`main` is protected: the CI job must pass and the branch must be up to date
before a merge.

Vercel deploys `main` to production on every push through its GitHub
integration. `vercel.json` skips builds for every other branch, so there are no
preview deployments. The domain and its DNS are managed in Vercel, with
`www.michaelgrier.dev` redirecting permanently to the apex.
