import { readFileSync } from 'fs'
import { join } from 'path'

// Load knowledge base
const knowledgePath = join(process.cwd(), 'knowledge')

export function loadKnowledgeBase() {
  try {
    const methodology = readFileSync(join(knowledgePath, 'metodologia-beyond-ops.md'), 'utf-8')
    const brandIdentity = readFileSync(join(knowledgePath, 'brand-identity-guidelines.md'), 'utf-8')
    const proposalTemplate = readFileSync(join(knowledgePath, 'plantilla-propuesta-valor.md'), 'utf-8')
    const sowTemplate = readFileSync(join(knowledgePath, 'plantilla-sow.md'), 'utf-8')
    const pricingCalculator = readFileSync(join(knowledgePath, 'calculadora-pricing.md'), 'utf-8')

    return {
      methodology,
      brandIdentity,
      proposalTemplate,
      sowTemplate,
      pricingCalculator,
    }
  } catch (error) {
    console.error('Error loading knowledge base:', error)
    return null
  }
}

export function buildCapsuleFinderPrompt(documents: string, notes: string, clientName: string): string {
  const kb = loadKnowledgeBase()

  return `Eres un analista senior de Beyond Ops, experto en identificar cápsulas operativas para BPO 2.0.

# TU TAREA
Analiza la documentación del cliente y las notas del equipo Beyond, e identifica cápsulas operativas candidatas para OpsFocus (M0).

# CONTEXTO - METODOLOGÍA BEYOND OPS
${kb?.methodology || 'Metodología no disponible'}

# INFORMACIÓN DEL CLIENTE
Cliente: ${clientName}

## Documentos proporcionados:
${documents}

## Notas del equipo Beyond:
${notes || 'No hay notas adicionales'}

# INSTRUCCIONES
1. Identifica entre 3-8 cápsulas operativas discretas
2. Para cada cápsula, define:
   - Nombre claro y operacional
   - Trigger (qué inicia el proceso)
   - Outcome (resultado esperado)
   - Customer Pain (problema que resuelve)
   - Volumen estimado (si hay datos, sino marca como "Por validar")
   - KPIs existentes (si se mencionan)
   - Datos faltantes (información no disponible)
   - Complejidad (Baja/Media/Alta)
   - Prioridad (Alta/Media/Baja)
   - Recomendación (Go/No-Go)
   - Razonamiento de la recomendación

3. IMPORTANTE:
   - Usa lenguaje OPERACIONAL, no tecnológico
   - No menciones IA/LLM/automatización como protagonista
   - Foco en procesos, volúmenes, KPIs
   - Sé conservador: si no hay datos, márcalo explícitamente

# OUTPUT ESPERADO
Devuelve un JSON array con las cápsulas identificadas:

[
  {
    "name": "string",
    "trigger": "string",
    "outcome": "string",
    "customerPain": "string",
    "estimatedVolume": "string",
    "existingKPIs": ["string"],
    "missingData": ["string"],
    "complexity": "Baja" | "Media" | "Alta",
    "priority": "Alta" | "Media" | "Baja",
    "recommendation": "Go" | "No-Go",
    "reasoning": "string"
  }
]

IMPORTANTE: Devuelve SOLO el JSON, sin texto adicional.`
}

