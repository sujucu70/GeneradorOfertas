'use client'

import { useState } from 'react'
import { Project, UploadedDocument } from '@/types'
import styles from './UploadDocuments.module.css'

interface Props {
  project: Project
  setProject: (project: Project) => void
  onNext: () => void
}

export default function UploadDocuments({ project, setProject, onNext }: Props) {
  const [clientName, setClientName] = useState(project.clientName)
  const [projectName, setProjectName] = useState(project.name)
  const [notes, setNotes] = useState(project.notes)
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)

    const newDocuments: UploadedDocument[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (result.success) {
          newDocuments.push({
            id: result.data.id,
            name: file.name,
            type: file.type,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            content: result.data.content,
          })
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        alert(`Error al subir ${file.name}`)
      }
    }

    setProject({
      ...project,
      documents: [...project.documents, ...newDocuments],
    })

    setUploading(false)
  }

  const handleRemoveDocument = (docId: string) => {
    setProject({
      ...project,
      documents: project.documents.filter((d) => d.id !== docId),
    })
  }

  const handleContinue = () => {
    if (!clientName || !projectName) {
      alert('Por favor completa el nombre del cliente y del proyecto')
      return
    }

    if (project.documents.length === 0) {
      alert('Por favor sube al menos un documento')
      return
    }

    setProject({
      ...project,
      id: project.id || `proj-${Date.now()}`,
      clientName,
      name: projectName,
      notes,
    })

    onNext()
  }

  return (
    <div className="card fade-in">
      <h2>1. Ingesta de Documentos</h2>
      <p className={styles.description}>
        Sube documentos del cliente (PDF, Word, emails) y añade notas manuales del equipo Beyond.
      </p>

      <div className="form-group">
        <label className="form-label">Nombre del Cliente *</label>
        <input
          type="text"
          className="form-input"
          placeholder="Ej: Acme Corporation"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Nombre del Proyecto *</label>
        <input
          type="text"
          className="form-input"
          placeholder="Ej: Optimización Customer Service"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Notas del Equipo Beyond</label>
        <textarea
          className="form-textarea"
          placeholder="Contexto adicional, observaciones de reuniones con el cliente, pain points identificados..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Documentos del Cliente</label>
        <div className={styles.uploadArea}>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.eml"
            onChange={handleFileUpload}
            disabled={uploading}
            className={styles.fileInput}
            id="file-upload"
          />
          <label htmlFor="file-upload" className={styles.uploadLabel}>
            <div className={styles.uploadIcon}>📁</div>
            <div>
              {uploading ? (
                <p>Subiendo documentos...</p>
              ) : (
                <>
                  <p className={styles.uploadText}>
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                  <p className={styles.uploadHint}>
                    PDF, Word, TXT, Email (máx. 10MB por archivo)
                  </p>
                </>
              )}
            </div>
          </label>
        </div>

        {project.documents.length > 0 && (
          <div className={styles.documentList}>
            <h3>Documentos subidos ({project.documents.length})</h3>
            {project.documents.map((doc) => (
              <div key={doc.id} className={styles.documentItem}>
                <div className={styles.documentInfo}>
                  <span className={styles.documentIcon}>📄</span>
                  <div>
                    <div className={styles.documentName}>{doc.name}</div>
                    <div className={styles.documentMeta}>
                      {(doc.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>
                <button
                  className={`btn btn-secondary ${styles.removeBtn}`}
                  onClick={() => handleRemoveDocument(doc.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className="btn btn-primary"
          onClick={handleContinue}
          disabled={uploading}
        >
          Continuar a OpsFocus →
        </button>
      </div>
    </div>
  )
}
