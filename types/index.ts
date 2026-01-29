// Project Types
export interface Project {
  id: string
  name: string
  clientName: string
  createdAt: string
  step: number
  documents: UploadedDocument[]
  notes: string
  capsules: Capsule[]
  opsIntelligenceData: OpsIntelligenceData[]
  proposalData: ProposalData | null
  pricingData: PricingData | null
}

export interface UploadedDocument {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: string
  content?: string
  sourceUrl?: string
}

// OpsFocus (M0) Types
export interface Capsule {
  id: string
  name: string
  trigger: string
  outcome: string
  customerPain: string
  estimatedVolume: string
  existingKPIs: string[]
  missingData: string[]
  complexity: 'Baja' | 'Media' | 'Alta'
  priority: 'Alta' | 'Media' | 'Baja'
  recommendation: 'Go' | 'No-Go'
  reasoning: string
}

// OpsIntelligence (M1-M3) Types
export interface OpsIntelligenceData {
  capsuleId: string
  capsuleName: string
  complexity: 'Baja' | 'Media' | 'Alta'
  integrations: number
  agenticTasks: string[]
  exceptions: string[]
  humanSupervision: string[]
  controlKPIs: string[]
  m1Architecture: string
  m2Configuration: string
  m3Validation: string
  businessCase: BusinessCase
}

export interface BusinessCase {
  currentCost: number
  projectedCost: number
  estimatedSavings: number
  paybackMonths: number
  roi12Months: number
}

// Phase Narrative for progressive commitment
export interface PhaseNarrative {
  phase: 'focus' | 'intelligence' | 'scale'
  title: string
  description: string
  certainty: PricingCertainty
}

// Proposal Types
export interface ProposalData {
  executiveSummary: string
  painPoints: PainPoint[]
  capsuleSummaries: CapsuleSummary[]
  impactMetrics: ImpactMetrics
  governanceModel: string
  assumptions: string[]
  missingData: string[]
  risks: Risk[]
  // Progressive commitment fields
  visionStatement: string
  progressiveCommitmentNote: string
  phaseNarratives: PhaseNarrative[]
}

export interface PainPoint {
  title: string
  description: string
  impact: string
  rootCause: string
}

export interface CapsuleSummary {
  name: string
  description: string
  volumetrics: string
  targetKPIs: { metric: string; target: string }[]
}

export interface ImpactMetrics {
  currentCSAT: string
  targetCSAT: string
  currentFCR: string
  targetFCR: string
  currentAHT: string
  targetAHT: string
  costReduction: string
}

export interface Risk {
  name: string
  impact: 'Alto' | 'Medio' | 'Bajo'
  probability: 'Alta' | 'Media' | 'Baja'
  mitigation: string
}

// Progressive Commitment Types
export type PricingCertainty = 'firme' | 'indicativo'

export interface IndicativeRange {
  low: number
  high: number
  certainty: PricingCertainty
  disclaimer: string
}

// ─── Unit Cost Constants ───
// Centralised so every consumer references the same source of truth.
export const UNIT_COSTS = {
  /** Jornada analítica / consultoría */
  analyticDay: 500,
  /** Jornada dirección / PMO */
  directionDay: 650,
  /** Hora de voz agentic */
  voiceAgenticHour: 7.50,
  /** Hora de voz humana */
  voiceHumanHour: 17.00,
  /** Coste por mensaje (5 000 € / 200 000 msgs) */
  messagingUnit: 0.025,
  /** Fee de plataforma – solo OpsScale */
  platformFee: 2500,
} as const

// ─── Pricing Types ───

/** OpsFocus (M0) – One-shot, jornadas de consultoría/analítica */
export interface OpsFocusPricing {
  analyticDays: number
  consultingDays: number
  directionDays: number
  analyticRate: number
  consultingRate: number
  directionRate: number
  costBase: number
  margin: number
  total: number
}

/** A single capsule inside OpsIntelligence */
export interface CapsulePricing {
  capsuleName: string
  complexity: string
  analyticDays: number
  pmoDays: number
  analyticRate: number
  pmoRate: number
  baseCost: number
  integrationMultiplier: number
  volumeMultiplier: number
  costBeforeMargin: number
  totalCost: number
}

/** OpsIntelligence (M1-M3) – Precio por proceso / cápsula */
export interface OpsIntelligencePricing {
  capsules: CapsulePricing[]
  subtotal: number
  discountRate: number
  discount: number
  costBase: number
  margin: number
  total: number
}

/** OpsScale (M4) – Volumen operativo mensual recurrente */
export interface OpsScalePricing {
  voiceAgentic: { hours: number; rate: number; cost: number }
  voiceHuman: { hours: number; rate: number; cost: number }
  messaging: { messages: number; rate: number; cost: number }
  platformFee: number
  costBase: number
  margin: number
  monthly: number
  annual: number
}

/** Complete pricing data persisted in the project */
export interface PricingData {
  opsFocus: OpsFocusPricing
  opsIntelligence: OpsIntelligencePricing
  opsScale: OpsScalePricing
  totalYear1: number
  comparisonTraditionalBPO: number
  savings: number
  paybackMonths: number
  // Progressive commitment
  committedInvestment: number
  opsIntelligenceRange: IndicativeRange
  opsScaleMonthlyRange: IndicativeRange
  opsScaleAnnualRange: IndicativeRange
  projectedTotalYear1Range: IndicativeRange
}

// API Response Types
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
}
