# Plan de implementación — medios premium fuera de heroes

Fecha: 11 de noviembre de 2026. Solicitante: Erick. Ejecutor previsto: **Terra, razonamiento high**. Estado: plan preparado; implementación pendiente. Este documento no cambia el modelo de la sesión ni inicia otro agente.

## Objetivo y límites

Reemplazar recursos editoriales internos por fotografías y videos coherentes con el copy vigente, usando Envato y Magnific. Conservar textos, estructura, orden, marcos, superposiciones, rutas, SEO y eventos. Excluir cada hero completo, también sus fotografías, videos, UI y portadas. Motion graphics propios y demos de producto requieren una fase posterior.

El objetivo 50/50 se mide por **espacio editorial lógico**, no por bytes, archivos exportados, duración, ni variantes responsive. Inventario de partida: **42 espacios, 21 imágenes y 21 videos**. Incluye una fotografía de anaquel dentro del ejemplo de formulario que aparece en una sección interna; no cuenta el mockup completo como imagen. Las dos representaciones desktop/móvil de una industria cuentan como un espacio; el poster de un video tampoco suma una imagen.

Los 42 espacios son 41 medios editoriales principales más esa foto interna de formulario. Si una comprobación de renderizado revela otra cantidad, documentar la diferencia antes de declarar el 50/50: no añadir o quitar bloques para cuadrar cifras. El reparto es global; no forzar mitades dentro de páginas con un único espacio.

## Evidencia y problemas que deben corregirse

- El catálogo local `src/content/media/magnific.ts` contiene 21 JPEG de 740×416, con `usage: static-poster`. Los consumidores renderizan imágenes; no hay clips integrados. No afirmar que un video funciona porque carga su portada.
- La asignación anterior tiene desajustes: cajas preparándose detrás de “Build the order”; trabajo de almacén detrás de “Photo catalog”; retrato de almacén detrás de comprobaciones de anaquel; descarga de cebollas en un bloque de evidencia de entrega; cuatro escenas de almacén para diseño/desarrollo. Revisar estas asignaciones, no conservarlas automáticamente.
- `FeatureIndex` omite el medio cuando hay cuatro funcionalidades o menos. En Delivery su prop `photo` no se renderiza: **no contar ese recurso como espacio visible ni como video implementado**.
- `BentoFeatures` usa fotos sólo en ciertos índices. Pre-sales, Inventory y Back Office tienen nueve funcionalidades y muestran dos medios, en índices 0 y 6. Relacionar cada recurso con ese título específico.
- Acumatica comparte `photo` entre hero y bento; necesita una asignación de sección separada. SAP y QuickBooks usan fotos en sus funcionalidades: sí entran en alcance. Las fotografías de Sage, NetSuite, Zoho, Acctivate y AccountMate están en sus heroes y quedan excluidas.
- `SurveyScreen` se usa en hero de Forms y en el recorrido interno. Para cambiar su foto interna, pasar una prop sólo desde `FormsHowItWorks`, conservando el valor actual del hero.
- Pre-sales reutiliza la fotografía del hero en el primer paso de visita. Sustituir sólo la asignación del paso. No editar el recurso o manifiesto que consume el hero.
- Los cambios anteriores y los legales siguen sin guardar en un commit. Preservar sus diferencias. La tarea previa de convertir los 21 posters en videos queda reemplazada por este reparto selectivo.

## Dirección visual común

Luz natural o industrial neutra, blancos cálidos, navy, gris y kraft como base. Aqua como acento existente de la interfaz; no teñir personas o alimentos de azul. Magenta se conserva en los CTA existentes. Elegir recursos con exposición, balance de blancos, contraste y saturación compatibles; mantener colores reconocibles de productos y ciudades.

Priorizar distribuidores, mayoristas, comercios y equipos de operación reales. Dispositivo y acción deben leerse en el recorte del marco existente. Rechazar fotos posadas, oficinas futuristas, vehículos de lujo, retail de consumo sin relación con ventas B2B, marcas visibles y pantallas de software ajeno legibles. No representar una operación de stock como equipo o cliente real de Listaso.

No repetir archivo, escena, actor/encuadre casi idéntico ni un mismo recurso con otro crop entre páginas. Registrar ID del proveedor y familia de sesión para detectar duplicados también entre bibliotecas. Reutilizar el mismo recurso para variantes responsive del mismo espacio sí es correcto. La fotografía de ejemplo y el poster pertenecen a su propia asignación, sin usarlos como fondo adicional en otras secciones.

## Matriz por espacio, en orden de implementación

