"""Listaso static site builder.

Pages are written once with English text and a Spanish `data-es` attribute on
each translatable element. The build renders two copies: English at /<slug>/
and Spanish at /es/<slug>/, each with its own SEO tags.

Usage:  python3 build/build.py            -> dist/  (production, clean URLs)
        python3 build/build.py --preview  -> preview/ (relative links for the artifact preview)
"""
import json, os, re, shutil, sys
from html import escape
from bs4 import BeautifulSoup

BASE = "https://listaso.com"
DEMO = "https://calendly.com/ernesto-henriquez-viasql/60min"
LOGIN = "https://app.listaso.com/BOClassic/site/login.aspx"
BLOG = "https://blog.listaso.com/"  # WordPress blog; change here if it lives elsewhere
PHONE = "+1 305-912-7770"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def _ver(name):
    # short fingerprint of the file, so browsers fetch the new copy after every change
    import hashlib
    with open(os.path.join(ROOT, "site_src", "assets", name), "rb") as f:
        return hashlib.md5(f.read()).hexdigest()[:8]

# ---------------------------------------------------------------- helpers
def T(en, es, tag="span", cls="", attrs=""):
    """One translatable element."""
    c = f' class="{cls}"' if cls else ""
    a = f" {attrs}" if attrs else ""
    return f'<{tag}{c}{a} data-es="{escape(es, quote=True)}">{en}</{tag}>'

CK = '<svg aria-hidden="true"><use href="#ck"/></svg>'

def checks(items, cls="checks"):
    return f'<ul class="{cls}">' + "".join(f"<li>{CK}{T(en, es)}</li>" for en, es in items) + "</ul>"

def feats(items, cols=3):
    out = [f'<div class="grid-{cols}">']
    for it in items:
        en_t, es_t, en_p, es_p = it[:4]
        out.append(f'<article class="feat">{T(en_t, es_t, "h3")}{T(en_p, es_p, "p")}</article>')
    out.append("</div>")
    return "".join(out)

def link_cards(items, cols=3):
    out = [f'<div class="grid-{cols}">']
    for href, en_t, es_t, en_p, es_p in items:
        out.append(f'<a class="feat" href="{href}">{T(en_t, es_t, "h3")}{T(en_p, es_p, "p")}'
                   f'{T("Learn more →", "Ver más →", "span", "more")}</a>')
    out.append("</div>")
    return "".join(out)

def sec_head(eyebrow, h_em, h_rest, lead=None, h="h2"):
    e = T(eyebrow[0], eyebrow[1], "p", "eyebrow") if eyebrow else ""
    l = T(lead[0], lead[1], "p", "lead") if lead else ""
    return (f'<div class="sec-head">{e}<{h}>{T(h_em[0], h_em[1], "em")} '
            f'{T(h_rest[0], h_rest[1])}</{h}>{l}</div>')

def crumbs(items):
    """items: list of (href|None, en, es). Home is added automatically."""
    parts = [f'<a href="/">{T("Home", "Inicio")}</a>']
    for href, en, es in items:
        parts.append('<span aria-hidden="true">/</span>')
        parts.append(f'<a href="{href}">{T(en, es)}</a>' if href else T(en, es, "span", "", 'aria-current="page"'))
    return '<nav class="crumbs" aria-label="Breadcrumb">' + "".join(parts) + "</nav>"

def phero(crumb_items, eyebrow, h_em, h_rest, lead, art="", pill=None, ctas=True, solo=False):
    p = ""
    if pill:
        p = f'<p class="plan-pill">{T(pill[0], pill[1])}</p>'
    c = ""
    if ctas:
        c = ('<div class="hero-ctas">'
             f'<a class="btn btn-primary" href="{DEMO}">{T("Book a free demo", "Agendar una demo gratis")}</a>'
             f'<a class="btn btn-ghost" href="/plans/">{T("See pricing", "Ver precios")}</a></div>')
    e = T(eyebrow[0], eyebrow[1], "p", "eyebrow") if eyebrow else ""
    cls = "band phero solo" if solo or not art else "band phero"
    return (f'<section class="{cls}"><div class="wrap"><div>{crumbs(crumb_items)}'
            f'<div style="margin-top:22px">{e}</div>'
            f'<h1>{T(h_em[0], h_em[1], "em")} {T(h_rest[0], h_rest[1])}</h1>'
            f'{T(lead[0], lead[1], "p", "lead")}{p}{c}</div>{art}</div></section>')

