"""Home and product pages. Other pages live in pages_more.py / pages_company.py."""
import os
from lsbuild import (T, CK, checks, feats, link_cards, sec_head, phero, cta_band, erp_strip, page, DEMO)

HERE = os.path.dirname(os.path.abspath(__file__))
HOME = open(os.path.join(HERE, "home_body.html"), encoding="utf-8").read()
EXTRAS = open(os.path.join(HERE, "home_extras.html"), encoding="utf-8").read()  # sections moved off the home page

def snippet(start, end, src=HOME):
    a = src.index(start)
    b = src.index(end, a) + len(end)
    return src[a:b]

CHAT = snippet('<div class="chat"', '<div class="chat-input"><span data-es="Escriba su pregunta…">Type your question…</span><b aria-hidden="true">↑</b></div>\n      </div>')
SURVEY = snippet('<div class="survey"', '<div class="survey-nav"><span data-es="‹ Atrás">‹ Back</span><span data-es="Siguiente ›">Next ›</span></div>\n      </div>', EXTRAS)
IND_BLOCK = snippet('<div class="ind">', '</div>\n      </div>\n    </div>\n  </section>', EXTRAS)[:-len('\n    </div>\n  </section>')]
SLA = snippet('<div class="table-scroll">', '</table>\n          </div>')
HOURS = snippet('<div class="hours">', '</div>')
PRICING = snippet('<div class="bill"', '<p class="mt-24"><a class="btn btn-ghost btn-sm"')[:-len('<p class="mt-24"><a class="btn btn-ghost btn-sm"')]
ADDON = snippet('<div class="addon">', '</a>\n      </div>')
QUOTES = snippet('<div class="quotes-wrap"', '</div><!-- /quotes -->')

def home_body():
    return HOME.replace("{{CTA}}", cta_band()).replace("{{ERP}}", erp_strip())

page("", ("Listaso | Sales, Delivery & Inventory App for Distributors",
          "Listaso | App de ventas, entregas e inventario para distribuidores"),
     ("One sales, delivery and inventory platform for distributors and wholesalers, specialists in food and beverage. Syncs with QuickBooks, Sage and more.",
      "Una plataforma de ventas, entregas e inventario para distribuidores y mayoristas, especialistas en alimentos y bebidas. Conecta con QuickBooks, Sage y más."),
     home_body, nav=None)

# ------------------------------------------------------------------ shared bits
def plan_note(en, es):
    return T(en, es)

def related(items):
    return (f'<section class="sec alt"><div class="wrap">{sec_head(("Works together", "Todo conectado"), ("Pairs well", "Combina bien"), ("with", "con"))}'
            f'{link_cards(items)}</div></section>')

R = {
    "pre": ("/pre-sales/", "Pre-sales", "Preventa", "Reps take orders in the field with a photo catalog and each customer's prices.", "Sus vendedores toman pedidos en la calle con catálogo de fotos y los precios de cada cliente."),
    "dsd": ("/direct-sales/", "Direct store delivery", "Venta directa (DSD)", "Sell, invoice and collect right from the truck.", "Venda, facture y cobre directo desde el camión."),
    "inv": ("/inventory/", "Inventory", "Inventario", "Receive, pick, count and move stock with a scanner.", "Reciba, prepare, cuente y mueva inventario con escáner."),
    "del": ("/delivery/", "Delivery", "Entregas", "Routes, proof of delivery and payments for your drivers.", "Rutas, prueba de entrega y cobros para sus choferes."),
    "bo": ("/back-office/", "Back Office", "Back Office", "Customers, prices, orders and reports in one place.", "Clientes, precios, pedidos y reportes en un solo lugar."),
    "ecom": ("/b2b-ecommerce/", "B2B online store", "Tienda en línea B2B", "Your customers order and pay online, 24/7.", "Sus clientes piden y pagan en línea, 24/7."),
    "forms": ("/forms/", "Forms &amp; surveys", "Formularios y encuestas", "Shelf photos, checklists and signatures at every visit.", "Fotos de anaquel, listas y firmas en cada visita."),
    "sami": ("/sami/", "Sami AI", "Sami IA", "Ask your business anything and get answers in seconds.", "Pregúntele lo que quiera a su negocio y reciba respuestas en segundos."),
    "print": ("/printers-and-scanners/", "Printers &amp; scanners", "Impresoras y escáneres", "Bluetooth printers and scanners that work with Listaso.", "Impresoras y escáneres Bluetooth compatibles con Listaso."),
    "custom": ("/custom-development/", "Custom development", "Desarrollo a la medida", "Reports and features built for your operation.", "Reportes y funciones hechos para su operación."),
}

