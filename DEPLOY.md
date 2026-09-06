# Website maintenance

This repository hosts Yuxin Li's personal research homepage.

- Public site: https://cx300-fh.github.io/Cx300-fh/
- Publishing source: `main` branch, `/docs` folder (GitHub Pages).
- Editable source: `website/`.
- English CV: `website/public/Yuxin-Li-CV.pdf`.

To update the website, edit `website/app/page.tsx` or `website/app/globals.css`, then run:

```sh
cd website
npm ci
npm run build
```

Copy all files from `website/dist/client/` into `docs/`, including `.nojekyll`, and commit the changes. GitHub Pages publishes updates pushed to `main`.

The website uses relative asset URLs and native JavaScript interactions, and supports reduced motion. It does not require a database or server.