def cta_band():
    return f'''<section class="band final"><div class="wrap">
  <div><h2>{T("See it working", "Véalo funcionando", "em")} {T("with your own products", "con sus propios productos")}</h2>
  {T("On a free demo we show you Listaso the way you work and give you an exact price, setup included. In English or Spanish.",
     "En una demo gratis le mostramos Listaso con su forma de trabajar y le damos un precio exacto, instalación incluida. En español o en inglés.", "p", "lead")}</div>
  <div class="contact-box">
    <a class="btn btn-primary" href="{DEMO}">{T("Book a free demo", "Agendar una demo gratis")}</a>
    <p>{T("Or call sales:", "O llame a ventas:")}<br><b><a href="tel:+13059127770,2">{PHONE}</a></b>, {T("option 2", "opción 2")}</p>
    <p>{T("Sales:", "Ventas:")} <span class="sel" style="color:var(--on-brand)">sales@listaso.com</span></p>
  </div></div></section>'''

ERPS = [("/quickbooks/", "QuickBooks"), ("/sage/", "Sage 100"), ("/acumatica/", "Acumatica"), ("/sap/", "SAP"),
        ("/netsuite/", "NetSuite"), ("/zoho/", "Zoho"), ("/acctivate/", "Acctivate"), ("/accountmate/", "AccountMate")]

def erp_strip(exclude=None):
    cells = []
    for href, name in ERPS:
        if href == exclude:
            continue
        sub = T("Certified", "Certificado", "small") if name == "QuickBooks" else ""
        cells.append(f'<a href="{href}">{name}{sub}</a>')
    return '<div class="erp">' + "".join(cells) + "</div>"

# ---------------------------------------------------------------- page registry
PAGES = []

def page(slug, title, desc, body, nav=None, crumbs_ld=None, jsonld=None, noindex=False, file=None):
    """title/desc: (en, es). slug: '' for home, 'pre-sales', ... crumbs_ld: [(slug, en, es)]"""
    PAGES.append(dict(slug=slug, title=title, desc=desc, body=body, nav=nav, crumbs=crumbs_ld,
                      jsonld=jsonld or [], noindex=noindex, file=file))

def url(slug, lang):
    p = f"/{slug}/" if slug else "/"
    return BASE + ("/es" + p if lang == "es" else p)

# ---------------------------------------------------------------- layout
ICON_SUN = '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
ICON_MOON = '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>'
ICON_MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
CHEV = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4l4 4 4-4"/></svg>'

SPRITE = '''<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="mk" viewBox="310.8 223.8 170.4 170.4"><path fill="#FFFFFF" d="M341.12 223.8h109.76c16.75 0 30.32 13.58 30.32 30.32v109.76c0 16.75-13.58 30.32-30.32 30.32H341.12c-16.75 0-30.32-13.58-30.32-30.32V254.12c0-16.74 13.58-30.32 30.32-30.32"/><path fill="#00BCA8" d="M439.96 278.06v62.25h-13.58c-4.72 0-9.080-1.49-12.66-4.04v-45.28c0-7.35-3.63-13.86-9.2-17.82v-16.97h13.57c12.08 0 21.87 9.78 21.87 21.86"/><path fill="#003F69" d="M413.72 290.98v62.25h-13.58c-4.71 0-9.08-1.5-12.66-4.05v-45.27c0-7.36-3.63-13.87-9.2-17.82v-16.97h13.58c4.71 0 9.090 1.5 12.66 4.04 5.57 3.96 9.2 10.47 9.2 17.82"/><path fill="#FF1975" d="M387.48 303.91v62.23h-13.57c-12.080 0-21.87-9.78-21.87-21.86v-62.25h13.58c4.72 0 9.09 1.5 12.66 4.05 5.57 3.95 9.2 10.47 9.2 17.83"/></symbol>
<symbol id="ck" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l4.2 4.2L19 7"/></symbol>
</defs></svg>'''

