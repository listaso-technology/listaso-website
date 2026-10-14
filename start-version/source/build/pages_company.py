"""Support, Contact, About, Careers, Impact, 404."""
from lsbuild import (T, CK, checks, feats, link_cards, sec_head, phero, cta_band, page, DEMO, PHONE)
from pages import SLA, HOURS, QUOTES

FORM = "https://zfrmz.com/h6RkbByHQKx7RtjV0sUn"

def tel_opt(n):
    """Main number with a menu option, e.g. option 2 for sales."""
    return (f'<a href="tel:+13059127770,{n}">+1 305-912-7770</a>, '
            + T(f"option {n}", f"opción {n}"))

# ================================================================== SUPPORT
def support_body():
    return (phero([(None, "Support", "Soporte")], ("Support", "Soporte"), ("Real people.", "Personas reales."),
                  ("In your language. With fast answers.", "En su idioma. Con respuestas rápidas."),
                  ("Many of our customers came to Listaso because their last provider wouldn't answer the phone. Our bilingual team responds within times we publish right here.",
                   "Muchos de nuestros clientes llegaron a Listaso porque su proveedor anterior no les contestaba. Nuestro equipo bilingüe le responde con tiempos que publicamos aquí."), ctas=False)
            + f'''<section class="sec"><div class="wrap sup-grid">
<div>{sec_head(("Response times", "Tiempos de respuesta"), ("How fast", "Qué tan rápido"), ("we answer", "le respondemos"))}{SLA}{HOURS}</div>
<div><div class="panel">{T("How to reach us", "Cómo contactarnos", "p", "tagline")}
<dl class="kv" style="margin-top:14px"><dt data-es="Teléfono">Phone</dt><dd>{tel_opt(1)}</dd>
<dt data-es="Correo de soporte">Support email</dt><dd class="sel">cs@listaso.com</dd>
<dt data-es="Urgencias fuera de horario y fines de semana">Urgent, after hours and weekends</dt><dd class="sel">sos@listaso.com</dd></dl></div>
<div class="score-row"><div class="score"><b>4.7</b> <span class="stars" aria-hidden="true">★★★★★</span>{T("Google · 42 reviews", "Google · 42 reseñas")}</div>
<div class="score"><b>5.0</b> <span class="stars" aria-hidden="true">★★★★★</span>{T("QuickBooks App Store", "QuickBooks App Store")}</div></div></div>
</div></section>'''
            + f'''<section class="sec alt"><div class="wrap split">
<div>{T("When something is urgent", "Cuando algo es urgente", "p", "eyebrow")}<h2 style="margin-top:12px">{T("If you can't sell,", "Si no puede vender,", "em")} {T("we drop everything", "dejamos todo lo demás")}</h2>
{T("Here's what happens when you report that you can't take orders, deliver or collect.", "Esto es lo que pasa cuando nos avisa que no puede tomar pedidos, entregar o cobrar.", "p", "lead")}</div>
<ol class="numbered">
<li><div>{T("We answer within 15 minutes", "Le respondemos en 15 minutos", "b")}{T("A real person, in English or Spanish.", "Una persona real, en español o en inglés.")}</div></li>
<li><div>{T("Our developers join right away", "Nuestros desarrolladores se suman al momento", "b")}{T("Urgent issues go straight to the team that can fix them.", "Los casos urgentes van directo al equipo que puede resolverlos.")}</div></li>
<li><div>{T("We keep you updated", "Lo mantenemos informado", "b")}{T("You get an update every 15 minutes until it's fixed.", "Recibe una actualización cada 15 minutos hasta que se resuelva.")}</div></li>
<li><div>{T("We explain what happened", "Le explicamos qué pasó", "b")}{T("After the fix, we tell you the cause and what we did about it.", "Después de resolverlo, le decimos la causa y lo que hicimos.")}</div></li>
</ol></div></section>'''
            + f'<section class="sec"><div class="wrap">{sec_head(("What customers say", "Lo que dicen los clientes"), ("Support", "Un soporte"), ("people talk about", "del que la gente habla"))}{QUOTES}</div></section>'
            + cta_band())

