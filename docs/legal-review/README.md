# Paquete legal bilingüe de Listaso para revisión de abogado

**Fecha de preparación:** 3 de noviembre de 2026

**Estado:** borrador completo para revisión jurídica y validación operativa; no aprobado para publicación, firma ni incorporación a formularios.

**Idiomas:** inglés y español. El inglés se propone como texto fuente de las rutas públicas actuales; la equivalencia y el orden de prevalencia deben aprobarse jurídicamente.

## Entregables

1. [Política de privacidad](PRIVACY_POLICY.bilingual.md): sitio, captación, SaaS, aplicaciones, SAMI, proveedores y derechos.
2. [Términos del sitio](WEBSITE_TERMS.bilingual.md): uso del sitio público, contenido, enlaces y relación con los contratos del servicio.
3. [Acuerdo de suscripción](SUBSCRIPTION_AGREEMENT.bilingual.md): acceso al SaaS, pedidos, pruebas, datos, integraciones, funciones a medida, cambios y terminación.
4. [Anexo de tratamiento y funciones configurables](DATA_PROCESSING_AND_CUSTOM_FEATURES.bilingual.md): matriz contractual y proceso de control de cambios para cada cliente.
5. [Inventario de funciones estándar](STANDARD_FEATURE_INVENTORY_2026-11-03.md): transcripción de la imagen aportada por Erick, implicaciones de datos y validaciones por módulo.

Estos textos sustituyen la estructura incompleta de 2022 **sólo como propuesta de redacción**. Erick confirmó el 3 de noviembre de 2026 que las funciones de la imagen aportada corresponden a la **versión estándar**; los cambios pedidos por un cliente se gestionan por separado y tienen pago adicional. La presencia de una función estándar no demuestra que esté activada, utilizada o permitida a todos los roles en cada cuenta. El pedido debe definir el producto y cualquier límite comercial aplicable; las funciones adicionales o modificaciones requieren alcance y precio acordados. No se trasladaron automáticamente exenciones, plazos, jurisdicción o declaraciones de cumplimiento de los textos anteriores.

## Decisiones que el abogado y el negocio deben cerrar

| ID | Decisión o dato pendiente | Dueño sugerido | Efecto en el texto |
| --- | --- | --- | --- |
| L01 | Entidad contratante, domicilio, correo de privacidad y canal de notificaciones legales vigentes. | Dirección y Legal | Identificación, contacto y avisos en todos los documentos. |
| L02 | Mercados atendidos y leyes aplicables; requisitos de privacidad, cookies, transferencias y representante local por mercado. | Legal y Comercial | Derechos, bases jurídicas, avisos y jurisdicción. |
| L03 | Estructura contractual: pedido, acuerdo de suscripción, anexo de tratamiento, alcance de trabajo, SLA y orden de precedencia. | Legal y Ventas | Qué acepta cada cliente y cómo se resuelven conflictos. |
| L04 | Ciclo comercial real: prueba de SAMI de 14 días, activación, facturación, renovación, cancelación, reembolsos y conservación/exportación al terminar. | Producto, Finanzas y Legal | No debe conservarse la afirmación de pérdida automática de datos del texto de 2022 sin validación. |
| L05 | Inventario de datos por módulo estándar: contactos, usuarios, compradores, proveedores, empleados, pedidos, inventario, pagos o referencias, fotos, ubicación, encuestas, archivos, telemetría y campos personalizados. | Development y Producto | La imagen confirma nombres de funciones, pero no datos efectivamente tratados ni duración. |
| L06 | Proveedores y subprocesadores reales, servicios y regiones: hosting, WordPress, Zoho, Calendly, medición, mensajería, soporte, IA, tiendas móviles e integraciones. | Development y Operaciones | Transparencia, DPA, transferencias y cambios de proveedor. |
| L07 | SAMI: modelos/proveedores, datos enviados, recuperación de información, retención de prompts y salidas, uso para entrenamiento, controles, revisión humana y errores. | Producto, Development y Legal | Anexo específico de IA y avisos al usuario. |
| L08 | Analítica y cookies efectivas en WordPress y el sitio nuevo; controles de consentimiento, periodos y señalización a GA4/GTM/Clarity. | Marketing, Development y Legal | Política de cookies y avisos en formularios. |
| L09 | Seguridad comprobable: controles, acceso interno, cifrado, respaldos, aislamiento, incidentes, soporte, borrado y auditorías. | Development y Seguridad | Compromisos contractuales y anexo técnico. |
| L10 | Integraciones: datos y direcciones reales por sistema; responsabilidades de credenciales, permisos, errores y transferencias. Confirmar Alere, leadCommerce y la referencia a Route4me de la imagen. | Producto, Integraciones y Legal | Alcances, proveedores y límites por cliente. |
| L11 | Límite entre configuración estándar y cambios remunerados: solicitud, presupuesto, aprobación, diseño, aceptación, propiedad intelectual, soporte, datos nuevos, proveedores nuevos y cambios materiales. | Producto, Ventas, Development y Legal | Pedido, SOW y anexo de cambio de alcance. |
| L12 | Plazos de retención y proceso de solicitudes de derechos para visitantes, prospectos, usuarios del cliente y clientes finales. | Legal, Soporte y Development | Política, DPA y procedimiento operativo. |
| L13 | Texto y mecanismo de aceptación en Zoho Forms y otros formularios; destinatarios, automatizaciones y prueba real. | Marketing, administrador de Zoho y Legal | Aviso en el punto de captura y evidencia de aceptación. |
| L14 | Comparación del acuerdo propuesto con contratos ya firmados, anexos y prácticas comerciales vigentes. | Legal y Ventas | Evitar alterar derechos u obligaciones de clientes existentes por publicar una página. |

