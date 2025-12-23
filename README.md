Personal Testimonial Page — Local-only

What this is
- A simple, private web page template for you to write your personal experience with Discover.
- The page is intentionally single-user: editing is disabled by default and you can set a short passcode (stored locally) to unlock editing.
- All data is stored in your browser's `localStorage`. Nothing is sent to a server.

Files
- `index.html` — the personal editor UI
- `css/style.css` — neutral styles
- `js/app.js` — client-side logic: lock/unlock, local save, export, print

How to use
1) Open the folder and open `index.html` in a browser, or serve it locally:

```powershell
cd "c:\Users\isabe\OneDrive\Área de Trabalho\discover website"
python -m http.server 8000
# then open http://localhost:8000
```

2) Click "Unlock to Edit" and follow prompts to set a passcode (optional but recommended).
3) Write your story in the editor and click "Save". The page auto-saves when unlocked.
4) Use "Export .txt" or "Export .json" to export a copy. Use Print to create a printable report.

Security & Limitations
- This passcode and storage are client-side only (localStorage). It prevents casual editing by others who open the page, but it is not secure against someone with access to the machine or browser profile.
- If you need secure, private hosting or stronger protection, I can help you build a server-backed version with authentication and server-side storage.

Legal note
- This page is for your personal account and opinions. Avoid publishing unverified allegations or sharing private personal data of other people. If you want, I can add a printable "factual timeline" template to help keep statements evidence-based.

Hosting publicly (recommended steps)
----------------------------------

If you want to host this site so others can read your testimony, here are simple options. Note: the site is a static site (HTML/CSS/JS) and can be hosted on any static-hosting provider.

- GitHub Pages (free):
	1. Create a GitHub repository and push the files in this folder.
	2. Go to the repository Settings → Pages → Choose branch `main` (or `gh-pages`) and root folder.
	3. The site will be available at `https://<your-username>.github.io/<repo>`.

- Netlify (easy drag-and-drop or continuous deploy):
	1. Create an account at netlify.com.
	2. Drag the folder contents to the Netlify UI or connect your GitHub repo for automatic deploys.
	3. You can enable password protection in Netlify's settings (for editors) or use branch deploys for edits.

- Vercel: connect the GitHub repo and deploy a static site quickly.

Editing after publishing
------------------------

This template uses a client-side passcode saved in your browser to prevent casual edits. When the site is published publicly:

- Visitors will see a view-only version by default (editing controls are disabled).
- To edit: open the published page in your browser, click "Unlock to Edit", and follow the prompt to set a passcode. That passcode is stored in your browser's localStorage and only applies to that browser/device. After setting a passcode you can edit and save content from that browser; visitors without that passcode will not be able to edit from their browsers.

Important security notes about hosting and editing
-------------------------------------------------

- The passcode is client-side only (localStorage). It prevents casual edits from other visitors, but it is not a secure authentication method. Anyone with access to your hosting account, repository, or the machine/browser profile can potentially modify the site or the stored passcode.
- If you need stronger protections for editing (recommended if you want only *you* to be able to edit while the page is public), consider one of these options:
	- Deploy behind basic HTTP auth (some hosts and platforms support password protection or access controls).
	- Use Netlify/Vercel features to restrict access to preview or admin panels.
	- Build a simple server-side admin interface (Express/Flask) with user authentication and server-side storage of the content.

Checklist before publishing
---------------------------

- Review the content and remove any private personal data you don't want published.
- Keep statements factual and evidence-based to reduce legal risk. If you'd like, I can add a "Factual Timeline" template to the page that structures claims, dates, and supporting evidence.

Want help deploying?
--------------------

Tell me which platform you'd like to use (GitHub Pages, Netlify, Vercel, or another), and I can:

- Create a small `deploy` script or `package.json` with helper commands.
- Prepare a step-by-step guide specific to your platform (including how to set up a custom domain).
- Or, build a secure server-backed editing flow if you want edits to be limited to a verified account.
