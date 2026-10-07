"""Sami, Forms, Plans, Integrations (hub + 8 ERPs), Printers & scanners."""
from lsbuild import (T, CK, checks, feats, link_cards, sec_head, phero, cta_band, erp_strip, page, DEMO, ERPS)
from pages import CHAT, SURVEY, PRICING, ADDON, QUOTES, related, R, int_section

def faq(items):
    return '<div class="faq">' + "".join(
        f'<details>{T(q_en, q_es, "summary")}{T(a_en, a_es, "p")}</details>' for q_en, q_es, a_en, a_es in items) + "</div>"

def faq_ld(items):
    def fn(lang):
        i = 0 if lang == "en" else 1
        return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": (q[0], q[1])[i], "acceptedAnswer": {"@type": "Answer", "text": (q[2], q[3])[i]}} for q in items]}
    return fn

# ================================================================== SAMI
SAMI_FAQ = [
    ("Do I need to know about AI or technology?", "¿Necesito saber de inteligencia artificial o de tecnología?",
     "No. You write a question the way you'd text an employee, and Sami answers in plain words. If you can send a WhatsApp message, you can use Sami.",
     "No. Usted escribe una pregunta como le escribiría a un empleado y Sami le responde con palabras sencillas. Si sabe mandar un mensaje de WhatsApp, sabe usar a Sami."),
    ("Does Sami work in Spanish?", "¿Sami funciona en español?",
     "Yes. Ask in Spanish or English and Sami answers in the same language.",
     "Sí. Pregunte en español o en inglés y Sami le responde en el mismo idioma."),
    ("Where does Sami get its answers?", "¿De dónde saca Sami sus respuestas?",
     "From your own Listaso data: your sales, customers, products, inventory and orders.",
     "De sus propios datos de Listaso: sus ventas, clientes, productos, inventario y pedidos."),
    ("Is Sami included in my Listaso plan?", "¿Sami está incluido en mi plan de Listaso?",
     "Sami is an add-on to any Listaso plan, priced per team. Your first month is free.",
     "Sami es un complemento para cualquier plan de Listaso, con precio por equipo. El primer mes es gratis."),
    ("What does “use included” mean?", "¿Qué significa “uso incluido”?",
     "Each Sami plan includes a monthly amount of use, shared by your whole team. We let you know when you reach 80%. If you need more that month, add a SAMI Credit for $9.99.",
     "Cada plan de Sami incluye una cantidad de uso al mes, compartida por todo su equipo. Le avisamos cuando llega al 80%. Si necesita más ese mes, agregue un SAMI Credit por $9.99."),
    ("Can I use my Listaso data in ChatGPT or Claude?", "¿Puedo usar mis datos de Listaso en ChatGPT o Claude?",
     "Yes. Every Sami plan lets you connect your Listaso data to the AI you already use.",
     "Sí. Todos los planes de Sami le permiten conectar sus datos de Listaso con la IA que ya usa."),
]

def sami_ld(lang):
    es = lang == "es"
    return {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Sami by Listaso",
            "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
            "description": "Asistente con IA para distribuidores: pregunte sobre ventas, clientes, inventario y pedidos." if es else
            "AI assistant for distributors: ask about sales, customers, inventory and orders in plain words.",
            "offers": [{"@type": "Offer", "name": n, "price": p, "priceCurrency": "USD"} for n, p in
                       (("SAMI Starter", "57.99"), ("SAMI Professional", "127.99"), ("SAMI Business", "297.99"))],
            "publisher": {"@id": "https://listaso.com/#org"}, "image": "https://listaso.com/assets/sami-logo-512.png"}

def sami_plan(name, users, for_, price, items, hl=False):
    tag = T("Most popular", "Más popular", "span", "tag") if hl else ""
    cls = "plan hl" if hl else "plan"
    btn = "btn-primary" if hl else "btn-ghost"
    return (f'<article class="{cls}">{tag}<h3><em>{name}</em></h3>{T(users[0], users[1], "p", "for")}'
            f'<div class="price"><b>${price}</b>{T("a month<br>per team", "al mes<br>por equipo")}</div>'
            f'{T(for_[0], for_[1], "p", "fine")}'
            '<ul>' + "".join(f"<li>{CK}{T(a, b)}</li>" for a, b in items) + '</ul>'
            f'<a class="btn {btn}" href="{DEMO}" data-es="Empezar mi mes gratis">Start my free month</a></article>')

def sami_body():
    examples = [
        ("Who are my top 10 customers this quarter?", "¿Quiénes son mis 10 mejores clientes este trimestre?"),
        ("Which products are running low?", "¿Qué productos se están acabando?"),
        ("Which customers haven't ordered in 60 days?", "¿Qué clientes no han comprado en 60 días?"),
        ("How much did each rep sell last week?", "¿Cuánto vendió cada vendedor la semana pasada?"),
        ("Which invoices are more than 30 days past due?", "¿Qué facturas tienen más de 30 días vencidas?"),
        ("What's on backorder, and who is waiting for it?", "¿Qué está pendiente por surtir y quién lo espera?"),
    ]
    ex = '<div class="grid-3">' + "".join(f'<div class="feat">{T("“" + a + "”", "“" + b + "”", "p", "", "style=\"font-weight:600;color:var(--heading);font-size:17px\"")}</div>' for a, b in examples) + "</div>"
    plans = '<div class="plans">' + sami_plan("Starter", ("1 user · for small distributors", "1 usuario · para distribuidores pequeños"),
        ("Up to 500 customers and 250 items", "Hasta 500 clientes y 250 productos"), "57.99",
        [("12 months of history", "12 meses de historial"), ("Email support", "Soporte por correo"), ("Light use included", "Uso ligero incluido")]) + \
        sami_plan("Professional", ("Up to 3 users · for growing teams", "Hasta 3 usuarios · para equipos en crecimiento"),
        ("Up to 1,000 customers and 1,000 items", "Hasta 1,000 clientes y 1,000 productos"), "127.99",
        [("3 years of history", "3 años de historial"), ("Setup and training session", "Sesión de configuración y capacitación"), ("Daily team use included", "Uso diario del equipo incluido")], hl=True) + \
        sami_plan("Business", ("Up to 10 users · for large distributors", "Hasta 10 usuarios · para distribuidores grandes"),
        ("Unlimited customers and items", "Clientes y productos ilimitados"), "297.99",
        [("Full history", "Historial completo"), ("Priority phone support", "Soporte telefónico prioritario"), ("Monthly check-in call", "Llamada de seguimiento mensual"), ("Heavy use included", "Uso intensivo incluido")]) + "</div>"
    included = feats([
        ("AI assistant", "Asistente con IA", "Chat with Sami in plain language, any time.", "Hable con Sami con sus palabras, a cualquier hora."),
        ("Excel &amp; PDF reports", "Reportes en Excel y PDF", "Ask for a report and download it, ready to share.", "Pida un reporte y descárguelo, listo para compartir."),
        ("Works with ChatGPT &amp; Claude", "Funciona con ChatGPT y Claude", "Use your Listaso data in the AI you already use.", "Use sus datos de Listaso en la IA que ya usa."),
        ("Shared team usage", "Uso compartido", "Monthly use included, shared by your team.", "Uso mensual incluido, compartido por su equipo."),
    ], cols=4)
    art = CHAT
    hero = phero([(None, "Sami AI", "Sami IA")], ("New · AI assistant", "Nuevo · Asistente con IA"), ("Meet Sami.", "Conozca a Sami."),
                  ("Ask your business anything.", "Pregúntele lo que quiera a su negocio."),
                  ("Sami is Listaso's AI assistant. Ask about your sales, customers, inventory and orders in plain words, and get answers in seconds, in English or Spanish.",
                   "Sami es el asistente con IA de Listaso. Pregunte sobre sus ventas, clientes, inventario y pedidos con sus propias palabras y reciba respuestas en segundos, en español o en inglés."),
                  art, ("From $57.99 a month · first month free", "Desde $57.99 al mes · primer mes gratis"), ctas=False)
    hero = hero.replace('<div style="margin-top:22px">', '<img class="sami-logo-lg" src="/assets/sami-logo.webp" width="80" height="80" alt="Sami logo" data-es-alt="Logo de Sami" style="margin-top:24px"><div style="margin-top:14px">', 1)
    return (hero
            + f'<section class="sec"><div class="wrap">{sec_head(("Examples", "Ejemplos"), ("Questions", "Preguntas"), ("you can ask today", "que puede hacer hoy"), ("No menus and no reports to learn. Just ask.", "Sin menús y sin reportes que aprender. Solo pregunte."))}{ex}</div></section>'
            + f'<section class="sec alt"><div class="wrap">{sec_head(("Included in every Sami plan", "Incluido en todos los planes de Sami"), ("Everything", "Todo"), ("you need to start", "lo que necesita para empezar"))}{included}</div></section>'
            + f'<section class="sec pricing" id="sami-pricing"><div class="wrap">{sec_head(("Sami pricing", "Precios de Sami"), ("One price", "Un precio"), ("for your whole team", "para todo su equipo"), ("Based on your users, customers and items. Your first month is free.", "Según sus usuarios, clientes y productos. El primer mes es gratis."))}{plans}'
            f'<div class="addon"><img class="sami-ic" src="/assets/sami-logo.webp" width="44" height="44" alt="" aria-hidden="true"><p>{T("Need more?", "¿Necesita más?", "b")} {T("A SAMI Credit ($9.99) adds extra use for your whole team this month. We'll let you know when you reach 80% of your plan.", "Un SAMI Credit ($9.99) agrega uso extra para todo su equipo este mes. Le avisamos cuando llegue al 80% de su plan.")}</p></div>'
            f'</div></section>'
            + f'<section class="sec"><div class="wrap">{sec_head(("Questions", "Preguntas"), ("Sami,", "Sami,"), ("explained simply", "explicado fácil"))}{faq(SAMI_FAQ)}</div></section>'
            + cta_band())