I = fotografía real. V = clip de stock reproducible. Cada fila exige un recurso distinto. Las descripciones son briefs de búsqueda, no copy público nuevo.

| ID | Página / espacio existente | Tipo | Escena y relación con el mensaje |
| --- | --- | --- | --- |
| H01 | Home / workflow: ventas | I | Representante y cliente consultan catálogo en tablet dentro de comercio; interacción comercial, no caja registradora. |
| H02 | Home / workflow: almacén | V | Picking con escaneo: mano, caja y lector visibles; acción completa corta. |
| H03 | Home / workflow: entrega | V | Receptor confirma entrega en dispositivo en comercio o zona de recepción. |
| H04 | Home / workflow: oficina | I | Coordinador revisa pedidos/documentos junto a laptop, en entorno operativo. |
| H05 | Home / capacidad: e-commerce | V | Comprador profesional revisa productos y hace pedido digital; pantalla genérica desenfocada. |
| H06 | Home / capacidad: Forms | V | Representante fotografía o registra exhibición de anaquel con teléfono/tablet. |
| H07 | Home / capacidad: Integrations | I | Revisión administrativa de facturas/datos y laptop; sin atribuir una pantalla stock a una integración concreta. |
| H08 | Home / capacidad: Industries | I | Productos de distribución en cajas o preparación; escena distinta a la página Industries. |
| P01 | Pre-sales / bento: Photo catalog | I | Catálogo digital y productos reales ante cliente; quitar operaria reordenando cajas. |
| P02 | Pre-sales / bento: Payment collection | I | Confirmación de pago en dispositivo; no presentar una firma de entrega como cobro. |
| P03 | Pre-sales / visita: Open the customer | I | Representante consulta tablet al iniciar visita en comercio; distinta al hero. |
| P04 | Pre-sales / visita: Build the order | V | Representante selecciona productos con comprador; quitar preparación física de cajas. |
| P05 | Pre-sales / visita: Collect if needed | V | Registro de cobro o revisión de factura con cliente en dispositivo; no clipboard como sustituto de pago digital. |
| P06 | Pre-sales / visita: Send it | V | Administrativo recibe/revisa pedido en laptop; contexto claro de continuidad con oficina. |
| D01 | Direct Sales / For your drivers | V | Conductor entrega mercancía a comercio desde vehículo y consulta dispositivo; acción en lugar de retrato. |
| IN01 | Inventory / bento: Receive from vendors | V | Recepción de mercancía con escaneo; sin escena de inspección de seguridad como sustituto. |
| IN02 | Inventory / bento: Catch-weight Products | V | Pesaje de producto alimentario junto a dispositivo; quitar tablet de fábrica genérica. |
| IN03 | Inventory / Fresh products y planes | I | Área de alimentos almacenados con lotes/fechas o cajas organizadas; apoyar FIFO y perecederos. |
| DL01 | Delivery / Why it matters | V | Conductor y receptor registran evidencia/firma en dispositivo junto a mercancía; quitar descarga de cebollas. |
| BO01 | Back Office / bento: Sales dashboard | I | Administrativo analiza ventas en estación de trabajo; evitar bodega como única señal visual. |
| BO02 | Back Office / bento: PDF orders and invoices | V | Revisión de documento de pedido/factura en laptop; sin datos personales o UI ajena legibles. |
| B01 | B2B e-Commerce / StoreFeatures | V | Comprador profesional utiliza laptop/tablet con productos al lado; no confundir vendedor preparando envíos con comprador. |
| F01 | Forms / recorrido: Build the form | I | Personal de oficina prepara checklist/formulario en laptop; no interacción de bodega genérica. |
| F02 | Forms / recorrido: Assign it | I | Responsable revisa lista de visitas/clientes en dispositivo; clipboard sólo si acompaña la acción digital. |
| F03 | Forms / Ideas: Shelf checks | V | Captura de foto de anaquel; rostro secundario, exhibición y dispositivo protagonistas. |
| F04 | Forms / foto dentro de SurveyScreen interno | I | Anaquel de productos sin marcas reconocibles, legible como foto tomada en visita. Mantener la UI estática. |
| C01 | Custom Development / We listen | I | Consulta entre equipo operativo y analista, revisando necesidad/documento. |
| C02 | Custom Development / We design | I | Wireframes o diseño de flujo en sesión de trabajo; sin mockup stock presentado como app Listaso. |
| C03 | Custom Development / We build and connect | V | Desarrollo en equipo o revisión de código, ambiente luminoso y natural. |
| C04 | Custom Development / We support it | V | Especialista trabajando con cliente remotamente o resolviendo una solicitud en laptop. |
| Q01 | QuickBooks / features explorer | V | Administrativo contrasta factura/pedido digital con registros; sin logos ni interfaz de QuickBooks inventada. |
| A01 | Acumatica / bento: Customer sync | I | Personal consulta ficha de cliente/operación comercial en dispositivo; asignación independiente del hero. |
| S01 | SAP / foto de SapFeatureGrid | V | Movimiento de mercancía registrado con dispositivo; acción de operación conectada. |
| IT01 | Industries / Food and beverages | V | Preparación o expedición de cajas de alimentos/bebidas; distribución, no cocina doméstica. |
| IT02 | Industries / Beauty | I | Productos de cuidado personal en lotes/cajas sin marcas; evitar salón de belleza. |
| IT03 | Industries / Housewares | I | Inventario de utensilios/artículos para hogar; evitar cocina doméstica en uso. |
| IT04 | Industries / Packaging | I | Cajas, empaques y suministros preparados por volumen. |
| IT05 | Industries / Wine | I | Cajas/botellas en distribución sin etiquetas legibles; evitar escena de consumo o bar. |
| IT06 | Industries / Flowers | V | Preparación/embalaje de flores para reparto; evitar boda o ramo decorativo aislado. |
| IT07 | Industries / Auto | I | Inventario de llantas/repuestos; no vehículo ni mecánico como foco principal. |
| CT01 | Contact / Miami | I | Contexto urbano reconocible de Miami; no hacer pasar edificio stock por oficina de Listaso. |
| CT02 | Contact / El Salvador | V | Plano urbano estable de San Salvador o su entorno inequívoco; conservar función geográfica. |