page("support", ("Customer Support in English & Spanish | Listaso", "Soporte al cliente en español e inglés | Listaso"),
     ("Real people on a bilingual team. Urgent issues answered in 15 minutes. Monday to Friday 8 am to 8 pm Eastern, weekend emergencies. Rated 4.7 on Google.",
      "Personas reales en un equipo bilingüe. Casos urgentes respondidos en 15 minutos. Lunes a viernes de 8 a. m. a 8 p. m. (hora del Este), emergencias el fin de semana."),
     support_body, nav="support", crumbs_ld=[("support", "Support", "Soporte")])

# ================================================================== CONTACT
def contact_body():
    def person(role_en, role_es, title_en, title_es, lines):
        return (f'<div class="panel person">{T(role_en, role_es, "span", "role")}{T(title_en, title_es, "b")}'
                + "".join(f"<span>{x}</span>" for x in lines) + "</div>")
    return (phero([(None, "Contact us", "Contáctenos")], ("Contact", "Contacto"), ("Talk to us,", "Hable con nosotros,"), ("in English or Spanish", "en español o en inglés"),
                  ("Book a demo, ask a question or get help with your account. We're in Miami and El Salvador.",
                   "Agende una demo, haga una pregunta o pida ayuda con su cuenta. Estamos en Miami y en El Salvador."), ctas=False)
            + f'''<section class="sec"><div class="wrap">
<div class="grid-3">
{person("Sales and demos", "Ventas y demos", "Talk to sales", "Hable con ventas", ["sales@listaso.com", tel_opt(2)])}
{person("Customer service and support", "Servicio al cliente y soporte", "Get help", "Pida ayuda", ["cs@listaso.com", tel_opt(1), T("Urgent, after hours:", "Urgencias fuera de horario:") + " sos@listaso.com"])}
{person("General information", "Información general", "Listaso", "Listaso", ["info@listaso.com", PHONE])}
</div>
<div class="hero-ctas mt-40"><a class="btn btn-primary" href="{DEMO}" data-es="Agendar una demo gratis">Book a free demo</a>
<a class="btn btn-ghost" style="color:var(--heading)" href="{FORM}" data-es="Enviarnos un mensaje">Send us a message</a></div>
</div></section>
<section class="sec alt"><div class="wrap">{sec_head(("Offices", "Oficinas"), ("Where", "Dónde"), ("to find us", "encontrarnos"))}
<div class="grid-2">
<div class="panel"><p class="tagline">Miami, Florida</p><p class="mt-24" style="font-weight:600">5966 S Dixie Hwy, Ste 300<br>South Miami, FL 33143</p></div>
<div class="panel"><p class="tagline">El Salvador</p><p class="mt-24" style="font-weight:600">Boulevard Orden de Malta, Plaza Madre Tierra<br>Edificio 11, Local 10-A, 1er nivel<br>Santa Elena, Antiguo Cuscatlán, La Libertad</p></div>
</div></div></section>'''
            + cta_band())

page("contact-us", ("Contact Listaso | Sales & Support in Miami and El Salvador", "Contacte a Listaso | Ventas y soporte en Miami y El Salvador"),
     ("Call +1 305-912-7770 or email sales@listaso.com to book a demo. Customer support at cs@listaso.com. Offices in South Miami, FL and Antiguo Cuscatlán, El Salvador.",
      "Llame al +1 305-912-7770 o escriba a sales@listaso.com para agendar una demo. Soporte en cs@listaso.com. Oficinas en South Miami, FL y Antiguo Cuscatlán, El Salvador."),
     contact_body, nav="company", crumbs_ld=[("contact-us", "Contact us", "Contáctenos")])

