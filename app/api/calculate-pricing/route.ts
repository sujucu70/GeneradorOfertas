import { NextRequest, NextResponse } from 'next/server'
import {
  PricingData,
  OpsFocusPricing,
  OpsIntelligencePricing,
  OpsScalePricing,
  CapsulePricing,
  UNIT_COSTS,
  IndicativeRange,
} from '@/types'

/**
 * POST /api/calculate-pricing
 *
 * Accepts the full set of editable inputs from the PricingCalculator
 * and returns a deterministic PricingData structure.
 *
 * Body:
 * - project            (Project with capsules + opsIntelligenceData)
 * - focusInputs        { analyticDays, consultingDays, directionDays }
 * - focusMargin        number
 * - capsuleDaysMap     Record<capsuleId, { analytic, pmo }>
 * - intelMargin        number
 * - scaleInputs        { voiceAgenticHours, voiceHumanHours, messagingVolume }
 * - scaleMargin        number
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      project,
      focusInputs,
      focusMargin,
      capsuleDaysMap,
      intelMargin,
      scaleInputs,
      scaleMargin,
    } = body

    const pricingData = calculatePricing(
      project,
      focusInputs,
      focusMargin,
      capsuleDaysMap,
      intelMargin,
      scaleInputs,
      scaleMargin,
    )

    return NextResponse.json({ success: true, data: { pricingData } })
  } catch (error: any) {
    console.error('Pricing calculation error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate pricing' },
      { status: 500 },
    )
  }
}

// ─── Engine ───

function calculatePricing(
  project: any,
  focusInputs: { analyticDays: number; consultingDays: number; directionDays: number },
  focusMargin: number,
  capsuleDaysMap: Record<string, { analytic: number; pmo: number }>,
  intelMargin: number,
  scaleInputs: { voiceAgenticHours: number; voiceHumanHours: number; messagingVolume: number },
  scaleMargin: number,
): PricingData {
  // ── OpsFocus (M0) ──
  const analyticCost = focusInputs.analyticDays * UNIT_COSTS.analyticDay
  const consultingCost = focusInputs.consultingDays * UNIT_COSTS.analyticDay
  const directionCost = focusInputs.directionDays * UNIT_COSTS.directionDay
  const focusCostBase = analyticCost + consultingCost + directionCost
  const focusTotal = focusCostBase + Math.round(focusCostBase * focusMargin / 100)

  const opsFocus: OpsFocusPricing = {
    analyticDays: focusInputs.analyticDays,
    consultingDays: focusInputs.consultingDays,
    directionDays: focusInputs.directionDays,
    analyticRate: UNIT_COSTS.analyticDay,
    consultingRate: UNIT_COSTS.analyticDay,
    directionRate: UNIT_COSTS.directionDay,
    costBase: focusCostBase,
    margin: focusMargin,
    total: focusTotal,
  }

  // ── OpsIntelligence (M1-M3) ──
  const approvedCapsules = project.capsules.filter((c: any) => c.recommendation === 'Go')

  const capsules: CapsulePricing[] = approvedCapsules.map((capsule: any) => {
    const days = capsuleDaysMap[capsule.id] || { analytic: 25, pmo: 8 }
    const opsData = project.opsIntelligenceData?.find((d: any) => d.capsuleId === capsule.id)

    const integrations = opsData?.integrations || 1
    const intMult = integrations <= 1 ? 1.0 : integrations <= 3 ? 1.15 : integrations <= 5 ? 1.3 : 1.5

    const volume = parseInt(capsule.estimatedVolume?.match(/\d+/)?.[0] || '1000')
    const volMult = volume < 1000 ? 1.0 : volume < 5000 ? 1.1 : volume < 20000 ? 1.2 : 1.3

    const dayCost = days.analytic * UNIT_COSTS.analyticDay + days.pmo * UNIT_COSTS.directionDay
    const adjustedCost = Math.round(dayCost * intMult * volMult)

    return {
      capsuleName: capsule.name,
      complexity: capsule.complexity,
      analyticDays: days.analytic,
      pmoDays: days.pmo,
      analyticRate: UNIT_COSTS.analyticDay,
      pmoRate: UNIT_COSTS.directionDay,
      baseCost: dayCost,
      integrationMultiplier: intMult,
      volumeMultiplier: volMult,
      costBeforeMargin: adjustedCost,
      totalCost: Math.round(adjustedCost * (1 + intelMargin / 100)),
    }
  })

  const subtotal = capsules.reduce((s, c) => s + c.costBeforeMargin, 0)
  const count = capsules.length
  const discountRate = count >= 6 ? 0.15 : count >= 4 ? 0.1 : count >= 2 ? 0.05 : 0
  const discount = Math.round(subtotal * discountRate)
  const intelCostBase = subtotal - discount
  const intelTotal = intelCostBase + Math.round(intelCostBase * intelMargin / 100)

  const opsIntelligence: OpsIntelligencePricing = {
    capsules,
    subtotal,
    discountRate,
    discount,
    costBase: intelCostBase,
    margin: intelMargin,
    total: intelTotal,
  }

  // ── OpsScale (M4) ──
  const { voiceAgenticHours, voiceHumanHours, messagingVolume } = scaleInputs
  const voiceAgenticCost = +(voiceAgenticHours * UNIT_COSTS.voiceAgenticHour).toFixed(2)
  const voiceHumanCost = +(voiceHumanHours * UNIT_COSTS.voiceHumanHour).toFixed(2)
  const messagingCost = +(messagingVolume * UNIT_COSTS.messagingUnit).toFixed(2)
  const scaleCostBase = Math.round(voiceAgenticCost + voiceHumanCost + messagingCost + UNIT_COSTS.platformFee)
  const scaleMonthly = scaleCostBase + Math.round(scaleCostBase * scaleMargin / 100)
  const scaleAnnual = scaleMonthly * 12

  const opsScale: OpsScalePricing = {
    voiceAgentic: { hours: voiceAgenticHours, rate: UNIT_COSTS.voiceAgenticHour, cost: voiceAgenticCost },
    voiceHuman: { hours: voiceHumanHours, rate: UNIT_COSTS.voiceHumanHour, cost: voiceHumanCost },
    messaging: { messages: messagingVolume, rate: UNIT_COSTS.messagingUnit, cost: messagingCost },
    platformFee: UNIT_COSTS.platformFee,
    costBase: scaleCostBase,
    margin: scaleMargin,
    monthly: scaleMonthly,
    annual: scaleAnnual,
  }

  // ── Aggregates ──
  const totalYear1 = focusTotal + intelTotal + scaleAnnual

  // BPO comparison
  const bpoMonthly = (voiceAgenticHours + voiceHumanHours) * 25 + messagingVolume * 0.05 + 5000
  const comparisonTraditionalBPO = Math.round(bpoMonthly * 12 + 75000)
  const savings = comparisonTraditionalBPO - totalYear1
  const paybackMonths = savings > 0 ? Math.ceil((focusTotal + intelTotal) / (savings / 12)) : 12

  // Progressive commitment ranges
  const mkRange = (ref: number, spread: number, disclaimer: string): IndicativeRange => ({
    low: Math.round(ref * (1 - spread)),
    high: Math.round(ref * (1 + spread)),
    certainty: 'indicativo',
    disclaimer,
  })

  const opsIntelligenceRange = mkRange(intelTotal, 0.25,
    'Rango indicativo. El presupuesto definitivo se elaborará tras completar OpsFocus (M0).')
  const opsScaleMonthlyRange = mkRange(scaleMonthly, 0.30,
    'Rango indicativo. El fee mensual definitivo se establecerá tras completar OpsIntelligence (M1-M3).')
  const opsScaleAnnualRange: IndicativeRange = {
    low: opsScaleMonthlyRange.low * 12,
    high: opsScaleMonthlyRange.high * 12,
    certainty: 'indicativo',
    disclaimer: opsScaleMonthlyRange.disclaimer,
  }
  const projectedTotalYear1Range: IndicativeRange = {
    low: focusTotal + opsIntelligenceRange.low + opsScaleAnnualRange.low,
    high: focusTotal + opsIntelligenceRange.high + opsScaleAnnualRange.high,
    certainty: 'indicativo',
    disclaimer: 'Proyección indicativa del coste total Año 1. Solo OpsFocus (M0) es firme.',
  }

  return {
    opsFocus,
    opsIntelligence,
    opsScale,
    totalYear1,
    comparisonTraditionalBPO,
    savings,
    paybackMonths,
    committedInvestment: focusTotal,
    opsIntelligenceRange,
    opsScaleMonthlyRange,
    opsScaleAnnualRange,
    projectedTotalYear1Range,
  }
}