### Comprobación del reparto

| Grupo | I | V |
| --- | ---: | ---: |
| Home | 4 | 4 |
| Pre-sales | 3 | 3 |
| Direct Sales | 0 | 1 |
| Inventory | 1 | 2 |
| Delivery | 0 | 1 |
| Back Office | 1 | 1 |
| B2B e-Commerce | 0 | 1 |
| Forms, incluida foto interna de ejemplo | 3 | 1 |
| Custom Development | 2 | 2 |
| QuickBooks / Acumatica / SAP | 1 | 2 |
| Industries | 5 | 2 |
| Contact | 1 | 1 |
| **Total** | **21** | **21** |

About, Listaso Impact, otras integraciones y hardware conservan sus heroes. Products, Integrations hub, SAMI, Pricing, Support, Careers, Rating y legales no reciben bloques stock nuevos donde actualmente hay UI, diagramas, iconos, logos, contenido editorial o formularios. Los gráficos de producto siguen siendo recursos propios y no entran en esta cuota.

## Investigación de fuentes y preselección

Consulta pública realizada el 11 de noviembre. No se han descargado recursos premium ni validado acceso de suscripción. `app.envato.com` devolvió 403 al lector de web; se investigó el catálogo público de Envato Elements. Los enlaces siguientes son **candidatos o rutas de búsqueda**, no selección visual final: revisar el original y su recorte antes de aprobar. Una ficha indexada no demuestra disponibilidad de descarga.