# ================================================================== ABOUT
def about_body():
    stats = [("Since 2015", "Desde 2015", "Founded in October 2015", "Fundada en octubre de 2015"),
             ("400+", "400+", "Distributors in the US, Puerto Rico and Canada", "Distribuidores en EE. UU., Puerto Rico y Canadá"),
             ("2M+", "2 millones+", "Orders a year through Listaso", "Pedidos al año con Listaso"),
             ("$1.8B+", "$1.8B+", "In customer sales processed in 2025", "En ventas de nuestros clientes en 2025")]
    st = '<div class="proof" style="border:1px solid var(--line);border-radius:var(--r)"><ul style="grid-template-columns:repeat(4,1fr);padding-inline:24px">' + "".join(
        f'<li>{T(a, b, "b")}{T(c, d)}</li>' for a, b, c, d in stats) + "</ul></div>"
    return (phero([(None, "About Listaso", "Sobre Listaso")], ("About us", "Nosotros"), ("Technology", "Tecnología"), ("for the people who keep stores stocked", "para quienes mantienen las tiendas surtidas"),
                  ("Listaso builds the sales, delivery and inventory tools that distributors, wholesalers and manufacturers use every day, with deep roots in food and beverage and a bilingual team in Miami and El Salvador.",
                   "Listaso crea las herramientas de ventas, entregas e inventario que distribuidores, mayoristas y fabricantes usan todos los días, con amplia experiencia en alimentos y bebidas y un equipo bilingüe en Miami y El Salvador."), ctas=False)
            + f'''<section class="sec"><div class="wrap split">
<div class="prose">{T("Our story", "Nuestra historia", "p", "eyebrow")}
<h2>{T("Since 2015,", "Desde 2015,", "em")} {T("growing with our customers", "creciendo con nuestros clientes")}</h2>
{T("Listaso was founded in October 2015, but our work with distributors started earlier. Some of our customers have been with our team since before Listaso existed.", "Listaso se fundó en octubre de 2015, pero nuestro trabajo con distribuidores empezó antes. Algunos de nuestros clientes están con nuestro equipo desde antes de que existiera Listaso.", "p")}
{T("Today more than 400 distributors use Listaso to take orders, run their warehouses, deliver and get paid. Nearly one in three has been with us for more than five years.", "Hoy más de 400 distribuidores usan Listaso para tomar pedidos, manejar su almacén, entregar y cobrar. Casi uno de cada tres lleva más de cinco años con nosotros.", "p")}
{T("Most of our customers are Hispanic businesses, and our team speaks their language, in English and in Spanish.", "La mayoría de nuestros clientes son negocios hispanos, y nuestro equipo habla su idioma, en español y en inglés.", "p")}
</div>
<div>{st}</div></div></section>
<section class="sec alt"><div class="wrap grid-2">
<div class="panel">{T("Mission", "Misión", "p", "tagline")}{T("To connect every order, delivery and payment in one simple platform, so distributors, wholesalers and manufacturers can sell more, waste less and grow on their own terms.", "Conectar cada pedido, entrega y cobro en una sola plataforma sencilla, para que distribuidores, mayoristas y fabricantes vendan más, desperdicien menos y crezcan a su manera.", "p", "", 'style="margin-top:12px;font-size:18px;color:var(--heading);font-weight:500"')}</div>
<div class="panel">{T("Vision", "Visión", "p", "tagline")}{T("To be the platform distributors across the Americas trust to run their business, from the first order to the last payment, with AI that makes every decision easier.", "Ser la plataforma en la que confían los distribuidores de las Américas para manejar su negocio, del primer pedido al último cobro, con inteligencia artificial que hace más fácil cada decisión.", "p", "", 'style="margin-top:12px;font-size:18px;color:var(--heading);font-weight:500"')}</div>
</div></section>
<section class="sec"><div class="wrap">{sec_head(("Our values", "Nuestros valores"), ("What stays the same", "Lo que no cambia"), ("as we grow", "mientras crecemos"))}'''
            + feats([("Customers first", "Primero el cliente", "Every decision starts with what helps our customers sell and deliver.", "Cada decisión empieza por lo que ayuda a nuestros clientes a vender y entregar."),
                     ("Excellence", "Excelencia", "We keep improving our skills so our customers get the best results.", "Seguimos mejorando para que nuestros clientes obtengan los mejores resultados."),
                     ("New challenges", "Nuevos retos", "We welcome hard problems and keep building new tools, like Sami and Forms.", "Recibimos con gusto los problemas difíciles y seguimos creando herramientas nuevas, como Sami y los Formularios.")])
            + "</div></section>"
            + f'<section class="sec alt"><div class="wrap">{link_cards([("/listaso-impact/", "Listaso Impact", "Listaso Impact", "How our team gives back in our communities.", "Cómo nuestro equipo ayuda a nuestras comunidades."), ("/join-us/", "Careers", "Trabaje con nosotros", "Culture, growth and benefits at Listaso.", "Cultura, crecimiento y beneficios en Listaso."), ("/contact-us/", "Contact us", "Contáctenos", "Offices, phones and emails.", "Oficinas, teléfonos y correos.")])}</div></section>'
            + cta_band())