export function buildOpsIntelligencePrompt(capsules: any[], clientName: string): string {
  const kb = loadKnowledgeBase()

  return `Eres un arquitecto de soluciones Beyond Ops, experto en rediseñar procesos para operación agentic-ready.

# TU TAREA
Para cada cápsula operativa aprobada, diseña el rediseño agentic completo incluyendo prototipos M1-M3.

# CONTEXTO - METODOLOGÍA BEYOND OPS
${kb?.methodology || 'Metodología no disponible'}

# CÁPSULAS APROBADAS
Cliente: ${clientName}

${JSON.stringify(capsules, null, 2)}

# INSTRUCCIONES
Para cada cápsula, genera:

1. **Tareas Agentizables**: Lista de 3-6 tareas que pueden ser ejecutadas por agentes
2. **Excepciones**: Lista de 2-4 situaciones que requieren escalado
3. **Supervisión Humana**: Lista de 2-4 puntos donde se requiere intervención humana
4. **KPIs de Control**: Lista de 3-5 métricas para monitorear (no productivas aún)
5. **Plan M1-M3**:
   - M1 (Service Readiness): Descripción de arquitectura técnica (2-3 líneas)
   - M2 (Activation): Descripción de configuración (2-3 líneas)
   - M3 (Validation): Descripción de UAT (2-3 líneas)
6. **Business Case**:
   - Coste actual estimado (€/mes)
   - Coste proyectado con Beyond Ops (€/mes)
   - Ahorro estimado (€/año)
   - Payback (meses)
   - ROI 12 meses (%)

# OUTPUT ESPERADO
Devuelve un JSON array:

[
  {
    "capsuleName": "string",
    "complexity": "Baja" | "Media" | "Alta",
    "integrations": number,
    "agenticTasks": ["string"],
    "exceptions": ["string"],
    "humanSupervision": ["string"],
    "controlKPIs": ["string"],
    "m1Architecture": "string",
    "m2Configuration": "string",
    "m3Validation": "string",
    "businessCase": {
      "currentCost": number,
      "projectedCost": number,
      "estimatedSavings": number,
      "paybackMonths": number,
      "roi12Months": number
    }
  }
]

IMPORTANTE: Devuelve SOLO el JSON, sin texto adicional.`
}

export function buildProposalPrompt(project: any): string {
  const kb = loadKnowledgeBase()

  return `Eres un consultor senior de Beyond Ops, experto en crear propuestas de valor operacionales.

# TU TAREA
Genera una Propuesta de Valor completa para el cliente, basada en la información del proyecto.

# CONTEXTO - METODOLOGÍA Y PLANTILLA
${kb?.methodology || 'Metodología no disponible'}

---

${kb?.proposalTemplate || 'Plantilla no disponible'}

# INFORMACIÓN DEL PROYECTO
Cliente: ${project.clientName}
Proyecto: ${project.name}

Notas del equipo: ${project.notes || 'No disponibles'}

Cápsulas identificadas: ${project.capsules.length}
${JSON.stringify(project.capsules, null, 2)}

OpsIntelligence completado: ${project.opsIntelligenceData.length} cápsulas
${JSON.stringify(project.opsIntelligenceData, null, 2)}

# INSTRUCCIONES
Genera:

1. **Resumen Ejecutivo** (3-4 párrafos)
   - Situación del cliente
   - Propuesta Beyond Ops
   - Impacto esperado

2. **Pain Points** (2-4 identificados):
   - Título
   - Descripción operativa
   - Impacto cuantificable (si hay datos)
   - Causa raíz

3. **Cápsulas Operativas** (resumen por cápsula):
   - Nombre
   - Descripción (2-3 líneas)
   - Volumetría
   - Target KPIs (3-4 por cápsula)

4. **Impacto Esperado**:
   - CSAT actual → objetivo
   - FCR actual → objetivo
   - AHT actual → objetivo
   - Reducción de costes estimada

5. **Governance Model** (texto descriptivo de 4-6 líneas)

6. **Assumptions Ledger**:
   - Supuestos (3-5)
   - Datos faltantes (2-4)
   - Riesgos (2-3 con impacto, probabilidad y mitigación)

# IMPORTANTE
- Lenguaje 100% OPERACIONAL (no tech-first)
- Métricas concretas cuando hay datos
- Marcar como "Por validar" cuando faltan datos
- No prometer sin evidencia

# OUTPUT ESPERADO
JSON con esta estructura:

{
  "executiveSummary": "string",
  "painPoints": [
    {
      "title": "string",
      "description": "string",
      "impact": "string",
      "rootCause": "string"
    }
  ],
  "capsuleSummaries": [
    {
      "name": "string",
      "description": "string",
      "volumetrics": "string",
      "targetKPIs": [
        { "metric": "string", "target": "string" }
      ]
    }
  ],
  "impactMetrics": {
    "currentCSAT": "string",
    "targetCSAT": "string",
    "currentFCR": "string",
    "targetFCR": "string",
    "currentAHT": "string",
    "targetAHT": "string",
    "costReduction": "string"
  },
  "governanceModel": "string",
  "assumptions": ["string"],
  "missingData": ["string"],
  "risks": [
    {
      "name": "string",
      "impact": "Alto" | "Medio" | "Bajo",
      "probability": "Alta" | "Media" | "Baja",
      "mitigation": "string"
    }
  ]
}

IMPORTANTE: Devuelve SOLO el JSON, sin texto adicional.`
}