def int_section():
    return (f'<section class="sec"><div class="wrap int"><div class="sec-head" style="margin-bottom:0">'
            f'{T("Integrations", "Integraciones", "p", "eyebrow")}<h2>{T("Connected", "Conectado", "em")} {T("to the accounting system you already use", "al sistema contable que ya usa")}</h2>'
            f'{T("No double entry: orders, invoices and payments flow into your books on their own.", "Sin capturar dos veces: pedidos, facturas y pagos llegan solos a su contabilidad.", "p", "lead")}'
            f'<p class="mt-24"><a class="btn btn-ghost btn-sm" style="color:var(--heading)" href="/integrations/" data-es="Ver cómo funciona">See how it works</a></p>'
            f'</div>{erp_strip()}</div></section>')

def product_page(slug, nav_title, title, desc, hero_args, feat_title, features, middle, rel):
    def body():
        return (phero([(None, nav_title[0], nav_title[1])], *hero_args)
                + f'<section class="sec"><div class="wrap">{sec_head(*feat_title)}{feats(features)}</div></section>'
                + middle + related([R[k] for k in rel]) + int_section() + cta_band())
    page(slug, title, desc, body, nav="products", crumbs_ld=[(slug, nav_title[0].replace("&amp;", "&"), nav_title[1])])

# ------------------------------------------------------------------ PRE-SALES
product_page(
    "pre-sales", ("Pre-sales", "Preventa"),
    ("Mobile Order Taking App for Sales Reps | Listaso", "App de toma de pedidos para vendedores | Listaso"),
    ("Take orders in the field with a photo catalog, each customer's prices, promotions and purchase history. Works offline and syncs with QuickBooks, Sage and more.",
     "Tome pedidos en la calle con catálogo de fotos, precios por cliente, promociones e historial. Funciona sin internet y se conecta con QuickBooks, Sage y más."),
    (("Pre-sales app", "App de preventa"), ("Take orders faster", "Tome pedidos más rápido"), ("with every customer's prices in hand", "con los precios de cada cliente a la mano"),
     ("Your reps visit the store, open the catalog and send the order in minutes. The office and the warehouse get it right away, with no paper and no typing it in again.",
      "Su vendedor visita la tienda, abre el catálogo y envía el pedido en minutos. La oficina y el almacén lo reciben al instante, sin papel y sin volver a capturarlo."),
     "", ("Included in every plan, from Growth at $57.99 per user a month", "Incluido en todos los planes, desde Growth a $57.99 por usuario al mes")),
    (("Features", "Funciones"), ("Everything a rep needs", "Todo lo que su vendedor necesita"), ("on one tablet", "en una tableta")),
    [
        ("Photo catalog", "Catálogo con fotos", "Show up to 20,000 products with sharp photos, so customers see exactly what they order.", "Muestre hasta 20,000 productos con fotos claras para que el cliente vea exactamente lo que pide."),
        ("Each customer's prices", "Precios de cada cliente", "Price per unit, by weight or by tier, set for every customer.", "Precios por unidad, por peso o por niveles, para cada cliente."),
        ("Planned routes", "Rutas planeadas", "Daily visit routes and time tracking, so reps know where to go next.", "Rutas de visita del día y control de tiempo para saber a dónde ir después."),
        ("Visit notes and photos", "Notas y fotos de visitas", "Log every visit with notes and photos to know each customer better.", "Registre cada visita con notas y fotos para conocer mejor a cada cliente."),
        ("Order history", "Historial de pedidos", "See what a customer bought before and repeat the order in seconds.", "Vea lo que el cliente compró antes y repita el pedido en segundos."),
        ("Promotions", "Promociones", "Custom deals, free items, bundles and limited-time offers.", "Descuentos, productos gratis, paquetes y ofertas por tiempo limitado."),
        ("Payment collection", "Cobros", "Collect payments, check open invoices and record partial payments.", "Cobre, revise facturas abiertas y registre pagos parciales."),
        ("Works without internet", "Funciona sin internet", "Keep selling with no signal. Everything syncs when you're back online.", "Siga vendiendo sin señal. Todo se sincroniza al volver a tener conexión."),
        ("Full customer view", "Todo sobre el cliente", "Purchase history, invoices, notes and more on one screen.", "Historial de compras, facturas, notas y más en una sola pantalla."),
    ],
    f'''<section class="sec alt"><div class="wrap split">
<div>{T("A store visit", "Una visita", "p", "eyebrow")}<h2 style="margin-top:12px">{T("Four steps,", "Cuatro pasos,", "em")} {T("no paperwork", "sin papeles")}</h2>
{T("This is what a visit looks like with Listaso.", "Así se ve una visita con Listaso.", "p", "lead")}</div>
<ol class="numbered">
<li><div>{T("Open the customer", "Abra el cliente", "b")}{T("See their balance, last orders and notes before you walk in.", "Vea su saldo, últimos pedidos y notas antes de entrar.")}</div></li>
<li><div>{T("Build the order", "Arme el pedido", "b")}{T("Pick from the catalog. Their prices and promotions apply on their own.", "Elija del catálogo. Sus precios y promociones se aplican solos.")}</div></li>
<li><div>{T("Collect if needed", "Cobre si hace falta", "b")}{T("Record a payment against open invoices, full or partial.", "Registre un pago a facturas abiertas, completo o parcial.")}</div></li>
<li><div>{T("Send it", "Envíelo", "b")}{T("The office and warehouse see it at once, and it flows into your accounting.", "La oficina y el almacén lo ven al instante, y llega a su contabilidad.")}</div></li>
</ol></div></section>''',
    ["dsd", "forms", "sami"])

