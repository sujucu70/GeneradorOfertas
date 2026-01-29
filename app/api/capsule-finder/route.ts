import { NextRequest, NextResponse } from 'next/server'
import { summarizeDocuments } from '@/lib/documentProcessor'
import { buildCapsuleFinderPrompt } from '@/lib/promptTemplates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { documents, notes, clientName } = body

    // Summarize documents
    const documentsSummary = summarizeDocuments(
      documents.map((doc: any) => ({
        name: doc.name,
        content: doc.content || '',
      }))
    )

    // Build prompt
    const prompt = buildCapsuleFinderPrompt(documentsSummary, notes, clientName)

    // In a real implementation, this would call OpenAI/Claude API
    // For MVP, we'll return mock data based on input
    const mockCapsules = generateMockCapsules(clientName, documentsSummary, notes)

    return NextResponse.json({
      success: true,
      data: {
        capsules: mockCapsules,
      },
    })
  } catch (error: any) {
    console.error('Capsule finder error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to analyze documents' },
      { status: 500 }
    )
  }
}

function generateMockCapsules(clientName: string, documents: string, notes: string) {
  // Extract some keywords from documents for more realistic mocks
  const hasCustomerService = documents.toLowerCase().includes('customer') || documents.toLowerCase().includes('cliente')
  const hasBackoffice = documents.toLowerCase().includes('backoffice') || documents.toLowerCase().includes('procesamiento')
  const hasEmail = documents.toLowerCase().includes('email') || documents.toLowerCase().includes('correo')

  const capsules = []

  if (hasCustomerService) {
    capsules.push({
      id: `cap-${Date.now()}-1`,
      name: 'Atención al Cliente - First Level Support',
      trigger: 'Cliente contacta por chat/email/voz con consulta o incidencia',
      outcome: 'Consulta resuelta o escalada correctamente según complejidad',
      customerPain: 'Tiempos de respuesta elevados y baja tasa de resolución en primer contacto',
      estimatedVolume: '5,000-8,000 interacciones/mes (por validar con cliente)',
      existingKPIs: ['CSAT', 'FCR', 'AHT'],
      missingData: ['Volumetría exacta por canal', 'Distribución de tipologías', 'Histórico de métricas'],
      complexity: 'Media' as const,
      priority: 'Alta' as const,
      recommendation: 'Go' as const,
      reasoning: 'Alto volumen estimado, proceso repetitivo con alta variabilidad, impacto directo en satisfacción del cliente',
    })
  }

  if (hasBackoffice) {
    capsules.push({
      id: `cap-${Date.now()}-2`,
      name: 'Backoffice - Procesamiento de Solicitudes',
      trigger: 'Recepción de solicitud de cliente (cambio de datos, facturación, etc.)',
      outcome: 'Solicitud procesada y confirmada al cliente',
      customerPain: 'Tiempo de procesamiento elevado, falta de visibilidad del estado',
      estimatedVolume: '2,000-3,000 solicitudes/mes (por validar)',
      existingKPIs: [],
      missingData: ['KPIs actuales', 'Tiempo medio de procesamiento', 'Tasa de errores'],
      complexity: 'Baja' as const,
      priority: 'Media' as const,
      recommendation: 'Go' as const,
      reasoning: 'Proceso estructurado y repetitivo, buen candidato para agentización',
    })
  }

  if (hasEmail) {
    capsules.push({
      id: `cap-${Date.now()}-3`,
      name: 'Gestión de Emails - Clasificación y Routing',
      trigger: 'Llegada de email a buzón genérico',
      outcome: 'Email clasificado y enrutado al departamento correcto',
      customerPain: 'Emails mal enrutados, respuestas lentas, saturación de buzones',
      estimatedVolume: '10,000-15,000 emails/mes (estimado)',
      existingKPIs: ['Tiempo de primera respuesta'],
      missingData: ['Tipología de emails', 'Tasa de re-enrutamiento', 'Métricas de saturación'],
      complexity: 'Baja' as const,
      priority: 'Media' as const,
      recommendation: 'Go' as const,
      reasoning: 'Alto volumen, tarea repetitiva con reglas claras, quick-win potencial',
    })
  }

  // Always add at least one more generic capsule
  capsules.push({
    id: `cap-${Date.now()}-4`,
    name: 'Gestión de Escalados - Seguimiento y Resolución',
    trigger: 'Caso escalado por primer nivel o sistema automático',
    outcome: 'Caso resuelto por especialista y feedback a cliente',
    customerPain: 'Falta de seguimiento de escalados, tiempos de resolución no controlados',
    estimatedVolume: 'Por validar (estimado 10-15% del volumen total)',
    existingKPIs: [],
    missingData: ['Volumetría de escalados', 'Motivos de escalado', 'SLA de resolución', 'Tasa de resolución'],
    complexity: 'Alta' as const,
    priority: 'Baja' as const,
    recommendation: 'No-Go' as const,
    reasoning: 'Alta complejidad, bajo volumen estimado, requiere especialización. Recomendado para fase posterior tras validar quick-wins',
  })

  return capsules
}
