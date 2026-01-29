# Metodología Beyond Ops - Framework Operativo

## Modelo Fundacional

Beyond Ops es un modelo de **BPO 2.0** diseñado para operar y escalar procesos de atención al cliente y backoffice de forma progresiva, controlada y basada en datos.

### Problemas que Resolvemos

1. **Pilotos que no escalan**: Proyectos que funcionan en demo pero no en producción
2. **Automatizaciones sin ROI claro**: Inversión tecnológica sin retorno medible
3. **Operaciones sin control**: Crecimiento operativo sin métricas ni gobierno

### Principios Fundacionales

```
IA es la HERRAMIENTA
OPS es lo que ENTREGAMOS
BEYOND es el MODELO que lo integra
```

### Principios Operativos (No Negociables)

1. **Ops-first, no IT-first**: Priorizamos resultado operativo sobre solución técnica
2. **Tecnología adaptativa**: La tech se adapta al proceso, no al revés
3. **KPIs operativos**: El éxito se mide en métricas de negocio, no en demos
4. **Escalar con foco**: No escalamos sin claridad de alcance
5. **Impacto basado en datos**: No prometemos sin evidencia
6. **Control permanente**: No escalamos sin gobernanza

---

## Servicios Beyond Ops

### 1. Beyond OpsFocus

**Objetivo**: Calificación y priorización operativa

**Pregunta central**: ¿En qué procesos merece la pena invertir tiempo y análisis?

#### Qué Incluye
- **Filtro de inversión**: Análisis preliminar de viabilidad operativa
- **Analítica CX básica**: Revisión de métricas existentes y pain points
- **Decisión reversible**: Análisis de bajo compromiso y bajo riesgo
- **Lista de cápsulas M0**: Procesos candidatos para profundización

#### Entregables
- Inventario de cápsulas operativas
- Matriz de priorización (volumen x impacto x complejidad)
- Recomendación Go/No-Go por cápsula
- Datos faltantes y supuestos críticos

#### Modelo de Cotización
- **One-shot basado en horas**
- Input: X jornadas de analítica + consultoría
- Output: Lista validada de cápsulas M0

#### Duración Típica
1-2 semanas

---

### 2. Beyond OpsIntelligence

**Objetivo**: Preparar procesos para producción

**Pregunta central**: ¿Cuánto valor real tiene operar este proceso y está preparado para escalar?

#### Qué Incluye

##### Agentización de Procesos
- **Análisis pre-agentic → agentic-ready**
- Descomposición en tareas agentizables
- Identificación de excepciones
- Definición de supervisión humana necesaria

##### Definición de Control
- **KPIs y SLAs de control** (no productivos aún)
- Umbrales de calidad
- Protocolos de escalado
- Condiciones de salida a producción

##### Business Case Detallado
- Volumetría real esperada
- Costes operativos proyectados
- ROI estimado por proceso
- Timeline de implementación

##### Prototipos Pre-Producción

**M1: Service Readiness**
- Diseño de arquitectura técnica
- Definición de integraciones necesarias
- Setup inicial de infraestructura

**M2: Activation**
- Configuración de flujos operativos
- Prompts y knowledge base
- Configuración de agentes

**M3: Validation**
- UAT (User Acceptance Testing)
- Recolección de feedback
- Refinamiento del servicio
- Preparación para handover

#### Entregables
- Proceso rediseñado (agentic-ready)
- Mapa de tareas, excepciones y supervisión
- Business case validado
- Prototipos M1-M3 funcionales
- Plan de paso a producción
- Documento de handover a OpsScale

#### Modelo de Cotización
- **Por proceso**
- Input: X jornadas por cápsula + costes de prototipado
- No incluye producción ni SLAs finales

#### Duración Típica
4-8 semanas por proceso

#### Criterios de Salida
- UAT aprobado por cliente
- KPIs de control definidos y medibles
- Excepciones documentadas y protocolo claro
- Arquitectura técnica validada
- Handover completado

---

### 3. Beyond OpsScale

**Objetivo**: Ejecución real y escalado controlado

**Pregunta central**: ¿Cómo llevamos a producción lo que funciona sin perder control ni margen?

#### Qué Incluye

##### M4: Producción
- **Live service operativo**
- Handover operativo completado
- SLAs productivos activos
- Monitoreo en tiempo real

##### Volúmenes Definidos
- **Voz**: Minutos de conversación (agentic + humana)
- **Mensajería**: Número de mensajes/mes
- **Transacciones**: Operaciones completadas
- Variables según tipo de proceso

##### KPIs y SLAs Productivos
- Tiempos de respuesta
- Tasa de resolución
- CSAT / NPS
- First Contact Resolution (FCR)
- Escalation Rate
- Accuracy

##### Analítica Continua
- Dashboards operativos
- Reportes mensuales
- Identificación de mejoras
- Optimización continua

##### Gobierno Operativo
- Reuniones de seguimiento
- Comité de gobierno mensual
- Gestión de cambios
- Plan de escalado

##### Fee de Plataforma
- Uso de infraestructura tecnológica
- Licencias de herramientas
- Mantenimiento técnico
- Soporte 24/7