# ------------------------------------------------------------------ DIRECT SALES
product_page(
    "direct-sales", ("Direct store delivery", "Venta directa (DSD)"),
    ("Direct Store Delivery (DSD) &amp; Van Sales App | Listaso".replace("&amp;", "&"), "App de venta directa (DSD) y venta en ruta | Listaso"),
    ("Route accounting and DSD software: sell, invoice and print from the truck, with live truck inventory, route planning, proof of delivery and payments.",
     "Software de venta en ruta y DSD: venda, facture e imprima desde el camión, con inventario en vivo, rutas, prueba de entrega y cobros."),
    (("Direct store delivery (DSD)", "Venta directa (DSD)"), ("Sell, invoice and collect", "Venda, facture y cobre"), ("right from the truck", "directo desde el camión"),
     ("Your drivers carry the stock, print the invoice at the store and collect on the spot. Every sale updates the truck's inventory and your books.",
      "Sus choferes llevan el producto, imprimen la factura en la tienda y cobran en el momento. Cada venta actualiza el inventario del camión y su contabilidad."),
     "", ("Included from Professional, $67.99 per user a month", "Incluido desde Professional, $67.99 por usuario al mes")),
    (("Features", "Funciones"), ("Your go-to tool", "Su herramienta"), ("for selling on the route", "para vender en ruta")),
    [
        ("Live truck inventory", "Inventario del camión en vivo", "Your team always knows exactly what's on each truck.", "Su equipo siempre sabe exactamente qué lleva cada camión."),
        ("Inventory transfers", "Transferencias de inventario", "The warehouse is ready to load or unload the moment trucks arrive.", "El almacén está listo para cargar o descargar en cuanto llega el camión."),
        ("Route planner", "Planificador de rutas", "Plan better routes and track visit times with ease.", "Planee mejores rutas y controle los tiempos de visita fácilmente."),
        ("Proof of delivery", "Prueba de entrega", "Signatures, notes and photos at every stop.", "Firmas, notas y fotos en cada parada."),
        ("Purchase history", "Historial de compras", "See past purchases in seconds for quick reorders.", "Vea compras anteriores en segundos para repetir pedidos rápido."),
        ("Promotions", "Promociones", "Personal discounts, free items, bundles and limited-time offers.", "Descuentos personalizados, productos gratis, paquetes y ofertas por tiempo limitado."),
        ("Payment collection", "Cobros", "Collect on the spot, manage open invoices and log partial payments.", "Cobre en el momento, maneje facturas abiertas y registre pagos parciales."),
        ("Works without internet", "Funciona sin internet", "Keep selling anywhere. Data syncs the moment you're back online.", "Siga vendiendo donde sea. Los datos se sincronizan al volver la conexión."),
        ("Print and scan", "Imprima y escanee", "Bluetooth printers, scanners or the device camera.", "Impresoras y escáneres Bluetooth, o la cámara del equipo."),
    ],
    f'''<section class="sec alt"><div class="wrap split">
<div>{T("For your drivers", "Para sus choferes", "p", "eyebrow")}<h2 style="margin-top:12px">{T("Less paperwork,", "Menos papeles,", "em")} {T("more stops per day", "más paradas por día")}</h2>
{T("Drivers spend their time selling, not writing invoices or calling the office.", "Sus choferes dedican su tiempo a vender, no a escribir facturas ni a llamar a la oficina.", "p", "lead")}
{checks([("Print the invoice at the store with a Bluetooth printer", "Imprima la factura en la tienda con una impresora Bluetooth"),
         ("Scan products with a scanner or the phone's camera", "Escanee productos con escáner o con la cámara del celular"),
         ("Customer prices, reorders and discounts built in", "Precios de cada cliente, repetición de pedidos y descuentos incluidos"),
         ("Restock the truck from the warehouse with one request", "Pida reabastecer el camión al almacén con una solicitud")])}</div>
<a class="feat" href="/printers-and-scanners/">{T("Compatible hardware", "Equipos compatibles", "p", "tagline")}{T("Printers &amp; scanners", "Impresoras y escáneres", "h3")}
{T("Zebra, Bixolon, Woosim, Star Micronics, Socket Mobile and Brother models that work with Listaso.", "Modelos Zebra, Bixolon, Woosim, Star Micronics, Socket Mobile y Brother que funcionan con Listaso.", "p")}
{T("See the list →", "Ver la lista →", "span", "more")}</a>
</div></section>''',
    ["inv", "del", "pre"])