page("about", ("About Listaso | Since 2015", "Sobre Listaso | Desde 2015"),
     ("Sales, delivery and inventory software for distributors, specialists in food and beverage. Since 2015, 400+ customers, bilingual team in Miami and El Salvador.",
      "Software de ventas, entregas e inventario para distribuidores, especialistas en alimentos y bebidas. Desde 2015, 400+ clientes, equipo bilingüe en Miami y El Salvador."),
     about_body, nav="company", crumbs_ld=[("about", "About Listaso", "Sobre Listaso")])

# ================================================================== CAREERS
def careers_body():
    benefits = [("Anniversary bonus", "Bono de aniversario"), ("Health insurance", "Seguro médico"), ("Dental insurance", "Seguro dental"), ("Life insurance", "Seguro de vida"),
                ("Graduation bonus", "Bono de graduación"), ("Monthly food basket", "Canasta básica mensual"), ("Free snacks and drinks", "Snacks y bebidas gratis"), ("Breakfast station", "Estación de desayuno")]
    ben = '<div class="grid-4">' + "".join(f'<div class="feat">{CK.replace("<svg", "<svg style=\"width:22px;height:22px;color:var(--aqua-text)\"")}{T(a, b, "h3")}</div>' for a, b in benefits) + "</div>"
    return (phero([("/about/", "About Listaso", "Sobre Listaso"), (None, "Careers", "Trabaje con nosotros")], ("Careers", "Trabaje con nosotros"), ("Be part", "Sea parte"), ("of something big", "de algo grande"),
                  ("We're looking for people who want to push technology forward and help distributors grow.",
                   "Buscamos personas que quieran llevar la tecnología más lejos y ayudar a los distribuidores a crecer."), ctas=False)
            + f'''<section class="sec"><div class="wrap grid-2">
<div class="prose">{T("Our culture", "Nuestra cultura", "p", "eyebrow")}<h2>{T("Forward-thinking", "Con visión", "em")} {T("and collaborative", "y en equipo")}</h2>
{T("We rely on forward-thinking processes and a collaborative team culture to build solutions that help our partners reach their goals. As we grow, the principles we hold dear stay the same: customers first, excellence, and welcoming new challenges.", "Trabajamos con procesos innovadores y una cultura de colaboración para crear soluciones que ayudan a nuestros clientes a lograr sus metas. Mientras crecemos, nuestros principios no cambian: primero el cliente, la excelencia y recibir nuevos retos con gusto.", "p")}</div>
<div class="prose">{T("Professional growth", "Crecimiento profesional", "p", "eyebrow")}<h2>{T("Keep learning,", "Siga aprendiendo,", "em")} {T("as a person and as a team", "como persona y como equipo")}</h2>
{T("We invest in our skills so our customers get the best results and a smooth experience in their sales and inventory operations.", "Invertimos en nuestras habilidades para que nuestros clientes obtengan los mejores resultados y una experiencia sin complicaciones en sus ventas e inventario.", "p")}</div>
</div></section>
<section class="sec alt"><div class="wrap">{sec_head(("Benefits", "Beneficios"), ("We take care", "Cuidamos"), ("of our team", "a nuestro equipo"), ("Balancing work and life makes a better workplace for everyone.", "El equilibrio entre trabajo y vida hace un mejor lugar de trabajo para todos."))}{ben}</div></section>
<section class="sec"><div class="wrap center"><h2 style="font-size:clamp(28px,3.4vw,40px);color:var(--heading)">{T("Open positions", "Vacantes abiertas", "em")}</h2>
{T("We post our openings on LinkedIn. Follow us there to see new roles first.", "Publicamos nuestras vacantes en LinkedIn. Síganos para ver primero los nuevos puestos.", "p", "lead", 'style="margin:16px auto 0"')}
<p class="mt-24"><a class="btn btn-primary" href="https://www.linkedin.com/company/listaso/jobs/" data-es="Ver vacantes en LinkedIn">See openings on LinkedIn</a></p></div></section>''')

