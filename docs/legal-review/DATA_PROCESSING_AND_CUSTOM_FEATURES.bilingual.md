# Data Processing and Custom Features Schedule / Anexo de tratamiento y funciones a medida

**Counsel review draft / Borrador para revisión jurídica — 3 November / 3 de noviembre de 2026.** Complete a separate copy for each customer or material feature. This schedule is a scope and data map; counsel must decide how it attaches to a DPA, Order and SOW. Blank fields are deliberate and are not representations about current Listaso practice.

## Part A. Customer and feature record / Cliente y función

| Field / Campo | Entry to approve / Dato por aprobar |
| --- | --- |
| Customer legal entity / Entidad legal del Cliente | [ ] |
| Listaso contracting entity / Entidad contratante de Listaso | [ ] |
| Order and SOW identifiers / Identificadores de Pedido y SOW | [ ] |
| Feature, module or integration / Función, módulo o integración | [ ] |
| Classification / Clasificación | Standard feature, standard configuration, or paid customer-requested change / Función estándar, configuración ordinaria o cambio remunerado solicitado por el Cliente: [ ] |
| Standard feature schedule and version / Anexo y versión de funciones estándar | [ ] |
| Business problem and expected outcome / Problema comercial y resultado esperado | [ ] |
| Included and excluded operations / Operaciones incluidas y excluidas | [ ] |
| Environments and release date / Entornos y fecha de activación | [ ] |
| Product, technical and legal approvers / Aprobadores de Producto, Development y Legal | [ ] |

An existing Standard Feature is part of the product baseline informed by Erick. A paid change needs a documented difference from that baseline, a quote and customer approval. Whether a standard configuration, implementation or defect resolution carries a separate fee must be stated in the approved Order or support schedule; this template does not set those charges.

Una Función estándar existente forma parte de la base del producto informada por Erick. Un cambio remunerado requiere documentar la diferencia respecto de esa base, cotización y aprobación del Cliente. Los cargos por configuración ordinaria, implementación o corrección de defectos deben constar en el Pedido o anexo de soporte aprobado; esta plantilla no los fija.

## Part B. Processing map / Mapa de tratamiento

Complete one row per data flow, including flows to third-party systems and AI providers. Add rows as needed. / Completar una fila por flujo de datos, incluidos envíos a sistemas externos y proveedores de IA. Agregar las filas necesarias.

| Data subjects and categories / Personas y categorías | Source and collection method / Origen y método | Purpose and customer instruction / Finalidad e instrucción | Destination, provider, location and direction / Destino, proveedor, ubicación y dirección | Access, retention and deletion / Acceso, conservación y eliminación |
| --- | --- | --- | --- | --- |
| [ ] | [ ] | [ ] | [ ] | [ ] |

Record whether each flow involves employees, sales representatives, buyers, customer contacts, delivery recipients or other individuals; business contact details, credentials, orders, invoices, inventory, location, route, photos, signatures, payment references, AI prompts, documents or customer-defined fields. Mark **not used** where applicable. Do not assume that a category exists merely because another Listaso customer uses it.

Registrar si cada flujo involucra empleados, vendedores, compradores, contactos de clientes, destinatarios de entregas u otras personas; datos de contacto, credenciales, pedidos, facturas, inventario, ubicación, rutas, fotos, firmas, referencias de pago, consultas de IA, documentos o campos definidos por el Cliente. Marcar **no usado** cuando corresponda. No presumir una categoría porque otro cliente de Listaso la utilice.

## Part C. Sector and operational assessment / Evaluación sectorial y operativa

For each item below, record **applies / does not apply / unknown**, the responsible party, evidence and any contractual consequence. / Para cada punto, registrar **aplica / no aplica / desconocido**, responsable, evidencia y consecuencia contractual.