def dd_link(href, en_t, es_t, en_s, es_s):
    return f'<a href="{href}"><b data-es="{escape(es_t)}">{en_t}</b>{T(en_s, es_s)}</a>'

def header(nav, alt_href_en, alt_href_es, lang):
    prod = "".join([
        dd_link("/pre-sales/", "Pre-sales", "Preventa", "Take orders in the field", "Pedidos en la calle"),
        dd_link("/direct-sales/", "Direct store delivery", "Venta directa (DSD)", "Sell and invoice from the truck", "Venda y facture desde el camión"),
        dd_link("/inventory/", "Inventory", "Inventario", "Warehouse and truck stock", "Almacén e inventario en camiones"),
        dd_link("/delivery/", "Delivery", "Entregas", "Routes, proof of delivery, payments", "Rutas, prueba de entrega y cobros"),
        dd_link("/back-office/", "Back Office", "Back Office", "Run it all from the office", "Todo desde la oficina"),
        dd_link("/b2b-ecommerce/", "B2B online store", "Tienda en línea B2B", "Your customers order 24/7", "Sus clientes piden 24/7"),
        dd_link("/forms/", "Forms &amp; surveys", "Formularios y encuestas", "New: capture info at every visit", "Nuevo: datos de cada visita"),
        dd_link("/sami/", "Sami AI", "Sami IA", "New: ask your business anything", "Nuevo: pregúntele a su negocio"),
        dd_link("/custom-development/", "Custom development", "Desarrollo a la medida", "Reports and features made for you", "Reportes y funciones a su medida"),
    ])
    ints = "".join(f'<a href="{h}"><b>{n}</b></a>' for h, n in ERPS) + \
        dd_link("/printers-and-scanners/", "Printers &amp; scanners", "Impresoras y escáneres", "Compatible hardware", "Equipos compatibles") + \
        dd_link("/integrations/", "All integrations", "Todas las integraciones", "See how the sync works", "Cómo funciona la sincronización")
    comp = "".join([
        dd_link("/about/", "About Listaso", "Sobre Listaso", "Our story since 2015", "Nuestra historia desde 2015"),
        dd_link("/industries/", "Industries", "Industrias", "Food &amp; beverage and more", "Alimentos y bebidas y más"),
        dd_link("/listaso-impact/", "Listaso Impact", "Listaso Impact", "How we give back", "Cómo ayudamos a la comunidad"),
        dd_link("/join-us/", "Careers", "Trabaje con nosotros", "Join our team", "Únase a nuestro equipo"),
        dd_link("/contact-us/", "Contact us", "Contáctenos", "Offices, phones and emails", "Oficinas, teléfonos y correos"),
        dd_link(BLOG, "Blog", "Blog", "Tips for distributors", "Consejos para distribuidores"),
    ])
    def cur(k):
        return ' aria-current="page"' if nav == k else ""
    def dd(key, en, es, panel, wide=False):
        w = " wide" if wide else ""
        return (f'<div class="dd" data-dd><button type="button" class="dd-btn" aria-expanded="false"{cur(key)}>'
                f'{T(en, es)}{CHEV}</button><div class="dd-panel{w}">{panel}</div></div>')
    en_cur = ' aria-current="true"' if lang == "en" else ""
    es_cur = ' aria-current="true"' if lang == "es" else ""
    return f'''<header class="top"><div class="wrap">
<a class="logo" href="/" aria-label="Listaso"><svg class="mark" width="36" height="36" aria-hidden="true"><use href="#mk"/></svg><span><b>Listaso</b></span></a>
<nav class="nav" id="site-nav" aria-label="Main">
{dd("products", "Products", "Productos", prod, True)}
{dd("integrations", "Integrations", "Integraciones", ints, True)}
<a href="/plans/"{cur("plans")} data-es="Precios">Pricing</a>
<a href="/support/"{cur("support")} data-es="Soporte">Support</a>
{dd("company", "Company", "Empresa", comp)}
<a class="mobile-only" href="{LOGIN}" data-es="Iniciar sesión">Log in</a>
<a class="btn btn-primary mobile-only" href="{DEMO}" data-es="Agendar una demo gratis">Book a free demo</a>
</nav>
<div class="top-right">
<button type="button" class="icon-btn theme-btn" id="theme-btn" aria-label="Switch light or dark mode" data-es-label="Cambiar a modo claro u oscuro">{ICON_SUN}{ICON_MOON}</button>
<div class="lang" role="group" aria-label="Language / Idioma"><a href="{alt_href_en}" hreflang="en" lang="en"{en_cur} data-keep>EN</a><a href="{alt_href_es}" hreflang="es" lang="es"{es_cur} data-keep>ES</a></div>
<a class="login" href="{LOGIN}" aria-label="Log in" data-es-label="Iniciar sesión"><svg class="login-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg><span data-es="Iniciar sesión">Log in</span></a>
<a class="btn btn-primary btn-sm btn-demo" href="{DEMO}" data-es="Agendar demo">Book a demo</a>
<button type="button" class="icon-btn menu-btn" id="menu-btn" aria-controls="site-nav" aria-expanded="false" aria-label="Menu" data-es-label="Menú">{ICON_MENU}</button>
</div></div></header>'''

