# Bison Sheds Audience Pathways Mockup

Static mockup for optimising the existing Bison Sheds site around two primary audiences:

- Custom Sheds: consultative, higher-value project leads.
- Supply Only Shed Kits: faster quote-ready kit leads replacing `/standard-sizing`.

## Included Pages

- `/` homepage with two clear audience pathways.
- `/custom-sheds/` full-service custom shed landing page.
- `/shed-kits/` supply only kit landing page.
- `/contact/` multi-step routed enquiry form.
- `/why-bison/`, `/the-bison-process/`, `/projects/`, `/agricultural-sheds/` light templates only.

## Live Site Review Notes

The current Wix sitemap contains only home, about, gallery, standard sizing, book online and contact. The main conversion issue is not lack of pages alone; it is that the site does not consistently separate custom end-to-end buyers from supply only kit buyers. The mockup addresses this in the homepage hero, menu navigation, pathway cards, CTA language, page content and contact form.

Current form health estimate: 68/100, Conversion-Limited. The existing flow asks for quote details but does not first route the user by buying pathway, which creates decision friction and weaker lead qualification.

Mockup form health estimate: 86/100, High-Performing. The new form asks for pathway first, then shows relevant fields only. It keeps the custom route consultative and the kit route quote-focused.

## Deployment

This project uses Vite to build and optimize the static pages, and is configured to deploy automatically to GitHub Pages.

### Local Development

To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

### GitHub Pages Deployment

A GitHub Action (`.github/workflows/deploy.yml`) is configured to automatically build the site using Vite and deploy it to GitHub Pages whenever changes are pushed to the `main` or `master` branch.

**Note:** Ensure that in your repository settings under **Pages**, the **Source** is set to **GitHub Actions**.

## Notes For Wix Build

- Replace `/standard-sizing` with `/shed-kits`.
- Add `/custom-sheds`.
- Use `Request a Project Consultation` for planning, approval, installation and custom shed content.
- Use `Request a Kit Quote` for kit, standard size and quote-ready content.
- Route contact submissions into separate Custom Shed and Supply Only Kit sales follow-up labels or pipelines.
