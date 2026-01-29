# Beyond Ops - Generador de Ofertas (MVP)

Herramienta interna para automatizar la producción de ofertas Beyond Ops (BPO 2.0), manteniendo un modelo high-touch y totalmente alineado con el posicionamiento de la compañía.

## 🎯 Descripción

Este MVP permite generar automáticamente:
- Propuesta de Valor (lenguaje operacional)
- Statement of Work (SoW)
- Anexo económico con pricing coherente

A partir de:
- Documentos del cliente (PDF, TXT, Word)
- Notas manuales del equipo Beyond

Con **3 gates obligatorios de validación humana** en puntos críticos.

---

## 🏗️ Arquitectura

- **Frontend:** Next.js 14 + TypeScript + React
- **Backend:** Next.js API Routes
- **Persistencia:** En memoria (para MVP, extensible a SQLite/DB)
- **Procesamiento:** PDF parsing, mock AI generation (listo para OpenAI/Claude API)
- **Estilos:** CSS Modules + identidad corporativa Beyond Ops

---

## 📋 Prerrequisitos

- Node.js 18+
- npm o yarn

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd GeneradorOfertas

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

---

## 🎮 Uso del Sistema

### Flujo Completo

#### **Paso 1: Ingesta de Documentos**
1. Ingresa el nombre del cliente
2. Ingresa el nombre del proyecto
3. Añade notas del equipo Beyond (contexto, pain points)
4. Sube documentos del cliente (PDF, TXT, Word)
5. Click en "Continuar a OpsFocus"

#### **Paso 2: OpsFocus (M0) - Capsule Finder**
1. Click en "Analizar Documentos"
2. El sistema identificará cápsulas operativas automáticamente
3. Revisa cada cápsula:
   - Edita trigger, outcome, customer pain
   - Ajusta complejidad y prioridad
   - Cambia recomendación Go/No-Go
4. Añade cápsulas manualmente si es necesario
5. Click en "Continuar a Gate #1"

#### **Paso 3: Gate #1 - Validación Humana**
⚠️ **GATE OBLIGATORIO**
- Revisa la tabla de cápsulas identificadas
- Valida que reflejan los procesos del cliente
- **Aprobar** para continuar o **Rechazar** para volver

#### **Paso 4: OpsIntelligence (M1-M3) Designer**
1. Click en "Generar Diseño Agentic"
2. El sistema creará:
   - Tareas agentizables
   - Excepciones
   - Supervisión humana requerida
   - KPIs de control
   - Plan de prototipos M1-M3
   - Business case con ROI
3. Click en "Continuar a Gate #2"

#### **Paso 5: Gate #2 - Validación Humana**
⚠️ **GATE OBLIGATORIO**
- Revisa el rediseño agentic de cada cápsula
- Valida el business case y prototipos M1-M3
- **Aprobar** para continuar o **Rechazar** para volver

#### **Paso 6: Generación Documental**
1. Click en "Generar Propuesta y SoW"
2. El sistema genera:
   - Propuesta de Valor (lenguaje operacional)
   - Statement of Work estructurado
   - Assumptions Ledger
3. Navega entre pestañas para revisar
4. Exporta a Markdown si lo deseas
5. Click en "Continuar a Pricing"

#### **Paso 7: Calculadora de Pricing**
1. Configura margen deseado (20-60%)
2. Ingresa volumetría OpsScale:
   - Minutos de voz (agentic/humano)
   - Mensajes (agentic/humano)
   - Transacciones
   - Nivel PMO (Básico/Estándar/Premium)
3. Click en "Calcular Pricing"
4. Revisa:
   - Desglose por servicio (OpsFocus, OpsIntelligence, OpsScale)
   - Comparativa vs BPO tradicional
   - Ahorro anual y payback
5. Click en "Continuar a Gate #3"

#### **Paso 8: Gate #3 - Validación Final**
⚠️ **GATE OBLIGATORIO**
- Revisa documentación completa
- Valida pricing y assumptions
- **Aprobar** para finalizar

---

## 📂 Estructura del Proyecto

```
GeneradorOfertas/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── upload/               # Subida de documentos
│   │   ├── capsule-finder/       # Análisis OpsFocus
│   │   ├── ops-intelligence/     # Diseño OpsIntelligence
│   │   ├── generate-documents/   # Generación propuesta
│   │   ├── calculate-pricing/    # Calculadora de pricing
│   │   └── export-documents/     # Export Markdown/PDF
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página principal (wizard)
│   └── globals.css               # Estilos globales
├── components/                   # Componentes React
│   ├── UploadDocuments.tsx       # Paso 1
│   ├── CapsuleFinder.tsx         # Paso 2
│   ├── OpsIntelligenceDesigner.tsx  # Paso 4
│   ├── DocumentGeneration.tsx    # Paso 6
│   └── PricingCalculator.tsx     # Paso 7
├── knowledge/                    # Base de conocimiento
│   ├── metodologia-beyond-ops.md
│   ├── brand-identity-guidelines.md
│   ├── plantilla-propuesta-valor.md
│   ├── plantilla-sow.md
│   └── calculadora-pricing.md
├── lib/                          # Utilidades
│   ├── documentProcessor.ts      # Extracción de PDFs
│   └── promptTemplates.ts        # Templates para AI
├── types/                        # TypeScript types
│   └── index.ts
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## 🎨 Identidad Corporativa

El sistema sigue las **Brand Identity Guidelines** de Beyond Ops:

### Colores
- **Beyond Blue:** `#0052CC` (principal)
- **Ops Green:** `#00875A` (éxito operativo)
- **Deep Navy:** `#172B4D` (textos)
- **Warning:** `#FF991F` (gates de validación)

