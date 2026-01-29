# Plantilla: Statement of Work (SoW) Beyond Ops

## Statement of Work
### [NOMBRE DEL PROYECTO]
**Cliente**: [NOMBRE DEL CLIENTE]
**Fecha**: [DD/MM/YYYY]
**Versión**: [X.X]
**Válido hasta**: [DD/MM/YYYY]

---

## Preámbulo: Modelo de Compromiso Progresivo

> **El alcance comprometido de este SoW es Beyond OpsFocus (M0).** Las fases posteriores (OpsIntelligence y OpsScale) se describen a título indicativo para ofrecer visibilidad completa del viaje operativo. El presupuesto y alcance definitivo de cada fase posterior se formalizará mediante adenda a este SoW tras la aprobación del Gate correspondiente.

---

## 1. Alcance del Proyecto

### 1.1 Objetivos

El presente Statement of Work define el alcance de servicios Beyond Ops para **[CLIENTE]**, con el objetivo de:

1. **[OBJETIVO 1]**: [Descripción operativa]
2. **[OBJETIVO 2]**: [Descripción operativa]
3. **[OBJETIVO 3]**: [Descripción operativa]

### 1.2 Servicios Incluidos

#### Beyond OpsFocus (M0)

**Alcance**:
- Análisis de volumetría y métricas actuales de [X procesos]
- Identificación y catalogación de cápsulas operativas
- Matriz de priorización (impacto x viabilidad x complejidad)
- Definición de KPIs de control por cápsula
- Recomendación Go/No-Go

**Entregables**:
- Inventario de cápsulas M0 (formato Excel + presentación)
- Matriz de priorización documentada
- Assumptions Ledger inicial
- Presentación ejecutiva de recomendaciones

**Esfuerzo**: [X jornadas de analítica] + [Y jornadas de consultoría]

**Duración**: 1-2 semanas desde kick-off

---

#### Beyond OpsIntelligence (M1-M3)

**Alcance**: [X cápsulas aprobadas en OpsFocus]

**Por cada cápsula**:

**M1: Service Readiness**
- Diseño de arquitectura técnica
- Mapeo de integraciones necesarias
- Definición de infraestructura base
- Setup inicial de entorno de desarrollo

**M2: Activation**
- Configuración de flujos operativos
- Diseño de prompts y knowledge base específica
- Configuración de reglas de negocio
- Setup de agentes operativos

**M3: Validation**
- UAT con [X casos de prueba reales]
- Recolección y análisis de feedback
- Refinamiento de flujos y prompts
- Validación de KPIs de control
- Documento de handover a producción

**Entregables por cápsula**:
- Documentación de arquitectura técnica
- Proceso rediseñado (diagrama agentic-ready)
- Mapa de tareas, excepciones y supervisión humana
- Prototipos funcionales M1-M3
- Business case validado con métricas reales
- Plan de paso a producción
- Documento de handover completo
- Resultados de UAT

**Esfuerzo por cápsula**: [X jornadas de desarrollo] + [Y jornadas de PMO]

**Duración**: 4-8 semanas por cápsula (pueden ejecutarse en paralelo)

---

#### Beyond OpsScale (M4)

**Alcance**: [X cápsulas validadas en OpsIntelligence]

**Servicios incluidos**:

1. **Operación en Producción**
   - Ejecución operativa de procesos validados
   - Disponibilidad: [24/7 o horario específico]
   - Volúmenes incluidos:
     - Voz: [X minutos/mes]
     - Mensajería: [Y mensajes/mes]
     - Transacciones: [Z operaciones/mes]

2. **KPIs y SLAs Productivos**
   - CSAT objetivo: [X/5]
   - FCR objetivo: [X%]
   - Tiempo de primera respuesta: [X minutos]
   - Tiempo de resolución: [X horas]
   - Availability: [X%]

3. **Monitoreo y Analítica**
   - Dashboard en tiempo real
   - Alertas automáticas de desviaciones
   - Reportes semanales operativos
   - Reportes mensuales ejecutivos
   - Revisión trimestral de contrato

4. **Governance**
   - Comité operativo semanal
   - Comité estratégico mensual
   - Plan de optimización continua
   - Gestión de cambios

5. **Fee de Plataforma**
   - Infraestructura tecnológica
   - Licencias de herramientas
   - Mantenimiento técnico
   - Soporte 24/7

**Entregables**:
- Servicio operativo en producción
- Dashboard en tiempo real (acceso cliente)
- Reporte semanal de KPIs
- Reporte mensual ejecutivo
- Actas de comités
- Plan de optimización trimestral

**Duración**: Contrato anual con renovación automática

**Volúmenes base**: [Definir rango de volúmenes incluidos]

**Tabla de excesos**: Ver Anexo Económico