page("sami", ("Sami: AI Assistant for Distributors | Listaso", "Sami: asistente con IA para distribuidores | Listaso"),
     ("Ask about your sales, customers, inventory and orders in plain words and get answers in seconds, plus Excel and PDF reports. From $57.99 a month, first month free.",
      "Pregunte sobre ventas, clientes, inventario y pedidos con sus palabras y reciba respuestas en segundos y reportes en Excel y PDF. Desde $57.99 al mes."),
     sami_body, nav="products", crumbs_ld=[("sami", "Sami AI", "Sami IA")], jsonld=[sami_ld, faq_ld(SAMI_FAQ)])

# ================================================================== FORMS
def forms_body():
    types = [("Single line", "Texto corto"), ("Multi line", "Texto largo"), ("Whole number", "Número entero"), ("Decimal number", "Número decimal"),
             ("Yes / No", "Sí / No"), ("Single choice", "Opción única"), ("Dropdown", "Lista desplegable"), ("Multiple choice", "Opción múltiple"),
             ("Date", "Fecha"), ("Time", "Hora"), ("Photo", "Foto"), ("Signature", "Firma")]
    chips = '<div class="chips" style="margin-top:0">' + "".join(T(a, b, "span", "chip-l") for a, b in types) + "</div>"
    art = f'<div>{SURVEY}</div>'
    return (phero([(None, "Forms &amp; surveys", "Formularios y encuestas")], ("New · Forms &amp; surveys", "Nuevo · Formularios y encuestas"),
                  ("Know what happens", "Sepa qué pasa"), ("at every store visit", "en cada visita"),
                  ("Build your own forms in the Back Office, and your reps fill them in on the tablet during the visit: shelf photos, competitor products, customer feedback and signatures.",
                   "Cree sus propios formularios en el Back Office y sus vendedores los llenan en la tableta durante la visita: fotos del anaquel, productos de la competencia, opiniones del cliente y firmas."),
                  art, ("Included in Enterprise 360", "Incluido en Enterprise 360"))
            + f'''<section class="sec"><div class="wrap split">
<div>{T("How it works", "Cómo funciona", "p", "eyebrow")}<h2 style="margin-top:12px">{T("From the office", "De la oficina", "em")} {T("to the store and back", "a la tienda y de regreso")}</h2>
{T("Your office decides what to ask. Your reps answer at the store. You see the results the same day.", "Su oficina decide qué preguntar. Sus vendedores responden en la tienda. Usted ve los resultados el mismo día.", "p", "lead")}</div>
<ol class="numbered">
<li><div>{T("Build the form", "Cree el formulario", "b")}{T("Pick from 12 question types in the Back Office and save questions to reuse.", "Elija entre 12 tipos de pregunta en el Back Office y guarde preguntas para reutilizarlas.")}</div></li>
<li><div>{T("Assign it", "Asígnelo", "b")}{T("Choose which customers get it, and make it required before a rep can close the visit.", "Elija a qué clientes aplica y hágalo obligatorio antes de que el vendedor cierre la visita.")}</div></li>
<li><div>{T("Fill it at the visit", "Llénelo en la visita", "b")}{T("Reps see it as one page or step by step, with photos and signature.", "El vendedor lo ve en una sola página o paso a paso, con fotos y firma.")}</div></li>
<li><div>{T("See the results", "Vea los resultados", "b")}{T("Every answer appears in Entries, on a map and in charts.", "Cada respuesta aparece en Respuestas, en un mapa y en gráficas.")}</div></li>
</ol></div></section>'''
            + f'<section class="sec alt"><div class="wrap">{sec_head(("Question types", "Tipos de pregunta"), ("12 ways", "12 formas"), ("to ask", "de preguntar"))}{chips}</div></section>'
            + f'<section class="sec"><div class="wrap">{sec_head(("Ideas", "Ideas"), ("What distributors", "Lo que los distribuidores"), ("use forms for", "hacen con formularios"))}'
            + feats([
                ("Shelf checks", "Revisión de anaquel", "Photos of how your products are displayed, and how many competitor products are next to them.", "Fotos de cómo se exhiben sus productos y cuántos productos de la competencia hay al lado."),
                ("Visit feedback", "Opinión de la visita", "How the customer rates the visit, what they want to order and when to follow up.", "Cómo califica el cliente la visita, qué quiere pedir y cuándo darle seguimiento."),
                ("Promotion follow-up", "Seguimiento de promociones", "Check that promotions are in place, with a photo and the customer's signature.", "Confirme que las promociones están colocadas, con foto y firma del cliente."),
            ]) + "</div></section>"
            + related([R["pre"], R["bo"], R["sami"]]) + cta_band())

