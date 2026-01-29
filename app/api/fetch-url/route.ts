import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'No URL provided' },
        { status: 400 }
      )
    }

    // Validate URL format
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      return NextResponse.json(
        { success: false, error: 'URL no válida' },
        { status: 400 }
      )
    }

    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent': 'BeyondOps-OfferGenerator/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7',
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Error al acceder a la URL: HTTP ${response.status}` },
        { status: 400 }
      )
    }

    const contentType = response.headers.get('content-type') || ''
    let textContent: string

    if (contentType.includes('application/pdf')) {
      // For PDF URLs, download the buffer and extract with pdf-parse
      try {
        const buffer = Buffer.from(await response.arrayBuffer())
        const pdf = (await import('pdf-parse')).default
        const data = await pdf(buffer)
        textContent = data.text
      } catch {
        textContent = `[PDF descargado desde ${url} - extracción de texto no disponible]`
      }
    } else {
      // HTML or plain text
      const raw = await response.text()

      if (contentType.includes('text/html')) {
        // Strip HTML tags, scripts, styles to get readable text
        textContent = raw
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
          .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
          .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, ' ')
          .trim()
      } else {
        textContent = raw
      }
    }

    // Truncate very long content
    if (textContent.length > 50000) {
      textContent = textContent.substring(0, 50000) + '\n\n[...contenido truncado a 50,000 caracteres]'
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `url-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        name: parsedUrl.hostname + parsedUrl.pathname,
        content: textContent,
        url: url,
        size: textContent.length,
      },
    })
  } catch (error: any) {
    console.error('URL fetch error:', error)
    const message = error.name === 'TimeoutError'
      ? 'Timeout: la URL tardó demasiado en responder (>15s)'
      : error.message || 'Error al obtener contenido de la URL'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
