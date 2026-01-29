'use client'

import { useState } from 'react'
import { Project, ProposalData } from '@/types'
import styles from './DocumentGeneration.module.css'

interface Props {
  project: Project
  setProject: (project: Project) => void
  onNext: () => void
  onBack: () => void
}

export default function DocumentGeneration({ project, setProject, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [proposalData, setProposalData] = useState<ProposalData | null>(project.proposalData)
  const [activeTab, setActiveTab] = useState<'propuesta' | 'sow' | 'assumptions'>('propuesta')

  const handleGenerate = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/generate-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setProposalData(result.data.proposalData)
        setProject({
          ...project,
          proposalData: result.data.proposalData,
        })
      } else {
        alert('Error al generar documentos: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async (format: 'markdown' | 'pdf') => {
    try {
      const response = await fetch('/api/export-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project,
          format,
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `propuesta-${project.clientName}-${Date.now()}.${format === 'pdf' ? 'pdf' : 'zip'}`
        a.click()
      } else {
        alert('Error al exportar documentos')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al exportar documentos')
    }
  }

  const handleContinue = () => {
    if (!proposalData) {
      alert('Debes generar la propuesta primero')
      return
    }

    onNext()
  }

  return (
    <div className="card fade-in">
      <h2>6. Generación Documental</h2>
      <p className={styles.description}>
        Propuesta de Valor y Statement of Work con lenguaje operacional (no tecnológico).
      </p>

      {!proposalData && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <p>No se han generado los documentos aún</p>
          <button className="btn btn-primary" onClick={handleGenerate}>
            🤖 Generar Propuesta y SoW
          </button>
        </div>
      )}

      {loading && (
        <div className={styles.loadingState}>
          <div className="spinner"></div>
          <p>Generando Propuesta de Valor y SoW...</p>
          <p className={styles.loadingHint}>Esto puede tomar 1-2 minutos</p>
        </div>
      )}

      {proposalData && (
        <>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'propuesta' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('propuesta')}
            >
              📄 Propuesta de Valor
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'sow' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('sow')}
            >
              📋 Statement of Work
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'assumptions' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('assumptions')}
            >
              ⚠️ Assumptions Ledger
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'propuesta' && (
              <div className={styles.documentPreview}>
                <h3>Resumen Ejecutivo</h3>
                <div className={styles.content}>
                  {proposalData.executiveSummary}
                </div>

                <h3>Pain Points Identificados</h3>
                {proposalData.painPoints.map((pain, i) => (
                  <div key={i} className={styles.painPoint}>
                    <h4>{pain.title}</h4>
                    <p><strong>Descripción:</strong> {pain.description}</p>
                    <p><strong>Impacto:</strong> {pain.impact}</p>
                    <p><strong>Causa Raíz:</strong> {pain.rootCause}</p>
                  </div>
                ))}

                <h3>Cápsulas Operativas</h3>
                {proposalData.capsuleSummaries.map((capsule, i) => (
                  <div key={i} className={styles.capsuleSummary}>
                    <h4>{capsule.name}</h4>
                    <p>{capsule.description}</p>
                    <p><strong>Volumetría:</strong> {capsule.volumetrics}</p>
                    <div className={styles.kpiGrid}>
                      {capsule.targetKPIs.map((kpi, j) => (
                        <div key={j} className={styles.kpiCard}>
                          <strong>{kpi.metric}</strong>
                          <span>{kpi.target}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <h3>Impacto Esperado</h3>
                <div className="grid grid-3">
                  <div className={styles.metricCard}>
                    <strong>CSAT</strong>
                    <p>{proposalData.impactMetrics.currentCSAT} → {proposalData.impactMetrics.targetCSAT}</p>
                  </div>
                  <div className={styles.metricCard}>
                    <strong>FCR</strong>
                    <p>{proposalData.impactMetrics.currentFCR} → {proposalData.impactMetrics.targetFCR}</p>
                  </div>
                  <div className={styles.metricCard}>
                    <strong>AHT</strong>
                    <p>{proposalData.impactMetrics.currentAHT} → {proposalData.impactMetrics.targetAHT}</p>
                  </div>
                  <div className={styles.metricCard}>
                    <strong>Reducción de Costes</strong>
                    <p>{proposalData.impactMetrics.costReduction}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sow' && (
              <div className={styles.documentPreview}>
                <h3>Statement of Work</h3>
                <div className={styles.sowStructure}>
                  <div className={styles.sowSection}>
                    <h4>1. Alcance del Proyecto</h4>
                    <ul>
                      <li>Beyond OpsFocus (M0): Análisis y priorización</li>
                      <li>Beyond OpsIntelligence (M1-M3): {project.opsIntelligenceData.length} cápsulas</li>
                      <li>Beyond OpsScale (M4): Operación productiva</li>
                    </ul>
                  </div>

                  <div className={styles.sowSection}>
                    <h4>2. Entregables</h4>
                    <ul>
                      <li>Inventario de cápsulas M0</li>
                      <li>Prototipos M1-M3 por cápsula</li>
                      <li>Business case validado</li>
                      <li>Dashboard operativo</li>
                      <li>Reportes mensuales</li>
                    </ul>
                  </div>

                  <div className={styles.sowSection}>
                    <h4>3. Exclusiones</h4>
                    <ul>
                      <li>❌ Desarrollo de integraciones complejas no identificadas</li>
                      <li>❌ Cambios en sistemas core del cliente</li>
                      <li>❌ Migración de datos históricos</li>
                      <li>❌ Volúmenes fuera de rango definido</li>
                    </ul>
                  </div>

                  <div className={styles.sowSection}>
                    <h4>4. Governance</h4>
                    <p><strong>Modelo de Governance:</strong></p>
                    <div dangerouslySetInnerHTML={{ __html: proposalData.governanceModel.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assumptions' && (
              <div className={styles.documentPreview}>
                <div className="gate-validation">
                  <h3>⚠️ Assumptions Ledger</h3>
                  <p>Supuestos, datos faltantes y riesgos identificados</p>
                </div>

                <h3>Supuestos Asumidos</h3>
                <ul className={styles.assumptionsList}>
                  {proposalData.assumptions.map((assumption, i) => (
                    <li key={i}>{assumption}</li>
                  ))}
                </ul>

                <h3>Datos Faltantes</h3>
                <ul className={styles.assumptionsList}>
                  {proposalData.missingData.map((data, i) => (
                    <li key={i} className={styles.warning}>{data}</li>
                  ))}
                </ul>

                <h3>Riesgos Identificados</h3>
                {proposalData.risks.map((risk, i) => (
                  <div key={i} className={styles.riskCard}>
                    <h4>{risk.name}</h4>
                    <div className={styles.riskMetrics}>
                      <span className={`badge ${
                        risk.impact === 'Alto' ? 'badge-error' :
                        risk.impact === 'Medio' ? 'badge-warning' : 'badge-info'
                      }`}>
                        Impacto: {risk.impact}
                      </span>
                      <span className={`badge ${
                        risk.probability === 'Alta' ? 'badge-error' :
                        risk.probability === 'Media' ? 'badge-warning' : 'badge-info'
                      }`}>
                        Probabilidad: {risk.probability}
                      </span>
                    </div>
                    <p><strong>Mitigación:</strong> {risk.mitigation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.exportActions}>
            <button className="btn btn-secondary" onClick={() => handleExport('markdown')}>
              ⬇️ Exportar Markdown
            </button>
            <button className="btn btn-secondary" onClick={() => handleExport('pdf')}>
              📄 Exportar PDF
            </button>
          </div>
        </>
      )}

      {proposalData && (
        <div className={styles.actions}>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Volver
          </button>
          <button className="btn btn-primary" onClick={handleContinue}>
            Continuar a Pricing →
          </button>
        </div>
      )}
    </div>
  )
}