page("join-us", ("Careers at Listaso", "Trabaje en Listaso"),
     ("Work at Listaso: a collaborative culture, professional growth and benefits like health, dental and life insurance, bonuses and a monthly food basket.",
      "Trabaje en Listaso: cultura de colaboración, crecimiento profesional y beneficios como seguro médico, dental y de vida, bonos y canasta básica mensual."),
     careers_body, nav="company", crumbs_ld=[("about", "About Listaso", "Sobre Listaso"), ("join-us", "Careers", "Trabaje con nosotros")])

# ================================================================== IMPACT
def impact_body():
    areas = [("Employability", "Empleabilidad"), ("Education support", "Apoyo a la educación"), ("Social work", "Labor social"), ("Green action", "Acción verde"), ("Entrepreneurship", "Emprendimiento")]
    ar = '<div class="chips" style="margin-top:0">' + "".join(T(a, b, "span", "chip-l") for a, b in areas) + "</div>"
    posts = [
        ("Earth Day", "Día de la Tierra", "We hit the streets with boxes full of trees and plants so more people could join the green movement.", "Salimos a las calles con cajas llenas de árboles y plantas para que más personas se unieran al movimiento verde.", "https://www.linkedin.com/posts/listaso_listasogreen-earthday-plantthefuture-activity-7320557756451631104-ihLw/"),
        ("Senior Citizens Month", "Mes del Adulto Mayor", "Our team visited the San Vicente de Paul Home in El Salvador.", "Nuestro equipo visitó el Hogar San Vicente de Paúl en El Salvador.", "https://www.linkedin.com/feed/update/urn:li:activity:7379928571089432577/"),
        ("Riomar community visit", "Visita a la comunidad Riomar", "We brought soccer balls, shirts and piñatas to share with families in La Libertad, El Salvador.", "Llevamos balones, camisetas y piñatas para compartir con las familias de La Libertad, El Salvador.", "https://www.linkedin.com/posts/listaso_solidarity-communitysupport-specialmoments-activity-7311810378433216512-Xjjf/"),
        ("Sports Day in Zacatecoluca", "Día deportivo en Zacatecoluca", "We were proud to be part of a sports day with Asociación Pro Hogar Zacatecoluca.", "Nos dio orgullo ser parte de un día deportivo con la Asociación Pro Hogar Zacatecoluca.", "https://www.linkedin.com/posts/listaso_listasoteam-listasoimpact-sports-activity-7279852718217691136-HXmv/"),
        ("World Environment Day", "Día Mundial del Medio Ambiente", "Our team cleaned up the beach at La Bocana de San Diego in El Salvador.", "Nuestro equipo limpió la playa de La Bocana de San Diego en El Salvador.", "https://www.linkedin.com/posts/listaso_worldenvironmentday-listasoimpact-protectourplanet-activity-7336436710051880961-QVD0/"),
    ]
    ps = '<div class="grid-3">' + "".join(f'<a class="feat" href="{u}">{T(a, b, "h3")}{T(c, d, "p")}{T("See the post on LinkedIn →", "Ver la publicación en LinkedIn →", "span", "more")}</a>' for a, b, c, d, u in posts) + "</div>"
    partners = ["USAID", "FUSALMO", "UCA", "Albergue Misericordia", "UDB", "Manos Amigas"]
    pt = '<div class="logos" style="grid-template-columns:repeat(3,1fr)">' + "".join(f"<div>{x}</div>" for x in partners) + "</div>"
    return (phero([("/about/", "About Listaso", "Sobre Listaso"), (None, "Listaso Impact", "Listaso Impact")], ("Listaso Impact", "Listaso Impact"), ("Every action", "Cada acción"), ("can shape our community", "puede transformar nuestra comunidad"),
                  ("We believe every action, big or small, can change society, so we're committed to giving back. Our values keep us moving, and our team and partners make it possible. Together, we're creating #ListasoImpact.",
                   "Creemos que cada acción, grande o pequeña, puede transformar la sociedad, por eso nos comprometemos a devolver a nuestra comunidad. Nuestros valores nos mueven y nuestro equipo y aliados lo hacen posible. Juntos creamos #ListasoImpact."), ctas=False)
            + f'<section class="sec"><div class="wrap">{sec_head(("Impact areas", "Áreas de impacto"), ("The pillars", "Los pilares"), ("that guide us", "que nos guían"))}{ar}</div></section>'
            + f'<section class="sec alt"><div class="wrap">{sec_head(("In the community", "En la comunidad"), ("Technology", "Tecnología"), ("that makes a difference", "que hace la diferencia"))}{ps}</div></section>'
            + f'<section class="sec"><div class="wrap">{sec_head(("Partners for change", "Aliados por el cambio"), ("Working together", "Trabajando juntos"), ("with", "con"))}{pt}</div></section>')