def footer():
    def li(href, en, es):
        return f'<li><a href="{href}">{T(en, es)}</a></li>'
    return f'''<footer class="site"><div class="wrap foot">
<div><a class="logo" href="/" aria-label="Listaso"><svg class="mark" width="36" height="36" aria-hidden="true"><use href="#mk"/></svg><span><b>Listaso</b></span></a>
<p class="addr"><b style="color:var(--on-brand)">Miami</b><br>5966 S Dixie Hwy, Ste 300<br>South Miami, FL 33143</p>
<p class="addr"><b style="color:var(--on-brand)">El Salvador</b><br>Plaza Madre Tierra, Edificio 11, Local 10-A<br>Santa Elena, Antiguo Cuscatlán, La Libertad</p></div>
<div><h2 class="fh" data-es="Productos">Products</h2><ul>
{li("/pre-sales/", "Pre-sales", "Preventa")}{li("/direct-sales/", "Direct store delivery", "Venta directa (DSD)")}{li("/inventory/", "Inventory", "Inventario")}{li("/delivery/", "Delivery", "Entregas")}{li("/back-office/", "Back Office", "Back Office")}{li("/b2b-ecommerce/", "B2B online store", "Tienda en línea B2B")}{li("/forms/", "Forms &amp; surveys", "Formularios y encuestas")}{li("/sami/", "Sami AI", "Sami IA")}{li("/custom-development/", "Custom development", "Desarrollo a la medida")}{li("/plans/", "Pricing", "Precios")}
</ul></div>
<div><h2 class="fh" data-es="Integraciones">Integrations</h2><ul>
{"".join(f'<li><a href="{h}">{n}</a></li>' for h, n in ERPS)}{li("/printers-and-scanners/", "Printers &amp; scanners", "Impresoras y escáneres")}
</ul></div>
<div><h2 class="fh" data-es="Empresa">Company</h2><ul>
{li("/about/", "About Listaso", "Sobre Listaso")}{li("/industries/", "Industries", "Industrias")}{li("/support/", "Support", "Soporte")}{li("/listaso-impact/", "Listaso Impact", "Listaso Impact")}{li("/join-us/", "Careers", "Trabaje con nosotros")}{li(BLOG, "Blog", "Blog")}{li("/contact-us/", "Contact us", "Contáctenos")}
</ul>
<ul class="mt-24"><li>{PHONE}</li><li>{T("Sales: option 2 · Support: option 1", "Ventas: opción 2 · Soporte: opción 1")}</li><li>{T("Sales:", "Ventas:")} sales@listaso.com</li><li>{T("Support:", "Soporte:")} cs@listaso.com</li><li>{T("Urgent:", "Urgencias:")} sos@listaso.com</li>
<li class="social"><a href="https://www.linkedin.com/company/listaso/">LinkedIn</a> · <a href="https://www.youtube.com/@ListasoTechnology">YouTube</a> · <a href="https://www.instagram.com/listaso_technology/">Instagram</a> · <a href="https://www.facebook.com/ListasoTechnology/">Facebook</a></li></ul></div>
</div>
<div class="wrap legal"><span>© 2026 Listaso Inc.</span>
<nav aria-label="Legal"><a href="/privacy-policy/" data-es="Privacidad">Privacy Policy</a><a href="/subscription-agreement/" data-es="Acuerdo de suscripción">Subscription Agreement</a><a href="/terms-and-conditions/" data-es="Términos y condiciones">Terms &amp; Conditions</a></nav></div>
</footer>'''

