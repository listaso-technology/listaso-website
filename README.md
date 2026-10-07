# listaso.com — static site (brand: Listaso · legal name: Listaso Inc.)

## Upload
Upload everything inside `website/` to the web root for listaso.com.
- nginx: add the contents of `website/redirects.nginx.conf` to the listaso.com server block.
- Apache: `website/.htaccess` is already in place.

English pages live at `/page/`, Spanish at `/es/page/`. Each page has its own title, description,
canonical link, hreflang tags (en / es / x-default), Open Graph image and structured data.
`sitemap.xml` and `robots.txt` are included; submit the sitemap in Google Search Console after launch.

## See it on your computer
The pages use site-wide links (like `/assets/site.css`), so double-clicking an .html file
won't show them correctly. From the folder that contains `website/`, run:

    python3 -m http.server 8000 -d website

then open http://localhost:8000 in your browser.

The style and script links carry a version tag (`site.css?v=...`) that changes on every build,
so browsers always pick up the newest design after an upload, with no cache clearing needed.

## Editing
Text lives in `source/build/*.py` (English text plus its Spanish version in `data-es`).
Styles: `source/site_src/assets/site.css`. To rebuild:

    pip install beautifulsoup4
    python3 source/build/build.py          # writes source/dist/

## Blog
The blog stays on WordPress at https://blog.listaso.com/ (set in `source/build/lsbuild.py`, `BLOG`).
Point that subdomain at the WordPress install and set WordPress's Site Address to it. The redirect rules
send /blog/, /category/... and all 55 old post addresses to the same post on the blog subdomain.

## Sami chat + live agent
The Sami chat widget (AnythingLLM) and the Zoho SalesIQ live-agent handoff are on every page.
The code lives in `source/build/chat_embed.html` and is added just before `</body>` on each page.
Two small changes from the original snippet: the handoff popups follow the page language (EN/ES switch)
instead of only the browser language, and Sami's greeting is in Spanish on the /es/ pages.

## Analytics
The same Google Tag Manager container as the current site (GTM-MSV6WDX6) is on every page.

## Still needed before launch
- Logos for Productos Bredy, Comercial Mexicana and Fabi Saa (they show as names for now;
  the other five logos are in `assets/logos/`)
