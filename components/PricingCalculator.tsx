'use client'

import { useState } from 'react'
import { Project, PricingData } from '@/types'
import styles from './PricingCalculator.module.css'

interface Props {
  project: Project
  setProject: (project: Project) => void
  onNext: () => void
  onBack: () => void
}

export default function PricingCalculator({ project, setProject, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [pricingData, setPricingData] = useState<PricingData | null>(project.pricingData)
  const [margin, setMargin] = useState(40)

  // OpsScale Inputs
  const [voiceAgentic, setVoiceAgentic] = useState(5000)
  const [voiceHuman, setVoiceHuman] = useState(1000)
  const [messagingAgentic, setMessagingAgentic] = useState(10000)
  const [messagingHuman, setMessagingHuman] = useState(2000)
  const [transactions, setTransactions] = useState(3000)
  const [pmoLevel, setPmoLevel] = useState<'Básico' | 'Estándar' | 'Premium'>('Estándar')

  const handleCalculate = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/calculate-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project,
          margin,
          opsScaleInputs: {
            voiceAgentic,
            voiceHuman,
            messagingAgentic,
            messagingHuman,
            transactions,
            pmoLevel,
          },
        }),
      })

      const result = await response.json()

      if (result.success) {
        setPricingData(result.data.pricingData)
        setProject({
          ...project,
          pricingData: result.data.pricingData,
        })
      } else {
        alert('Error al calcular pricing: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (!pricingData) {
      alert('Debes calcular el pricing primero')
      return
    }

    setProject({
      ...project,
      pricingData,
    })

    onNext()
  }

  const totalOpsVolume = voiceAgentic + voiceHuman + messagingAgentic + messagingHuman + transactions

  return (
    <div className="card fade-in">
      <h2>7. Calculadora de Pricing</h2>
      <p className={styles.description}>
        Pricing transparente basado en volumetría y complejidad, con comparativa vs BPO tradicional.
      </p>

      <div className={styles.configSection}>
        <h3>⚙️ Configuración</h3>
        <div className="form-group">
          <label className="form-label">Margen (%)</label>
          <input
            type="range"
            min="20"
            max="60"
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className={styles.rangeInput}
          />
          <div className={styles.rangeValue}>{margin}%</div>
          <p className={styles.hint}>Mínimo viable: 20% | Estándar: 40% | Premium: 60%</p>
        </div>
      </div>

      <div className={styles.inputsSection}>
        <h3>📊 Inputs OpsScale (Volumen Mensual)</h3>

        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Voz Agentic (minutos/mes)</label>
            <input
              type="number"
              className="form-input"
              value={voiceAgentic}
              onChange={(e) => setVoiceAgentic(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Voz Humana (minutos/mes)</label>
            <input
              type="number"
              className="form-input"
              value={voiceHuman}
              onChange={(e) => setVoiceHuman(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mensajes Agentic (mensajes/mes)</label>
            <input
              type="number"
              className="form-input"
              value={messagingAgentic}
              onChange={(e) => setMessagingAgentic(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mensajes Humano (mensajes/mes)</label>
            <input
              type="number"
              className="form-input"
              value={messagingHuman}
              onChange={(e) => setMessagingHuman(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Transacciones (ops/mes)</label>
            <input
              type="number"
              className="form-input"
              value={transactions}
              onChange={(e) => setTransactions(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nivel PMO</label>
            <select
              className="form-select"
              value={pmoLevel}
              onChange={(e) => setPmoLevel(e.target.value as any)}
            >
              <option value="Básico">Básico (1 comité/mes)</option>
              <option value="Estándar">Estándar (2 comités/mes)</option>
              <option value="Premium">Premium (4 comités/mes)</option>
            </select>
          </div>
        </div>

        <div className={styles.volumeSummary}>
          <strong>Volumen Total Estimado:</strong> {totalOpsVolume.toLocaleString()} operaciones/mes
        </div>

        <button className="btn btn-primary" onClick={handleCalculate} disabled={loading}>
          {loading ? 'Calculando...' : '🧮 Calcular Pricing'}
        </button>
      </div>

      {loading && (
        <div className={styles.loadingState}>
          <div className="spinner"></div>
          <p>Calculando pricing y generando comparativas...</p>
        </div>
      )}

      {pricingData && (
        <div className={styles.resultsSection}>
          <h3>💰 Resultado del Pricing</h3>

          <div className={styles.summaryCards}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>OpsFocus (M0)</div>
              <div className={styles.summaryValue}>€{pricingData.opsFocusCost.toLocaleString()}</div>
              <div className={styles.summaryHint}>One-shot</div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>OpsIntelligence (M1-M3)</div>
              <div className={styles.summaryValue}>€{pricingData.opsIntelligenceCost.toLocaleString()}</div>
              <div className={styles.summaryHint}>{pricingData.opsIntelligenceBreakdown.length} cápsulas</div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>OpsScale Mensual</div>
              <div className={styles.summaryValue}>€{pricingData.opsScaleMonthly.toLocaleString()}</div>
              <div className={styles.summaryHint}>/mes</div>
            </div>

            <div className={`${styles.summaryCard} ${styles.summaryCardHighlight}`}>
              <div className={styles.summaryLabel}>Total Año 1</div>
              <div className={styles.summaryValue}>€{pricingData.totalYear1.toLocaleString()}</div>
              <div className={styles.summaryHint}>Inversión completa</div>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <h4>Desglose OpsIntelligence</h4>
            <table>
              <thead>
                <tr>
                  <th>Cápsula</th>
                  <th>Complejidad</th>
                  <th>Coste Base</th>
                  <th>Multipliers</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.opsIntelligenceBreakdown.map((item, i) => (
                  <tr key={i}>
                    <td>{item.capsuleName}</td>
                    <td>
                      <span className={`badge ${
                        item.complexity === 'Alta' ? 'badge-error' :
                        item.complexity === 'Media' ? 'badge-warning' : 'badge-info'
                      }`}>
                        {item.complexity}
                      </span>
                    </td>
                    <td>€{item.baseCost.toLocaleString()}</td>
                    <td>
                      Int: {item.integrationMultiplier}x | Vol: {item.volumeMultiplier}x
                    </td>
                    <td><strong>€{item.totalCost.toLocaleString()}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.detailsSection}>
            <h4>Desglose OpsScale Mensual</h4>
            <table>
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Volumen</th>
                  <th>Tarifa</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Voz Agentic</td>
                  <td>{pricingData.opsScaleBreakdown.voiceAgentic.volume.toLocaleString()} min</td>
                  <td>€{pricingData.opsScaleBreakdown.voiceAgentic.rate}/min</td>
                  <td>€{pricingData.opsScaleBreakdown.voiceAgentic.total.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Voz Humana</td>
                  <td>{pricingData.opsScaleBreakdown.voiceHuman.volume.toLocaleString()} min</td>
                  <td>€{pricingData.opsScaleBreakdown.voiceHuman.rate}/min</td>
                  <td>€{pricingData.opsScaleBreakdown.voiceHuman.total.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Mensajes Agentic</td>
                  <td>{pricingData.opsScaleBreakdown.messagingAgentic.volume.toLocaleString()}</td>
                  <td>€{pricingData.opsScaleBreakdown.messagingAgentic.rate}/msg</td>
                  <td>€{pricingData.opsScaleBreakdown.messagingAgentic.total.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Mensajes Humano</td>
                  <td>{pricingData.opsScaleBreakdown.messagingHuman.volume.toLocaleString()}</td>
                  <td>€{pricingData.opsScaleBreakdown.messagingHuman.rate}/msg</td>
                  <td>€{pricingData.opsScaleBreakdown.messagingHuman.total.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Transacciones</td>
                  <td>{pricingData.opsScaleBreakdown.transactions.volume.toLocaleString()}</td>
                  <td>€{pricingData.opsScaleBreakdown.transactions.rate}/op</td>
                  <td>€{pricingData.opsScaleBreakdown.transactions.total.toLocaleString()}</td>
                </tr>
                <tr className={styles.totalRow}>
                  <td colSpan={3}><strong>Fee Plataforma</strong></td>
                  <td><strong>€{pricingData.opsScaleBreakdown.platformFee.toLocaleString()}</strong></td>
                </tr>
                <tr className={styles.totalRow}>
                  <td colSpan={3}><strong>Fee PMO ({pmoLevel})</strong></td>
                  <td><strong>€{pricingData.opsScaleBreakdown.pmoFee.toLocaleString()}</strong></td>
                </tr>
                <tr className={styles.grandTotal}>
                  <td colSpan={3}><strong>TOTAL MENSUAL</strong></td>
                  <td><strong>€{pricingData.opsScaleMonthly.toLocaleString()}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.comparisonSection}>
            <h4>📊 Comparativa vs BPO Tradicional</h4>
            <div className={styles.comparisonCards}>
              <div className={styles.comparisonCard}>
                <div className={styles.comparisonLabel}>BPO Tradicional (año 1)</div>
                <div className={styles.comparisonValue}>€{pricingData.comparisonTraditionalBPO.toLocaleString()}</div>
              </div>
              <div className={`${styles.comparisonCard} ${styles.comparisonHighlight}`}>
                <div className={styles.comparisonLabel}>Beyond OpsScale (año 1)</div>
                <div className={styles.comparisonValue}>€{pricingData.totalYear1.toLocaleString()}</div>
              </div>
              <div className={`${styles.comparisonCard} ${styles.comparisonSuccess}`}>
                <div className={styles.comparisonLabel}>Ahorro Anual</div>
                <div className={styles.comparisonValue}>€{pricingData.savings.toLocaleString()}</div>
                <div className={styles.comparisonHint}>
                  {Math.round((pricingData.savings / pricingData.comparisonTraditionalBPO) * 100)}% reducción
                </div>
              </div>
              <div className={styles.comparisonCard}>
                <div className={styles.comparisonLabel}>Payback</div>
                <div className={styles.comparisonValue}>{pricingData.paybackMonths} meses</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {pricingData && (
        <div className={styles.actions}>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Volver
          </button>
          <button className="btn btn-primary" onClick={handleContinue}>
            Continuar a Gate #3 →
          </button>
        </div>
      )}
    </div>
  )
}