THEME_INIT = "document.documentElement.classList.add('js-fit');(function(){try{var t=localStorage.getItem('listaso-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}})();"

ORG_LD = {
    "@context": "https://schema.org", "@type": "Organization", "@id": BASE + "/#org",
    "name": "Listaso", "legalName": "Listaso Inc.", "url": BASE + "/", "logo": BASE + "/assets/listaso-mark.svg",
    "foundingDate": "2015-10", "telephone": PHONE, "email": "info@listaso.com",
    "address": [
        {"@type": "PostalAddress", "streetAddress": "5966 S Dixie Hwy, Ste 300", "addressLocality": "South Miami",
         "addressRegion": "FL", "postalCode": "33143", "addressCountry": "US"},
        {"@type": "PostalAddress", "streetAddress": "Plaza Madre Tierra, Edificio 11, Local 10-A, Santa Elena",
         "addressLocality": "Antiguo Cuscatlán", "addressRegion": "La Libertad", "addressCountry": "SV"}],
    "contactPoint": [
        {"@type": "ContactPoint", "contactType": "sales", "telephone": PHONE, "email": "sales@listaso.com", "availableLanguage": ["English", "Spanish"]},
        {"@type": "ContactPoint", "contactType": "customer support", "telephone": PHONE, "email": "cs@listaso.com", "availableLanguage": ["English", "Spanish"],
         "hoursAvailable": {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "20:00"}}],
    "sameAs": ["https://www.linkedin.com/company/listaso/", "https://www.youtube.com/@ListasoTechnology",
               "https://www.instagram.com/listaso_technology/", "https://www.facebook.com/ListasoTechnology/"]}

def head(p, lang):
    t, d = p["title"][0 if lang == "en" else 1], p["desc"][0 if lang == "en" else 1]
    can = url(p["slug"], lang)
    ld = []
    if p["slug"] == "":
        ld.append(ORG_LD)
        ld.append({"@context": "https://schema.org", "@type": "WebSite", "name": "Listaso", "url": BASE + "/",
                   "inLanguage": ["en", "es"], "publisher": {"@id": BASE + "/#org"}})
    if p["crumbs"] is not None:
        items = [{"@type": "ListItem", "position": 1, "name": "Home" if lang == "en" else "Inicio", "item": url("", lang)}]
        for i, (s, en, es) in enumerate(p["crumbs"], start=2):
            items.append({"@type": "ListItem", "position": i, "name": en if lang == "en" else es, "item": url(s, lang)})
        ld.append({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items})
    for fn in p["jsonld"]:
        ld.append(fn(lang))
    ld_html = "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in ld)
    robots = '<meta name="robots" content="noindex">' if p["noindex"] else '<meta name="robots" content="index, follow, max-image-preview:large">'
    alts = "" if p["noindex"] else (
        f'<link rel="alternate" hreflang="en" href="{url(p["slug"], "en")}">'
        f'<link rel="alternate" hreflang="es" href="{url(p["slug"], "es")}">'
        f'<link rel="alternate" hreflang="x-default" href="{url(p["slug"], "en")}">')
    canon = "" if p["noindex"] else f'<link rel="canonical" href="{can}">'
    return f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{escape(t)}</title>