page("forms", ("Retail Execution: Forms & Surveys for Store Visits | Listaso", "Ejecución en tienda: formularios y encuestas | Listaso"),
     ("Build forms in the Back Office and have reps fill them on the tablet at each visit: shelf photos, competitor products, signatures. See answers on a map and in charts.",
      "Cree formularios en el Back Office y sus vendedores los llenan en cada visita: fotos de anaquel, competencia y firmas. Respuestas en mapa y gráficas."),
     forms_body, nav="products", crumbs_ld=[("forms", "Forms & surveys", "Formularios y encuestas")])

# ================================================================== PLANS
Y, N, O = "y", "n", "o"
COMPARE = [
    ("grp", "Sales app", "App de ventas"),
    ("Mobile orders and credits", "Pedidos y créditos en el celular", Y, Y, Y),
    ("Customer pricing", "Precios por cliente", Y, Y, Y),
    ("Promotions and discounts", "Promociones y descuentos", Y, Y, Y),
    ("Photo catalog", "Catálogo con fotos", Y, Y, Y),
    ("Product purchase history", "Historial de compras", Y, Y, Y),
    ("Open invoices", "Facturas abiertas", Y, Y, Y),
    ("Payment collection", "Cobros", Y, Y, Y),
    ("Timesheet", "Control de horario", Y, Y, Y),
    ("Sales route manager", "Rutas de venta", Y, Y, Y),
    ("Photo capture", "Captura de fotos", Y, Y, Y),
    ("Documents and product PDFs", "Documentos y PDF de productos", Y, Y, Y),
    ("Accounting system integration", "Integración con su sistema contable", Y, Y, Y),
    ("Works without internet", "Funciona sin internet", Y, Y, Y),
    ("Mobile invoices and invoice printing", "Facturas en el celular e impresión", N, Y, Y),
    ("Proof of delivery", "Prueba de entrega", N, Y, Y),
    ("Inventory management", "Manejo de inventario", N, Y, Y),
    ("Route compliance", "Cumplimiento de rutas", N, Y, Y),
    ("Random-weight scanning", "Escaneo de peso variable", N, Y, Y),
    ("Multiple invoice headers", "Varios encabezados de factura", N, Y, Y),
    ("Activity planner and reminders", "Agenda y recordatorios", N, N, Y),
    ("Forms and surveys", "Formularios y encuestas", N, N, Y),
    ("In-store activities", "Actividades en tienda", N, N, Y),
    ("Sales commission dashboard", "Panel de comisiones", N, N, Y),
    ("grp", "Warehouse app", "App de almacén"),
    ("Receive from vendors", "Recepción de proveedores", N, Y, Y),
    ("Order picking", "Preparación de pedidos", N, Y, Y),
    ("Physical count", "Conteo físico", N, Y, Y),
    ("Blind receiving", "Recepción a ciegas", N, Y, Y),
    ("Pick and pack", "Preparar y empacar", N, Y, Y),
    ("Supervisor review (picking and receiving)", "Revisión del supervisor (preparación y recepción)", N, Y, Y),
    ("Truck replenishment picking", "Reabastecimiento de camiones", N, Y, Y),
    ("Random-weight picking", "Preparación de peso variable", N, Y, Y),
    ("Receiving and picking photo logs", "Fotos de recepción y preparación", N, Y, Y),
    ("Multiple warehouses", "Varios almacenes", N, Y, Y),
    ("Backorder and Kardex reports", "Reportes de pendientes y Kardex", N, Y, Y),
    ("Lot numbers and expiration dates", "Lotes y fechas de vencimiento", N, N, Y),
    ("Multi-bin management", "Varias ubicaciones (multi-bin)", N, N, Y),
    ("Load truck", "Carga de camiones", N, N, Y),
    ("grp", "Delivery app", "App de entregas"),
    ("Delivery route compliance", "Cumplimiento de rutas de entrega", N, Y, Y),
    ("Invoice printing", "Impresión de facturas", N, Y, Y),
    ("Payment collection", "Cobros", N, Y, Y),
    ("Proof of delivery", "Prueba de entrega", N, Y, Y),
    ("grp", "B2B online store", "Tienda en línea B2B"),
    ("40 customer logins", "40 accesos de clientes", N, Y, Y),
    ("Unlimited customer logins", "Accesos de clientes ilimitados", N, O, Y),
    ("grp", "Back Office", "Back Office"),
    ("Customers, products, pricing and receivables", "Clientes, productos, precios y cuentas por cobrar", Y, Y, Y),
    ("Sales route planner", "Planificador de rutas de venta", Y, Y, Y),
    ("Sales route optimizer", "Optimizador de rutas de venta", O, O, O),
    ("PDF generator", "Generador de PDF", N, Y, Y),
    ("Custom order and invoice templates", "Plantillas de pedido y factura", N, N, Y),
    ("Delivery route planner", "Planificador de rutas de entrega", N, N, Y),
    ("Delivery route optimizer", "Optimizador de rutas de entrega", N, N, O),
]

def compare_table():
    def cell(v):
        if v == Y:
            return f'<td class="yes">{CK}<span class="sr" data-es="Incluido">Included</span></td>'
        if v == O:
            return f'<td>{T("Optional", "Opcional", "span", "opt")}</td>'
        return f'<td class="no" aria-label="Not included" data-es-label="No incluido">—</td>'
    rows = []
    for r in COMPARE:
        if r[0] == "grp":
            rows.append(f'<tr class="grp"><td colspan="4">{T(r[1], r[2])}</td></tr>')
        else:
            rows.append(f'<tr>{T(r[0], r[1], "td")}{cell(r[2])}{cell(r[3])}{cell(r[4])}</tr>')
    head = (f'<thead><tr>{T("Feature", "Función", "th")}<th>Growth<small>$57.99</small></th>'
            f'<th>Professional<small>$67.99</small></th><th>Enterprise 360<small>$77.99</small></th></tr></thead>')
    return f'<div class="tbl-wrap"><table class="tbl compare">{head}<tbody>{"".join(rows)}</tbody></table></div>'

PLANS_FAQ = [
    ("Is there a contract?", "¿Hay contrato?",
     "No. You pay month to month and can cancel anytime. If you pay for the full year, you get 2 months free.",
     "No. Usted paga mes a mes y puede cancelar cuando quiera. Si paga el año completo, recibe 2 meses gratis."),
    ("What counts as a user?", "¿Qué cuenta como usuario?",
     "Each person on your team who uses Listaso, such as a sales rep, driver or warehouse worker. The minimum is 2 users.",
     "Cada persona de su equipo que usa Listaso, como un vendedor, chofer o almacenista. El mínimo es de 2 usuarios."),
    ("Is there a setup fee?", "¿Hay un costo de instalación?",
     "Yes, a one-time onboarding fee that covers setting up your system and training your team. It depends on your accounting system (QuickBooks, Sage, SAP and others), and we quote it on your demo call before you decide.",
     "Sí, un pago único de implementación que incluye configurar su sistema y capacitar a su equipo. Depende de su sistema contable (QuickBooks, Sage, SAP y otros) y se lo cotizamos en la demo, antes de que decida."),
    ("Can I try it before I pay?", "¿Puedo probarlo antes de pagar?",
     "Book a free demo and we'll show you Listaso with the way you work. Sami includes a free first month.",
     "Agende una demo gratis y le mostramos Listaso con su forma de trabajar. Sami incluye el primer mes gratis."),
    ("Which accounting systems do you work with?", "¿Con qué sistemas contables trabajan?",
     "QuickBooks (Desktop and Online), Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate and AccountMate.",
     "QuickBooks (Desktop y Online), Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate y AccountMate."),
    ("What devices do I need?", "¿Qué equipos necesito?",
     "iPhone 13 or newer, or iPads with iOS 16 or later. Android phones and tablets with Android 8.1 or later and at least 3 GB of RAM.",
     "iPhone 13 o más reciente, o iPads con iOS 16 o posterior. Celulares y tabletas Android con Android 8.1 o posterior y al menos 3 GB de RAM."),
    ("Is support included?", "¿El soporte está incluido?",
     "Yes. Our bilingual team answers Monday to Friday, 8 am to 8 pm Eastern. For emergencies after hours or on weekends, write to sos@listaso.com.",
     "Sí. Nuestro equipo bilingüe atiende de lunes a viernes, de 8 a. m. a 8 p. m. (hora del Este). Para emergencias fuera de horario o en fin de semana, escriba a sos@listaso.com."),
]

