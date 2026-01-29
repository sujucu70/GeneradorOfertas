import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { project, format } = body

    if (format === 'markdown') {
      const markdown = generateMarkdownExport(project)

      return new NextResponse(markdown, {
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': `attachment; filename="propuesta-${project.clientName}-${Date.now()}.md"`,
        },
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'PDF export not implemented in MVP' },
        { status: 501 },
      )
    }
  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to export documents' },
      { status: 500 },
    )
  }
}

function generateMarkdownExport(project: any): string {
  const { proposalData, pricingData } = project

  const p = pricingData // shorthand

  // Helper: safe toLocaleString
  const fmt = (v: number | undefined) => v != null ? v.toLocaleString() : 'N/A'

  return `# Propuesta Beyond Ops - ${project.clientName}

**Proyecto:** ${project.name}
**Fecha:** ${new Date().toLocaleDateString('es-ES')}
**Generado por:** Beyond Ops - Generador de Ofertas

---

## 1. Resumen Ejecutivo

${proposalData?.executiveSummary || 'No disponible'}

---

## 2. Pain Points Identificados

${proposalData?.painPoints
  ?.map(
    (pain: any, i: number) => `
### ${i + 1}. ${pain.title}

**Descripción:** ${pain.description}

**Impacto:** ${pain.impact}

**Causa Raíz:** ${pain.rootCause}
`
  )
  .join('\n') || 'No disponible'}

---

## 3. Cápsulas Operativas

${proposalData?.capsuleSummaries
  ?.map(
    (capsule: any, i: number) => `
### ${i + 1}. ${capsule.name}

${capsule.description}

**Volumetría:** ${capsule.volumetrics}

**KPIs Objetivo:**
${capsule.targetKPIs.map((kpi: any) => '- ' + kpi.metric + ': ' + kpi.target).join('\n')}
`
  )
  .join('\n') || 'No disponible'}

---

## 4. Impacto Esperado

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| CSAT | ${proposalData?.impactMetrics?.currentCSAT || 'N/A'} | ${proposalData?.impactMetrics?.targetCSAT || 'N/A'} |
| FCR | ${proposalData?.impactMetrics?.currentFCR || 'N/A'} | ${proposalData?.impactMetrics?.targetFCR || 'N/A'} |
| AHT | ${proposalData?.impactMetrics?.currentAHT || 'N/A'} | ${proposalData?.impactMetrics?.targetAHT || 'N/A'} |
| Reducción de Costes | - | ${proposalData?.impactMetrics?.costReduction || 'N/A'} |

---

## 5. Statement of Work

### 5.1 Alcance del Proyecto

| Fase | Alcance | Estado |
|------|---------|--------|
| **Beyond OpsFocus (M0)** | Análisis y priorización de ${project.capsules?.length || 0} procesos | **Comprometido** |
| **Beyond OpsIntelligence (M1-M3)** | Rediseño agentic de ${project.opsIntelligenceData?.length || 0} cápsulas | Estimado |
| **Beyond OpsScale (M4)** | Operación productiva con SLAs | Proyectado |

### 5.2 Entregables

- Inventario de cápsulas M0
- Prototipos M1-M3 por cápsula
- Business case validado
- Dashboard operativo
- Reportes mensuales

### 5.3 Exclusiones

- Desarrollo de integraciones complejas no identificadas
- Cambios en sistemas core del cliente
- Migración de datos históricos
- Volúmenes fuera de rango definido

### 5.4 Governance

${proposalData?.governanceModel || 'No disponible'}

### 5.5 Condiciones de Progresión

1. **Gate #1 → OpsIntelligence**: Requiere aprobación formal de las cápsulas identificadas en OpsFocus.
2. **Gate #2 → OpsScale**: Requiere aprobación del handover de OpsIntelligence.
3. **Derecho de cancelación**: El cliente puede optar por no continuar en cualquier Gate sin penalización.

---

## 6. Modelo de Inversión Progresiva

> **El cliente solo se compromete al siguiente paso.** Solo OpsFocus (M0) tiene precio firme. Las fases posteriores se presupuestan al concluir la fase anterior.

### 6.1 Inversión Comprometida: OpsFocus (M0) — Precio Firme

| Concepto | Jornadas | Tarifa | Subtotal |
|----------|----------|--------|----------|
| Jornadas analítica | ${p?.opsFocus?.analyticDays || 'N/A'} | €${fmt(p?.opsFocus?.analyticRate)} | €${fmt(p?.opsFocus?.analyticDays * p?.opsFocus?.analyticRate)} |
| Jornadas consultoría | ${p?.opsFocus?.consultingDays || 'N/A'} | €${fmt(p?.opsFocus?.consultingRate)} | €${fmt(p?.opsFocus?.consultingDays * p?.opsFocus?.consultingRate)} |
| Jornadas dirección / PMO | ${p?.opsFocus?.directionDays || 'N/A'} | €${fmt(p?.opsFocus?.directionRate)} | €${fmt(p?.opsFocus?.directionDays * p?.opsFocus?.directionRate)} |
| **Coste base** | | | **€${fmt(p?.opsFocus?.costBase)}** |
| + Margen (${p?.opsFocus?.margin || 0}%) | | | €${fmt(Math.round((p?.opsFocus?.costBase || 0) * (p?.opsFocus?.margin || 0) / 100))} |
| **TOTAL OpsFocus** | | | **€${fmt(p?.opsFocus?.total)}** |

### 6.2 Estimación Indicativa: OpsIntelligence (M1-M3)

${p?.opsIntelligence?.capsules?.length > 0 ? `
| Cápsula | Complejidad | J. Analít. | J. PMO | Mult. | Coste Ajust. |
|---------|-------------|------------|--------|-------|-------------|
${p.opsIntelligence.capsules.map((c: any) => `| ${c.capsuleName} | ${c.complexity} | ${c.analyticDays} | ${c.pmoDays} | ${c.integrationMultiplier}x · ${c.volumeMultiplier}x | €${fmt(c.costBeforeMargin)} |`).join('\n')}
| **Subtotal** | | | | | **€${fmt(p.opsIntelligence.subtotal)}** |
${p.opsIntelligence.discountRate > 0 ? `| Descuento (${Math.round(p.opsIntelligence.discountRate * 100)}%) | | | | | -€${fmt(p.opsIntelligence.discount)} |` : ''}
| + Margen (${p.opsIntelligence.margin}%) | | | | | €${fmt(p.opsIntelligence.total - p.opsIntelligence.costBase)} |
| **TOTAL OpsIntelligence** | | | | | **€${fmt(p.opsIntelligence.total)}** |
` : 'No hay cápsulas aprobadas.'}

> *${p?.opsIntelligenceRange?.disclaimer || 'Rango indicativo.'}*

### 6.3 Estimación Indicativa: OpsScale (M4)

| Concepto | Volumen / mes | Tarifa | Subtotal |
|----------|---------------|--------|----------|
| Voz Agentic | ${p?.opsScale?.voiceAgentic?.hours || 0} h | €${p?.opsScale?.voiceAgentic?.rate?.toFixed(2) || '0.00'}/h | €${fmt(Math.round(p?.opsScale?.voiceAgentic?.cost || 0))} |
| Voz Humana | ${p?.opsScale?.voiceHuman?.hours || 0} h | €${p?.opsScale?.voiceHuman?.rate?.toFixed(2) || '0.00'}/h | €${fmt(Math.round(p?.opsScale?.voiceHuman?.cost || 0))} |
| Mensajería | ${(p?.opsScale?.messaging?.messages || 0).toLocaleString()} msgs | €${p?.opsScale?.messaging?.rate || '0.025'}/msg | €${fmt(Math.round(p?.opsScale?.messaging?.cost || 0))} |
| Fee Plataforma | — | — | €${fmt(p?.opsScale?.platformFee)} |
| **Coste base mensual** | | | **€${fmt(p?.opsScale?.costBase)}** |
| + Margen (${p?.opsScale?.margin || 0}%) | | | €${fmt(p?.opsScale?.monthly ? p.opsScale.monthly - p.opsScale.costBase : 0)} |
| **TOTAL MENSUAL** | | | **€${fmt(p?.opsScale?.monthly)}** |
| **TOTAL ANUAL** | | | **€${fmt(p?.opsScale?.annual)}** |

> *${p?.opsScaleMonthlyRange?.disclaimer || 'Rango indicativo.'}*

### 6.4 Resumen de Compromiso Progresivo

| Fase | Tipo | Inversión | Condición |
|------|------|-----------|-----------|
| **OpsFocus (M0)** | Firme | €${fmt(p?.committedInvestment)} | Compromiso actual |
| **OpsIntelligence (M1-M3)** | Indicativo | €${fmt(p?.opsIntelligenceRange?.low)} – €${fmt(p?.opsIntelligenceRange?.high)} | Post Gate #1 |
| **OpsScale (M4 anual)** | Indicativo | €${fmt(p?.opsScaleAnnualRange?.low)} – €${fmt(p?.opsScaleAnnualRange?.high)} | Post Gate #2 |
| **Total Año 1 (proyectado)** | Indicativo | €${fmt(p?.projectedTotalYear1Range?.low)} – €${fmt(p?.projectedTotalYear1Range?.high)} | Proyección completa |

### Comparativa vs BPO Tradicional

| Concepto | BPO Tradicional | Beyond Ops | Ahorro |
|----------|-----------------|------------|--------|
| Año 1 | €${fmt(p?.comparisonTraditionalBPO)} | €${fmt(p?.totalYear1)} | €${fmt(p?.savings)} |
| Payback | - | ${p?.paybackMonths || 'N/A'} meses | - |

---

## 7. Assumptions Ledger

### Supuestos Asumidos

${proposalData?.assumptions?.map((a: string, i: number) => (i + 1) + '. ' + a).join('\n') || 'No disponible'}

### Datos Faltantes

${proposalData?.missingData?.map((d: string, i: number) => (i + 1) + '. ' + d).join('\n') || 'No disponible'}

### Riesgos Identificados

${proposalData?.risks
  ?.map(
    (risk: any, i: number) => `
${i + 1}. **${risk.name}**
   - Impacto: ${risk.impact}
   - Probabilidad: ${risk.probability}
   - Mitigación: ${risk.mitigation}
`
  )
  .join('\n') || 'No disponible'}

---

## 8. Governance Model

${proposalData?.governanceModel || 'No disponible'}

---

## 9. Próximos Pasos

1. **Validación de propuesta** por parte de ${project.clientName}
2. **Kick-off OpsFocus (M0)** — Inicio del análisis operativo
3. **Presentación de cápsulas** identificadas y recomendaciones Go/No-Go
4. **Gate #1 — Decisión Go/No-Go**: ${project.clientName} decide si proceder a OpsIntelligence. En caso afirmativo, se formaliza presupuesto firme para M1-M3.
5. **Inicio de prototipos M1-M3** — Rediseño agentic de cápsulas aprobadas
6. **UAT y validación (M3)** — Validación con casos reales
7. **Gate #2 — Decisión Go/No-Go**: ${project.clientName} decide si proceder a OpsScale. En caso afirmativo, se formaliza fee mensual definitivo.
8. **Go-live OpsScale (M4)** — Operación productiva con SLAs

---

**Generado por Beyond Ops**
**BPO 2.0 - Operations Platform**

© 2026 Beyond Ops
`
}