# ------------------------------------------------------------------ INVENTORY
product_page(
    "inventory", ("Inventory", "Inventario"),
    ("Warehouse & Inventory App for Distributors | Listaso", "App de almacén e inventario para distribuidores | Listaso"),
    ("Receive, pick, count and transfer stock with a scanner. Catch-weight products, multiple warehouses, truck stock, lot and expiration tracking.",
     "Reciba, prepare, cuente y transfiera inventario con escáner. Productos de peso variable, varios almacenes, inventario en camiones, lotes y vencimientos."),
    (("Inventory app", "App de inventario"), ("Know what you have", "Sepa lo que tiene"), ("in every warehouse and every truck", "en cada almacén y en cada camión"),
     ("Your warehouse team receives, picks, counts and moves stock from a phone or scanner. No paper lists and no guessing.",
      "Su equipo de almacén recibe, prepara, cuenta y mueve inventario desde un celular o escáner. Sin listas de papel y sin adivinar."),
     "", ("Included from Professional. Lot tracking, multi-bin and truck loading in Enterprise 360.", "Incluido desde Professional. Lotes, varias ubicaciones y carga de camiones en Enterprise 360.")),
    (("Features", "Funciones"), ("A tidy warehouse", "Un almacén en orden"), ("starts with one app", "empieza con una sola app")),
    [
        ("Receive from vendors", "Recepción de proveedores", "Scan products as they arrive. No typing quantities by hand.", "Escanee los productos al llegar. Sin escribir cantidades a mano."),
        ("Smart order picking", "Preparación de pedidos", "Group or split orders by location to pick faster.", "Agrupe o divida pedidos por ubicación para preparar más rápido."),
        ("Replenishment", "Reabastecimiento", "Organized picking routes and better use of overstock.", "Rutas de preparación ordenadas y mejor manejo del sobrante."),
        ("Traceability", "Trazabilidad", "Know where every product is and how it moved.", "Sepa dónde está cada producto y cómo se movió."),
        ("Cycle counts", "Conteos cíclicos", "Scheduled counts that take less effort and stay accurate.", "Conteos programados que requieren menos esfuerzo y son más exactos."),
        ("Physical inventory", "Inventario físico", "Keep your records right and your differences small.", "Mantenga sus registros correctos y sus diferencias al mínimo."),
        ("Catch-weight products", "Productos de peso variable", "Sell and bill by weight, with flexible sales units.", "Venda y facture por peso, con unidades de venta flexibles."),
        ("Pick and pack", "Preparar y empacar", "Assign products to boxes for faster, accurate orders.", "Asigne productos a cajas para pedidos más rápidos y exactos."),
        ("Custom labels", "Etiquetas", "Print labels in seconds to keep stock organized.", "Imprima etiquetas en segundos para mantener el inventario ordenado."),
    ],
    f'''<section class="sec alt"><div class="wrap split">
<div>{T("Built for food distribution", "Hecho para distribución de alimentos", "p", "eyebrow")}<h2 style="margin-top:12px">{T("Fresh product,", "Producto fresco,", "em")} {T("under control", "bajo control")}</h2>
{T("When products expire, you need to know which lot is where and ship the oldest first.", "Cuando el producto vence, necesita saber qué lote está dónde y despachar primero lo más antiguo.", "p", "lead")}
{checks([("Lot numbers and expiration dates", "Números de lote y fechas de vencimiento"),
         ("Multi-bin storage with stock rotation (FIFO)", "Varias ubicaciones con rotación de inventario (PEPS)"),
         ("Load trucks and connect with the delivery app", "Cargue camiones y conecte con la app de entregas"),
         ("Blind receiving and supervisor review", "Recepción a ciegas y revisión del supervisor"),
         ("Photo logs when receiving and picking", "Fotos al recibir y al preparar"),
         ("Backorder and Kardex reports", "Reportes de pendientes y Kardex")])}</div>
<div class="panel">{T("Which plan?", "¿Qué plan?", "p", "tagline")}
<dl class="kv" style="margin-top:14px">
<dt>Professional</dt><dd>{T("Receiving, picking, counts, pick &amp; pack, catch weight, multiple warehouses, photo logs, Kardex", "Recepción, preparación, conteos, empaque, peso variable, varios almacenes, fotos, Kardex")}</dd>
<dt>Enterprise 360</dt><dd>{T("Everything in Professional, plus lots and expiration dates, multi-bin and truck loading", "Todo lo de Professional, más lotes y vencimientos, varias ubicaciones y carga de camiones")}</dd>
</dl><a class="btn btn-ghost btn-sm" style="color:var(--heading)" href="/plans/" data-es="Comparar planes">Compare plans</a></div>
</div></section>''',
    ["del", "dsd", "bo"])

