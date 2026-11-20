# Deployment

The site is static, so any static host works. Recommended: **Cloudflare Pages**, **Netlify** or
**Vercel** (all have free plans and deploy automatically from GitHub).

## Settings for any host

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22 |
| Environment variable | `PUBLIC_WEB3FORMS_KEY` = your Web3Forms access key |

Unknown URLs: most hosts serve `dist/404.html` automatically.

## Steps (first time)

1. Push the repo to GitHub.
2. Create a project on the host, connect the GitHub repo, enter the settings above.
3. Deploy. You get a temporary address (e.g. `moonlaugh.pages.dev`).
4. Buy the domain, add it in the host's "Custom domains", follow its DNS instructions.
5. Update `site` in `astro.config.mjs` and `SITE.url` in `src/config/site.ts` to the real domain, commit, redeploy.

## After launch

- Send a test message through the live contact form and check the inbox (and spam folder).
- Check `/` redirects, both languages, both themes, on a phone.
- Optional: add the site to Google Search Console.
