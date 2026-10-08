"""Privacy Policy, Subscription Agreement, Terms and Conditions (English text from the current site)."""
import json, os, re
from html import escape
from lsbuild import T, page, crumbs
import sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "legal"))
import privacy_new

DOCS = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "legal", "legal.json"), encoding="utf-8"))

def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

def legal_body(key, title_en, title_es):
    doc = DOCS[key]
    def body():
        toc, parts, seen = [], [], set()
        for t, x in doc["blocks"]:
            x_html = escape(x)
            if t == "h2":
                sid = slugify(x)
                while sid in seen:
                    sid += "-2"
                seen.add(sid)
                toc.append(f'<li><a href="#{sid}">{x_html}</a></li>')
                parts.append(f'<h2 id="{sid}">{x_html}</h2>')
            elif t == "h3":
                parts.append(f"<h3>{x_html}</h3>")
            elif t == "li":
                m = re.match(r"^(\d+)\.\s+(.*)$", x)
                parts.append(f'<p class="li"><b>{m.group(1)}.</b> {escape(m.group(2))}</p>')
            else:
                parts.append(f"<p>{x_html}</p>")
        note = T("", "Este documento legal está disponible en inglés.", "p", "es-note")
        return (f'<section class="band phero solo"><div class="wrap"><div>{crumbs([(None, title_en, title_es)])}'
                f'<h1 style="margin-top:22px">{T(title_en, title_es)}</h1>'
                f'<p class="lead">{escape(doc["updated"])}</p></div></div></section>'
                f'<section class="sec"><div class="wrap legal-doc">'
                f'<nav class="toc" aria-label="Contents" data-es-label="Contenido">{T("On this page", "En esta página", "p", "tagline")}<ol>{"".join(toc)}</ol></nav>'
                f'<article class="legal-text" lang="en">{note}{"".join(parts)}</article></div></section>')
    return body

LABELS = ["Customer Data.", "Information we control.", "Information from our mobile apps.", "Information from others.", "Information you give us:", "Information collected automatically:",
          "Datos del Cliente.", "Información que nosotros controlamos.", "Información de nuestras apps móviles.", "Información de terceros.", "Información que usted nos da:", "Información que se recopila automáticamente:"]

def privacy_body():
    toc, parts = [], []
    for b in privacy_new.BLOCKS:
        t = b[0]
        if t == "h2":
            sid = slugify(b[1])
            toc.append(f'<li><a href="#{sid}">{T(escape(b[1]), escape(b[2]))}</a></li>')
            parts.append(f'<h2 id="{sid}">{T(escape(b[1]), escape(b[2]))}</h2>')
        elif t == "ul":
            parts.append("<ul>" + "".join(f"<li>{T(escape(a), escape(c))}</li>" for a, c in zip(b[1], b[2])) + "</ul>")
        else:
            def bold(x):
                for lab in LABELS:
                    if x.startswith(lab):
                        return f"<b>{escape(lab)}</b>{escape(x[len(lab):])}"
                return escape(x)
            parts.append(T(bold(b[1]), bold(b[2]), "p"))
    u = privacy_new.UPDATED
    return (f'<section class="band phero solo"><div class="wrap"><div>{crumbs([(None, "Privacy Policy", "Política de privacidad")])}'
            f'<h1 style="margin-top:22px">{T("Privacy Policy", "Política de privacidad")}</h1>'
            f'{T(u[0], u[1], "p", "lead")}</div></div></section>'
            f'<section class="sec"><div class="wrap legal-doc">'
            f'<nav class="toc" aria-label="Contents" data-es-label="Contenido">{T("On this page", "En esta página", "p", "tagline")}<ol class="plain">{"".join(toc)}</ol></nav>'
            f'<article class="legal-text">{"".join(parts)}</article></div></section>')

page("privacy-policy", ("Privacy Policy | Listaso", "Política de privacidad | Listaso"),
     ("How Listaso collects, uses, shares and protects personal information on our website, mobile apps and SaaS services, including Sami AI, and your privacy rights.",
      "Cómo Listaso recopila, usa, comparte y protege la información personal en su sitio web, apps móviles y servicios SaaS, incluido Sami IA, y sus derechos de privacidad."),
     privacy_body, crumbs_ld=[("privacy-policy", "Privacy Policy", "Política de privacidad")])

for key, slug, en, es, d_en, d_es in [
    ("subscription", "subscription-agreement", "Subscription Agreement", "Acuerdo de suscripción",
     "The terms of a Listaso subscription: definitions, free trial, customer data protection, license, mobile apps, warranties, liability and jurisdiction.",
     "Los términos de una suscripción a Listaso: definiciones, prueba gratis, protección de datos, licencia, apps, garantías, responsabilidad y jurisdicción."),
    ("terms", "terms-and-conditions", "Terms and Conditions", "Términos y condiciones",
     "Terms of use for the listaso.com website: intellectual property, prohibited activities, dispute resolution, disclaimers and how to contact us.",
     "Términos de uso del sitio listaso.com: propiedad intelectual, actividades prohibidas, resolución de disputas, exenciones y cómo contactarnos."),
]:
    page(slug, (f"{en} | Listaso", f"{es} | Listaso"), (d_en, d_es), legal_body(key, en, es),
         crumbs_ld=[(slug, en, es)])