| Topic / Tema | Questions to resolve / Preguntas por resolver |
| --- | --- |
| Product and market restrictions / Restricciones del producto y mercado | Are goods age-restricted, temperature-sensitive, controlled, recalled or otherwise regulated? Who defines and maintains business rules? / ¿Hay bienes con restricciones de edad, temperatura, control, retiro u otra regulación? ¿Quién define y mantiene las reglas? |
| Traceability and recordkeeping / Trazabilidad y conservación | Are lots, expiration dates, serial numbers, proof of delivery or audit trails required? What accuracy and retention level is expected? / ¿Se exigen lotes, vencimientos, series, pruebas de entrega o auditoría? ¿Qué exactitud y plazo se esperan? |
| Location and field work / Ubicación y trabajo en campo | Is GPS or route tracking enabled? Who gives worker notices, sets hours and manages permissions? / ¿Se activa GPS o seguimiento de rutas? ¿Quién avisa al personal, define horarios y gestiona permisos? |
| Payments, taxes and pricing / Pagos, impuestos y precios | Does Listaso handle payment data or only status and references? Which party determines tax and pricing rules? / ¿Listaso maneja datos de pago o sólo estados y referencias? ¿Quién define reglas fiscales y de precios? |
| Business-to-business commerce / Comercio entre empresas | Which buyer accounts, ordering permissions, terms and customer data are exposed to the Customer's buyers? / ¿Qué cuentas, permisos, condiciones e información se muestran a compradores del Cliente? |
| Integrations and data quality / Integraciones y calidad de datos | Which system is authoritative for each field? How are duplicates, failures, conflicts and reversals handled? / ¿Qué sistema es fuente de verdad para cada campo? ¿Cómo se tratan duplicados, errores, conflictos y reversos? |
| AI and automation / IA y automatización | What data is sent to which provider, for what task, with which human approval and restrictions? / ¿Qué datos se envían a qué proveedor, para qué tarea, con qué revisión humana y restricciones? |
| Sensitive or specially regulated information / Datos sensibles o especialmente regulados | Is the information necessary and permitted? Are additional controls, agreements or a refusal of scope required? / ¿Es necesaria y permitida? ¿Se requieren controles, acuerdos o rechazo del alcance? |

These questions are assessment prompts, not claims that Listaso currently supports or accepts responsibility for these cases. / Estas preguntas sirven para evaluar; no afirman que Listaso admita hoy esos casos ni asuma responsabilidad por ellos.

## Part D. Service commitments / Compromisos del servicio

Record the accepted specification, dependencies, customer obligations, test cases, acceptance method, support owner, service level, escalation and exit plan. Identify whether a deliverable is a reusable platform component, a customer-specific configuration, custom code or customer material. Counsel must approve ownership and license terms for each category.

Registrar especificación aceptada, dependencias, obligaciones del Cliente, casos de prueba, método de aceptación, responsable de soporte, nivel de servicio, escalamiento y plan de salida. Identificar si el entregable es componente reutilizable de plataforma, configuración específica, código a medida o material del Cliente. El abogado debe aprobar titularidad y licencia de cada categoría.

## Part E. Change gate / Control de cambios

**English.** Before activating a material change, the requester records its reason, affected customers, data or providers, security and privacy impact, commercial impact and rollback plan. Product and Development verify the design; Legal reviews new purposes, recipients, regulated uses and contract or notice changes; the customer approves changes requiring an Order, SOW or DPA amendment. The release record stores version, approvers, effective date and customer notice. An emergency security change may follow an agreed exception process with subsequent review.

**Español.** Antes de activar un cambio material, quien lo solicita registra motivo, clientes afectados, datos o proveedores nuevos, impacto en seguridad y privacidad, efecto comercial y plan de reversión. Producto y Development verifican el diseño; Legal revisa nuevas finalidades, destinatarios, usos regulados y cambios de contrato o aviso; el Cliente aprueba los cambios que exijan enmienda del Pedido, SOW o DPA. El registro de publicación conserva versión, aprobadores, fecha efectiva y aviso al Cliente. Un cambio urgente de seguridad puede seguir una excepción acordada con revisión posterior.

## Part F. Approval / Aprobación

| Role / Rol | Name and date / Nombre y fecha | Approval scope / Alcance de aprobación |
| --- | --- | --- |
| Customer business owner / Responsable del Cliente | [ ] | Business rules, data source, permitted users / Reglas, origen de datos y usuarios |
| Listaso Product / Producto | [ ] | Feature and commercial scope / Función y alcance comercial |
| Listaso Development / Development | [ ] | Technical flow, security and support / Flujo técnico, seguridad y soporte |
| Listaso Legal / Legal | [ ] | Contract, privacy, sector and transfer assessment / Contrato, privacidad, sector y transferencias |

**Effective version / Versión efectiva:** [ ]

**Attached Order, SOW or DPA / Pedido, SOW o DPA al que se adjunta:** [ ]