def plans_ld(lang):
    es = lang == "es"
    return {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Listaso",
            "applicationCategory": "BusinessApplication", "operatingSystem": "iOS, Android, Web",
            "offers": [{"@type": "Offer", "name": n, "price": p, "priceCurrency": "USD",
                        "description": ("Precio por usuario al mes. Mínimo 2 usuarios." if es else "Price per user per month. Two-user minimum.")}
                       for n, p in (("Growth", "57.99"), ("Professional", "67.99"), ("Enterprise 360", "77.99"))],
            "publisher": {"@id": "https://listaso.com/#org"}}

def plans_body():
    return (phero([(None, "Pricing", "Precios")], ("Pricing", "Precios"), ("Clear prices,", "Precios claros,"), ("no surprises", "sin sorpresas"),
                  ("You pay per user, per month. No contract: cancel anytime. Two-user minimum, and 2 months free when you pay for the year.",
                   "Usted paga por usuario al mes. Sin contrato: cancele cuando quiera. Mínimo 2 usuarios y 2 meses gratis al pagar el año."), ctas=False)
            + f'<section class="sec pricing" style="border-top:0"><div class="wrap">{PRICING}{ADDON}</div></section>'
            + f'<section class="sec" id="compare"><div class="wrap">{sec_head(("Compare plans", "Compare planes"), ("Every feature,", "Cada función,"), ("side by side", "lado a lado"))}{compare_table()}</div></section>'
            + f'<section class="sec alt"><div class="wrap">{sec_head(("Questions", "Preguntas"), ("Pricing", "Precios"), ("questions, answered", "preguntas y respuestas"))}{faq(PLANS_FAQ)}</div></section>'
            + cta_band())

page("plans", ("Pricing & Plans | Listaso", "Precios y planes | Listaso"),
     ("Growth $57.99, Professional $67.99 and Enterprise 360 $77.99 per user a month. No contract, 2-user minimum, 2 months free when paid yearly. Compare every feature.",
      "Growth $57.99, Professional $67.99 y Enterprise 360 $77.99 por usuario al mes. Sin contrato, mínimo 2 usuarios, 2 meses gratis al pagar el año. Compare cada función."),
     plans_body, nav="plans", crumbs_ld=[("plans", "Pricing", "Precios")], jsonld=[plans_ld, faq_ld(PLANS_FAQ)])

# ================================================================== INTEGRATIONS
def integrations_body():
    descr = {
        "/quickbooks/": ("Certified app for QuickBooks Desktop and Online.", "App certificada para QuickBooks Desktop y Online."),
        "/sage/": ("Two-way sync with Sage 100.", "Sincronización en ambos sentidos con Sage 100."),
        "/acumatica/": ("Orders, inventory, lots and serials.", "Pedidos, inventario, lotes y series."),
        "/sap/": ("Real-time sales and inventory with SAP.", "Ventas e inventario en tiempo real con SAP."),
        "/netsuite/": ("Field sales and finance, connected.", "Ventas en campo y finanzas, conectadas."),
        "/zoho/": ("Zoho Books and Zoho Inventory.", "Zoho Books y Zoho Inventory."),
        "/acctivate/": ("Mobile, DSD and field sales into Acctivate.", "Ventas móviles, DSD y de campo en Acctivate."),
        "/accountmate/": ("Your AccountMate data on the road.", "Sus datos de AccountMate en la calle."),
    }
    items = [(h, n, n, descr[h][0], descr[h][1]) for h, n in ERPS]
    return (phero([(None, "Integrations", "Integraciones")], ("Integrations", "Integraciones"), ("Connected", "Conectado"),
                  ("to the accounting system you already use", "al sistema contable que ya usa"),
                  ("Listaso works with your accounting system, not instead of it. Your data moves between the two on its own, so nobody types the same order twice.",
                   "Listaso trabaja con su sistema contable, no en lugar de él. Sus datos pasan de uno a otro solos, para que nadie capture el mismo pedido dos veces."))
            + f'''<section class="sec"><div class="wrap">{sec_head(("How the sync works", "Cómo funciona la sincronización"), ("Two directions,", "Dos direcciones,"), ("zero double entry", "cero doble captura"))}
<div class="grid-2">
<div class="panel">{T("From your accounting system to Listaso", "De su sistema contable a Listaso", "p", "tagline")}{checks([("Customers", "Clientes"), ("Products, prices and units", "Productos, precios y unidades"), ("Stock levels", "Inventario disponible"), ("Lots and barcodes", "Lotes y códigos de barras")])}</div>
<div class="panel">{T("From Listaso to your accounting system", "De Listaso a su sistema contable", "p", "tagline")}{checks([("Sales orders and invoices", "Pedidos y facturas"), ("Credits and payments", "Créditos y pagos"), ("Warehouse transfers", "Transferencias entre almacenes"), ("Inventory adjustments", "Ajustes de inventario")])}</div>
</div>
{T("Exactly what syncs, and in which direction, depends on the system. Each page below shows the details.", "Lo que se sincroniza, y en qué dirección, depende de cada sistema. Cada página muestra el detalle.", "p", "note")}
</div></section>'''
            + f'<section class="sec alt"><div class="wrap">{sec_head(("Supported systems", "Sistemas compatibles"), ("Pick", "Elija"), ("your system", "su sistema"))}{link_cards(items, cols=4)}</div></section>'
            + f'<section class="sec"><div class="wrap">{sec_head(("Also", "También"), ("Hardware", "Equipos"), ("and custom work", "y trabajos a la medida"))}{link_cards([R["print"], ("/custom-development/", "Using another system?", "¿Usa otro sistema?", "Ask us about a custom integration.", "Pregúntenos por una integración a la medida.")], cols=2)}</div></section>'
            + cta_band())

page("integrations", ("Integrations: QuickBooks, Sage, SAP, NetSuite & More | Listaso", "Integraciones: QuickBooks, Sage, SAP, NetSuite y más | Listaso"),
     ("Listaso syncs customers, products, prices, orders, invoices and inventory with QuickBooks, Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate and AccountMate.",
      "Listaso sincroniza clientes, productos, precios, pedidos, facturas e inventario con QuickBooks, Sage 100, Acumatica, SAP, NetSuite, Zoho, Acctivate y AccountMate."),
     integrations_body, nav="integrations", crumbs_ld=[("integrations", "Integrations", "Integraciones")])