# ------------------------------------------------------------------ DELIVERY
product_page(
    "delivery", ("Delivery", "Entregas"),
    ("Delivery App with Routes & Proof of Delivery | Listaso", "App de entregas con rutas y prueba de entrega | Listaso"),
    ("Plan delivery routes, adjust invoices at the door, capture signatures and photos, record payments and manage returns from your drivers' phones.",
     "Planee rutas de entrega, ajuste facturas en la puerta, capture firmas y fotos, registre pagos y maneje devoluciones desde el celular de sus choferes."),
    (("Delivery app", "App de entregas"), ("Deliver on time", "Entregue a tiempo"), ("and prove every delivery", "y compruebe cada entrega"),
     ("Drivers follow the day's route, change quantities or add credits at the door, get the customer's signature and record the payment. The office sees it as it happens.",
      "Sus choferes siguen la ruta del día, cambian cantidades o agregan créditos en la puerta, obtienen la firma del cliente y registran el pago. La oficina lo ve en el momento."),
     "", ("Included from Professional. Delivery route planner in Enterprise 360.", "Incluido desde Professional. Planificador de rutas de entrega en Enterprise 360.")),
    (("Features", "Funciones"), ("Every stop,", "Cada parada,"), ("handled from the phone", "resuelta desde el celular")),
    [
        ("Delivery routes", "Rutas de entrega", "Build routes that save time and fuel.", "Arme rutas que ahorran tiempo y combustible."),
        ("Invoices at the door", "Facturas en la puerta", "Change quantities, add credits and fix invoices on the spot. No paper.", "Cambie cantidades, agregue créditos y corrija facturas en el momento. Sin papel."),
        ("Delivery timing", "Tiempos de entrega", "See where drivers are, when they arrive and how long each stop takes.", "Vea dónde están sus choferes, cuándo llegan y cuánto dura cada parada."),
        ("Payments", "Pagos", "Record payments and match them to the right invoices.", "Registre pagos y aplíquelos a las facturas correctas."),
        ("Proof of delivery", "Prueba de entrega", "Signatures, photos and notes at every stop to avoid disputes.", "Firmas, fotos y notas en cada parada para evitar reclamos."),
        ("Returns", "Devoluciones", "Track returned items and adjust inventory to cut losses.", "Registre productos devueltos y ajuste el inventario para reducir pérdidas."),
    ],
    f'''<section class="sec alt"><div class="wrap split">
<div>{T("Why it matters", "Por qué importa", "p", "eyebrow")}<h2 style="margin-top:12px">{T("Fewer disputes,", "Menos reclamos,", "em")} {T("less waste, lower costs", "menos desperdicio y menos costos")}</h2>
{T("A missed or argued delivery costs you the sale and the customer's trust. Listaso keeps a record of every stop.", "Una entrega fallida o en disputa le cuesta la venta y la confianza del cliente. Listaso guarda un registro de cada parada.", "p", "lead")}</div>
{checks([("Signed proof of delivery for every invoice", "Prueba de entrega firmada para cada factura"),
         ("Returns logged and stock adjusted the same day", "Devoluciones registradas e inventario ajustado el mismo día"),
         ("Shorter routes and on-time arrivals", "Rutas más cortas y llegadas a tiempo"),
         ("Payments recorded at the door, not days later", "Pagos registrados en la puerta, no días después")])}
</div></section>''',
    ["inv", "dsd", "bo"])