---

### 1.3 Exclusiones Explícitas

Los siguientes elementos **NO están incluidos** en el alcance:

❌ **Desarrollo de integraciones complejas no identificadas en M1**
- Si surgen integraciones adicionales en OpsIntelligence, se cotizarán aparte

❌ **Cambios en sistemas core del cliente**
- Beyond Ops se integra con sistemas existentes, no los modifica

❌ **Formación de equipos internos del cliente**
- Se incluye solo formación para uso del dashboard y governance

❌ **Migración de datos históricos**
- Se opera sobre datos nuevos, no se migra histórico

❌ **Volúmenes fuera de rango definido**
- Excesos se facturan según tabla de excesos

❌ **Servicios fuera de horario acordado** (si aplica)
- Si OpsScale es 9-18h, fuera de horario se cotiza aparte

❌ **Desarrollo de funcionalidades custom no estándar**
- Personalizaciones específicas se cotizan como proyecto separado

---

## 2. Entregables Detallados

### 2.1 OpsFocus

| Entregable | Formato | Fecha Entrega |
|------------|---------|---------------|
| Inventario de cápsulas M0 | Excel + PDF | S+2 |
| Matriz de priorización | Excel + PPT | S+2 |
| Assumptions Ledger | PDF | S+2 |
| Presentación ejecutiva | PPT | S+2 |

---

### 2.2 OpsIntelligence (por cápsula)

| Entregable | Formato | Fecha Entrega |
|------------|---------|---------------|
| Arquitectura técnica | Diagrama + PDF | M1 |
| Proceso rediseñado | Diagrama BPMN | M2 |
| Prototipos funcionales | Entorno UAT | M3 |
| Business case validado | Excel + PDF | M3 |
| Resultados UAT | Informe PDF | M3 |
| Documento handover | PDF | M3 |

---

### 2.3 OpsScale

| Entregable | Frecuencia | Formato |
|------------|------------|---------|
| Dashboard en tiempo real | 24/7 | Web app |
| Reporte operativo | Semanal | PDF |
| Reporte ejecutivo | Mensual | PPT + PDF |
| Acta comité operativo | Semanal | PDF |
| Acta comité estratégico | Mensual | PDF |
| Plan de optimización | Trimestral | PDF + PPT |

---

## 3. Criterios de Aceptación

### 3.1 OpsFocus

**El entregable se considera aceptado cuando**:
- ✅ Se han identificado al menos [X] cápsulas operativas
- ✅ Cada cápsula tiene definido: trigger, outcome, pain, volumen estimado
- ✅ Existe recomendación Go/No-Go justificada por cápsula
- ✅ Assumptions Ledger está completo
- ✅ Cliente valida que las cápsulas reflejan sus procesos reales

**Plazo de aceptación**: 5 días hábiles desde entrega

---

### 3.2 OpsIntelligence

**El entregable se considera aceptado cuando**:
- ✅ Prototipos M1-M3 están funcionales en entorno UAT
- ✅ UAT ha sido ejecutado con [X] casos de prueba reales
- ✅ KPIs de control están definidos y son medibles
- ✅ Documento de handover está completo
- ✅ Cliente aprueba paso a producción

**Plazo de aceptación**: 10 días hábiles desde entrega de M3

---

### 3.3 OpsScale

**El servicio se considera operativo cuando**:
- ✅ Procesos están activos en producción
- ✅ KPIs se están midiendo en tiempo real
- ✅ Dashboard está accesible para cliente
- ✅ Primer reporte mensual ha sido entregado
- ✅ Comités de gobierno están establecidos

**SLAs aplican desde**: Fecha de inicio de M4

---

## 4. Responsabilidades

### 4.1 Responsabilidades Beyond Ops

**En OpsFocus**:
- ✅ Análisis de documentación proporcionada
- ✅ Conducción de entrevistas con stakeholders
- ✅ Identificación y priorización de cápsulas
- ✅ Entrega de recomendaciones

**En OpsIntelligence**:
- ✅ Diseño de arquitectura técnica
- ✅ Desarrollo de prototipos M1-M3
- ✅ Ejecución de UAT
- ✅ Refinamiento basado en feedback
- ✅ Preparación de handover

**En OpsScale**:
- ✅ Operación productiva de procesos
- ✅ Monitoreo continuo de KPIs
- ✅ Reporting periódico
- ✅ Governance operativo
- ✅ Optimización continua
- ✅ Soporte técnico

---

### 4.2 Responsabilidades Cliente

**En OpsFocus**:
- ✅ Provisión de documentación solicitada
- ✅ Disponibilidad de stakeholders para entrevistas
- ✅ Acceso a métricas y sistemas (solo lectura)
- ✅ Validación de cápsulas identificadas
- ✅ Decisión Go/No-Go en plazo acordado