def sync_table(name, rows):
    def d(v):
        if v == "in":
            return f'<span class="dir">{name} <i aria-hidden="true">→</i> Listaso</span>'
        if v == "out":
            return f'<span class="dir">Listaso <i aria-hidden="true">→</i> {name}</span>'
        return f'<span class="dir"><i aria-hidden="true">⇄</i> {T("Both ways", "En ambos sentidos")}</span>'
    body = "".join(f'<tr>{T(a, b, "td")}<td>{d(v)}</td></tr>' for a, b, v in rows)
    return (f'<div class="tbl-wrap"><table class="tbl"><thead><tr>{T("What syncs", "Qué se sincroniza", "th")}'
            f'{T("Direction", "Dirección", "th")}</tr></thead><tbody>{body}</tbody></table></div>')

def erp_page(slug, name, title, desc, h_em, h_rest, lead, features, rows, extra="", pill=None):
    def body():
        return (phero([("/integrations/", "Integrations", "Integraciones"), (None, name, name)], (f"{name} integration", f"Integración con {name}"),
                      h_em, h_rest, lead, pill=pill)
                + f'<section class="sec"><div class="wrap">{sec_head(("Features", "Funciones"), ("What you get", "Lo que obtiene"), (f"with Listaso and {name}", f"con Listaso y {name}"))}{feats(features)}</div></section>'
                + f'<section class="sec alt"><div class="wrap">{sec_head(("Sync details", "Detalle de sincronización"), (f"How the {name} sync", f"Cómo funciona"), ("works", f"la sincronización con {name}"))}{sync_table(name, rows)}</div></section>'
                + extra
                + f'<section class="sec"><div class="wrap">{sec_head(("More integrations", "Más integraciones"), ("Other systems", "Otros sistemas"), ("we connect to", "con los que conectamos"))}{erp_strip(exclude="/" + slug + "/")}</div></section>'
                + cta_band())
    page(slug, title, desc, body, nav="integrations", crumbs_ld=[("integrations", "Integrations", "Integraciones"), (slug, name, name)])

QB_EXTRA = f'''<section class="sec"><div class="wrap split">
<div>{T("Certified partner", "Socio certificado", "p", "eyebrow")}<h2 style="margin-top:12px">{T("Find us", "Encuéntrenos", "em")} {T("in the QuickBooks App Store", "en la QuickBooks App Store")}</h2>
{T("Listaso is a certified app for both versions of QuickBooks, rated 5.0 by our customers in the QuickBooks App Store.", "Listaso es una app certificada para ambas versiones de QuickBooks, con calificación de 5.0 de nuestros clientes en la QuickBooks App Store.", "p", "lead")}
<div class="hero-ctas"><a class="btn btn-ghost" style="color:var(--heading)" href="https://desktop.apps.com/apps/140500/sales-app#!overview">QuickBooks Desktop</a><a class="btn btn-ghost" style="color:var(--heading)" href="https://quickbooks.intuit.com/app/apps/appdetails/listaso/">QuickBooks Online</a></div></div>
<figure class="quote-card" style="margin:0"><blockquote data-es="“Listaso ha sido la solución todo en uno que buscábamos. La integración con QuickBooks es perfecta y simplificó todo nuestro trabajo.”">“Listaso has been the all-in-one solution we were looking for. The integration with QuickBooks is seamless and has significantly simplified our entire workflow.”</blockquote>
<cite data-es="AH, Quickchoice · Reseña en QuickBooks App Store (traducida del inglés)">AH, Quickchoice · QuickBooks App Store review</cite></figure>
</div></section>'''

erp_page("quickbooks", "QuickBooks",
    ("QuickBooks Integration for Distributors | Listaso", "Integración con QuickBooks para distribuidores | Listaso"),
    ("Certified QuickBooks Desktop and Online app. Sync customers, items, price levels, inventory, orders, invoices and payments. No double entry for distributors.",
     "App certificada para QuickBooks Desktop y Online. Sincronice clientes, productos, niveles de precio, inventario, pedidos, facturas y pagos, sin doble captura."),
    ("Listaso + QuickBooks:", "Listaso + QuickBooks:"), ("certified for 4+ years", "certificado desde hace más de 4 años"),
    ("Sync your QuickBooks customers and products to Listaso in minutes. Take orders anywhere, drop the paper, and get paid faster, from your sales team to the warehouse.",
     "Sincronice sus clientes y productos de QuickBooks con Listaso en minutos. Tome pedidos donde sea, olvídese del papel y cobre más rápido, desde sus vendedores hasta el almacén."),
    [
        ("Customer information", "Información de clientes", "Search and link your QuickBooks customers from the app.", "Busque y vincule sus clientes de QuickBooks desde la app."),
        ("Items and inventory", "Productos e inventario", "Your full item list, from one warehouse or many.", "Su lista completa de productos, de uno o varios almacenes."),
        ("Product history", "Historial de productos", "Reps see when, how much and at what price they sold each item.", "Sus vendedores ven cuándo, cuánto y a qué precio vendieron cada producto."),
        ("Visits, notes and photos", "Visitas, notas y fotos", "Log visits, add notes, take photos and tag customers.", "Registre visitas, agregue notas, tome fotos y etiquete clientes."),
        ("Mobile printing", "Impresión móvil", "Bluetooth printers give customers a signed copy of their invoice.", "Las impresoras Bluetooth le dan al cliente una copia firmada de su factura."),
        ("Credit memos", "Notas de crédito", "Reps create credit memos that go back to QuickBooks.", "Sus vendedores crean notas de crédito que regresan a QuickBooks."),
        ("GPS tracking", "Seguimiento GPS", "“Ride along” with each rep during work hours, from anywhere.", "“Acompañe” a cada vendedor en horario de trabajo, desde donde esté."),
        ("Lots and barcodes", "Lotes y códigos de barras", "Lot numbers and UPC scanning for precise tracking.", "Números de lote y escaneo de UPC para un control preciso."),
        ("Warehouse tasks", "Tareas de almacén", "Pick orders, receive from vendors and move stock between warehouses and trucks.", "Prepare pedidos, reciba de proveedores y mueva inventario entre almacenes y camiones."),
    ],
    [("Customers", "Clientes", "both"),
     ("Product information (custom fields, tax, UPC)", "Información de productos (campos personalizados, impuestos, UPC)", "both"),
     ("Price levels", "Niveles de precio", "both"),
     ("Inventory (Desktop: multiple warehouses, purchase orders, physical counts, adjustments, DSD transfers · Online: product inventory, purchase orders)",
      "Inventario (Desktop: varios almacenes, órdenes de compra, conteos, ajustes, transferencias DSD · Online: inventario de productos, órdenes de compra)", "both"),
     ("Units of measure", "Unidades de medida", "both"),
     ("Orders, invoices, estimates and credits", "Pedidos, facturas, estimados y créditos", "both"),
     ("Payments", "Pagos", "both"),
     ("Custom developments", "Desarrollos a la medida", "both")],
    extra=QB_EXTRA, pill=("Works with QuickBooks Desktop and QuickBooks Online", "Funciona con QuickBooks Desktop y QuickBooks Online"))

