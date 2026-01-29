'use client'

import { useState } from 'react'
import styles from './page.module.css'
import UploadDocuments from '@/components/UploadDocuments'
import CapsuleFinder from '@/components/CapsuleFinder'
import OpsIntelligenceDesigner from '@/components/OpsIntelligenceDesigner'
import DocumentGeneration from '@/components/DocumentGeneration'
import PricingCalculator from '@/components/PricingCalculator'
import { Project } from '@/types'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [project, setProject] = useState<Project>({
    id: '',
    name: '',
    clientName: '',
    createdAt: new Date().toISOString(),
    step: 1,
    documents: [],
    notes: '',
    capsules: [],
    opsIntelligenceData: [],
    proposalData: null,
    pricingData: null,
  })

  const steps = [
    { number: 1, label: 'Ingesta', component: 'upload' },
    { number: 2, label: 'OpsFocus (M0)', component: 'capsule-finder' },
    { number: 3, label: 'Gate #1', component: 'gate-1' },
    { number: 4, label: 'OpsIntelligence (M1-M3)', component: 'ops-intelligence' },
    { number: 5, label: 'Gate #2', component: 'gate-2' },
    { number: 6, label: 'Propuesta + SoW', component: 'document-generation' },
    { number: 7, label: 'Pricing', component: 'pricing' },
    { number: 8, label: 'Gate #3', component: 'gate-3' },
  ]

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    setProject((prev) => ({ ...prev, step: Math.min(prev.step + 1, steps.length) }))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UploadDocuments project={project} setProject={setProject} onNext={handleNext} />
      case 2:
        return <CapsuleFinder project={project} setProject={setProject} onNext={handleNext} onBack={handleBack} />
      case 3:
        return <Gate1Validation project={project} onApprove={handleNext} onReject={handleBack} />
      case 4:
        return <OpsIntelligenceDesigner project={project} setProject={setProject} onNext={handleNext} onBack={handleBack} />
      case 5:
        return <Gate2Validation project={project} onApprove={handleNext} onReject={handleBack} />
      case 6:
        return <DocumentGeneration project={project} setProject={setProject} onNext={handleNext} onBack={handleBack} />
      case 7:
        return <PricingCalculator project={project} setProject={setProject} onNext={handleNext} onBack={handleBack} />
      case 8:
        return <Gate3Validation project={project} onApprove={() => alert('¡Propuesta lista para envío!')} onReject={handleBack} />
      default:
        return null
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1>Beyond Ops - Generador de Ofertas</h1>
          <p className={styles.subtitle}>BPO 2.0 - Modelo Operativo Progresivo</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          {/* Progress Indicator */}
          <div className="progress-steps">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`progress-step ${
                  step.number === currentStep
                    ? 'active'
                    : step.number < currentStep
                    ? 'completed'
                    : ''
                }`}
              >
                <div className="progress-step-circle">
                  {step.number < currentStep ? '✓' : step.number}
                </div>
                <div className="progress-step-label">{step.label}</div>
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <div className={styles.stepContent}>{renderStep()}</div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>© 2026 Beyond Ops - BPO 2.0 Operations Platform</p>
        </div>
      </footer>
    </div>
  )
}

