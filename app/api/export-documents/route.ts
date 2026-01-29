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
      // PDF export would require a library like puppeteer or pdfkit
      // For MVP, we'll return markdown as fallback
      return NextResponse.json(
        { success: false, error: 'PDF export not implemented in MVP' },
        { status: 501 }
      )
    }
  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to export documents' },
      { status: 500 }
    )
  }
}

function generateMarkdownExport(project: any): string {
  const { proposalData, pricingData } = project

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
  .map(
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
  .map(
    (capsule: any, i: number) => `
### ${i + 1}. ${capsule.name}

${capsule.description}

**Volumetría:** ${capsule.volumetrics}

**KPIs Objetivo:**
${capsule.targetKPIs.map((kpi: any) => `- ${kpi.metric}: ${kpi.target}`).join('\n')}
`
  )
  .join('\n') || 'No disponible'}

---

## 4. Impacto Esperado

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| CSAT | ${proposalData?.impactMetrics.currentCSAT} | ${proposalData?.impactMetrics.targetCSAT} |
| FCR | ${proposalData?.impactMetrics.currentFCR} | ${proposalData?.impactMetrics.targetFCR} |
| AHT | ${proposalData?.impactMetrics.currentAHT} | ${proposalData?.impactMetrics.targetAHT} |
| Reducción de Costes | - | ${proposalData?.impactMetrics.costReduction} |

---

## 5. Pricing

### Resumen de Inversión

| Servicio | Coste |
|----------|-------|
| **OpsFocus (M0)** | €${pricingData?.opsFocusCost.toLocaleString()} |
| **OpsIntelligence (M1-M3)** | €${pricingData?.opsIntelligenceCost.toLocaleString()} |
| **OpsScale (mensual)** | €${pricingData?.opsScaleMonthly.toLocaleString()}/mes |
| **OpsScale (anual)** | €${pricingData?.opsScaleAnnual.toLocaleString()} |
| **TOTAL AÑO 1** | **€${pricingData?.totalYear1.toLocaleString()}** |

### Comparativa vs BPO Tradicional

| Concepto | BPO Tradicional | Beyond OpsScale | Ahorro |
|----------|-----------------|-----------------|--------|
| Año 1 | €${pricingData?.comparisonTraditionalBPO.toLocaleString()} | €${pricingData?.totalYear1.toLocaleString()} | €${pricingData?.savings.toLocaleString()} |
| Payback | - | ${pricingData?.paybackMonths} meses | - |

---

## 6. Assumptions Ledger

### Supuestos Asumidos

${proposalData?.assumptions.map((a: string, i: number) => `${i + 1}. ${a}`).join('\n') || 'No disponible'}

### Datos Faltantes

${proposalData?.missingData.map((d: string, i: number) => `${i + 1}. ${d}`).join('\n') || 'No disponible'}

### Riesgos Identificados

${proposalData?.risks
  .map(
    (risk: any, i: number) => `
${i + 1}. **${risk.name}**
   - Impacto: ${risk.impact}
   - Probabilidad: ${risk.probability}
   - Mitigación: ${risk.mitigation}
`
  )
  .join('\n') || 'No disponible'}

---

## 7. Governance Model

${proposalData?.governanceModel || 'No disponible'}

---

## 8. Próximos Pasos

1. Validación de propuesta por parte de ${project.clientName}
2. Kick-off OpsFocus (M0)
3. Presentación de cápsulas identificadas
4. Decisión Go/No-Go para OpsIntelligence
5. Inicio de prototipos M1-M3
6. UAT y validación
7. Go-live OpsScale (M4)

---

**Generado por Beyond Ops**
**BPO 2.0 - Operations Platform**

© 2026 Beyond Ops
`
}
