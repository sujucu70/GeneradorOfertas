import { NextRequest, NextResponse } from 'next/server'
import { buildOpsIntelligencePrompt } from '@/lib/promptTemplates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { capsules, clientName } = body

    // Build prompt
    const prompt = buildOpsIntelligencePrompt(capsules, clientName)

    // In a real implementation, this would call OpenAI/Claude API
    // For MVP, we'll return mock data
    const mockOpsData = generateMockOpsIntelligence(capsules)

    return NextResponse.json({
      success: true,
      data: {
        opsIntelligenceData: mockOpsData,
      },
    })
  } catch (error: any) {
    console.error('OpsIntelligence error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate OpsIntelligence' },
      { status: 500 }
    )
  }
}

function generateMockOpsIntelligence(capsules: any[]) {
  return capsules.map((capsule) => {
    const complexityMap = {
      Baja: { integrations: 1, costCurrent: 5000, costProjected: 2000 },
      Media: { integrations: 3, costCurrent: 10000, costProjected: 4500 },
      Alta: { integrations: 5, costCurrent: 20000, costProjected: 10000 },
    }

    const config = complexityMap[capsule.complexity as keyof typeof complexityMap]

    const savings = (config.costCurrent - config.costProjected) * 12
    const investmentEstimate = capsule.complexity === 'Baja' ? 15000 : capsule.complexity === 'Media' ? 25000 : 40000
    const payback = Math.ceil(investmentEstimate / (savings / 12))
    const roi = Math.round((savings / investmentEstimate) * 100)

    return {
      capsuleId: capsule.id,
      capsuleName: capsule.name,
      complexity: capsule.complexity,
      integrations: config.integrations,
      agenticTasks: [
        'Recepción y validación inicial de datos de entrada',
        'Clasificación automática según tipología y prioridad',
        'Ejecución de acciones estándar según reglas de negocio',
        'Generación de respuestas basadas en knowledge base',
        'Registro y trazabilidad de operaciones',
      ].slice(0, capsule.complexity === 'Baja' ? 3 : capsule.complexity === 'Media' ? 4 : 5),
      exceptions: [
        'Caso fuera de parámetros estándar (variables >3 desviaciones)',
        'Cliente identificado como VIP o con historial de reclamaciones',
        'Operación con impacto económico >€500',
      ].slice(0, capsule.complexity === 'Baja' ? 2 : 3),
      humanSupervision: [
        'Validación de decisiones con impacto financiero/legal',
        'Revisión de casos con sentimiento negativo detectado',
        'Aprobación de excepciones fuera de rango',
        'Escalado a especialista en situaciones complejas',
      ].slice(0, capsule.complexity === 'Baja' ? 2 : capsule.complexity === 'Media' ? 3 : 4),
      controlKPIs: [
        'Tasa de auto-resolución agentic (target: >70%)',
        'Accuracy de clasificación (target: >95%)',
        'Tiempo medio de procesamiento (target: <2min)',
        'Tasa de escalado a humano (target: <20%)',
        'Satisfacción en UAT (target: >4/5)',
      ],
      m1Architecture: `Diseño de arquitectura técnica incluyendo ${config.integrations} integración(es) con sistemas del cliente (CRM/ERP), definición de API contracts, setup de entorno de desarrollo y configuración de infraestructura cloud.`,
      m2Configuration: `Configuración de flujos operativos completos, diseño de prompts y knowledge base específica del proceso, setup de reglas de negocio y umbrales de escalado, configuración de agentes operativos.`,
      m3Validation: `Ejecución de UAT con 50+ casos de prueba reales, recolección de feedback del equipo del cliente, refinamiento iterativo de prompts y flujos, validación de KPIs de control, preparación de documentación de handover.`,
      businessCase: {
        currentCost: config.costCurrent,
        projectedCost: config.costProjected,
        estimatedSavings: savings,
        paybackMonths: payback,
        roi12Months: roi,
      },
    }
  })
}
