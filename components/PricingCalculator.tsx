'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  Project,
  PricingData,
  CapsulePricing,
  UNIT_COSTS,
  IndicativeRange,
} from '@/types'
import styles from './PricingCalculator.module.css'

// ─── Default days per complexity for OpsIntelligence ───
const COMPLEXITY_DAYS: Record<string, { analytic: number; pmo: number }> = {
  Baja: { analytic: 15, pmo: 5 },
  Media: { analytic: 25, pmo: 8 },
  Alta: { analytic: 40, pmo: 12 },
}

interface Props {
  project: Project
  setProject: (project: Project) => void
  onNext: () => void
  onBack: () => void
}

export default function PricingCalculator({ project, setProject, onNext, onBack }: Props) {
  const approvedCapsules = project.capsules.filter(c => c.recommendation === 'Go')
  const numCapsules = project.capsules.length

  // ═══════════════════════════════════════
  //  EDITABLE STATE – OpsFocus (M0)
  // ═══════════════════════════════════════
  const [focusAnalyticDays, setFocusAnalyticDays] = useState(Math.ceil(2 + numCapsules * 0.5))
  const [focusConsultingDays, setFocusConsultingDays] = useState(Math.ceil(1 + numCapsules * 0.3))
  const [focusDirectionDays, setFocusDirectionDays] = useState(1)
  const [focusMargin, setFocusMargin] = useState(35)

  // ═══════════════════════════════════════
  //  EDITABLE STATE – OpsIntelligence (M1-M3)
  // ═══════════════════════════════════════
  const [capsuleDaysMap, setCapsuleDaysMap] = useState<Record<string, { analytic: number; pmo: number }>>({})
  const [intelMargin, setIntelMargin] = useState(40)

  // ═══════════════════════════════════════
  //  EDITABLE STATE – OpsScale (M4)
  // ═══════════════════════════════════════
  const [voiceAgenticHours, setVoiceAgenticHours] = useState(200)
  const [voiceHumanHours, setVoiceHumanHours] = useState(50)
  const [messagingVolume, setMessagingVolume] = useState(100000)
  const [scaleMargin, setScaleMargin] = useState(45)

  // ─── Initialise capsule days from complexity defaults ───
  useEffect(() => {
    const initial: Record<string, { analytic: number; pmo: number }> = {}
    approvedCapsules.forEach(capsule => {
      const defaults = COMPLEXITY_DAYS[capsule.complexity] || COMPLEXITY_DAYS['Media']
      initial[capsule.id] = { ...defaults }
    })
    setCapsuleDaysMap(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCapsuleDays = useCallback(
    (capsuleId: string, field: 'analytic' | 'pmo', value: number) => {
      setCapsuleDaysMap(prev => ({
        ...prev,
        [capsuleId]: { ...prev[capsuleId], [field]: Math.max(0, value) },
      }))
    },
    [],
  )

  // ═══════════════════════════════════════
  //  COMPUTED – OpsFocus
  // ═══════════════════════════════════════
  const focusCalc = useMemo(() => {
    const analyticCost = focusAnalyticDays * UNIT_COSTS.analyticDay
    const consultingCost = focusConsultingDays * UNIT_COSTS.analyticDay
    const directionCost = focusDirectionDays * UNIT_COSTS.directionDay
    const costBase = analyticCost + consultingCost + directionCost
    const marginAmt = Math.round(costBase * focusMargin / 100)
    const total = costBase + marginAmt
    return { analyticCost, consultingCost, directionCost, costBase, marginAmt, total }
  }, [focusAnalyticDays, focusConsultingDays, focusDirectionDays, focusMargin])

  // ═══════════════════════════════════════
  //  COMPUTED – OpsIntelligence
  // ═══════════════════════════════════════
  const intelCalc = useMemo(() => {
    const capsules = approvedCapsules.map(capsule => {
      const days = capsuleDaysMap[capsule.id] || COMPLEXITY_DAYS[capsule.complexity] || COMPLEXITY_DAYS['Media']
      const opsData = project.opsIntelligenceData.find(d => d.capsuleId === capsule.id)

      const integrations = opsData?.integrations || 1
      const intMult = integrations <= 1 ? 1.0 : integrations <= 3 ? 1.15 : integrations <= 5 ? 1.3 : 1.5

      const volume = parseInt(capsule.estimatedVolume.match(/\d+/)?.[0] || '1000')
      const volMult = volume < 1000 ? 1.0 : volume < 5000 ? 1.1 : volume < 20000 ? 1.2 : 1.3

      const dayCost = days.analytic * UNIT_COSTS.analyticDay + days.pmo * UNIT_COSTS.directionDay
      const adjustedCost = Math.round(dayCost * intMult * volMult)

      return {
        capsuleName: capsule.name,
        capsuleId: capsule.id,
        complexity: capsule.complexity,
        analyticDays: days.analytic,
        pmoDays: days.pmo,
        intMult,
        volMult,
        dayCost,
        adjustedCost,
      }
    })

    const subtotal = capsules.reduce((s, c) => s + c.adjustedCost, 0)
    const count = capsules.length
    const discountRate = count >= 6 ? 0.15 : count >= 4 ? 0.1 : count >= 2 ? 0.05 : 0
    const discount = Math.round(subtotal * discountRate)
    const costBase = subtotal - discount
    const marginAmt = Math.round(costBase * intelMargin / 100)
    const total = costBase + marginAmt

    return { capsules, subtotal, discountRate, discount, costBase, marginAmt, total }
  }, [capsuleDaysMap, intelMargin, approvedCapsules, project.opsIntelligenceData])

  // ═══════════════════════════════════════
  //  COMPUTED – OpsScale
  // ═══════════════════════════════════════
  const scaleCalc = useMemo(() => {
    const voiceAgenticCost = +(voiceAgenticHours * UNIT_COSTS.voiceAgenticHour).toFixed(2)
    const voiceHumanCost = +(voiceHumanHours * UNIT_COSTS.voiceHumanHour).toFixed(2)
    const messagingCost = +(messagingVolume * UNIT_COSTS.messagingUnit).toFixed(2)
    const costBase = Math.round(voiceAgenticCost + voiceHumanCost + messagingCost + UNIT_COSTS.platformFee)
    const marginAmt = Math.round(costBase * scaleMargin / 100)
    const monthly = costBase + marginAmt
    const annual = monthly * 12
    return { voiceAgenticCost, voiceHumanCost, messagingCost, costBase, marginAmt, monthly, annual }
  }, [voiceAgenticHours, voiceHumanHours, messagingVolume, scaleMargin])

  // ═══════════════════════════════════════
  //  AGGREGATES
  // ═══════════════════════════════════════
  const totalYear1 = focusCalc.total + intelCalc.total + scaleCalc.annual

  const committedInvestment = focusCalc.total

  const mkRange = (ref: number, spread: number, disclaimer: string): IndicativeRange => ({
    low: Math.round(ref * (1 - spread)),
    high: Math.round(ref * (1 + spread)),
    certainty: 'indicativo',
    disclaimer,
  })

  const opsIntelligenceRange = mkRange(
    intelCalc.total, 0.25,
    'Rango indicativo. El presupuesto definitivo se elaborará tras completar OpsFocus (M0), en función del número y complejidad de las cápsulas aprobadas.',
  )
  const opsScaleMonthlyRange = mkRange(
    scaleCalc.monthly, 0.30,
    'Rango indicativo. El fee mensual definitivo se establecerá tras completar OpsIntelligence (M1-M3), en función de los volúmenes validados.',
  )
  const opsScaleAnnualRange: IndicativeRange = {
    low: opsScaleMonthlyRange.low * 12,
    high: opsScaleMonthlyRange.high * 12,
    certainty: 'indicativo',
    disclaimer: opsScaleMonthlyRange.disclaimer,
  }
  const projectedTotalYear1Range: IndicativeRange = {
    low: committedInvestment + opsIntelligenceRange.low + opsScaleAnnualRange.low,
    high: committedInvestment + opsIntelligenceRange.high + opsScaleAnnualRange.high,
    certainty: 'indicativo',
    disclaimer: 'Proyección indicativa del coste total Año 1. Solo OpsFocus (M0) es firme.',
  }

  // BPO comparison: all voice at human rate (€25/h), messaging at €0.05, platform €5k, setup €75k
  const bpoMonthly = (voiceAgenticHours + voiceHumanHours) * 25 + messagingVolume * 0.05 + 5000
  const comparisonTraditionalBPO = Math.round(bpoMonthly * 12 + 75000)
  const savings = comparisonTraditionalBPO - totalYear1
  const paybackMonths = savings > 0 ? Math.ceil((focusCalc.total + intelCalc.total) / (savings / 12)) : 12

  // ─── Build PricingData & persist ───
  const buildPricingData = useCallback((): PricingData => ({
    opsFocus: {
      analyticDays: focusAnalyticDays,
      consultingDays: focusConsultingDays,
      directionDays: focusDirectionDays,
      analyticRate: UNIT_COSTS.analyticDay,
      consultingRate: UNIT_COSTS.analyticDay,
      directionRate: UNIT_COSTS.directionDay,
      costBase: focusCalc.costBase,
      margin: focusMargin,
      total: focusCalc.total,
    },
    opsIntelligence: {
      capsules: intelCalc.capsules.map(c => ({
        capsuleName: c.capsuleName,
        complexity: c.complexity,
        analyticDays: c.analyticDays,
        pmoDays: c.pmoDays,
        analyticRate: UNIT_COSTS.analyticDay,
        pmoRate: UNIT_COSTS.directionDay,
        baseCost: c.dayCost,
        integrationMultiplier: c.intMult,
        volumeMultiplier: c.volMult,
        costBeforeMargin: c.adjustedCost,
        totalCost: Math.round(c.adjustedCost * (1 + intelMargin / 100)),
      })),
      subtotal: intelCalc.subtotal,
      discountRate: intelCalc.discountRate,
      discount: intelCalc.discount,
      costBase: intelCalc.costBase,
      margin: intelMargin,
      total: intelCalc.total,
    },
    opsScale: {
      voiceAgentic: { hours: voiceAgenticHours, rate: UNIT_COSTS.voiceAgenticHour, cost: scaleCalc.voiceAgenticCost },
      voiceHuman: { hours: voiceHumanHours, rate: UNIT_COSTS.voiceHumanHour, cost: scaleCalc.voiceHumanCost },
      messaging: { messages: messagingVolume, rate: UNIT_COSTS.messagingUnit, cost: scaleCalc.messagingCost },
      platformFee: UNIT_COSTS.platformFee,
      costBase: scaleCalc.costBase,
      margin: scaleMargin,
      monthly: scaleCalc.monthly,
      annual: scaleCalc.annual,
    },
    totalYear1,
    comparisonTraditionalBPO,
    savings,
    paybackMonths,
    committedInvestment,
    opsIntelligenceRange,
    opsScaleMonthlyRange,
    opsScaleAnnualRange,
    projectedTotalYear1Range,
  }), [
    focusAnalyticDays, focusConsultingDays, focusDirectionDays, focusMargin,
    focusCalc, intelCalc, intelMargin,
    voiceAgenticHours, voiceHumanHours, messagingVolume, scaleMargin, scaleCalc,
    totalYear1, comparisonTraditionalBPO, savings, paybackMonths,
    committedInvestment, opsIntelligenceRange, opsScaleMonthlyRange,
    opsScaleAnnualRange, projectedTotalYear1Range,
  ])

  const handleContinue = () => {
    setProject({ ...project, pricingData: buildPricingData() })
    onNext()
  }

  // ═══════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════
  return (
    <div className="card fade-in">
      <h2>7. Calculadora de Pricing</h2>
      <p className={styles.description}>
        Motor de pricing por servicio Beyond Ops. Edita jornadas, volúmenes y márgenes para cada fase.
      </p>

      {/* ── Unit Cost Reference ── */}
      <div className={styles.unitCostRef}>
        <h4>Costes Unitarios de Referencia</h4>
        <div className={styles.unitCostGrid}>
          <span>Jornada analítica / consultoría: <strong>€{UNIT_COSTS.analyticDay}</strong></span>
          <span>Jornada dirección / PMO: <strong>€{UNIT_COSTS.directionDay}</strong></span>
          <span>Hora voz agentic: <strong>€{UNIT_COSTS.voiceAgenticHour.toFixed(2)}</strong></span>
          <span>Hora voz humana: <strong>€{UNIT_COSTS.voiceHumanHour.toFixed(2)}</strong></span>
          <span>Mensaje: <strong>€{UNIT_COSTS.messagingUnit}</strong></span>
          <span>Fee plataforma: <strong>€{UNIT_COSTS.platformFee.toLocaleString()}/mes</strong></span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
           SECTION 1 – OpsFocus (M0)
         ══════════════════════════════════════════ */}
      <div className={styles.serviceSection}>
        <div className={styles.serviceHeader}>
          <h3>1. OpsFocus (M0)</h3>
          <span className={styles.billingModel}>One-shot · Jornadas de consultoría</span>
        </div>

        <div className={styles.marginControl}>
          <label>Margen OpsFocus</label>
          <input type="range" min={0} max={80} value={focusMargin}
            onChange={e => setFocusMargin(Number(e.target.value))} />
          <span className={styles.marginValue}>{focusMargin}%</span>
        </div>

        <table className={styles.lineItemTable}>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Jornadas</th>
              <th>Tarifa</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jornadas analítica</td>
              <td>
                <input type="number" min={0} className={styles.inlineInput}
                  value={focusAnalyticDays}
                  onChange={e => setFocusAnalyticDays(Math.max(0, Number(e.target.value)))} />
              </td>
              <td>€{UNIT_COSTS.analyticDay}</td>
              <td>€{focusCalc.analyticCost.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Jornadas consultoría</td>
              <td>
                <input type="number" min={0} className={styles.inlineInput}
                  value={focusConsultingDays}
                  onChange={e => setFocusConsultingDays(Math.max(0, Number(e.target.value)))} />
              </td>
              <td>€{UNIT_COSTS.analyticDay}</td>
              <td>€{focusCalc.consultingCost.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Jornadas dirección / PMO</td>
              <td>
                <input type="number" min={0} className={styles.inlineInput}
                  value={focusDirectionDays}
                  onChange={e => setFocusDirectionDays(Math.max(0, Number(e.target.value)))} />
              </td>
              <td>€{UNIT_COSTS.directionDay}</td>
              <td>€{focusCalc.directionCost.toLocaleString()}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className={styles.subtotalRow}>
              <td colSpan={3}>Coste base</td>
              <td>€{focusCalc.costBase.toLocaleString()}</td>
            </tr>
            <tr className={styles.subtotalRow}>
              <td colSpan={3}>+ Margen ({focusMargin}%)</td>
              <td>€{focusCalc.marginAmt.toLocaleString()}</td>
            </tr>
            <tr className={styles.totalRow}>
              <td colSpan={3}><strong>TOTAL OpsFocus</strong></td>
              <td><strong>€{focusCalc.total.toLocaleString()}</strong></td>
            </tr>
          </tfoot>
        </table>
        <span className={`${styles.priceBadge} ${styles.priceBadgeFirme}`}>Precio firme</span>
      </div>

      {/* ══════════════════════════════════════════
           SECTION 2 – OpsIntelligence (M1-M3)
         ══════════════════════════════════════════ */}
      <div className={styles.serviceSection}>
        <div className={styles.serviceHeader}>
          <h3>2. OpsIntelligence (M1-M3)</h3>
          <span className={styles.billingModel}>Precio por cápsula · {approvedCapsules.length} aprobadas</span>
        </div>

        <div className={styles.marginControl}>
          <label>Margen OpsIntelligence</label>
          <input type="range" min={0} max={80} value={intelMargin}
            onChange={e => setIntelMargin(Number(e.target.value))} />
          <span className={styles.marginValue}>{intelMargin}%</span>
        </div>

        {approvedCapsules.length === 0 ? (
          <p className={styles.emptyNote}>No hay cápsulas aprobadas (Go).</p>
        ) : (
          <table className={styles.lineItemTable}>
            <thead>
              <tr>
                <th>Cápsula</th>
                <th>Complej.</th>
                <th>J. Analít.</th>
                <th>J. PMO</th>
                <th>Mult.</th>
                <th>Coste Ajust.</th>
              </tr>
            </thead>
            <tbody>
              {intelCalc.capsules.map(c => (
                <tr key={c.capsuleId}>
                  <td>{c.capsuleName}</td>
                  <td>
                    <span className={`badge ${
                      c.complexity === 'Alta' ? 'badge-error' :
                      c.complexity === 'Media' ? 'badge-warning' : 'badge-info'
                    }`}>{c.complexity}</span>
                  </td>
                  <td>
                    <input type="number" min={0} className={styles.inlineInput}
                      value={c.analyticDays}
                      onChange={e => updateCapsuleDays(c.capsuleId, 'analytic', Number(e.target.value))} />
                  </td>
                  <td>
                    <input type="number" min={0} className={styles.inlineInput}
                      value={c.pmoDays}
                      onChange={e => updateCapsuleDays(c.capsuleId, 'pmo', Number(e.target.value))} />
                  </td>
                  <td className={styles.multCell}>
                    {c.intMult}x · {c.volMult}x
                  </td>
                  <td>€{c.adjustedCost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className={styles.subtotalRow}>
                <td colSpan={5}>Subtotal</td>
                <td>€{intelCalc.subtotal.toLocaleString()}</td>
              </tr>
              {intelCalc.discountRate > 0 && (
                <tr className={styles.subtotalRow}>
                  <td colSpan={5}>Descuento volumen ({Math.round(intelCalc.discountRate * 100)}%)</td>
                  <td>-€{intelCalc.discount.toLocaleString()}</td>
                </tr>
              )}
              <tr className={styles.subtotalRow}>
                <td colSpan={5}>Coste base</td>
                <td>€{intelCalc.costBase.toLocaleString()}</td>
              </tr>
              <tr className={styles.subtotalRow}>
                <td colSpan={5}>+ Margen ({intelMargin}%)</td>
                <td>€{intelCalc.marginAmt.toLocaleString()}</td>
              </tr>
              <tr className={styles.totalRow}>
                <td colSpan={5}><strong>TOTAL OpsIntelligence</strong></td>
                <td><strong>€{intelCalc.total.toLocaleString()}</strong></td>
              </tr>
            </tfoot>
          </table>
        )}
        <span className={`${styles.priceBadge} ${styles.priceBadgeIndicativo}`}>Rango indicativo</span>
      </div>

      {/* ══════════════════════════════════════════
           SECTION 3 – OpsScale (M4)
         ══════════════════════════════════════════ */}
      <div className={styles.serviceSection}>
        <div className={styles.serviceHeader}>
          <h3>3. OpsScale (M4)</h3>
          <span className={styles.billingModel}>Mensual recurrente · Volumen operativo + plataforma</span>
        </div>

        <div className={styles.marginControl}>
          <label>Margen OpsScale</label>
          <input type="range" min={0} max={80} value={scaleMargin}
            onChange={e => setScaleMargin(Number(e.target.value))} />
          <span className={styles.marginValue}>{scaleMargin}%</span>
        </div>

        <table className={styles.lineItemTable}>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Volumen / mes</th>
              <th>Tarifa</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Voz Agentic</td>
              <td>
                <input type="number" min={0} className={styles.inlineInput}
                  value={voiceAgenticHours}
                  onChange={e => setVoiceAgenticHours(Math.max(0, Number(e.target.value)))} />
                <span className={styles.unitLabel}> h</span>
              </td>
              <td>€{UNIT_COSTS.voiceAgenticHour.toFixed(2)}/h</td>
              <td>€{scaleCalc.voiceAgenticCost.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Voz Humana</td>
              <td>
                <input type="number" min={0} className={styles.inlineInput}
                  value={voiceHumanHours}
                  onChange={e => setVoiceHumanHours(Math.max(0, Number(e.target.value)))} />
                <span className={styles.unitLabel}> h</span>
              </td>
              <td>€{UNIT_COSTS.voiceHumanHour.toFixed(2)}/h</td>
              <td>€{scaleCalc.voiceHumanCost.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Mensajería</td>
              <td>
                <input type="number" min={0} className={styles.inlineInput}
                  value={messagingVolume}
                  onChange={e => setMessagingVolume(Math.max(0, Number(e.target.value)))} />
                <span className={styles.unitLabel}> msgs</span>
              </td>
              <td>€{UNIT_COSTS.messagingUnit}/msg</td>
              <td>€{scaleCalc.messagingCost.toLocaleString()}</td>
            </tr>
            <tr className={styles.subtotalRow}>
              <td colSpan={3}>Fee Plataforma (fijo)</td>
              <td>€{UNIT_COSTS.platformFee.toLocaleString()}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className={styles.subtotalRow}>
              <td colSpan={3}>Coste base mensual</td>
              <td>€{scaleCalc.costBase.toLocaleString()}</td>
            </tr>
            <tr className={styles.subtotalRow}>
              <td colSpan={3}>+ Margen ({scaleMargin}%)</td>
              <td>€{scaleCalc.marginAmt.toLocaleString()}</td>
            </tr>
            <tr className={styles.totalRow}>
              <td colSpan={3}><strong>TOTAL MENSUAL</strong></td>
              <td><strong>€{scaleCalc.monthly.toLocaleString()}</strong></td>
            </tr>
            <tr className={styles.grandTotalRow}>
              <td colSpan={3}><strong>TOTAL ANUAL</strong></td>
              <td><strong>€{scaleCalc.annual.toLocaleString()}</strong></td>
            </tr>
          </tfoot>
        </table>
        <span className={`${styles.priceBadge} ${styles.priceBadgeIndicativo}`}>Rango indicativo</span>
      </div>

      {/* ══════════════════════════════════════════
           COMPARATIVA BPO TRADICIONAL
         ══════════════════════════════════════════ */}
      <div className={styles.comparisonSection}>
        <h4>Comparativa vs BPO Tradicional</h4>
        <div className={styles.comparisonCards}>
          <div className={styles.comparisonCard}>
            <div className={styles.comparisonLabel}>BPO Tradicional (año 1)</div>
            <div className={styles.comparisonValue}>€{comparisonTraditionalBPO.toLocaleString()}</div>
          </div>
          <div className={`${styles.comparisonCard} ${styles.comparisonHighlight}`}>
            <div className={styles.comparisonLabel}>Beyond Ops (año 1)</div>
            <div className={styles.comparisonValue}>€{totalYear1.toLocaleString()}</div>
          </div>
          <div className={`${styles.comparisonCard} ${styles.comparisonSuccess}`}>
            <div className={styles.comparisonLabel}>Ahorro Anual</div>
            <div className={styles.comparisonValue}>
              €{savings.toLocaleString()}
            </div>
            {comparisonTraditionalBPO > 0 && (
              <div className={styles.comparisonHint}>
                {Math.round((savings / comparisonTraditionalBPO) * 100)}% reducción
              </div>
            )}
          </div>
          <div className={styles.comparisonCard}>
            <div className={styles.comparisonLabel}>Payback</div>
            <div className={styles.comparisonValue}>{paybackMonths} meses</div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
           RESUMEN COMPROMISO PROGRESIVO
         ══════════════════════════════════════════ */}
      <div className={styles.progressiveSummary}>
        <h4>Resumen de Compromiso Progresivo</h4>
        <table className={styles.progressiveSummaryTable}>
          <thead>
            <tr>
              <th>Fase</th>
              <th>Tipo</th>
              <th>Inversión</th>
              <th>Condición</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>OpsFocus (M0)</strong></td>
              <td><span className={`${styles.priceBadge} ${styles.priceBadgeFirme}`}>Firme</span></td>
              <td><strong>€{committedInvestment.toLocaleString()}</strong></td>
              <td>Compromiso actual</td>
            </tr>
            <tr>
              <td><strong>OpsIntelligence (M1-M3)</strong></td>
              <td><span className={`${styles.priceBadge} ${styles.priceBadgeIndicativo}`}>Indicativo</span></td>
              <td>€{opsIntelligenceRange.low.toLocaleString()} – €{opsIntelligenceRange.high.toLocaleString()}</td>
              <td>Sujeto a resultados de M0</td>
            </tr>
            <tr>
              <td><strong>OpsScale (M4 anual)</strong></td>
              <td><span className={`${styles.priceBadge} ${styles.priceBadgeIndicativo}`}>Indicativo</span></td>
              <td>€{opsScaleAnnualRange.low.toLocaleString()} – €{opsScaleAnnualRange.high.toLocaleString()}</td>
              <td>Sujeto a resultados de M1-M3</td>
            </tr>
            <tr className={styles.projectedRow}>
              <td><strong>Total Año 1 (proyectado)</strong></td>
              <td><span className={`${styles.priceBadge} ${styles.priceBadgeIndicativo}`}>Indicativo</span></td>
              <td><strong>€{projectedTotalYear1Range.low.toLocaleString()} – €{projectedTotalYear1Range.high.toLocaleString()}</strong></td>
              <td>Proyección completa</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.disclaimerBlock}>
          {projectedTotalYear1Range.disclaimer}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className={styles.actions}>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Volver
        </button>
        <button className="btn btn-primary" onClick={handleContinue}>
          Continuar a Gate #3 →
        </button>
      </div>
    </div>
  )
}