// Gate Validation Components
function Gate1Validation({ project, onApprove, onReject }: { project: Project; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="card fade-in">
      <div className="gate-validation">
        <h3>⚠️ Gate #1 - Validación Humana Requerida</h3>
        <p>Revisar y aprobar las cápsulas operativas identificadas antes de continuar a OpsIntelligence.</p>
      </div>

      <h2>Cápsulas Identificadas</h2>
      <p className={styles.gateDescription}>
        Se han identificado <strong>{project.capsules.length} cápsulas operativas</strong>.
        Revise cada una y valide que reflejan correctamente los procesos del cliente.
      </p>

      <div style={{ marginTop: '24px' }}>
        <table>
          <thead>
            <tr>
              <th>Cápsula</th>
              <th>Prioridad</th>
              <th>Volumen Est.</th>
              <th>Recomendación</th>
            </tr>
          </thead>
          <tbody>
            {project.capsules.map((capsule, idx) => (
              <tr key={idx}>
                <td><strong>{capsule.name}</strong></td>
                <td>
                  <span className={`badge ${
                    capsule.priority === 'Alta' ? 'badge-error' :
                    capsule.priority === 'Media' ? 'badge-warning' : 'badge-info'
                  }`}>
                    {capsule.priority}
                  </span>
                </td>
                <td>{capsule.estimatedVolume}</td>
                <td>
                  <span className={`badge ${capsule.recommendation === 'Go' ? 'badge-success' : 'badge-warning'}`}>
                    {capsule.recommendation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={onReject}>
          ← Rechazar y Volver
        </button>
        <button className="btn btn-success" onClick={onApprove}>
          ✓ Aprobar y Continuar →
        </button>
      </div>
    </div>
  )
}

function Gate2Validation({ project, onApprove, onReject }: { project: Project; onApprove: () => void; onReject: () => void }) {
  return (
    <div className="card fade-in">
      <div className="gate-validation">
        <h3>⚠️ Gate #2 - Validación Humana Requerida</h3>
        <p>Revisar el rediseño agentic y los prototipos M1-M3 antes de pasar a generación de propuesta.</p>
      </div>

      <h2>Diseño OpsIntelligence Completado</h2>
      <p className={styles.gateDescription}>
        Se ha completado el rediseño agentic de <strong>{project.opsIntelligenceData.length} cápsulas</strong>.
        Valide que los prototipos M1-M3 están listos para producción.
      </p>

      <div style={{ marginTop: '24px' }}>
        {project.opsIntelligenceData.map((data, idx) => (
          <div key={idx} className="card" style={{ marginBottom: '16px' }}>
            <h3>{data.capsuleName}</h3>
            <div className="grid grid-2" style={{ marginTop: '16px' }}>
              <div>
                <strong>Complejidad:</strong> {data.complexity}
              </div>
              <div>
                <strong>Integraciones:</strong> {data.integrations}
              </div>
              <div>
                <strong>Tareas Agentizables:</strong> {data.agenticTasks}
              </div>
              <div>
                <strong>Supervisión Humana:</strong> {data.humanSupervision}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={onReject}>
          ← Rechazar y Volver
        </button>
        <button className="btn btn-success" onClick={onApprove}>
          ✓ Aprobar y Continuar →
        </button>
      </div>
    </div>
  )
}

function Gate3Validation({ project, onApprove, onReject }: { project: Project; onApprove: () => void; onReject: () => void }) {
  const pricing = project.pricingData

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/export-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project, format: 'markdown' }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `propuesta-${project.clientName}-${Date.now()}.md`
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        alert('Error al exportar el documento')
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Error al exportar el documento')
    }
  }

  return (
    <div className="card fade-in">
      <div className="gate-validation">
        <h3>⚠️ Gate #3 - Validación Final</h3>
        <p>Revisión final de propuesta, SoW y pricing antes de envío al cliente.</p>
      </div>

      <h2>Documentación Generada</h2>
      <p className={styles.gateDescription}>
        Todos los documentos han sido generados. El archivo de descarga incluye Propuesta de Valor,
        Statement of Work y Estimación Económica en un único documento.
      </p>

      <div className="grid grid-2" style={{ marginTop: '24px' }}>
        <div className="card">
          <h3>📄 Propuesta de Valor</h3>
          <p>Lenguaje operacional, no tecnológico</p>
          <p><strong>Cápsulas:</strong> {project.capsules.length}</p>
        </div>
        <div className="card">
          <h3>📋 Statement of Work</h3>
          <p>Alcance comprometido: OpsFocus (M0)</p>
          <p><strong>Fases indicativas:</strong> OpsIntelligence + OpsScale</p>
        </div>
        <div className="card" style={{ border: '2px solid #36B37E' }}>
          <h3 style={{ color: '#006644' }}>✅ Inversión Comprometida</h3>
          <p>OpsFocus (M0) — Precio firme</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#006644' }}>
            {pricing?.committedInvestment ? `€${pricing.committedInvestment.toLocaleString()}` : 'N/A'}
          </p>
        </div>
        <div className="card" style={{ border: '2px dashed #FFAB00', opacity: 0.92 }}>
          <h3 style={{ color: '#975B00' }}>📊 Proyección Total Año 1</h3>
          <p>Rango indicativo (sujeto a validación por fases)</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#975B00' }}>
            {pricing?.projectedTotalYear1Range
              ? `€${pricing.projectedTotalYear1Range.low.toLocaleString()} – €${pricing.projectedTotalYear1Range.high.toLocaleString()}`
              : 'N/A'}
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '16px' }}>
        <h3>⚠️ Assumptions Ledger</h3>
        <p>Supuestos y riesgos explícitos</p>
        <p><strong>Supuestos:</strong> {project.proposalData?.assumptions?.length || 0}</p>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary" onClick={onReject}>
          ← Rechazar y Ajustar
        </button>
        <button className="btn btn-primary" onClick={handleDownload}>
          Descargar Propuesta
        </button>
      </div>
    </div>
  )
}