#### Entregables
- Servicio operativo en producción
- Reporting mensual de KPIs
- Dashboard en tiempo real
- Comité de gobierno
- Plan de optimización continua

#### Modelo de Cotización
- **Por volumen global** (no por proceso individual)
- Componentes:
  - Fee por minuto de voz / mensaje / transacción
  - Fee mensual de plataforma
  - Fee de dirección / PMO
- Tabla de excesos para volúmenes fuera de rango

#### Duración
- Contratos anuales típicos
- Revisión trimestral de volumetría
- Ajuste mensual permitido (+/- 10%)

---

## Progresión de Modelo

```
OpsFocus (M0)
    ↓
    Decisión Go/No-Go
    ↓
OpsIntelligence (M1-M3)
    ↓
    UAT y Validación
    ↓
OpsScale (M4)
    ↓
    Producción y Optimización Continua
```

### Relación entre Servicios

| Servicio | Input | Output | Decisión |
|----------|-------|--------|----------|
| **OpsFocus** | Docs cliente + pain points | Cápsulas M0 priorizadas | ¿Vale la pena profundizar? |
| **OpsIntelligence** | Cápsulas aprobadas | Procesos agentic-ready + prototipos | ¿Está listo para producción? |
| **OpsScale** | Procesos validados | Operación productiva + KPIs | ¿Cómo optimizamos? |

---

## Lenguaje y Posicionamiento

### Palabras Clave (SÍ usar)
- Operación, procesos, ejecución
- Control, gobierno, métricas
- Escalado progresivo
- Responsabilidad operativa
- KPIs, SLAs, volumetría
- Agentización (como rediseño de proceso)

### Palabras Prohibidas (NO usar como protagonista)
- IA, inteligencia artificial (solo como herramienta)
- Automatización (solo como método, no como fin)
- Tecnología, plataforma (solo como enabler)
- Innovación, disrupción
- Transformación digital

### Fórmula de Mensajes

```
[PROBLEMA OPERATIVO] → [SOLUCIÓN BEYOND OPS] → [RESULTADO MEDIBLE]

Ejemplo:
"Atención al cliente con alta variabilidad y sin control"
→ "Beyond OpsScale con agentización progresiva y KPIs de control"
→ "Reducción de 40% en costes y CSAT de 4.5/5"
```

---

## Assumptions Ledger (Obligatorio)

En cada entregable (OpsFocus, OpsIntelligence, OpsScale) debe incluirse un **Assumptions Ledger**:

### Estructura

1. **Supuestos Asumidos**
   - Lista de hipótesis sobre las que se basa la propuesta
   - Ejemplo: "Volumen mensual estimado en 10,000 mensajes"

2. **Datos Faltantes**
   - Información no disponible que afecta la precisión
   - Ejemplo: "No se dispone de histórico de tiempos medios de resolución"

3. **Riesgos Explícitos**
   - Riesgos operativos identificados
   - Plan de mitigación
   - Ejemplo: "Integración con CRM legacy puede requerir 2 semanas adicionales"

4. **Condiciones de Validez**
   - Bajo qué condiciones la propuesta es válida
   - Ejemplo: "Pricing válido para volumetría ±10% del estimado"

---

## Gates de Validación Humana

### Gate #1 - Post OpsFocus
**Validación de**: Cápsulas M0 candidatas

**Preguntas a responder**:
- ¿Las cápsulas identificadas son correctas?
- ¿La priorización tiene sentido?
- ¿Hay procesos faltantes o sobrantes?
- ¿Aprobamos pasar a OpsIntelligence?

**Acción**: Confirmar lista final de cápsulas para profundización

---

### Gate #2 - Post OpsIntelligence
**Validación de**: Rediseño agentic + prototipos M1-M3

**Preguntas a responder**:
- ¿El rediseño es operativamente viable?
- ¿Los prototipos demuestran viabilidad técnica?
- ¿El business case justifica pasar a producción?
- ¿Los KPIs de control son los correctos?

**Acción**: Aprobar handover a OpsScale o iterar

---

### Gate #3 - Pre-Envío de Propuesta
**Validación de**: Propuesta completa + SoW + Pricing

**Preguntas a responder**:
- ¿La propuesta refleja fielmente el alcance?
- ¿El lenguaje es operacional (no tech-first)?
- ¿El pricing es competitivo y sostenible?
- ¿Los supuestos están explícitos?

**Acción**: Aprobar envío o ajustar

---

## Criterios de Calidad

### Propuesta de Valor
✅ Lenguaje operacional (no tecnológico)
✅ Métricas y KPIs explícitos
✅ Fases claras (M0 → M4)
✅ ROI estimado con supuestos
✅ Assumptions Ledger incluido

### SoW (Statement of Work)
✅ Alcance preciso por servicio
✅ Entregables concretos
✅ Exclusiones explícitas
✅ Governance framework
✅ Criterios de aceptación

### Pricing
✅ Desglose transparente
✅ Fee base + excesos
✅ Comparativa con modelo tradicional
✅ Tabla de volúmenes
✅ Condiciones de ajuste
