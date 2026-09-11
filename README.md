# Michael Grier

Hi, I'm Michael, a software developer in Calgary. I build polished user
interfaces and full-stack applications, with a focus on usability,
performance, and maintainable architecture. Before software I was a school
teacher, which is where I learned to explain things plainly and design for the
person who wasn't in the room.

This is my portfolio, live at [michaelgrier.dev](https://michaelgrier.dev). It
covers the work I've shipped, how I approach building things, my resume, and
how to get in touch.

## Projects on the site

- **Fuckers Skateboards**, a storefront for a local skateboard brand that has to
  stay correct with nobody watching it.
- **YYC Skate Spots**, an iOS app for finding and sharing street spots in
  Calgary.
- **Code Trainer**, browser-based interview prep for full-stack TypeScript
  developers.

## Under the hood

Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, and Bun. Every page is
prerendered as static content. Copy and project data live in
`src/content/site.ts`, and the resume page and its downloads are generated from
`src/content/resume.json`.

```sh
bun install
bun run dev     # local server
bun run check   # lint, typecheck, tests
```

CI runs the checks and a production build on every pull request. Merges to
`main` deploy to production on Vercel.
