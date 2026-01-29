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

// Pricing Types
export interface PricingData {
  opsFocusCost: number
  opsIntelligenceCost: number
  opsIntelligenceBreakdown: CapsulePricing[]
  opsScaleMonthly: number
  opsScaleAnnual: number
  opsScaleBreakdown: OpsScaleBreakdown
  totalYear1: number
  margin: number
  comparisonTraditionalBPO: number
  savings: number
  paybackMonths: number
}

export interface CapsulePricing {
  capsuleName: string
  complexity: string
  baseCost: number
  integrationMultiplier: number
  volumeMultiplier: number
  totalCost: number
}

export interface OpsScaleBreakdown {
  voiceAgentic: { volume: number; rate: number; total: number }
  voiceHuman: { volume: number; rate: number; total: number }
  messagingAgentic: { volume: number; rate: number; total: number }
  messagingHuman: { volume: number; rate: number; total: number }
  transactions: { volume: number; rate: number; total: number }
  platformFee: number
  pmoFee: number
  monthlyTotal: number
}

// API Response Types
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
}