### Tipografía
- **Fuente:** Inter (sans-serif)
- **Headings:** Bold/SemiBold
- **Body:** Regular

### Principios de Diseño
- Claridad operativa (información estructurada)
- Datos primero (métricas visibles)
- Progresión clara (M0 → M4)
- Gates visibles (validación humana destacada)
- Sin tecnología protagónica (IA como herramienta)

---

## ⚙️ Configuración Avanzada

### Conexión con OpenAI/Claude API (Opcional)

Para usar generación real de contenido con LLMs:

1. Instala el SDK:
```bash
npm install openai
# o
npm install @anthropic-ai/sdk
```

2. Configura variables de entorno:
```bash
# .env.local
OPENAI_API_KEY=tu-api-key
# o
ANTHROPIC_API_KEY=tu-api-key
```

3. Actualiza las API routes para usar el SDK:

```typescript
// app/api/capsule-finder/route.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Reemplaza generateMockCapsules con:
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'Eres un analista...' },
    { role: 'user', content: prompt },
  ],
})
```

---

## 🧪 Testing

```bash
# Build del proyecto
npm run build

# Ejecutar en producción
npm run start
```

---

## 📦 Build para Producción

```bash
# 1. Build
npm run build

# 2. El output estará en .next/

# 3. Deploy a Vercel (recomendado para Next.js)
npm install -g vercel
vercel
```

---

## 🔒 Principios High-Touch (Obligatorios)

El sistema **NO puede cerrar nada crítico sin validación humana**:

### Gate #1 - Post OpsFocus
- **Qué valida:** Cápsulas M0 candidatas
- **Pregunta:** ¿Las cápsulas identificadas son correctas?
- **Acción:** Confirmar lista final antes de OpsIntelligence

### Gate #2 - Post OpsIntelligence
- **Qué valida:** Rediseño agentic + prototipos M1-M3
- **Pregunta:** ¿El diseño es viable y el business case justifica producción?
- **Acción:** Aprobar handover a OpsScale o iterar

### Gate #3 - Pre-Envío
- **Qué valida:** Propuesta + SoW + Pricing completo
- **Pregunta:** ¿Todo está correcto para enviar al cliente?
- **Acción:** Aprobar envío final

### Assumptions Ledger
En cada fase se genera un registro de:
- Supuestos asumidos
- Datos faltantes
- Riesgos explícitos
- Condiciones de validez

---

## 📚 Servicios Beyond Ops

### 1. Beyond OpsFocus (M0)
- **Objetivo:** Calificación y priorización operativa
- **Duración:** 1-2 semanas
- **Entregable:** Cápsulas M0 priorizadas
- **Pricing:** One-shot basado en jornadas

### 2. Beyond OpsIntelligence (M1-M3)
- **Objetivo:** Preparar procesos para producción
- **Duración:** 4-8 semanas por cápsula
- **Entregables:** Prototipos M1-M3 + business case
- **Pricing:** Por cápsula (con multipliers)

### 3. Beyond OpsScale (M4)
- **Objetivo:** Ejecución real y escalado controlado
- **Duración:** Contrato anual
- **Entregables:** Operación productiva + KPIs
- **Pricing:** Por volumen + fee plataforma + PMO

---

## 🚨 Criterios de Éxito

✅ La oferta refleja exactamente el modelo Beyond Ops
✅ El lenguaje es 100% operacional (no IT, no IA-first)
✅ OpsIntelligence incluye agentización + prototipos M1-M3
✅ El sistema obliga a intervención humana en puntos críticos
✅ Assumptions Ledger está completo en cada fase
✅ Pricing es transparente y comparable con BPO tradicional

---

## 🐛 Troubleshooting

### Error al subir PDFs
- Verifica que el archivo no supere 10MB
- Asegúrate de que el PDF no esté protegido/encriptado

### Build falla
```bash
# Limpia cache y reinstala
rm -rf .next node_modules
npm install
npm run build
```

### Puerto 3000 ocupado
```bash
# Usa otro puerto
PORT=3001 npm run dev
```

---

## 📝 Notas de Implementación

### Limitaciones del MVP
- **Generación de contenido:** Usa mocks en lugar de LLM real (listo para integrar)
- **Persistencia:** En memoria (sin base de datos)
- **Export PDF:** No implementado (solo Markdown)
- **Autenticación:** No incluida
- **Multi-usuario:** No soportado

### Próximos Pasos Post-MVP
1. Integrar OpenAI/Claude API para generación real
2. Implementar SQLite/PostgreSQL para persistencia
3. Añadir sistema de autenticación
4. Export a PDF con puppeteer/pdfkit
5. Multi-proyecto y gestión de versiones
6. Dashboard de proyectos históricos

---

## 🤝 Contribución

Este es un proyecto interno de Beyond Ops. Para contribuir:

1. Crea una rama con el patrón: `feature/nombre-feature`
2. Haz commit siguiendo el formato: `feat: descripción`
3. Abre un PR contra la rama principal

---

## 📄 Licencia

© 2026 Beyond Ops - Uso interno únicamente

---

## 🆘 Soporte

Para dudas o problemas:
- **Equipo:** Beyond Ops Engineering
- **Documentación:** Ver `/knowledge` para metodología completa

---

**Generado con ❤️ por Beyond Ops Engineering Team**
**BPO 2.0 - Operations Platform**