# ------------------------------------------------------------------ BACK OFFICE
product_page(
    "back-office", ("Back Office", "Back Office"),
    ("Back Office for Sales, Inventory & Routes | Listaso", "Back Office para ventas, inventario y rutas | Listaso"),
    ("One web system to manage customers, products, prices, orders, routes, inventory and receivables, with dashboards and reports for better decisions.",
     "Un sistema web para manejar clientes, productos, precios, pedidos, rutas, inventario y cuentas por cobrar, con paneles y reportes para decidir mejor."),
    (("Back Office", "Back Office"), ("One office system", "Un solo sistema"), ("for all your sales and inventory", "para todas sus ventas e inventario"),
     ("Manage orders from the moment your reps send them until the invoices are loaded for delivery. Set up users, permissions and settings in one place.",
      "Maneje los pedidos desde que su vendedor los envía hasta que las facturas se cargan para la entrega. Configure usuarios, permisos y ajustes en un solo lugar."),
     "", ("Included in every plan", "Incluido en todos los planes")),
    (("Features", "Funciones"), ("See everything", "Véalo todo"), ("from your desk", "desde su escritorio")),
    [
        ("Sales dashboard", "Panel de ventas", "Sales totals by day, week and month at a glance.", "Ventas por día, semana y mes de un vistazo."),
        ("Order control", "Control de pedidos", "Follow every order from the rep to the delivery truck.", "Siga cada pedido desde el vendedor hasta el camión de entrega."),
        ("Inventory control", "Control de inventario", "One warehouse or many, always up to date.", "Uno o varios almacenes, siempre al día."),
        ("Customers, products and prices", "Clientes, productos y precios", "Plus receivables, all in one place.", "Además de cuentas por cobrar, todo en un solo lugar."),
        ("Sales route planner", "Planificador de rutas de venta", "Plan your reps' routes. Route optimizer available as an option.", "Planee las rutas de sus vendedores. Optimizador de rutas opcional."),
        ("Users and permissions", "Usuarios y permisos", "Decide who sees and changes what.", "Decida quién ve y quién cambia qué."),
        ("PDF orders and invoices", "Pedidos y facturas en PDF", "Create and share documents in seconds (from Professional).", "Cree y comparta documentos en segundos (desde Professional)."),
        ("Custom templates", "Plantillas personalizadas", "Your own order and invoice layouts (Enterprise 360).", "Sus propios formatos de pedido y factura (Enterprise 360)."),
        ("Forms builder", "Creador de formularios", "Design the forms your reps fill at each visit (Enterprise 360).", "Diseñe los formularios que sus vendedores llenan en cada visita (Enterprise 360)."),
    ],
    f'''<section class="sec alt"><div class="wrap split">
<div>{T("Better decisions", "Mejores decisiones", "p", "eyebrow")}<h2 style="margin-top:12px">{T("Your numbers,", "Sus números,", "em")} {T("when you need them", "cuando los necesita")}</h2>
{T("Reports in the Back Office show what's selling, who's buying and what's owed. Add Sami to ask in plain words and get an Excel file back.", "Los reportes del Back Office muestran qué se vende, quién compra y cuánto le deben. Agregue a Sami para preguntar con sus palabras y recibir un archivo de Excel.", "p", "lead")}
<p class="mt-24"><a class="btn btn-ghost btn-sm" style="color:var(--heading)" href="/sami/" data-es="Conocer a Sami">Meet Sami</a></p></div>
{checks([("Sales by day, week and month", "Ventas por día, semana y mes"),
         ("Orders waiting to be picked, loaded or delivered", "Pedidos por preparar, cargar o entregar"),
         ("Stock by warehouse and by truck", "Inventario por almacén y por camión"),
         ("Open invoices and customer balances", "Facturas abiertas y saldos de clientes")])}
</div></section>''',
    ["forms", "sami", "custom"])