| Fuente / recurso localizado | Posible destino único | Estado / evaluación necesaria |
| --- | --- | --- |
| [Envato: Warehouse Operations and Logistics — GK76Z23](https://elements.envato.com/warehouse-operations-and-logistics-GK76Z23) | H02 o IN01, nunca ambos | Candidato de video; verificar escaneo/recepción, no sólo uso de tablet. |
| [Envato: Warehouse Worker with Tablet — NE3T9FU](https://elements.envato.com/warehouse-inspection-and-man-with-tablet-logistics-NE3T9FU) | Reserva para S01 | La ficha indica video actualmente no disponible en preview; no seleccionarlo hasta comprobar descarga. Master descrito como ProRes 4K de 1.23 GB: no servir original en web. |
| [Envato: Woman Using Tablet in Supermarket — AEP2DA5](https://elements.envato.com/supermarket-employee-taking-inventory-using-digita-AEP2DA5) | Reserva de búsqueda para P04 | Ficha localizada por buscador; no confirmada interacción comprador/representante. Descartar si sólo cuenta stock. |
| [Envato: Hands, tablet and box for delivery — XFLGZQM](https://elements.envato.com/hands-tablet-and-box-for-delivery-signature-and-ec-XFLGZQM) | H03 | Localizado por buscador; revisar contexto comercial, manos y firma en crop. |
| [Envato: Business Team Working on Financial Analysis — TT42UKJ](https://elements.envato.com/businessman-team-analyzing-financial-statement-fin-TT42UKJ) | BO01 | Fotografía localizada; validar encuadre y naturalidad. |
| [Envato: Business Professionals Reviewing Data — 33Z2UU6](https://elements.envato.com/young-colleagues-discuss-business-and-analytical-p-33Z2UU6) | H04 | Fotografía localizada; validar diferencias con BO01. |
| [Magnific: sales clerk with tablet — 278573414](https://www.magnific.com/premium-photo/young-bearded-sales-clerk-using-digital-tablet-working-supermarket_278573414.htm) | P03 | Foto premium localizada; comprobar que el recorte comunica visita y no sólo retrato. |
| [Magnific: grocery employee, produce and tablet — 417261169](https://www.magnific.com/premium-photo/grocery-store-employee-holding-packaged-produce-with-tablet_417261169.htm) | Reserva para H08 | Foto localizada; revisar marcas, posible origen IA y relación con distribución. |
| Magnific: barcode scan 1901011, enlace ya entregado por Erick y registrado en `magnific.ts` | Reserva para H02 o IN01 | Video conocido; descargar por vía autorizada, no usar sólo poster ni URL temporal de preview. |
| Magnific: supervisor/tablet 478953, registrado en `magnific.ts` | Reserva para P06 | Revisar si realmente comunica oficina/handoff; no asignarlo sólo por llevar una tablet. |
| [Envato: catálogo Photos / Warehousing](https://elements.envato.com/photos/warehousing) | IN03 y reservas operativas | Ruta de búsqueda; elegir un asset concreto y guardar su ID antes de implementar. |
| [Envato: catálogo Photos / Accounting](https://elements.envato.com/photos/accounting) | H07 y reservas administrativas | Ruta de búsqueda; evitar recuento de monedas como metáfora de integración. |
| [Envato: catálogo Photos / Software](https://elements.envato.com/photos/software) | C01–C02 y sesiones relacionadas | Ruta de búsqueda; separar fotos de footage; elegir escenas de diseño/desarrollo auténticas. |

Completar la selección específica de las 42 filas durante fase 1. No inventar enlaces o IDs para llenar la matriz. Priorizar Envato para ampliar variedad; usar Magnific cuando encaje mejor. La cuota 50/50 corresponde al tipo de medio, no al proveedor. No es obligatorio consumir los 21 videos anteriores: reutilizar sólo los que cumplan el brief de un espacio único.

## Ejecución para Terra high

1. **Confirmar base y catálogo.** Leer los documentos de proyecto en el orden de AGENTS; releer WORKLOG y este handoff, revisar diff y consumidores. Volver a consultar sólo las pestañas Marketing del inventario de Google Sheets proporcionado por Erick; conservar su secuencia de páginas y usar el código vigente para detectar espacios nuevos o props que no se renderizan. La hoja histórica incluye WordPress/blog y propuestas futuras: no extender el alcance a rutas no implementadas. Registrar las diferencias de inventario.
2. **Cerrar selección antes de sustituir.** Buscar por cada brief en Envato/Magnific. Preparar contacto visual de candidatos con títulos, ID y destino. Ver foto completa y reproducir clip de principio a fin. Comprobar cada uno en el marco real desktop y móvil. Guardar principal y una alternativa si un recurso está inaccesible. No llenar un espacio con otro tema para mantener el conteo.
3. **Descargar y documentar.** Usar cuenta autorizada, interfaz/proveedor o conector oficialmente disponible. Registrar fuente, autor, ID, licencia/proyecto si corresponde, fecha, dimensiones, duración, destino y estado. No usar previews con marca de agua, thumbnails de video como sustituto final de foto, hotlinks ni enlaces firmados que caducan. Conservar masters pesados fuera de `public/`. La autorización anterior permite descargar; no autoriza comprar otra suscripción o crear cuentas. Si falta login, solicitar acceso al usuario y avanzar con preparación local independiente.
4. **Preparar archivos.** Exportar fotografías responsive WebP/AVIF con punto focal por espacio. Crear video web MP4 H.264 sin audio para el uso decorativo, y poster correspondiente; WebM sólo si aporta mejora medida. Conservar original/recorte/duración en el registro. Comenzar con clips de 6–10 s, sin acelerar artificialmente personas o transacciones. Respetar marcos actuales.
5. **Crear una integración compartida pequeña.** Mantener páginas y contenido en servidor. Aislar APIs de reproducción en un componente cliente reutilizable de medio editorial. Preferir un tipo discriminado `image | video` en nuevo manifiesto por slot; no convertir toda foto global en video por detectar el nombre del proveedor. Preservar `FillPhoto` para sus usos existentes de hero. Añadir un consumidor de medios para secciones o pasar ReactNode donde ya existe ese contrato.
6. **Implementar por tandas.** Home → Pre-sales → Direct Sales → Inventory → Delivery → Back Office → B2B → Forms → Custom Development → Integrations → Industries → Contact. Comprobar una tanda antes de continuar. Home funciona como referencia de luz/color y comportamiento. No iniciar la fase de motion graphics propios.
7. **Comprobar y entregar.** Lint, tipos, build estático y diff check; QA de reproducción, accesibilidad, responsive y color. Actualizar WORKLOG, contratos de medios afectados y registro de asignación. Entregar resumen por página, conteo 21/21 comprobado, capturas y preview. Sin commit, push o despliegue implícitos.

## Reproducción y rendimiento

- MP4 local, `muted`, `playsInline`, `preload="none"`, loop sólo si el corte funciona. Mostrar poster inmediatamente; evitar salto de layout. No asignar `src` a clips fuera de la zona visible o inactivos.
- Arrancar cuando el marco activo sea visible. Pausar al salir de pantalla, al cambiar de paso/pestaña o al ocultarse el documento. Un clip oculto por opacity aún puede intersectar: no confiar únicamente en IntersectionObserver.
- StickyStory: observar `data-story-root`/`data-active` y el índice del paso. Home workflow: respetar sus atributos propios. Industries: duplicados desktop/móvil y capas ocultas sólo reproducen el medio seleccionado y visible. No descargar siete clips al entrar a la página.
- Control accesible de reproducir/pausar de al menos 44×44 px; persistir elección de pausa mientras siga montado. Mantenerlo fuera de wrappers `aria-hidden` y capas `pointer-events-none`. Evitar que overlays/copy tapen el control. Error o autoplay bloqueado: poster y acción de reproducción válidos.
- `prefers-reduced-motion`: poster por defecto, sin descarga ni reproducción automática. Considerar Save-Data/red limitada con poster y reproducción manual. Limpiar observers, listeners y reproducción al desmontar/navegar.
- Objetivos de exportación iniciales, sujetos a medición: fotos de tarjeta hasta 80 KB en su tamaño útil; fotos grandes hasta 200 KB; clips 720p/1080p según tamaño real, intentar 1–3 MB y revisar cualquier excepción mayor de 5 MB. No presentar estos objetivos como resultados medidos.
- Registrar bytes por página, solicitudes iniciales, actividad de clips ocultos y ausencia de CLS observable. Revisar impacto sobre LCP/INP en preview móvil; comparar con baseline antes del reemplazo. No añadir reproductores o dependencias sin necesidad/autorización.

## Criterios de aceptación

- Las 42 filas tienen proveedor/ID, archivo local, tipo y destino comprobados; 21 I y 21 V. Los posters, archivos responsive y duplicados de presentación no inflan el conteo.
- Cada video reproduce y avanza `currentTime`; probar además pausa manual, reanudación, salida del viewport, cambio de paso y navegación. Video que sólo muestra poster no está terminado.
- Comprobar los 21 archivos y al menos cada contexto de reproducción: bento, sticky, foto editorial, carrusel/capacidad, explorer y preview de industrias. Probar montajes distintos que utilicen Image directo, no sólo FillPhoto.
- Revisar 390, 768 y 1440 px en claro y oscuro, lectura del copy, caras/manos/dispositivos, encuadre y ausencia de overflow. Teclado y reduced motion verificados; pruebas omitidas se reportan como pendientes.
- Cero recursos premium finales con watermark o resolución de thumbnail; cero assets repetidos entre espacios. Coincidencias de proveedor/autor no bastan para detectar repeticiones: revisar imagen/escena.
- Hero intacto en cada ruta, incluido Acumatica y SurveyScreen de Forms. Verificar con diff y comparación visual antes/después. No cambiar copy comercial ni UI de producto para que encaje con el stock.
- Nombres, metadata, canonical, enlaces y atributos de analítica conservados. Build estático completo sin referencias a archivos inexistentes.

## Handoff de estado

Esta tarea entrega **plan**, no sustitución de recursos ni promesa de acceso premium. La implementación anterior continúa visible hasta que se ejecute este plan. La suscripción/login y los candidatos no vistos quedan pendientes de comprobación, sin impedir la preparación del manifiesto y reproductor. Repositorio `/Users/Erick/listaso-website`, rama observada `dev`; respetar trabajo concurrente, `start-version/` read-only y flujo `dev → qa → main`.