## Criterios de revisión y alcance del nicho

Listaso atiende procesos B2B de distribuidores, mayoristas y fabricantes. Sus módulos y desarrollos a medida pueden participar en ventas de campo, catálogo, pedidos, inventario, entregas, comercio electrónico, reportes y conexión con sistemas contables. Esas operaciones pueden incorporar datos de terceros —empleados, compradores, contactos, destinatarios o representantes— y reglas propias del sector de cada cliente. El contrato debe asignar responsabilidades por la legalidad y calidad de esos datos, y el alcance de cada módulo debe documentar flujos específicos. El contenido de marketing no sustituye una especificación técnica ni un compromiso contractual.

El anexo propuesto obliga a revisar **antes de activar** una función nueva o personalizada: propósito, datos, personas afectadas, fuentes, destinatarios, permisos, retención, seguridad, integraciones, IA, pruebas, soporte, condiciones comerciales y aceptación. Permite cubrir futuros casos sin afirmar que Listaso procesa hoy todas las categorías imaginables.

## Evidencia y criterio jurídico externo

**Interna:** [brief ejecutivo](../LEGAL_PRIVACY_STAKEHOLDER_BRIEF_2026-10-27.md), [reglas maestras](../PROJECT_MASTER.md), [decisiones](../DECISIONS.md), [mapa de rutas](../SITE_ROUTE_MAP.md), [contrato de productos](../PRODUCT_CONTENT_CONTRACT.md), [contrato de integraciones](../INTEGRATIONS_CONTENT_CONTRACT.md) y [worklog](../WORKLOG.md). Los textos de 2022 y las copias antiguas fueron compartidos por Erick en este chat. La arquitectura y las cuentas productivas del SaaS no se auditaron.

**Externa:** [FTC, privacidad y seguridad empresarial](https://www.ftc.gov/business-guidance/privacy-security); [Reglamento General de Protección de Datos de la UE, artículos 13, 14 y 28](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679); [California Privacy Protection Agency, avisos generales](https://cppa.ca.gov/pdf/general_notices.pdf); [NIST, perfil de riesgos de IA generativa](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf). Son referencias de revisión condicionadas a aplicabilidad y hechos confirmados. El abogado determinará las obligaciones concretas.

## Criterio de publicación

Publicar únicamente cuando Legal apruebe ambos idiomas y las condiciones comerciales; Development valide el inventario y los controles; Marketing verifique cookies y formularios; y las rutas `/privacy-policy/`, `/terms-and-conditions/` y `/subscription-agreement/` respondan correctamente en el entorno de publicación. El blog y las rutas actuales de WordPress deben seguir disponibles hasta el cutover aprobado.
