'use client'

import { useState } from 'react'
import { Project, OpsIntelligenceData } from '@/types'
import styles from './OpsIntelligenceDesigner.module.css'

interface Props {
  project: Project
  setProject: (project: Project) => void
  onNext: () => void
  onBack: () => void
}

export default function OpsIntelligenceDesigner({ project, setProject, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [opsData, setOpsData] = useState<OpsIntelligenceData[]>(project.opsIntelligenceData)

  const handleGenerate = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/ops-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          capsules: project.capsules.filter((c) => c.recommendation === 'Go'),
          clientName: project.clientName,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setOpsData(result.data.opsIntelligenceData)
        setProject({
          ...project,
          opsIntelligenceData: result.data.opsIntelligenceData,
        })
      } else {
        alert('Error al generar diseño OpsIntelligence: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleContinue = () => {
    if (opsData.length === 0) {
      alert('Debes generar el diseño OpsIntelligence primero')
      return
    }

    setProject({
      ...project,
      opsIntelligenceData: opsData,
    })

    onNext()
  }

  const approvedCapsules = project.capsules.filter((c) => c.recommendation === 'Go')

  return (
    <div className="card fade-in">
      <h2>4. Beyond OpsIntelligence (M1-M3) Designer</h2>
      <p className={styles.description}>
        Rediseño agentic de procesos aprobados y plan de prototipos M1-M3.
      </p>

      <div className={styles.infoBox}>
        <h4>🏗️ Agentización de Procesos</h4>
        <p>
          Se rediseñarán las {approvedCapsules.length} cápsulas aprobadas para operación agentic-ready,
          incluyendo tareas agentizables, excepciones, supervisión humana y KPIs de control.
        </p>
      </div>

      {opsData.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎯</div>
          <p>No se ha generado el diseño OpsIntelligence aún</p>
          <button className="btn btn-primary" onClick={handleGenerate} disabled={approvedCapsules.length === 0}>
            🤖 Generar Diseño Agentic
          </button>
          {approvedCapsules.length === 0 && (
            <p className={styles.warningText}>⚠️ No hay cápsulas aprobadas (Go) para diseñar</p>
          )}
        </div>
      )}

      {loading && (
        <div className={styles.loadingState}>
          <div className="spinner"></div>
          <p>Generando rediseño agentic y prototipos M1-M3...</p>
          <p className={styles.loadingHint}>Esto puede tomar 1-2 minutos</p>
        </div>
      )}

      {opsData.length > 0 && (
        <>
          <div className={styles.opsGrid}>
            {opsData.map((data, index) => (
              <div key={data.capsuleId} className={styles.opsCard}>
                <div className={styles.opsHeader}>
                  <h3>{data.capsuleName}</h3>
                  <div className={styles.opsBadges}>
                    <span className="badge badge-info">Complejidad: {data.complexity}</span>
                    <span className="badge badge-warning">{data.integrations} integraciones</span>
                  </div>
                </div>

                <div className={styles.opsBody}>
                  <div className={styles.section}>
                    <h4>✅ Tareas Agentizables</h4>
                    <ul>
                      {data.agenticTasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.section}>
                    <h4>⚠️ Excepciones</h4>
                    <ul>
                      {data.exceptions.map((exception, i) => (
                        <li key={i}>{exception}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.section}>
                    <h4>👤 Supervisión Humana</h4>
                    <ul>
                      {data.humanSupervision.map((supervision, i) => (
                        <li key={i}>{supervision}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.section}>
                    <h4>📊 KPIs de Control</h4>
                    <ul>
                      {data.controlKPIs.map((kpi, i) => (
                        <li key={i}>{kpi}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.prototypes}>
                    <h4>🔬 Plan de Prototipos</h4>
                    <div className={styles.prototypePhases}>
                      <div className={styles.phase}>
                        <strong>M1: Service Readiness</strong>
                        <p>{data.m1Architecture}</p>
                      </div>
                      <div className={styles.phase}>
                        <strong>M2: Activation</strong>
                        <p>{data.m2Configuration}</p>
                      </div>
                      <div className={styles.phase}>
                        <strong>M3: Validation</strong>
                        <p>{data.m3Validation}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.businessCase}>
                    <h4>💰 Business Case</h4>
                    <div className="grid grid-2">
                      <div>
                        <strong>Coste Actual:</strong> €{data.businessCase.currentCost.toLocaleString()}/mes
                      </div>
                      <div>
                        <strong>Coste Proyectado:</strong> €{data.businessCase.projectedCost.toLocaleString()}/mes
                      </div>
                      <div>
                        <strong>Ahorro Estimado:</strong> €{data.businessCase.estimatedSavings.toLocaleString()}/año
                      </div>
                      <div>
                        <strong>Payback:</strong> {data.businessCase.paybackMonths} meses
                      </div>
                      <div>
                        <strong>ROI 12 meses:</strong> {data.businessCase.roi12Months}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {opsData.length > 0 && (
        <div className={styles.actions}>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Volver
          </button>
          <button className="btn btn-primary" onClick={handleContinue}>
            Continuar a Gate #2 →
          </button>
        </div>
      )}
    </div>
  )
}