page("listaso-impact", ("Listaso Impact | Giving Back to Our Community", "Listaso Impact | Ayudando a nuestra comunidad"),
     ("Employability, education, social work, green action and entrepreneurship: how the Listaso team gives back in El Salvador and beyond. #ListasoImpact",
      "Empleabilidad, educación, labor social, acción verde y emprendimiento: cómo el equipo de Listaso ayuda en El Salvador y más allá. #ListasoImpact"),
     impact_body, nav="company", crumbs_ld=[("about", "About Listaso", "Sobre Listaso"), ("listaso-impact", "Listaso Impact", "Listaso Impact")])

# ================================================================== 404
def nf_body():
    return (f'''<section class="band"><div class="wrap center" style="padding-block:96px">
<p class="big-404">404</p>
<h1 style="font-size:clamp(28px,4vw,44px);margin-top:12px">{T("We couldn't find that page", "No encontramos esa página")}</h1>
{T("It may have moved when we updated our website. These links can help:", "Puede que se haya movido al actualizar nuestro sitio. Estos enlaces le pueden ayudar:", "p", "lead", 'style="margin:16px auto 0"')}
<div class="hero-ctas" style="justify-content:center"><a class="btn btn-primary" href="/" data-es="Ir al inicio">Go to the home page</a><a class="btn btn-ghost" href="/plans/" data-es="Ver precios">See pricing</a><a class="btn btn-ghost" href="/contact-us/" data-es="Contáctenos">Contact us</a></div>
</div></section>''')

page("404", ("Page not found | Listaso", "Página no encontrada | Listaso"),
     ("This page doesn't exist.", "Esta página no existe."), nf_body, noindex=True, file="404.html")