**En OpsIntelligence**:
- ✅ Provisión de accesos a sistemas para integraciones
- ✅ Disponibilidad de equipo técnico para M1
- ✅ Participación activa en UAT (M3)
- ✅ Feedback oportuno sobre prototipos
- ✅ Aprobación final de handover

**En OpsScale**:
- ✅ Mantenimiento de accesos a sistemas integrados
- ✅ Participación en comités de gobierno
- ✅ Comunicación de cambios que afecten operación
- ✅ Validación mensual de reportes
- ✅ Pago oportuno según términos acordados

---

## 5. Governance del Proyecto

### 5.1 Estructura de Gobierno

#### Durante OpsFocus e OpsIntelligence

**Comité de Proyecto** (Semanal)
- Asistentes: PMO Beyond Ops + Sponsor Cliente + Equipo Técnico
- Objetivo: Seguimiento de avance, resolución de blockers
- Formato: Reunión 1h + acta

**Revisiones de Gate** (Según fase)
- Gate #1: Post OpsFocus - Validación de cápsulas
- Gate #2: Post OpsIntelligence - Aprobación de handover
- Gate #3: Pre-producción - Go-live de OpsScale

---

#### Durante OpsScale

**Comité Operativo** (Semanal)
- Asistentes: Operations Lead Beyond Ops + Operations Manager Cliente
- Objetivo: Revisión de KPIs, incidencias, ajustes operativos
- Duración: 30 min
- Formato: Video call + dashboard compartido

**Comité Estratégico** (Mensual)
- Asistentes: Director Beyond Ops + Sponsor Cliente
- Objetivo: Revisión de KPIs globales, decisiones de escalado, cambios de alcance
- Duración: 1h
- Formato: Presentación ejecutiva + reunión

**Revisión de Contrato** (Trimestral)
- Revisión de volumetría real vs. estimada
- Ajuste de pricing si desviación > 10%
- Plan de optimización próximo trimestre
- Renovación o cambios de alcance

---

### 5.2 Comunicación

| Tipo | Frecuencia | Responsable | Destinatarios |
|------|------------|-------------|---------------|
| Dashboard | Tiempo real | Beyond Ops | Cliente (acceso web) |
| Alertas críticas | Inmediato | Beyond Ops | Ops Manager Cliente |
| Reporte operativo | Semanal | Beyond Ops | Comité Operativo |
| Reporte ejecutivo | Mensual | Beyond Ops | Comité Estratégico |
| Acta comité | Post-reunión | Beyond Ops | Asistentes |

---

### 5.3 Gestión de Cambios

**Cambios menores** (sin impacto en coste/plazo):
- Aprobación: Comité Operativo
- Documentación: Acta de comité
- Implementación: 5 días hábiles

**Cambios mayores** (con impacto en coste/plazo):
- Solicitud formal por escrito
- Análisis de impacto por Beyond Ops (3 días)
- Aprobación: Comité Estratégico
- Re-cotización si aplica
- Firma de adenda al SoW

---

## 6. Plazo y Plan de Trabajo

### 6.1 Timeline General

```
Semana 1-2:   OpsFocus (M0)
              ↓
Semana 2:     Gate #1 - Validación cápsulas
              ↓
Semana 3-10:  OpsIntelligence (M1-M3) [por cápsula]
              ↓
Semana 10:    Gate #2 - Aprobación handover
              ↓
Semana 11:    Preparación go-live
              ↓
Semana 11:    Gate #3 - Inicio OpsScale (M4)
              ↓
Semana 12+:   Operación productiva
```

### 6.2 Hitos Clave

| Hito | Fecha Estimada | Criterio de Cumplimiento |
|------|----------------|---------------------------|
| Kick-off | [DD/MM/YYYY] | Reunión inicial realizada |
| Entrega OpsFocus | S+2 | Cápsulas identificadas |
| Gate #1 | S+2 | Cápsulas aprobadas |
| Entrega M1 (por cápsula) | S+4 | Arquitectura validada |
| Entrega M2 (por cápsula) | S+6 | Flujos configurados |
| Entrega M3 (por cápsula) | S+10 | UAT aprobado |
| Gate #2 | S+10 | Handover aprobado |
| Go-live M4 | S+11 | Producción activa |

---

## 7. Supuestos y Dependencias

### 7.1 Supuestos

1. **Accesos y permisos**: Cliente proveerá accesos necesarios en plazo
2. **Disponibilidad de stakeholders**: Disponibles según calendario acordado
3. **Documentación**: Documentación de procesos está disponible
4. **Volumetría**: Volúmenes estimados tienen desviación < 10%
5. **Sistemas**: Sistemas del cliente están operativos y con APIs documentadas

### 7.2 Dependencias