# ------------------------------------------------------------------ B2B ECOMMERCE
product_page(
    "b2b-ecommerce", ("B2B online store", "Tienda en línea B2B"),
    ("B2B Online Store for Distributors | Listaso", "Tienda en línea B2B para distribuidores | Listaso"),
    ("Let your customers order 24/7 from the web or their phone, with their own catalog, prices and promotions. Easy reorders and invoice payments by card.",
     "Sus clientes piden 24/7 desde la web o el celular, con su propio catálogo, precios y promociones. Repetición de pedidos fácil y pago de facturas con tarjeta."),
    (("B2B online store", "Tienda en línea B2B"), ("Take orders", "Reciba pedidos"), ("even while you sleep", "incluso mientras duerme"),
     ("Your customers see their own catalog and prices, repeat past orders and pay their invoices online, from a computer or their phone.",
      "Sus clientes ven su propio catálogo y precios, repiten pedidos anteriores y pagan sus facturas en línea, desde la computadora o el celular."),
     "", ("Professional includes 40 customer logins. Enterprise 360: unlimited.", "Professional incluye 40 accesos de clientes. Enterprise 360: ilimitados.")),
    (("Features", "Funciones"), ("An online store", "Una tienda en línea"), ("your customers will actually use", "que sus clientes sí van a usar")),
    [
        ("Easy ordering", "Pedidos fáciles", "As simple as shopping online, on any device.", "Tan fácil como comprar en línea, en cualquier equipo."),
        ("Made for each customer", "Hecha para cada cliente", "Their own catalog, prices and discounts.", "Su propio catálogo, precios y descuentos."),
        ("Live insights", "Datos en tiempo real", "See what's selling online and adjust your strategy.", "Vea qué se vende en línea y ajuste su estrategia."),
        ("Your brand", "Su marca", "Use your colors and logo.", "Use sus colores y su logo."),
        ("Fast search", "Búsqueda rápida", "Search and filters to find products quickly.", "Búsqueda y filtros para encontrar productos rápido."),
        ("Quick reorders", "Repetir pedidos", "Customers repeat past orders in a couple of taps.", "Sus clientes repiten pedidos anteriores en un par de toques."),
        ("Targeted promotions", "Promociones dirigidas", "Discounts, bundles and special offers.", "Descuentos, paquetes y ofertas especiales."),
        ("Invoice payments", "Pago de facturas", "Customers review their bills and pay one or many by card, in full or in part.", "Sus clientes revisan sus facturas y pagan una o varias con tarjeta, total o parcial."),
        ("Web and mobile", "Web y celular", "Online store plus iOS and Android apps that also work offline.", "Tienda web más apps para iOS y Android que también funcionan sin internet."),
    ],
    "",
    ["pre", "bo", "dsd"])