<meta name="description" content="{escape(d, quote=True)}">
{robots}
{canon}{alts}
<meta property="og:type" content="website"><meta property="og:site_name" content="Listaso">
<meta property="og:title" content="{escape(t, quote=True)}"><meta property="og:description" content="{escape(d, quote=True)}">
<meta property="og:url" content="{can}"><meta property="og:image" content="{BASE}/assets/og-listaso.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="{"en_US" if lang == "en" else "es_US"}"><meta property="og:locale:alternate" content="{"es_US" if lang == "en" else "en_US"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#151726">
<link rel="icon" type="image/svg+xml" href="/assets/listaso-mark.svg">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600;1,700;1,800&amp;display=swap">
<link rel="stylesheet" href="/assets/site.css?v={_ver("site.css")}">
<script>{THEME_INIT}</script>
<script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{"gtm.start":new Date().getTime(),event:"gtm.js"}});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);}})(window,document,"script","dataLayer","GTM-MSV6WDX6");</script>
{ld_html}'''

with open(os.path.join(ROOT, "build", "chat_embed.html"), encoding="utf-8") as _f:
    CHAT_EMBED = _f.read()   # Sami chat + Zoho SalesIQ handoff, added to the bottom of every page

def full_html(p, lang):
    slug = p["slug"]
    en_href = f"/{slug}/" if slug and not p["file"] else "/"
    es_href = "/es" + en_href
    body = p["body"]() if callable(p["body"]) else p["body"]
    return (f'<!doctype html>\n<html lang="{lang}">\n<head>\n{head(p, lang)}\n</head>\n<body>\n'
            f'<div id="page-top" aria-hidden="true"></div>\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MSV6WDX6" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n<a class="skip" href="#main" data-es="Saltar al contenido">Skip to content</a>\n{SPRITE}\n'
            f'{header(p["nav"], en_href, es_href, lang)}\n<main id="main">\n{body}\n</main>\n{footer()}\n'
            f'<script src="/assets/site.js?v={_ver("site.js")}" defer></script>\n{CHAT_EMBED}</body>\n</html>\n')

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@listaso\.com")
PHONE_RE = re.compile(r"(?:\+1 )?305-912-7770")
SKIP_TAGS = {"a", "script", "style", "title", "noscript", "head", "button", "summary"}

def autolink(soup):
    """Turn plain-text emails and the main phone number into mailto:/tel: links."""
    combined = re.compile(EMAIL_RE.pattern + "|" + PHONE_RE.pattern)
    for node in list(soup.find_all(string=combined)):
        if any(p.name in SKIP_TAGS for p in node.parents):
            continue
        text, pos, parts = str(node), 0, []
        for m in combined.finditer(text):
            parts.append(text[pos:m.start()])
            v = m.group(0)
            href = "mailto:" + v if "@" in v else "tel:+13059127770"
            parts.append(f'<a href="{href}">{escape(v)}</a>')
            pos = m.end()
        parts.append(text[pos:])
        frag = BeautifulSoup(escape(parts[0]) + "".join(
            p if i % 2 == 1 else escape(p) for i, p in enumerate(parts[1:], start=1)), "html.parser")
        node.replace_with(frag)

def localize(html, lang):
    soup = BeautifulSoup(html, "html.parser")
    for el in soup.select("[data-es]"):
        if lang == "es":
            frag = BeautifulSoup(el["data-es"], "html.parser")
            el.clear()
            for c in list(frag.contents):
                el.append(c)
        del el["data-es"]
    autolink(soup)
    for el in soup.select("[data-es-alt]"):
        if lang == "es":
            el["alt"] = el["data-es-alt"]
        del el["data-es-alt"]
    for el in soup.select("[data-es-label]"):
        if lang == "es":
            el["aria-label"] = el["data-es-label"]
        del el["data-es-label"]
    if lang == "es":
        for a in soup.find_all("a", href=True):
            if a.has_attr("data-keep"):
                continue
            h = a["href"]
            if h.startswith("/") and not h.startswith("/es/") and not h.startswith("/assets/"):
                a["href"] = "/es" + h
    for a in soup.select("[data-keep]"):
        del a["data-keep"]
    return "<!doctype html>\n" + str(soup).replace("<!DOCTYPE html>", "").replace("<!doctype html>", "", 1).lstrip()

def out_path(slug, lang, root):
    parts = [root] + (["es"] if lang == "es" else []) + ([slug] if slug else [])
    return os.path.join(*parts, "index.html")

def relativize(html, depth):
    """For the artifact preview: turn /x/ links into relative x/index.html links."""
    pre = "../" * depth
    def fix(m):
        attr, q, path = m.group(1), m.group(2), m.group(3)
        if path.startswith("//"):
            return m.group(0)
        path_only, _, frag = path.partition("#")
        if path_only.endswith("/"):
            path_only += "index.html"
        new = pre + path_only.lstrip("/")
        if frag:
            new += "#" + frag
        return f"{attr}={q}{new}{q}"
    return re.sub(r'\b(href|src)=(["\'])(/[^"\']*)\2', fix, html)

def build(preview=False):
    import pages  # noqa: registers pages
    root = os.path.join(ROOT, "preview" if preview else "dist")
    if os.path.exists(root):
        shutil.rmtree(root)
    shutil.copytree(os.path.join(ROOT, "site_src", "assets"), os.path.join(root, "assets"))
    written = []
    for p in PAGES:
        for lang in ("en", "es"):
            html = localize(full_html(p, lang), lang)
            path = out_path(p["slug"], lang, root) if not p["file"] else os.path.join(root, ("es/" if lang == "es" else "") + p["file"])
            if preview:
                depth = path[len(root) + 1:].count("/")
                html = relativize(html, depth)
            os.makedirs(os.path.dirname(path), exist_ok=True)
            open(path, "w", encoding="utf-8").write(html)
            written.append(path)
    if not preview:
        # sitemap with language alternates
        sm = ['<?xml version="1.0" encoding="UTF-8"?>',
              '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
        for p in PAGES:
            if p["noindex"] or p["file"]:
                continue
            for lang in ("en", "es"):
                sm.append(f'<url><loc>{url(p["slug"], lang)}</loc>'
                          f'<xhtml:link rel="alternate" hreflang="en" href="{url(p["slug"], "en")}"/>'
                          f'<xhtml:link rel="alternate" hreflang="es" href="{url(p["slug"], "es")}"/>'
                          f'<xhtml:link rel="alternate" hreflang="x-default" href="{url(p["slug"], "en")}"/>'
                          f'<changefreq>monthly</changefreq><priority>{"1.0" if p["slug"] == "" else "0.8"}</priority></url>')
        sm.append("</urlset>")
        open(os.path.join(root, "sitemap.xml"), "w").write("\n".join(sm))
        open(os.path.join(root, "robots.txt"), "w").write(f"User-agent: *\nAllow: /\n\nSitemap: {BASE}/sitemap.xml\n")
        shutil.copy(os.path.join(ROOT, "build", "redirects.nginx.conf"), root)
        shutil.copy(os.path.join(ROOT, "build", ".htaccess"), root)
    return root, written