SAGE_EXTRA = f'''<section class="sec"><div class="wrap"><figure class="quote-card" style="margin:0;max-width:860px"><blockquote data-es="“Listaso Technologies ha sido un gran aliado para nuestro negocio. Su app de ventas, su app de entregas y su plataforma Back Office, junto con su integración perfecta con Sage 100, nos han ayudado a agilizar nuestros procesos de ventas, distribución y contabilidad.”">“Listaso Technologies has been a great partner for our business. Their Sales App, Delivery App, and Back Office platform, along with their seamless integration with Sage 100, have helped streamline our sales, distribution, and accounting processes.”</blockquote>
<cite data-es="Mark Somwaru · Reseña en Google (traducida del inglés)">Mark Somwaru · Google review</cite></figure></div></section>'''

erp_page("sage", "Sage 100",
    ("Sage 100 Integration for Distributors | Listaso", "Integración con Sage 100 para distribuidores | Listaso"),
    ("Two-way sync between Listaso and Sage 100: field sales orders, real-time inventory, products and pricing, transfers and adjustments, lots and UPCs.",
     "Sincronización en ambos sentidos entre Listaso y Sage 100: pedidos de campo, inventario en tiempo real, productos y precios, transferencias, ajustes, lotes y UPC."),
    ("Listaso + Sage 100:", "Listaso + Sage 100:"), ("your whole operation in sync", "toda su operación sincronizada"),
    ("Connect your field sales, warehouse and office teams with data that flows between Listaso and Sage 100. More accuracy, no manual entry.",
     "Conecte a sus vendedores, almacén y oficina con datos que pasan solos entre Listaso y Sage 100. Más exactitud y cero captura manual."),
    [
        ("Two-way sync", "Sincronización en ambos sentidos", "Sales, inventory and customer data stay updated in both systems.", "Ventas, inventario y clientes al día en ambos sistemas."),
        ("Orders from the field", "Pedidos desde la calle", "Orders placed in Listaso go straight into Sage. No typing.", "Los pedidos tomados en Listaso llegan directo a Sage. Sin capturar."),
        ("Live inventory", "Inventario en vivo", "Stock changes show up across warehouses and locations.", "Los cambios de inventario se ven en todos los almacenes y ubicaciones."),
        ("Products and pricing", "Productos y precios", "Your team always has the latest products and prices.", "Su equipo siempre tiene los productos y precios más recientes."),
        ("Transfers and adjustments", "Transferencias y ajustes", "Warehouse movements in Listaso are recorded in Sage.", "Los movimientos de almacén en Listaso se registran en Sage."),
        ("GPS tracking", "Seguimiento GPS", "“Ride along” with each rep during work hours, from anywhere.", "“Acompañe” a cada vendedor en horario de trabajo, desde donde esté."),
    ],
    [("Customers", "Clientes", "in"), ("Products and pricing", "Productos y precios", "in"), ("Sales orders", "Pedidos de venta", "out"),
     ("Inventory levels", "Niveles de inventario", "both"), ("Transfers and adjustments", "Transferencias y ajustes", "out"), ("Lots and UPCs", "Lotes y UPC", "in")],
    extra=SAGE_EXTRA)

erp_page("acumatica", "Acumatica",
    ("Acumatica Integration for Distributors | Listaso", "Integración con Acumatica para distribuidores | Listaso"),
    ("Connect Listaso with Acumatica: customers, products and pricing, sales orders, inventory levels, warehouse transfers, adjustments, lots and serials.",
     "Conecte Listaso con Acumatica: clientes, productos y precios, pedidos, inventario, transferencias, ajustes, lotes y series."),
    ("Listaso + Acumatica:", "Listaso + Acumatica:"), ("one connected workflow", "un solo flujo de trabajo"),
    ("Sales, warehouse and operations teams work from the same data, with no manual entry between Listaso and Acumatica.",
     "Ventas, almacén y operaciones trabajan con los mismos datos, sin captura manual entre Listaso y Acumatica."),
    [
        ("Customer sync", "Clientes sincronizados", "Reps see up-to-date customer information from Acumatica.", "Sus vendedores ven la información de clientes al día desde Acumatica."),
        ("Products and pricing", "Productos y precios", "Catalogs and prices come from Acumatica, the same everywhere.", "Catálogos y precios vienen de Acumatica, iguales en todas partes."),
        ("Sales orders", "Pedidos de venta", "Orders created in Listaso arrive in Acumatica automatically.", "Los pedidos creados en Listaso llegan solos a Acumatica."),
        ("Inventory levels", "Niveles de inventario", "Live quantities to avoid stockouts and overselling.", "Cantidades en vivo para evitar faltantes y sobreventa."),
        ("Warehouse transfers and adjustments", "Transferencias y ajustes", "Stock moves and counts update Acumatica right away.", "Los movimientos y conteos actualizan Acumatica al instante."),
        ("Lots and serials", "Lotes y series", "Lot numbers, serials and expiration dates for perishable goods.", "Lotes, series y fechas de vencimiento para productos perecederos."),
    ],
    [("Customers", "Clientes", "in"), ("Products and pricing", "Productos y precios", "in"), ("Sales orders", "Pedidos de venta", "out"),
     ("Inventory levels", "Niveles de inventario", "both"), ("Warehouse transfers", "Transferencias entre almacenes", "out"),
     ("Inventory adjustments", "Ajustes de inventario", "out"), ("Lot and serial numbers", "Lotes y números de serie", "in")])

erp_page("sap", "SAP",
    ("SAP Integration: Sales & Inventory App | Listaso", "Integración con SAP: app de ventas e inventario | Listaso"),
    ("Listaso syncs sales, inventory and operations with SAP in real time: orders, customers and pricing, product catalog, warehouse and bin locations, lots and UPCs.",
     "Listaso sincroniza ventas, inventario y operaciones con SAP en tiempo real: pedidos, clientes y precios, catálogo, almacenes y ubicaciones, lotes y UPC."),
    ("Listaso + SAP:", "Listaso + SAP:"), ("sales and stock in real time", "ventas e inventario en tiempo real"),
    ("Data moves between Listaso and SAP on its own, so your team spends less time typing and makes fewer mistakes.",
     "Los datos pasan solos entre Listaso y SAP, así su equipo captura menos y se equivoca menos."),
    [
        ("Two-way sync", "Sincronización en ambos sentidos", "Changes in one system show up in the other.", "Los cambios en un sistema se ven en el otro."),
        ("Live inventory", "Inventario en vivo", "Stock movements synced across warehouses and channels.", "Movimientos de inventario sincronizados en almacenes y canales."),
        ("Sales orders", "Pedidos de venta", "Orders from the field go straight into SAP.", "Los pedidos de la calle llegan directo a SAP."),
        ("Customers and pricing", "Clientes y precios", "Your team works with current data from SAP.", "Su equipo trabaja con datos actuales de SAP."),
        ("Purchase orders and transfers", "Órdenes de compra y transferencias", "Transfers between warehouses kept up to date in SAP.", "Transferencias entre almacenes al día en SAP."),
        ("Product catalog", "Catálogo de productos", "SKUs, descriptions and prices stay the same everywhere.", "Códigos, descripciones y precios iguales en todas partes."),
        ("Warehouses and bins", "Almacenes y ubicaciones", "Track stock by location with live updates.", "Controle inventario por ubicación con actualizaciones en vivo."),
        ("Your workflows", "Sus procesos", "Set up for DSD, B2B, inventory and warehouse work.", "Configurado para DSD, B2B, inventario y almacén."),
        ("Lots and barcodes", "Lotes y códigos de barras", "Lot numbers and UPC scanning.", "Números de lote y escaneo de UPC."),
    ],
    [("Customers", "Clientes", "in"), ("Products and pricing", "Productos y precios", "in"), ("Sales orders", "Pedidos de venta", "out"),
     ("Inventory levels", "Niveles de inventario", "both"), ("Warehouse transfers", "Transferencias entre almacenes", "in"),
     ("Inventory adjustments", "Ajustes de inventario", "out"), ("Lot and serial tracking", "Lotes y números de serie", "in")])