1. **Aprobación de cápsulas (Gate #1)**: Necesaria para iniciar OpsIntelligence
2. **Accesos técnicos**: Requeridos antes de M1
3. **Aprobación UAT (Gate #2)**: Necesaria para iniciar OpsScale
4. **Firma de contrato**: Requerida antes de kick-off

### 7.3 Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retraso en accesos técnicos | Media | Alto | Buffer de 1 semana en planning |
| Cambios en volumetría | Alta | Medio | Tabla de excesos definida |
| Integración compleja no prevista | Baja | Alto | Análisis detallado en M1 |
| UAT no aprobado | Baja | Alto | Iteración adicional incluida |

---

## 8. Términos Comerciales

> **Nota:** Este contrato cubre únicamente Beyond OpsFocus (M0). Las fases posteriores se contratarán mediante adendas independientes tras la aprobación del Gate correspondiente.

### 8.1 Modelo de Facturación

**OpsFocus (alcance comprometido)**:
- Facturación: 100% contra entrega
- Fecha: [DD/MM/YYYY]

**OpsIntelligence (sujeto a adenda post-Gate #1)**:
- 50% al inicio de M1
- 50% al completar M3 y Gate #2

**OpsScale (sujeto a adenda post-Gate #2)**:
- Facturación mensual anticipada
- Fee base + excesos del mes anterior
- Vencimiento: 30 días

### 8.5 Condiciones de Progresión

1. **Gate #1 → OpsIntelligence**: Requiere aprobación formal de las cápsulas identificadas en OpsFocus. El presupuesto definitivo de OpsIntelligence se presentará con las cápsulas aprobadas.
2. **Gate #2 → OpsScale**: Requiere aprobación del handover de OpsIntelligence. El fee mensual de OpsScale se basará en volúmenes validados durante M1-M3.
3. **Derecho de cancelación**: El cliente puede optar por no continuar en cualquier Gate sin penalización, abonando únicamente los servicios prestados hasta ese momento.

### 8.2 Condiciones de Pago

- Plazo: 30 días desde fecha de factura
- Método: Transferencia bancaria
- Moneda: EUR (€)

### 8.3 Penalizaciones por SLA (solo OpsScale)

Si Beyond Ops no cumple SLAs productivos:
- Desviación 5-10%: Reporte de causa raíz
- Desviación 10-20%: Crédito de 5% del fee mensual
- Desviación >20%: Crédito de 10% del fee mensual

Medición: Promedio mensual

---

## 9. Propiedad Intelectual

### 9.1 Propiedad de Entregables

- **Documentación del proyecto**: Cliente
- **Configuraciones específicas**: Cliente
- **Know-how y metodología Beyond Ops**: Beyond Ops
- **Plataforma tecnológica**: Beyond Ops
- **Datos operativos**: Cliente

### 9.2 Confidencialidad

Ambas partes se comprometen a:
- Mantener confidencialidad de información sensible
- No divulgar sin autorización previa por escrito
- Usar información solo para propósito del proyecto

---

## 10. Terminación

### 10.1 Terminación de OpsFocus/OpsIntelligence

- Cualquiera de las partes puede terminar con 15 días de preaviso
- Cliente paga por trabajo completado hasta la fecha
- Entregables parciales se entregan en estado actual

### 10.2 Terminación de OpsScale

- Preaviso: 90 días por escrito
- Periodo de transición: 30 días incluidos
- Handover de operación a nuevo proveedor o equipo interno
- Extracción de datos operativos

---

## 11. Anexos

- **Anexo A**: Detalle Económico (ver documento separado)
- **Anexo B**: Matriz de KPIs y SLAs
- **Anexo C**: Tabla de Excesos
- **Anexo D**: Assumptions Ledger Detallado

---

## 12. Aceptación del SoW

**Cliente**: [NOMBRE EMPRESA]

Nombre: ___________________________
Cargo: ___________________________
Firma: ___________________________
Fecha: ___________________________

**Beyond Ops**

Nombre: ___________________________
Cargo: ___________________________
Firma: ___________________________
Fecha: ___________________________

---

## Notas de Uso de la Plantilla

### Personalización por Proyecto
- Ajustar timeline según complejidad
- Definir volumetrías específicas
- Adaptar estructura de gobierno según tamaño de cliente
- Especificar integraciones conocidas

### Validaciones Previas
✅ Todos los placeholders [X] están completados
✅ Fechas son realistas y acordadas
✅ Exclusiones están claramente definidas
✅ Responsabilidades de cliente están explícitas
✅ Modelo de facturación está completo
✅ Gates de validación están definidos

### Lenguaje
- Operacional y contractual
- Sin ambigüedades
- Métricas específicas, no genéricas
- Responsibilities claras de ambas partes
