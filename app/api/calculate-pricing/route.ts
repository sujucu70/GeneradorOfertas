import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { project, margin, opsScaleInputs } = body

    const pricingData = calculatePricing(project, margin, opsScaleInputs)

    return NextResponse.json({
      success: true,
      data: {
        pricingData,
      },
    })
  } catch (error: any) {
    console.error('Pricing calculation error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate pricing' },
      { status: 500 }
    )
  }
}

function calculatePricing(project: any, margin: number, opsScaleInputs: any) {
  // OpsFocus calculation
  const numProcesses = project.capsules.length
  const analyticDays = 2 + numProcesses * 0.5
  const consultingDays = 1 + numProcesses * 0.3
  const directionDays = 1

  const opsFocusCostBase = analyticDays * 800 + consultingDays * 1200 + directionDays * 1500
  const opsFocusCost = Math.round(opsFocusCostBase * (1 + margin / 100))

  // OpsIntelligence calculation
  const approvedCapsules = project.capsules.filter((c: any) => c.recommendation === 'Go')
  const opsIntelligenceBreakdown = approvedCapsules.map((capsule: any) => {
    const complexityMap: { [key: string]: number } = {
      Baja: 15000,
      Media: 24000,
      Alta: 40000,
    }
    const complexityBase = complexityMap[capsule.complexity]

    // Find corresponding opsIntelligence data
    const opsData = project.opsIntelligenceData.find(
      (d: any) => d.capsuleId === capsule.id
    )

    const integrations = opsData?.integrations || 1
    const integrationMultiplier = integrations === 1 ? 1.0 : integrations <= 3 ? 1.15 : integrations <= 5 ? 1.3 : 1.5

    const volume = parseInt(capsule.estimatedVolume.match(/\d+/)?.[0] || '1000')
    const volumeMultiplier = volume < 1000 ? 1.0 : volume < 5000 ? 1.1 : volume < 20000 ? 1.2 : 1.3

    const baseCost = complexityBase
    const totalCost = Math.round(baseCost * integrationMultiplier * volumeMultiplier * (1 + margin / 100))

    return {
      capsuleName: capsule.name,
      complexity: capsule.complexity,
      baseCost,
      integrationMultiplier,
      volumeMultiplier,
      totalCost,
    }
  })

  const opsIntelligenceCost = opsIntelligenceBreakdown.reduce((sum: number, item: any) => sum + item.totalCost, 0)

  // Apply volume discount
  const capsuleCount = opsIntelligenceBreakdown.length
  const discount = capsuleCount >= 6 ? 0.15 : capsuleCount >= 4 ? 0.1 : capsuleCount >= 2 ? 0.05 : 0
  const opsIntelligenceCostFinal = Math.round(opsIntelligenceCost * (1 - discount))

  // OpsScale calculation
  const { voiceAgentic, voiceHuman, messagingAgentic, messagingHuman, transactions, pmoLevel } = opsScaleInputs

  const voiceAgenticRate = 0.4
  const voiceHumanRate = 2.0
  const messagingAgenticRate = 0.3
  const messagingHumanRate = 1.25
  const transactionsRate = 1.5

  const voiceAgenticTotal = voiceAgentic * voiceAgenticRate
  const voiceHumanTotal = voiceHuman * voiceHumanRate
  const messagingAgenticTotal = messagingAgentic * messagingAgenticRate
  const messagingHumanTotal = messagingHuman * messagingHumanRate
  const transactionsTotal = transactions * transactionsRate

  const totalVolume = voiceAgentic + voiceHuman + messagingAgentic + messagingHuman + transactions
  const platformFee = totalVolume < 5000 ? 2500 : totalVolume < 20000 ? 5000 : totalVolume < 50000 ? 8000 : totalVolume < 100000 ? 12000 : 15000

  const pmoFeeMap: { [key: string]: number } = {
    'Básico': 2500,
    'Estándar': 4000,
    'Premium': 6500,
  }
  const pmoFee = pmoFeeMap[pmoLevel]

  const opsScaleMonthly = Math.round(
    voiceAgenticTotal +
      voiceHumanTotal +
      messagingAgenticTotal +
      messagingHumanTotal +
      transactionsTotal +
      platformFee +
      pmoFee
  )

  const opsScaleAnnual = opsScaleMonthly * 12

  // Total Year 1
  const totalYear1 = opsFocusCost + opsIntelligenceCostFinal + opsScaleAnnual

  // Comparison with traditional BPO
  const avgCostPerOp = 2.5 // Traditional BPO avg cost
  const traditionalBPOYearly = totalVolume * avgCostPerOp * 12
  const setupTraditional = 75000
  const comparisonTraditionalBPO = Math.round(traditionalBPOYearly + setupTraditional)

  const savings = comparisonTraditionalBPO - totalYear1
  const paybackMonths = savings > 0 ? Math.ceil((opsFocusCost + opsIntelligenceCostFinal) / (savings / 12)) : 12

  return {
    opsFocusCost,
    opsIntelligenceCost: opsIntelligenceCostFinal,
    opsIntelligenceBreakdown,
    opsScaleMonthly,
    opsScaleAnnual,
    opsScaleBreakdown: {
      voiceAgentic: {
        volume: voiceAgentic,
        rate: voiceAgenticRate,
        total: Math.round(voiceAgenticTotal),
      },
      voiceHuman: {
        volume: voiceHuman,
        rate: voiceHumanRate,
        total: Math.round(voiceHumanTotal),
      },
      messagingAgentic: {
        volume: messagingAgentic,
        rate: messagingAgenticRate,
        total: Math.round(messagingAgenticTotal),
      },
      messagingHuman: {
        volume: messagingHuman,
        rate: messagingHumanRate,
        total: Math.round(messagingHumanTotal),
      },
      transactions: {
        volume: transactions,
        rate: transactionsRate,
        total: Math.round(transactionsTotal),
      },
      platformFee,
      pmoFee,
      monthlyTotal: opsScaleMonthly,
    },
    totalYear1,
    margin,
    comparisonTraditionalBPO,
    savings,
    paybackMonths,
  }
}