erp_page("netsuite", "NetSuite",
    ("NetSuite Integration for Field Sales & Inventory | Listaso", "Integración con NetSuite para ventas e inventario | Listaso"),
    ("Unify field sales and finance: Listaso syncs orders, inventory, products, pricing, warehouse transfers, invoices, lots and serials with NetSuite.",
     "Una sus ventas de campo y sus finanzas: Listaso sincroniza pedidos, inventario, productos, precios, transferencias, facturas, lotes y series con NetSuite."),
    ("Listaso + NetSuite:", "Listaso + NetSuite:"), ("field and finance, together", "la calle y las finanzas, juntas"),
    ("Sales, inventory and warehouse data flow between Listaso and NetSuite, so you can decide faster with numbers you trust.",
     "Los datos de ventas, inventario y almacén pasan entre Listaso y NetSuite, para que decida más rápido con números confiables."),
    [
        ("Automatic sync", "Sincronización automática", "Orders, inventory and sales stay the same in both systems.", "Pedidos, inventario y ventas iguales en ambos sistemas."),
        ("Sales orders", "Pedidos de venta", "Orders from Listaso go straight into NetSuite.", "Los pedidos de Listaso llegan directo a NetSuite."),
        ("Inventory", "Inventario", "Adjustments in Listaso update NetSuite across locations.", "Los ajustes en Listaso actualizan NetSuite en todas las ubicaciones."),
        ("Products and pricing", "Productos y precios", "NetSuite products and prices reach your field team.", "Productos y precios de NetSuite llegan a su equipo de campo."),
        ("Warehouse transfers", "Transferencias entre almacenes", "Movements recorded as they happen.", "Movimientos registrados en el momento."),
        ("Invoices and billing", "Facturas y cobros", "Billing from Listaso flows into NetSuite.", "La facturación de Listaso llega a NetSuite."),
    ],
    [("Customers", "Clientes", "in"), ("Product catalog", "Catálogo de productos", "in"), ("Sales orders", "Pedidos de venta", "out"),
     ("Inventory quantities", "Cantidades de inventario", "both"), ("Warehouse transfers", "Transferencias entre almacenes", "out"),
     ("Inventory adjustments", "Ajustes de inventario", "out"), ("Lot, serial and expiration data", "Lotes, series y vencimientos", "in")])

erp_page("zoho", "Zoho",
    ("Zoho Books & Zoho Inventory Integration | Listaso", "Integración con Zoho Books y Zoho Inventory | Listaso"),
    ("Connect field sales to Zoho Books and Zoho Inventory: customers, catalog, price lists, sales orders, invoices, multi-warehouse stock, lots and expiration dates.",
     "Conecte sus ventas de campo con Zoho Books y Zoho Inventory: clientes, catálogo, listas de precios, pedidos, facturas, varios almacenes, lotes y vencimientos."),
    ("Listaso + Zoho:", "Listaso + Zoho:"), ("your field team, connected", "su equipo de campo, conectado"),
    ("Bridge the gap between the street and your Zoho system. Control your sales, inventory and customer data from one connected platform.",
     "Una la calle con su sistema Zoho. Controle sus ventas, inventario y clientes desde una sola plataforma conectada."),
    [
        ("Zoho CRM contacts", "Contactos de Zoho CRM", "Reps see contact and account details and notes.", "Sus vendedores ven contactos, cuentas y notas."),
        ("Zoho Books invoices", "Facturas en Zoho Books", "Invoices created in the field sync to Zoho Books.", "Las facturas creadas en la calle se sincronizan con Zoho Books."),
        ("Stock lookup", "Consulta de inventario", "Live stock from Zoho while selling.", "Inventario en vivo desde Zoho mientras vende."),
        ("Rep routes", "Rutas de vendedores", "Daily routes built from customer locations in Zoho.", "Rutas diarias armadas con las ubicaciones de clientes en Zoho."),
        ("Custom fields", "Campos personalizados", "Zoho tags and payment terms carried into Listaso.", "Etiquetas y términos de pago de Zoho llevados a Listaso."),
        ("Multiple warehouses", "Varios almacenes", "Manage each Zoho Inventory warehouse on its own.", "Maneje cada almacén de Zoho Inventory por separado."),
        ("Sales reporting", "Reportes de ventas", "Order and customer data feeds your Zoho dashboards.", "Los datos de pedidos y clientes alimentan sus paneles de Zoho."),
        ("Lots and barcodes", "Lotes y códigos de barras", "Lot numbers and UPC scanning.", "Números de lote y escaneo de UPC."),
    ],
    [("Customers", "Clientes", "in"), ("Product catalog", "Catálogo de productos", "in"), ("Price lists", "Listas de precios", "in"),
     ("Sales orders", "Pedidos de venta", "out"), ("Inventory quantities", "Cantidades de inventario", "both"),
     ("Warehouse transfers", "Transferencias entre almacenes", "out"), ("Lot and expiration data", "Lotes y vencimientos", "in")],
    pill=("Works with Zoho Books and Zoho Inventory", "Funciona con Zoho Books y Zoho Inventory"))

erp_page("acctivate", "Acctivate",
    ("Acctivate Integration for Mobile & DSD Sales | Listaso", "Integración con Acctivate para ventas móviles y DSD | Listaso"),
    ("Bring mobile, DSD and field sales into Acctivate: offline orders, van stock, invoice status, credit limits, bundles, lots and barcodes.",
     "Lleve sus ventas móviles, DSD y de campo a Acctivate: pedidos sin internet, inventario de camión, estado de facturas, límites de crédito, paquetes, lotes y códigos."),
    ("Listaso + Acctivate:", "Listaso + Acctivate:"), ("mobile work, connected", "el trabajo en la calle, conectado"),
    ("Reps send orders right away and the warehouse updates stock as it moves, all flowing into Acctivate on its own.",
     "Sus vendedores envían pedidos al momento y el almacén actualiza el inventario mientras se mueve, y todo llega solo a Acctivate."),
    [
        ("All sales in one place", "Todas las ventas en un lugar", "Mobile, DSD and field sales go into Acctivate.", "Ventas móviles, DSD y de campo llegan a Acctivate."),
        ("Works without internet", "Funciona sin internet", "Create orders offline. They sync when you reconnect.", "Cree pedidos sin internet. Se sincronizan al reconectar."),
        ("Van stock", "Inventario del camión", "Track truck inventory and reduce shrinkage.", "Controle el inventario del camión y reduzca mermas."),
        ("Invoice status", "Estado de facturas", "Reps see what's paid and what's pending.", "Sus vendedores ven qué está pagado y qué está pendiente."),
        ("Credit limits", "Límites de crédito", "Acctivate credit data stops orders over the limit.", "Los datos de crédito de Acctivate frenan pedidos fuera del límite."),
        ("Bundles", "Paquetes", "Synced bundle deals help reps upsell.", "Paquetes sincronizados ayudan a vender más."),
    ],
    [("Customers", "Clientes", "in"), ("Products and inventory", "Productos e inventario", "in"), ("Sales orders", "Pedidos de venta", "out"),
     ("Order status updates", "Estado de pedidos", "in"), ("Warehouse transfers", "Transferencias entre almacenes", "out"),
     ("Inventory adjustments", "Ajustes de inventario", "out"), ("Barcodes and lots", "Códigos de barras y lotes", "in")])

