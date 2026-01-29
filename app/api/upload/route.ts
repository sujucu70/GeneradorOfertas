import { NextRequest, NextResponse } from 'next/server'
import { extractTextFromDocument } from '@/lib/documentProcessor'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Extract text from document
    const content = await extractTextFromDocument(file)

    return NextResponse.json({
      success: true,
      data: {
        id: `doc-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        name: file.name,
        content,
      },
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload file' },
      { status: 500 }
    )
  }
}
