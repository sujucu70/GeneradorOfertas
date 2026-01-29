import pdf from 'pdf-parse'

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer)
    return data.text
  } catch (error) {
    console.error('Error extracting PDF:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

export async function extractTextFromDocument(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())

  if (file.type === 'application/pdf') {
    return extractTextFromPDF(buffer)
  } else if (file.type === 'text/plain') {
    return buffer.toString('utf-8')
  } else if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/msword'
  ) {
    // For Word docs, you'd need mammoth library, but for MVP we'll just return placeholder
    return `[Word document: ${file.name}]\nContent extraction requires implementation.`
  } else {
    return `[Unsupported file type: ${file.type}]`
  }
}

export function summarizeDocuments(documents: { name: string; content: string }[]): string {
  return documents
    .map((doc) => {
      const preview = doc.content.substring(0, 2000)
      return `--- Document: ${doc.name} ---\n${preview}${doc.content.length > 2000 ? '\n...(truncated)' : ''}\n`
    })
    .join('\n\n')
}