erp_page("accountmate", "AccountMate",
    ("AccountMate Integration for Distributors | Listaso", "Integración con AccountMate para distribuidores | Listaso"),
    ("Real-time sync between Listaso and AccountMate: mobile sales orders, inventory updates, products and pricing, warehouse transfers, lots and barcode scanning.",
     "Sincronización en tiempo real entre Listaso y AccountMate: pedidos móviles, inventario, productos y precios, transferencias, lotes y escaneo de códigos."),
    ("Listaso + AccountMate:", "Listaso + AccountMate:"), ("your data on the road", "sus datos en la calle"),
    ("Field teams, warehouse staff and the office work on one platform, with no repeated data entry.",
     "Su equipo de calle, el almacén y la oficina trabajan en una sola plataforma, sin capturar datos dos veces."),
    [
        ("Two-way sync", "Sincronización en ambos sentidos", "Orders and inventory sync on their own.", "Pedidos e inventario se sincronizan solos."),
        ("Mobile sales orders", "Pedidos móviles", "Orders from the field reach AccountMate right away.", "Los pedidos de la calle llegan a AccountMate al instante."),
        ("Live inventory", "Inventario en vivo", "Stock changes show up in both systems at once.", "Los cambios de inventario se ven en ambos sistemas al momento."),
        ("Products and pricing", "Productos y precios", "Updated catalogs come from AccountMate.", "Los catálogos actualizados vienen de AccountMate."),
        ("Transfers and adjustments", "Transferencias y ajustes", "Warehouse moves sync immediately.", "Los movimientos de almacén se sincronizan al instante."),
        ("Lots and barcodes", "Lotes y códigos de barras", "Better tracking with fewer errors.", "Mejor control con menos errores."),
    ],
    [("Customers", "Clientes", "in"), ("Products and pricing", "Productos y precios", "in"), ("Sales orders", "Pedidos de venta", "out"),
     ("Inventory adjustments", "Ajustes de inventario", "out"), ("Inventory transfers", "Transferencias de inventario", "out"),
     ("Inventory levels", "Niveles de inventario", "both"), ("UPC and lot tracking", "UPC y lotes", "in")])

# ================================================================== PRINTERS & SCANNERS
def printers_body():
    S, I, D = ("Sales", "Ventas"), ("Inventory", "Inventario"), ("Delivery", "Entregas")
    models = [("Zebra", "Series 300", [S, I, D]), ("Zebra", "400", [I, D]), ("Zebra", "Series 500", [S, I, D]), ("Zebra", "TC22 / TC27", [S, I, D]),
              ("Bixolon", "SPP-R310", [S]), ("Bixolon", "SRP-R410", [S]), ("Woosim", "SPP-R310", [S]), ("Woosim", "WSP-i350", [S, D]), ("Woosim", "WSP-i450", [S, D]),
              ("Star Micronics", "SM-T300", [S]), ("Star Micronics", "SM-T400", [S]), ("Socket Mobile", "S700 (1D)", [S, I]), ("Brother", "QL-1110NWB", [I])]
    rows = "".join(f'<tr><td><b>{b}</b></td><td>{m}</td><td>{", ".join(T(a, e) for a, e in apps)}</td></tr>' for b, m, apps in models)
    table = (f'<div class="tbl-wrap"><table class="tbl"><thead><tr>{T("Brand", "Marca", "th")}{T("Model", "Modelo", "th")}'
             f'{T("Works with", "Funciona con", "th")}</tr></thead><tbody>{rows}</tbody></table></div>')
    return (phero([("/integrations/", "Integrations", "Integraciones"), (None, "Printers &amp; scanners", "Impresoras y escáneres")],
                  ("Hardware", "Equipos"), ("Print and scan", "Imprima y escanee"), ("wherever you are", "donde esté"),
                  ("Print orders and invoices at the store and scan products in the warehouse with equipment that works with Listaso.",
                   "Imprima pedidos y facturas en la tienda y escanee productos en el almacén con equipos que funcionan con Listaso."), ctas=False)
            + f'<section class="sec"><div class="wrap">{sec_head(("Printing options", "Opciones de impresión"), ("Three ways", "Tres formas"), ("to print", "de imprimir"))}'
            + feats([("AirPrint", "AirPrint", "Print from your iPhone or iPad to any AirPrint printer.", "Imprima desde su iPhone o iPad en cualquier impresora AirPrint."),
                     ("Android printing", "Impresión en Android", "Print from any Android device to your full-size printer in seconds.", "Imprima desde cualquier equipo Android en su impresora de oficina en segundos."),
                     ("Bluetooth thermal printers", "Impresoras térmicas Bluetooth", "Print orders and invoices in seconds on the route.", "Imprima pedidos y facturas en segundos en la ruta.")])
            + "</div></section>"
            + f'<section class="sec alt"><div class="wrap">{sec_head(("Compatible models", "Modelos compatibles"), ("Printers and scanners", "Impresoras y escáneres"), ("we support", "compatibles"))}{table}'
            + T("Listaso Inventory also works with Bluetooth scanners on iOS devices.", "Listaso Inventario también funciona con escáneres Bluetooth en equipos iOS.", "p", "note")
            + "</div></section>"
            + f'''<section class="sec"><div class="wrap">{sec_head(("Devices", "Equipos"), ("Phones and tablets", "Celulares y tabletas"), ("that run Listaso", "que corren Listaso"))}<div class="grid-2">
<div class="panel">{T("Apple", "Apple", "p", "tagline")}{checks([("iPhone 13 or newer, iOS 16 or later", "iPhone 13 o más reciente, iOS 16 o posterior"), ("iPad and iPad mini, iPadOS 16 or later", "iPad y iPad mini, iPadOS 16 o posterior")])}</div>
<div class="panel">{T("Android (minimum)", "Android (mínimo)", "p", "tagline")}{checks([("Android 8.1 or later", "Android 8.1 o posterior"), ("Quad-core processor and 3 GB of RAM", "Procesador de 4 núcleos y 3 GB de RAM"), ("720p screen", "Pantalla de 720p"), ("3G connection or better", "Conexión 3G o mejor"), ("3,000 mAh battery", "Batería de 3,000 mAh")])}</div>
</div></div></section>'''
            + cta_band())

page("printers-and-scanners", ("Compatible Printers & Scanners | Listaso", "Impresoras y escáneres compatibles | Listaso"),
     ("Zebra, Bixolon, Woosim, Star Micronics, Socket Mobile and Brother printers and scanners that work with Listaso, plus iOS and Android device requirements.",
      "Impresoras y escáneres Zebra, Bixolon, Woosim, Star Micronics, Socket Mobile y Brother compatibles con Listaso, y requisitos de equipos iOS y Android."),
     printers_body, nav="integrations", crumbs_ld=[("integrations", "Integrations", "Integraciones"), ("printers-and-scanners", "Printers & scanners", "Impresoras y escáneres")])