# ------------------------------------------------------------------ CUSTOM DEVELOPMENT
product_page(
    "custom-development", ("Custom development", "Desarrollo a la medida"),
    ("Custom Development & Reports for Distributors | Listaso", "Desarrollo y reportes a la medida para distribuidores | Listaso"),
    ("Need something special? We analyze, design, build and integrate custom features and reports for your operation, and keep supporting them over time.",
     "¿Necesita algo especial? Analizamos, diseñamos, desarrollamos e integramos funciones y reportes a la medida de su operación, y les damos soporte en el tiempo."),
    (("Custom development", "Desarrollo a la medida"), ("Made for the way", "Hecho a la medida"), ("your business works", "de cómo trabaja su negocio"),
     ("From understanding your needs to designing, building and connecting a solution, we stay with you every step of the way and keep it working as you grow.",
      "Desde entender lo que necesita hasta diseñar, desarrollar y conectar la solución, lo acompañamos en cada paso y la mantenemos funcionando mientras crece."),
     "", None),
    (("What we build", "Lo que hacemos"), ("Features and reports", "Funciones y reportes"), ("that fit your operation", "que se ajustan a su operación")),
    [
        ("Custom reports", "Reportes a la medida", "We pull data from sales, warehouse and delivery to build the report you need.", "Tomamos datos de ventas, almacén y entregas para armar el reporte que necesita."),
        ("Custom integrations", "Integraciones a la medida", "Connect Listaso to the systems you already use.", "Conecte Listaso con los sistemas que ya usa."),
        ("New features", "Funciones nuevas", "Workflows built for the way your team really works.", "Procesos hechos para la forma en que su equipo trabaja de verdad."),
    ],
    f'''<section class="sec alt"><div class="wrap split">
<div>{T("How it works", "Cómo funciona", "p", "eyebrow")}<h2 style="margin-top:12px">{T("From idea", "De la idea", "em")} {T("to working tool", "a la herramienta funcionando")}</h2>
{T("Tell us what you need on a call. We'll give you a plan and a quote before any work starts.", "Cuéntenos lo que necesita en una llamada. Le damos un plan y una cotización antes de empezar.", "p", "lead")}</div>
<ol class="numbered">
<li><div>{T("We listen", "Escuchamos", "b")}{T("We study how your team works and what's missing.", "Estudiamos cómo trabaja su equipo y qué le falta.")}</div></li>
<li><div>{T("We design", "Diseñamos", "b")}{T("You see and approve the solution before we build it.", "Usted ve y aprueba la solución antes de construirla.")}</div></li>
<li><div>{T("We build and connect", "Desarrollamos y conectamos", "b")}{T("We develop it and integrate it with Listaso and your systems.", "La desarrollamos y la integramos con Listaso y sus sistemas.")}</div></li>
<li><div>{T("We support it", "Le damos soporte", "b")}{T("We keep it running and adapt it as your business changes.", "La mantenemos funcionando y la adaptamos cuando su negocio cambia.")}</div></li>
</ol></div></section>''',
    ["bo", "sami", "forms"])

def industries_body():
    return (phero([(None, "Industries", "Industrias")], ("Industries", "Industrias"), ("Specialists", "Especialistas"),
                  ("in food &amp; beverage. Ready for any distributor.", "en alimentos y bebidas. Listos para cualquier distribuidor."),
                  ("If you sell to stores, restaurants or other businesses, Listaso is for you. We grew up in food distribution, and today we also work with distributors in many other industries.",
                   "Si le vende a tiendas, restaurantes u otros negocios, Listaso es para usted. Nacimos en la distribución de alimentos, y hoy también trabajamos con distribuidores de muchas otras industrias."))
            + f'<section class="sec"><div class="wrap">{IND_BLOCK}</div></section>'
            + related([R["pre"], R["dsd"], R["inv"]]) + cta_band())

page("industries", ("Industries: Food & Beverage, Health & Beauty and More | Listaso", "Industrias: alimentos y bebidas, salud y belleza y más | Listaso"),
     ("Listaso specializes in food and beverage distribution and also serves distributors of health and beauty, housewares, paper and packaging, wine and spirits and more.",
      "Listaso se especializa en distribución de alimentos y bebidas, y también atiende a distribuidores de salud y belleza, hogar, papel y empaque, vinos y licores y más."),
     industries_body, nav="company", crumbs_ld=[("industries", "Industries", "Industrias")])

import pages_more  # noqa: E402,F401
import pages_company  # noqa: E402,F401
import pages_legal  # noqa: E402,F401
