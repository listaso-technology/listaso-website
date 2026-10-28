# Decisiones empresariales sobre privacidad y documentos legales de Listaso

**Borrador para:** Dirección, Legal, Producto, Development y Marketing

**Fecha:** 27 de octubre de 2026

**Responsable de la decisión:** Dirección y Legal, con validación técnica de Development
**Alcance:** sitio público, captación comercial, aplicaciones y servicio SaaS. No autoriza publicación ni cambios de producción.

## Resumen ejecutivo

Los tres textos públicos compartidos por Erick —Privacy Policy, Terms and Conditions y Subscription Agreement— están fechados el 1 de septiembre de 2022. Las copias halladas en una página anterior conservan esencialmente el mismo contenido; los cambios observados son de presentación y extracción. La política describe sobre todo funciones típicas de WordPress, deja sin desarrollo las secciones «Contact forms» y «Analytics» y no explica los flujos actuales de captación ni los datos que pueden pasar por el servicio Listaso. **OBSERVACIÓN:** esto crea una brecha entre lo que una persona puede leer y lo que el ecosistema parece requerir; no determina por sí solo incumplimiento legal.

La decisión empresarial recomendada es aprobar una **revisión coordinada de datos, proveedores y contratos**, antes de reemplazar textos o habilitar el nuevo sitio como destino público. El trabajo debe producir un inventario verificable, documentos aprobados por Legal y una comprobación de los enlaces, formularios y preferencias de cookies en la experiencia real.

## Contexto que debe gobernar la decisión

| Ámbito | Estado respaldado | Implicación para la documentación |
| --- | --- | --- |
| Sitio actual y migración | WordPress conserva el blog y las rutas legales públicas; el nuevo sitio usa export estático y sigue en `noindex`. El footer nuevo enlaza las tres rutas legales, que aún no están implementadas en esa aplicación. | Preservar exactamente las URLs y asegurar un destino legal funcional durante el cambio de plataforma. [Mapa de rutas](SITE_ROUTE_MAP.md), [worklog](WORKLOG.md) y [navegación](../src/content/site/navigation.ts). |
| Captación | Los CTA de demo usan Calendly. Contacto y prueba de SAMI dependen de formularios de Zoho; el formulario de SAMI se muestra en un iframe y Zoho gestiona el envío. | Explicar qué datos se solicitan, quién los recibe y para qué, y presentar avisos y enlaces legales correctos donde la persona entrega sus datos. [Decisiones](DECISIONS.md), [worklog](WORKLOG.md). |
| Medición | La continuidad de GA4, GTM y Clarity está prevista; IDs, eventos y configuración vigente aún requieren verificación. | Publicar únicamente prácticas de medición confirmadas y decidir cómo recoger y respetar preferencias cuando corresponda. [Reglas maestras](PROJECT_MASTER.md), [worklog](WORKLOG.md). |
| Servicio e integraciones | El producto anuncia ocho integraciones contables. El contenido de sincronización y algunas capacidades concretas siguen pendientes de validación de Development y Producto. | Separar los datos de visitantes y prospectos de los datos operativos que el cliente conecta al SaaS. No afirmar destinos, categorías ni garantías sin inventario técnico. [Contrato de integraciones](INTEGRATIONS_CONTENT_CONTRACT.md). |
| SAMI y aplicaciones móviles | El acuerdo de 2022 menciona telemetría móvil y librerías de terceros. El sitio presenta SAMI y planes, pero la arquitectura de procesamiento de conversaciones y proveedores de modelos no está confirmada en estas fuentes. | Abrir una revisión específica de prompts, archivos, historial, acceso, retención, proveedores y controles del cliente antes de hacer promesas sobre IA. [Decisiones SAMI](DECISIONS.md). |

**Distinción importante:** los enlaces del footer que abren ChatGPT, Gemini, Perplexity o Claude son destinos externos para el visitante; no prueban qué proveedores procesan las conversaciones de SAMI. El uso de cada integración contable tampoco debe darse por activado para todos los clientes.

## Problemas críticos para resolver antes del lanzamiento

| Prioridad | Problema | Consecuencia empresarial | Decisión o evidencia necesaria |
| --- | --- | --- | --- |
| P0 | Las rutas legales del nuevo sitio están enlazadas, pero aún no tienen página propia en la aplicación; el worklog registra 404 en ese entorno. | Un prospecto puede no acceder a los documentos desde el footer o el formulario durante una migración mal coordinada. | Definir la continuidad de las tres URLs y verificar respuestas y enlaces en el entorno de publicación antes del cutover. |
| P0 | La política de 2022 no describe los flujos actuales de formularios, medición y servicio; «Contact forms» y «Analytics» carecen de contenido útil. | El texto puede crear expectativas incompletas o incorrectas. | Inventario de datos y proveedores firmado por los responsables de cada sistema; redacción posterior por Legal. |
| P0 | El acuerdo de suscripción promete protección y acceso limitado a datos del cliente, mientras los Términos contienen una exención amplia sobre pérdida de datos del usuario. El alcance y la precedencia de los documentos no están claros. | Incertidumbre contractual en ventas, soporte y respuesta a incidentes. | Legal define qué gobierna el sitio, el servicio, el tratamiento de datos y el orden de precedencia. |
| P1 | El formulario SAMI depende de Zoho, tiene configuración y recorrido de envío aún pendientes de revisión, y se documentó una discrepancia histórica entre 14 y 15 días. DEC-025 establece 14 días. | Riesgo de mensajes o consentimientos inconsistentes en un punto de conversión. | Producto y Marketing confirman la oferta; Development y el administrador de Zoho validan campos, aviso, destinatarios, automatizaciones y prueba de ambas rutas. |
| P1 | No existe todavía una matriz confirmada de etiquetas, cookies y preferencias para WordPress y el nuevo sitio. | La publicación de GA4, GTM o Clarity podría diferir de lo informado o de la elección del visitante. | Marketing, Development y Legal acuerdan la configuración aplicable por mercado; comprobar el comportamiento antes y después de cada elección. |
| P1 | El acuerdo conserva referencias a «Sqrely», Windows 8 y pérdida permanente de datos de prueba, entre otras afirmaciones antiguas. | Términos comerciales o técnicos potencialmente desalineados con la oferta actual. | Producto, Operaciones y Legal validan cada compromiso frente al contrato y proceso vigentes. |

