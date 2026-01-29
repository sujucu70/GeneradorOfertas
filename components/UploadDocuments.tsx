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
  const [urlInput, setUrlInput] = useState('')
  const [fetchingUrl, setFetchingUrl] = useState(false)

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

  const handleAddUrl = async () => {
    const trimmed = urlInput.trim()
    if (!trimmed) return

    // Basic URL validation
    try {
      new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    } catch {
      alert('Por favor introduce una URL válida (ej: https://ejemplo.com)')
      return
    }

    const finalUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`

    setFetchingUrl(true)

    try {
      const response = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      })

      const result = await response.json()

      if (result.success) {
        const newDoc: UploadedDocument = {
          id: result.data.id,
          name: result.data.name,
          type: 'text/html',
          size: result.data.size,
          uploadedAt: new Date().toISOString(),
          content: result.data.content,
          sourceUrl: finalUrl,
        }

        setProject({
          ...project,
          documents: [...project.documents, newDoc],
        })

        setUrlInput('')
      } else {
        alert('Error al obtener URL: ' + result.error)
      }
    } catch (error) {
      console.error('Error fetching URL:', error)
      alert('Error al conectar con el servidor')
    } finally {
      setFetchingUrl(false)
    }
  }

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddUrl()
    }
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
      alert('Por favor sube al menos un documento o URL')
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

  const isBusy = uploading || fetchingUrl

  return (
    <div className="card fade-in">
      <h2>1. Ingesta de Documentos</h2>
      <p className={styles.description}>
        Sube documentos del cliente (PDF, Word, emails), añade URLs o notas manuales del equipo Beyond.
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

      {/* URL Input */}
      <div className="form-group">
        <label className="form-label">URLs del Cliente</label>
        <p className={styles.fieldHint}>
          Web del cliente, RFPs online, documentación pública, portales de soporte, etc.
        </p>
        <div className={styles.urlRow}>
          <input
            type="url"
            className="form-input"
            placeholder="https://ejemplo.com/rfp-documento"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={handleUrlKeyDown}
            disabled={fetchingUrl}
          />
          <button
            className="btn btn-secondary"
            onClick={handleAddUrl}
            disabled={isBusy || !urlInput.trim()}
          >
            {fetchingUrl ? 'Cargando...' : '+ Añadir URL'}
          </button>
        </div>
      </div>

      {/* File Upload */}
      <div className="form-group">
        <label className="form-label">Documentos del Cliente</label>
        <div className={styles.uploadArea}>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.eml"
            onChange={handleFileUpload}
            disabled={isBusy}
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
            <h3>Fuentes cargadas ({project.documents.length})</h3>
            {project.documents.map((doc) => (
              <div key={doc.id} className={styles.documentItem}>
                <div className={styles.documentInfo}>
                  <span className={styles.documentIcon}>
                    {doc.sourceUrl ? '🔗' : '📄'}
                  </span>
                  <div>
                    <div className={styles.documentName}>{doc.name}</div>
                    <div className={styles.documentMeta}>
                      {doc.sourceUrl ? (
                        <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {doc.sourceUrl.length > 60
                            ? doc.sourceUrl.substring(0, 60) + '...'
                            : doc.sourceUrl}
                        </a>
                      ) : (
                        `${(doc.size / 1024).toFixed(1)} KB`
                      )}
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
          disabled={isBusy}
        >
          Continuar a OpsFocus →
        </button>
      </div>
    </div>
  )
}
