'use client'

import { useState } from 'react'
import { Project, Capsule } from '@/types'
import styles from './CapsuleFinder.module.css'

interface Props {
  project: Project
  setProject: (project: Project) => void
  onNext: () => void
  onBack: () => void
}

export default function CapsuleFinder({ project, setProject, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [capsules, setCapsules] = useState<Capsule[]>(project.capsules)

  const handleAnalyze = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/capsule-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documents: project.documents,
          notes: project.notes,
          clientName: project.clientName,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setCapsules(result.data.capsules)
        setProject({
          ...project,
          capsules: result.data.capsules,
        })
      } else {
        alert('Error al analizar documentos: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleEditCapsule = (index: number, field: keyof Capsule, value: any) => {
    const updated = [...capsules]
    updated[index] = { ...updated[index], [field]: value }
    setCapsules(updated)
  }

  const handleRemoveCapsule = (index: number) => {
    const updated = capsules.filter((_, i) => i !== index)
    setCapsules(updated)
  }

  const handleAddCapsule = () => {
    const newCapsule: Capsule = {
      id: `cap-${Date.now()}`,
      name: 'Nueva Cápsula',
      trigger: '',
      outcome: '',
      customerPain: '',
      estimatedVolume: '',
      existingKPIs: [],
      missingData: [],
      complexity: 'Media',
      priority: 'Media',
      recommendation: 'Go',
      reasoning: '',
    }
    setCapsules([...capsules, newCapsule])
  }

  const handleContinue = () => {
    if (capsules.length === 0) {
      alert('Debes identificar al menos una cápsula operativa')
      return
    }

    setProject({
      ...project,
      capsules,
    })

    onNext()
  }

  return (
    <div className="card fade-in">
      <h2>2. Beyond OpsFocus (M0) - Capsule Finder</h2>
      <p className={styles.description}>
        Identifica y prioriza cápsulas operativas basándote en documentación y notas del cliente.
      </p>

      <div className={styles.infoBox}>
        <h4>📋 Análisis Automático</h4>
        <p>
          El sistema analizará los documentos subidos y generará una lista de cápsulas operativas candidatas.
          Podrás editarlas, eliminarlas o añadir nuevas manualmente.
        </p>
      </div>

      {capsules.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <p>No hay cápsulas identificadas aún</p>
          <button className="btn btn-primary" onClick={handleAnalyze}>
            🤖 Analizar Documentos
          </button>
        </div>
      )}

      {loading && (
        <div className={styles.loadingState}>
          <div className="spinner"></div>
          <p>Analizando documentos y extrayendo cápsulas operativas...</p>
          <p className={styles.loadingHint}>Esto puede tomar 30-60 segundos</p>
        </div>
      )}

      {capsules.length > 0 && (
        <>
          <div className={styles.capsulesHeader}>
            <h3>Cápsulas Identificadas ({capsules.length})</h3>
            <button className="btn btn-secondary" onClick={handleAddCapsule}>
              + Añadir Cápsula Manual
            </button>
          </div>

          <div className={styles.capsulesGrid}>
            {capsules.map((capsule, index) => (
              <div key={capsule.id} className={styles.capsuleCard}>
                <div className={styles.capsuleHeader}>
                  <input
                    type="text"
                    className={`form-input ${styles.capsuleName}`}
                    value={capsule.name}
                    onChange={(e) => handleEditCapsule(index, 'name', e.target.value)}
                  />
                  <button
                    className={`btn btn-secondary ${styles.removeBtn}`}
                    onClick={() => handleRemoveCapsule(index)}
                  >
                    ✕
                  </button>
                </div>

                <div className={styles.capsuleBody}>
                  <div className="form-group">
                    <label className="form-label">Trigger</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="¿Qué inicia este proceso?"
                      value={capsule.trigger}
                      onChange={(e) => handleEditCapsule(index, 'trigger', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Outcome</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="¿Qué resultado se espera?"
                      value={capsule.outcome}
                      onChange={(e) => handleEditCapsule(index, 'outcome', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Customer Pain</label>
                    <textarea
                      className="form-textarea"
                      placeholder="¿Qué problema resuelve?"
                      value={capsule.customerPain}
                      onChange={(e) => handleEditCapsule(index, 'customerPain', e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Volumen Estimado</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ej: 5,000 operaciones/mes"
                      value={capsule.estimatedVolume}
                      onChange={(e) => handleEditCapsule(index, 'estimatedVolume', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-3">
                    <div className="form-group">
                      <label className="form-label">Complejidad</label>
                      <select
                        className="form-select"
                        value={capsule.complexity}
                        onChange={(e) => handleEditCapsule(index, 'complexity', e.target.value as any)}
                      >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Prioridad</label>
                      <select
                        className="form-select"
                        value={capsule.priority}
                        onChange={(e) => handleEditCapsule(index, 'priority', e.target.value as any)}
                      >
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Recomendación</label>
                      <select
                        className="form-select"
                        value={capsule.recommendation}
                        onChange={(e) => handleEditCapsule(index, 'recommendation', e.target.value as any)}
                      >
                        <option value="Go">Go</option>
                        <option value="No-Go">No-Go</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Razonamiento</label>
                    <textarea
                      className="form-textarea"
                      placeholder="¿Por qué esta recomendación?"
                      value={capsule.reasoning}
                      onChange={(e) => handleEditCapsule(index, 'reasoning', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>

                <div className={styles.capsuleFooter}>
                  <span className={`badge ${
                    capsule.recommendation === 'Go' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {capsule.recommendation}
                  </span>
                  <span className={`badge ${
                    capsule.priority === 'Alta' ? 'badge-error' :
                    capsule.priority === 'Media' ? 'badge-warning' : 'badge-info'
                  }`}>
                    Prioridad: {capsule.priority}
                  </span>
                  <span className="badge badge-info">
                    Complejidad: {capsule.complexity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {capsules.length > 0 && (
        <div className={styles.actions}>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Volver
          </button>
          <button className="btn btn-primary" onClick={handleContinue}>
            Continuar a Gate #1 →
          </button>
        </div>
      )}
    </div>
  )
}
