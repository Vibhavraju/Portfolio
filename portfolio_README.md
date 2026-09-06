# P. Sri Vibhav — Portfolio

A single-page personal portfolio built with plain HTML, CSS, and JavaScript — no framework, no build step. Showcases my projects, skills, and experience as I look for AI/ML, GenAI, and Data Analyst roles.

**Live site:** _add your deployed URL here once it's live_

---

## Features

- Responsive, single-page layout (mobile → desktop)
- Sections: Hero, Summary, Skills, Experience, Projects, Certifications & Achievements, Contact
- Working contact form that emails submissions via a companion backend ([`portfolio-backend`](https://github.com/Vibhavraju/portfolio-backend))
- Spam protection (honeypot field) and clear success/error states on the form
- Accessible: visible keyboard focus states, respects `prefers-reduced-motion`
- Zero dependencies — just one `index.html` file with inline CSS/JS

## Tech stack

- HTML5 / CSS3 (custom properties, no framework)
- Vanilla JavaScript (fetch API for the contact form)
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts

## Project structure

```
portfolio/
└── index.html   # everything: markup, styles, and script in one file
```

## Running locally

No build step needed — just open the file:

```bash
git clone https://github.com/Vibhavraju/portfolio.git
cd portfolio
open index.html   # or double-click it, or use a local server:
# python3 -m http.server 8000
```

## Connecting the contact form to the backend

The contact form posts to a backend API defined near the bottom of `index.html`:

```js
var CONTACT_API_URL = "https://YOUR-BACKEND-URL/api/contact";
```

Replace `YOUR-BACKEND-URL` with your deployed backend's URL (see the [backend repo](https://github.com/Vibhavraju/portfolio-backend) for setup and deployment instructions). Until this is set, the form will tell visitors the backend isn't connected yet instead of failing silently.

## Deployment

This is a static file, so any static host works. Two easy free options:

### GitHub Pages
1. Push this repo to GitHub with `index.html` at the root.
2. Go to **Settings → Pages**.
3. Set source to the `main` branch, root folder.
4. Your site goes live at `https://<username>.github.io/<repo-name>`.

### Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site → Deploy manually**.
2. Drag and drop `index.html` (or the whole folder) onto the page.
3. Netlify gives you a live URL instantly; add a custom domain if you like.

## Customizing

- **Colors / fonts:** all defined as CSS custom properties at the top of the `<style>` block in `index.html`.
- **Content:** each section is plain HTML — update text, project details, and links directly.
- **Cycling hero text:** the rotating "I build ___" phrases are in the `words` array near the bottom `<script>` tag.

## Contact

- Email: itsvibhav1307@gmail.com
- LinkedIn: [sri-vibhav-peddiraju](https://www.linkedin.com/in/sri-vibhav-peddiraju-449077327/)
- GitHub: [@Vibhavraju](https://github.com/Vibhavraju)

## License

Personal project — feel free to fork the structure for your own portfolio, but please swap out my content and photos first.
