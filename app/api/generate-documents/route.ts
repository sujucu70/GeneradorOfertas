import { NextRequest, NextResponse } from 'next/server'
import { buildProposalPrompt } from '@/lib/promptTemplates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { project } = body

    // Build prompt
    const prompt = buildProposalPrompt(project)

    // In a real implementation, this would call OpenAI/Claude API
    // For MVP, we'll return mock data
    const mockProposal = generateMockProposal(project)

    return NextResponse.json({
      success: true,
      data: {
        proposalData: mockProposal,
      },
    })
  } catch (error: any) {
    console.error('Document generation error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate documents' },
      { status: 500 }
    )
  }
}

function generateMockProposal(project: any) {
  const capsuleCount = project.capsules.filter((c: any) => c.recommendation === 'Go').length

  return {
    executiveSummary: `${project.clientName} enfrenta desafíos operativos en ${capsuleCount} procesos críticos de atención al cliente y backoffice que impactan directamente en costes operativos y satisfacción del cliente. Los principales pain points identificados incluyen tiempos de respuesta elevados, falta de control de volumetría y ausencia de métricas operativas consistentes.

Beyond Ops propone un modelo de responsabilidad operativa progresiva que permite escalar ${capsuleCount} cápsulas operativas de forma controlada, basada en datos y con gobierno permanente. Este enfoque BPO 2.0 combina agentización inteligente de tareas repetitivas con supervisión humana estratégica, manteniendo el control total del proceso.

Se estima una reducción de costes operativos del 30-50% en el primer año, con mejora significativa en KPIs clave (CSAT, FCR, AHT) y tiempo de implementación de 2-3 meses vs 6-12 meses del BPO tradicional.`,

    painPoints: [
      {
        title: 'Tiempos de respuesta elevados y CSAT por debajo de objetivo',
        description: 'El tiempo medio de primera respuesta supera las expectativas del cliente, impactando negativamente en CSAT y generando escalados innecesarios',
        impact: 'CSAT actual estimado en 3.5/5, con tendencia a la baja en últimos trimestres',
        rootCause: 'Sobrecarga del equipo de primer nivel, falta de herramientas de clasificación automática, ausencia de knowledge base actualizada',
      },
      {
        title: 'Baja tasa de resolución en primer contacto (FCR)',
        description: 'Alto porcentaje de casos requieren múltiples interacciones o escalado a segundo nivel, incrementando costes y frustración del cliente',
        impact: 'FCR estimado <60%, generando 40% de re-work operativo',
        rootCause: 'Falta de información contextual en primer nivel, procesos de escalado no optimizados, ausencia de seguimiento',
      },
      {
        title: 'Ausencia de métricas operativas y visibilidad en tiempo real',
        description: 'Falta de dashboards operativos y reporting consistente dificulta la toma de decisiones y la detección temprana de problemas',
        impact: 'Decisiones reactivas en lugar de proactivas, imposibilidad de optimización continua',
        rootCause: 'Sistemas legacy sin capacidades de reporting, datos dispersos en múltiples fuentes',
      },
    ],

    capsuleSummaries: project.capsules
      .filter((c: any) => c.recommendation === 'Go')
      .map((capsule: any) => ({
        name: capsule.name,
        description: `Proceso operativo que gestiona ${capsule.trigger.toLowerCase()}, con objetivo de ${capsule.outcome.toLowerCase()}. Resuelve el pain point de ${capsule.customerPain.toLowerCase()}.`,
        volumetrics: capsule.estimatedVolume,
        targetKPIs: [
          { metric: 'CSAT', target: '4.5/5' },
          { metric: 'FCR', target: '>80%' },
          { metric: 'Tiempo de Resolución', target: '<2h' },
          { metric: 'Coste por Operación', target: '-40%' },
        ],
      })),

    impactMetrics: {
      currentCSAT: '3.5/5',
      targetCSAT: '4.5/5',
      currentFCR: '60%',
      targetFCR: '85%',
      currentAHT: '8 min',
      targetAHT: '4 min',
      costReduction: '35-45% vs operación actual',
    },

    governanceModel: `Estructura de gobierno basada en dos niveles: (1) Comité Operativo semanal enfocado en KPIs, incidencias y ajustes tácticos, con participación de Operations Lead Beyond Ops y Operations Manager del cliente; (2) Comité Estratégico mensual para revisión de métricas globales, decisiones de escalado y cambios de alcance, con Director Beyond Ops y Sponsor del cliente. Dashboard operativo en tiempo real 24/7 accesible para el cliente, con alertas automáticas de desviaciones. Revisión trimestral de contrato para ajustes de volumetría y optimizaciones.`,

    assumptions: [
      `Volumen mensual estimado en ${project.capsules.reduce((acc: number, c: any) => acc + (c.estimatedVolume.match(/\d+/) ? parseInt(c.estimatedVolume.match(/\d+/)[0]) : 0), 0).toLocaleString()} operaciones tiene desviación <10%`,
      'Cliente proveerá accesos a sistemas necesarios en plazo de 1 semana desde kick-off',
      'Documentación de procesos y APIs está disponible o será proporcionada durante M1',
      'Equipo del cliente tiene disponibilidad para participar en UAT durante M3',
      'No hay cambios mayores en sistemas core del cliente durante implementación',
    ],

    missingData: [
      'Histórico detallado de métricas operativas (CSAT, FCR, AHT) de últimos 12 meses',
      'Distribución exacta de volumetría por canal (voz/chat/email) y por tipología',
      'Costes operativos actuales desglosados por proceso',
      'Documentación técnica de sistemas legacy y APIs disponibles',
      'SLAs actuales comprometidos con clientes finales',
    ],

    risks: [
      {
        name: 'Retraso en provisión de accesos técnicos',
        impact: 'Medio' as const,
        probability: 'Media' as const,
        mitigation: 'Incluir buffer de 1 semana en planning, solicitar accesos pre-kick-off, tener entorno de desarrollo mock preparado',
      },
      {
        name: 'Volumetría real supera estimaciones en >20%',
        impact: 'Alto' as const,
        probability: 'Baja' as const,
        mitigation: 'Tabla de excesos definida en contrato, revisión mensual de volumetría, escalado progresivo de capacidad',
      },
      {
        name: 'UAT no aprobado en primer intento',
        impact: 'Medio' as const,
        probability: 'Baja' as const,
        mitigation: 'Criterios de aceptación definidos pre-UAT, iteración adicional incluida en M3, validaciones progresivas durante M2',
      },
    ],
  }
}