## Decisiones solicitadas a stakeholders

1. **Patrocinio y responsables.** Designar una persona de Legal como aprobadora de textos, una de Development para los flujos técnicos, una de Producto para la operación del SaaS y una de Marketing para captación y medición. Dirección resuelve prioridades y alcance de mercados.
2. **Alcance documental.** Aprobar un centro legal que distinga, según confirme Legal, privacidad del sitio, privacidad del servicio, cookies, términos de uso del sitio, suscripción y un acuerdo de tratamiento de datos para clientes empresariales. Definir si se necesita una lista pública de subprocesadores y anexos para IA o integraciones.
3. **Mapa de datos y proveedores.** Exigir una fila por recorrido o función: categorías de datos, finalidad, origen, destino, proveedor, rol contractual, ubicación, retención, acceso interno, eliminación y mecanismo de solicitud. Incluir WordPress, Cloudflare, Zoho, Calendly, GA4/GTM/Clarity, aplicaciones móviles, SAMI e integraciones activas. Registrar «desconocido» donde no haya evidencia.
4. **Experiencia de consentimiento y aceptación.** Decidir, según mercados atendidos y asesoría legal, qué opciones de cookies se requieren y cómo se registran. Separar la aceptación de condiciones de una prueba del consentimiento para comunicaciones comerciales cuando cumplan funciones distintas. Revisar texto y enlaces dentro del iframe de Zoho.
5. **Compromisos operativos.** Confirmar plazos y procedimientos reales de retención, exportación, eliminación, respaldo, incidentes, soporte, terminación y trial. Sólo después aprobar el lenguaje contractual.
6. **Idiomas y publicación.** Aprobar primero el texto fuente vigente y su control de versiones. Publicar versiones en español únicamente cuando Legal valide su equivalencia y el producto tenga la paridad definida para `/es/`.

## Referencia del sector y criterio de adopción

[Repsly](https://www.repsly.com/legal) separa políticas del sitio y del servicio y ofrece una política de cookies, DPA y lista de subprocesadores. Su [política del servicio](https://www.repsly.com/legal/service-privacy-policy) identifica categorías como geolocalización, fotos y registros de actividad, además de explicar cómo canaliza solicitudes relacionadas con datos del cliente. [Pepperi](https://www.pepperi.com/legal/) publica política, acuerdo de tratamiento y lista de subprocesadores. Estas son referencias de **estructura y transparencia**, no textos para copiar ni prueba de que las mismas obligaciones apliquen a Listaso.

La [FTC recomienda inventariar datos, limitar su conservación y examinar la seguridad de proveedores](https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business). Para las herramientas previstas en el sitio, [Google documenta la diferencia entre cargar etiquetas después de una elección y permitir señales limitadas antes de ella](https://support.google.com/analytics/answer/10000067?hl=en), mientras [Microsoft documenta las cookies y señales de consentimiento de Clarity](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies). Las obligaciones concretas y la configuración adecuada dependen de los mercados y del uso efectivo; Legal debe resolverlas con los equipos técnicos.

## Secuencia propuesta y criterio de cierre

**Antes del cutover:** mantener accesibles las rutas legales, verificar el formulario de Zoho y su aviso, cerrar el inventario de datos y confirmar etiquetas y proveedores. **Después del inventario:** Legal redacta y aprueba los documentos y la arquitectura de enlaces; Producto valida compromisos comerciales y de SAMI. **Antes de publicar:** comprobar en navegador enlaces, campos, comunicaciones, preferencias de cookies, versiones y rutas en inglés y, cuando corresponda, español.

La decisión queda lista cuando existe evidencia de: (a) inventario aprobado, (b) textos legales aprobados y versionados, (c) responsables asignados para cambios de proveedores o funciones, y (d) recorrido real comprobado para demo, contacto, trial y preferencias de medición. Ninguna recomendación de este borrador modifica contratos ni autoriza producción.

## Fuentes internas y límites

- Textos de Privacy Policy, Terms and Conditions y Subscription Agreement de 2022 compartidos por Erick en esta conversación, incluidas copias de una página anterior. La comparación encontró cambios principalmente de formato; no se acreditó una actualización legal posterior.
- [PROJECT_MASTER.md](PROJECT_MASTER.md), [DECISIONS.md](DECISIONS.md), [SITE_ROUTE_MAP.md](SITE_ROUTE_MAP.md), [INTEGRATIONS_CONTENT_CONTRACT.md](INTEGRATIONS_CONTENT_CONTRACT.md) y [WORKLOG.md](WORKLOG.md). El worklog contiene registros históricos de estados ya sustituidos; se usaron decisiones explícitas y el estado más reciente cuando diferían.
- Esta revisión es documental. El contenido de Zoho, las etiquetas activas en producción, los contratos vigentes y la arquitectura interna del SaaS no fueron auditados en cuentas administrativas ni en una sesión productiva.
