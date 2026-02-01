import React, { useState, useMemo } from 'react'

interface Disease {
  id: number
  name: string
  prevalence: number
  prevalenceLabel: string
  mortalityRate: number
  deathsPerYear: number
  researchFunding: 'critical' | 'underfunded' | 'moderate' | 'well-funded'
  treatmentStatus: 'none' | 'limited' | 'partial' | 'effective'
  category: string
  researchDirections: string[]
  keyDataPoints: string[]
}

const diseases: Disease[] = [
  {
    id: 1,
    name: 'Cardiovascular Disease',
    prevalence: 523000000,
    prevalenceLabel: '523M',
    mortalityRate: 32.8,
    deathsPerYear: 17900000,
    researchFunding: 'well-funded',
    treatmentStatus: 'partial',
    category: 'Chronic',
    researchDirections: ['Gene therapy for familial hypercholesterolemia', 'AI-driven early detection', 'Regenerative cardiac tissue engineering', 'Microbiome interventions'],
    keyDataPoints: ['#1 cause of death globally', 'Costs $363B annually in US alone', '80% preventable with lifestyle changes']
  },
  {
    id: 2,
    name: 'Cancer (All Types)',
    prevalence: 19300000,
    prevalenceLabel: '19.3M',
    mortalityRate: 51.8,
    deathsPerYear: 10000000,
    researchFunding: 'well-funded',
    treatmentStatus: 'partial',
    category: 'Oncological',
    researchDirections: ['mRNA cancer vaccines', 'CAR-T cell optimization', 'Early detection liquid biopsies', 'Personalized neoantigen therapy'],
    keyDataPoints: ['1 in 5 people develop cancer in lifetime', '5-year survival improved 20% since 1970s', 'Immunotherapy revolutionizing treatment']
  },
  {
    id: 3,
    name: 'Diabetes (Type 1 & 2)',
    prevalence: 537000000,
    prevalenceLabel: '537M',
    mortalityRate: 2.5,
    deathsPerYear: 6700000,
    researchFunding: 'moderate',
    treatmentStatus: 'partial',
    category: 'Metabolic',
    researchDirections: ['Artificial pancreas systems', 'Beta cell regeneration', 'GLP-1 receptor agonist optimization', 'Stem cell-derived islets'],
    keyDataPoints: ['Cases tripled in 20 years', 'Type 2 accounts for 90-95%', 'Prediabetes affects 1 in 3 adults']
  },
  {
    id: 4,
    name: 'Chronic Respiratory Diseases',
    prevalence: 545000000,
    prevalenceLabel: '545M',
    mortalityRate: 7.3,
    deathsPerYear: 4000000,
    researchFunding: 'underfunded',
    treatmentStatus: 'limited',
    category: 'Respiratory',
    researchDirections: ['Lung regeneration therapies', 'Targeted biologics for severe asthma', 'Air pollution mitigation strategies', 'Mucus clearance technologies'],
    keyDataPoints: ['3rd leading cause of death', 'COPD largely preventable', '90% deaths in low/middle income countries']
  },
  {
    id: 5,
    name: 'Alzheimer\'s & Dementia',
    prevalence: 55000000,
    prevalenceLabel: '55M',
    mortalityRate: 36.4,
    deathsPerYear: 2000000,
    researchFunding: 'moderate',
    treatmentStatus: 'limited',
    category: 'Neurological',
    researchDirections: ['Amyloid-clearing antibodies', 'Tau protein targeting', 'Blood-brain barrier delivery systems', 'Early biomarker detection'],
    keyDataPoints: ['Cases expected to triple by 2050', '6th leading cause of death in US', 'No disease-modifying treatment until 2023']
  },
  {
    id: 6,
    name: 'HIV/AIDS',
    prevalence: 39000000,
    prevalenceLabel: '39M',
    mortalityRate: 1.7,
    deathsPerYear: 650000,
    researchFunding: 'well-funded',
    treatmentStatus: 'effective',
    category: 'Infectious',
    researchDirections: ['Functional cure strategies', 'Broadly neutralizing antibodies', 'Latent reservoir elimination', 'Long-acting injectables'],
    keyDataPoints: ['Deaths down 69% from peak', 'PrEP 99% effective', '3 people functionally cured']
  },
  {
    id: 7,
    name: 'Tuberculosis',
    prevalence: 10600000,
    prevalenceLabel: '10.6M',
    mortalityRate: 14.2,
    deathsPerYear: 1500000,
    researchFunding: 'underfunded',
    treatmentStatus: 'partial',
    category: 'Infectious',
    researchDirections: ['Shorter treatment regimens', 'Drug-resistant TB solutions', 'Novel vaccine development', 'Point-of-care diagnostics'],
    keyDataPoints: ['Top infectious disease killer', 'Drug-resistant strains spreading', 'BCG vaccine 100 years old']
  },
  {
    id: 8,
    name: 'Malaria',
    prevalence: 247000000,
    prevalenceLabel: '247M',
    mortalityRate: 0.25,
    deathsPerYear: 619000,
    researchFunding: 'moderate',
    treatmentStatus: 'partial',
    category: 'Infectious',
    researchDirections: ['Gene drive mosquito modification', 'RTS,S/R21 vaccine rollout', 'Drug resistance monitoring', 'Monoclonal antibody prophylaxis'],
    keyDataPoints: ['67% of deaths are children under 5', 'First vaccine approved 2021', 'Artemisinin resistance emerging']
  },
  {
    id: 9,
    name: 'Depression & Anxiety',
    prevalence: 970000000,
    prevalenceLabel: '970M',
    mortalityRate: 0.14,
    deathsPerYear: 700000,
    researchFunding: 'underfunded',
    treatmentStatus: 'partial',
    category: 'Mental Health',
    researchDirections: ['Psychedelic-assisted therapy', 'Rapid-acting antidepressants', 'Digital therapeutics', 'Gut-brain axis interventions'],
    keyDataPoints: ['Most prevalent health condition', 'Suicide deaths preventable', '75% in low-income countries untreated']
  },
  {
    id: 10,
    name: 'Hepatitis B & C',
    prevalence: 354000000,
    prevalenceLabel: '354M',
    mortalityRate: 0.34,
    deathsPerYear: 1200000,
    researchFunding: 'underfunded',
    treatmentStatus: 'effective',
    category: 'Infectious',
    researchDirections: ['Hep B functional cure', 'Global treatment access', 'Elimination strategies', 'Pan-genotypic treatments'],
    keyDataPoints: ['Hep C now curable in 95%+', 'Most unaware of infection', 'Leading cause of liver cancer']
  },
  {
    id: 11,
    name: 'Chronic Kidney Disease',
    prevalence: 850000000,
    prevalenceLabel: '850M',
    mortalityRate: 1.5,
    deathsPerYear: 1300000,
    researchFunding: 'underfunded',
    treatmentStatus: 'limited',
    category: 'Chronic',
    researchDirections: ['Bioartificial kidneys', 'Xenotransplantation', 'Stem cell regeneration', 'Novel dialysis methods'],
    keyDataPoints: ['Largely undiagnosed', 'Dialysis costs $90K/year', 'Organ shortage critical']
  },
  {
    id: 12,
    name: 'Parkinson\'s Disease',
    prevalence: 10000000,
    prevalenceLabel: '10M',
    mortalityRate: 5.0,
    deathsPerYear: 500000,
    researchFunding: 'moderate',
    treatmentStatus: 'limited',
    category: 'Neurological',
    researchDirections: ['Alpha-synuclein targeting', 'Deep brain stimulation advances', 'Neuroprotective agents', 'Gene therapy approaches'],
    keyDataPoints: ['Fastest growing neurological disorder', 'Average onset age 60', 'No disease-modifying treatments']
  },
  {
    id: 13,
    name: 'Stroke',
    prevalence: 101000000,
    prevalenceLabel: '101M',
    mortalityRate: 6.9,
    deathsPerYear: 6900000,
    researchFunding: 'moderate',
    treatmentStatus: 'partial',
    category: 'Neurological',
    researchDirections: ['Extended thrombectomy windows', 'Neuroprotective agents', 'Mobile stroke units', 'Brain-computer interfaces for recovery'],
    keyDataPoints: ['#2 cause of death globally', 'Every minute 1.9M neurons die', '80% preventable']
  },
  {
    id: 14,
    name: 'ALS (Lou Gehrig\'s Disease)',
    prevalence: 500000,
    prevalenceLabel: '500K',
    mortalityRate: 90.0,
    deathsPerYear: 450000,
    researchFunding: 'underfunded',
    treatmentStatus: 'none',
    category: 'Neurological',
    researchDirections: ['SOD1 gene silencing', 'Stem cell transplantation', 'TDP-43 targeting', 'Combination therapy trials'],
    keyDataPoints: ['Average survival 2-5 years', 'Only 2 approved drugs', 'Ice bucket challenge raised $220M']
  },
  {
    id: 15,
    name: 'Sepsis',
    prevalence: 49000000,
    prevalenceLabel: '49M',
    mortalityRate: 22.4,
    deathsPerYear: 11000000,
    researchFunding: 'critical',
    treatmentStatus: 'limited',
    category: 'Infectious',
    researchDirections: ['Rapid diagnostic tools', 'Immunomodulation therapies', 'AI early warning systems', 'Personalized antimicrobial therapy'],
    keyDataPoints: ['1 in 5 deaths globally', 'Every hour delay increases mortality 8%', 'Often misdiagnosed']
  },
  {
    id: 16,
    name: 'Sickle Cell Disease',
    prevalence: 8000000,
    prevalenceLabel: '8M',
    mortalityRate: 3.8,
    deathsPerYear: 300000,
    researchFunding: 'underfunded',
    treatmentStatus: 'limited',
    category: 'Genetic',
    researchDirections: ['CRISPR gene editing cure', 'Fetal hemoglobin reactivation', 'Bone marrow transplant optimization', 'Voxelotor and new therapeutics'],
    keyDataPoints: ['Most common genetic disorder', '300K born with it annually', 'Gene therapy showing cures']
  },
  {
    id: 17,
    name: 'Rabies',
    prevalence: 59000,
    prevalenceLabel: '59K',
    mortalityRate: 99.9,
    deathsPerYear: 59000,
    researchFunding: 'critical',
    treatmentStatus: 'effective',
    category: 'Infectious',
    researchDirections: ['Mass dog vaccination programs', 'Affordable biologics', 'Post-exposure protocol optimization', 'Monoclonal antibody alternatives'],
    keyDataPoints: ['Almost 100% fatal if untreated', '99% transmitted by dogs', 'Completely preventable']
  },
  {
    id: 18,
    name: 'Ebola Virus Disease',
    prevalence: 5000,
    prevalenceLabel: '5K',
    mortalityRate: 50.0,
    deathsPerYear: 2500,
    researchFunding: 'moderate',
    treatmentStatus: 'limited',
    category: 'Infectious',
    researchDirections: ['Improved vaccine coverage', 'Monoclonal antibody cocktails', 'Rapid diagnostic deployment', 'Outbreak response systems'],
    keyDataPoints: ['CFR 25-90% depending on strain', 'First vaccine 2019', 'Survivors have long-term effects']
  },
  {
    id: 19,
    name: 'Leishmaniasis',
    prevalence: 12000000,
    prevalenceLabel: '12M',
    mortalityRate: 2.5,
    deathsPerYear: 30000,
    researchFunding: 'critical',
    treatmentStatus: 'limited',
    category: 'Neglected Tropical',
    researchDirections: ['Oral drug development', 'Sandfly control innovation', 'Vaccine candidates', 'Combination therapies'],
    keyDataPoints: ['Second deadliest parasitic disease', 'Affects poorest populations', 'Linked to climate change spread']
  },
  {
    id: 20,
    name: 'Multiple Sclerosis',
    prevalence: 2800000,
    prevalenceLabel: '2.8M',
    mortalityRate: 7.1,
    deathsPerYear: 200000,
    researchFunding: 'moderate',
    treatmentStatus: 'partial',
    category: 'Neurological',
    researchDirections: ['Remyelination therapies', 'BTK inhibitors', 'EBV causal link investigation', 'Neuroprotection strategies'],
    keyDataPoints: ['EBV may be primary cause', 'Women 3x more likely', 'Highly variable progression']
  }
]

type SortKey = 'prevalence' | 'mortality' | 'deaths' | 'name'
type FundingFilter = 'all' | 'critical' | 'underfunded' | 'moderate' | 'well-funded'

const getSeverityClass = (mortalityRate: number): string => {
  if (mortalityRate >= 50) return 'severity-critical'
  if (mortalityRate >= 20) return 'severity-high'
  if (mortalityRate >= 10) return 'severity-elevated'
  if (mortalityRate >= 5) return 'severity-moderate'
  return 'severity-low'
}

const getSeverityLabel = (mortalityRate: number): string => {
  if (mortalityRate >= 50) return 'CRITICAL'
  if (mortalityRate >= 20) return 'HIGH'
  if (mortalityRate >= 10) return 'ELEVATED'
  if (mortalityRate >= 5) return 'MODERATE'
  return 'LOW'
}

const formatNumber = (num: number): string => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
  return num.toString()
}

const getFundingColor = (funding: string): string => {
  switch (funding) {
    case 'critical': return 'text-purple-400'
    case 'underfunded': return 'text-red-400'
    case 'moderate': return 'text-yellow-400'
    case 'well-funded': return 'text-green-400'
    default: return 'text-gray-400'
  }
}

const getTreatmentStatus = (status: string): { label: string; color: string } => {
  switch (status) {
    case 'none': return { label: 'No Treatment', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
    case 'limited': return { label: 'Limited Options', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' }
    case 'partial': return { label: 'Partially Treatable', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
    case 'effective': return { label: 'Effective Treatment', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
    default: return { label: 'Unknown', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
  }
}

function DiseaseCard({ disease, rank }: { disease: Disease; rank: number }) {
  const [expanded, setExpanded] = useState(false)
  const severityClass = getSeverityClass(disease.mortalityRate)
  const severityLabel = getSeverityLabel(disease.mortalityRate)
  const treatment = getTreatmentStatus(disease.treatmentStatus)
  
  return (
    <div 
      className={`${severityClass} card-glow rounded-lg bg-[#12121a] overflow-hidden transition-all duration-300 cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="font-mono text-[#606070] text-sm">#{String(rank).padStart(2, '0')}</div>
            <div>
              <h3 className="font-semibold text-lg text-[#e8e8f0] leading-tight">{disease.name}</h3>
              <div className="text-xs text-[#606070] font-mono mt-0.5">{disease.category}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="severity-indicator w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--severity-color)' }}
            />
            <span 
              className="font-mono text-xs font-semibold tracking-wider"
              style={{ color: 'var(--severity-color)' }}
            >
              {severityLabel}
            </span>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-[#0a0a0f] rounded-md p-3">
            <div className="text-[10px] uppercase tracking-wider text-[#606070] mb-1 font-mono">Affected</div>
            <div className="text-xl font-bold font-mono stat-value">{disease.prevalenceLabel}</div>
          </div>
          <div className="bg-[#0a0a0f] rounded-md p-3">
            <div className="text-[10px] uppercase tracking-wider text-[#606070] mb-1 font-mono">Mortality</div>
            <div className="text-xl font-bold font-mono" style={{ color: 'var(--severity-color)' }}>{disease.mortalityRate}%</div>
          </div>
          <div className="bg-[#0a0a0f] rounded-md p-3">
            <div className="text-[10px] uppercase tracking-wider text-[#606070] mb-1 font-mono">Deaths/Yr</div>
            <div className="text-xl font-bold font-mono stat-value">{formatNumber(disease.deathsPerYear)}</div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider border ${treatment.color}`}>
            {treatment.label}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-[#1a1a25] border border-[#2a2a3a] ${getFundingColor(disease.researchFunding)}`}>
            {disease.researchFunding.replace('-', ' ')}
          </span>
        </div>
        
        {/* Expanded Content */}
        {expanded && (
          <div className="mt-5 pt-5 border-t border-[#2a2a3a] space-y-4 animate-fadeIn">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#9898a8] mb-2 flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Research Directions
              </div>
              <div className="space-y-1.5">
                {disease.researchDirections.map((direction, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#9898a8]">
                    <span className="text-cyan-400 font-mono">→</span>
                    {direction}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-xs uppercase tracking-wider text-[#9898a8] mb-2 flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Key Data Points
              </div>
              <div className="space-y-1.5">
                {disease.keyDataPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#9898a8]">
                    <span className="text-magenta-400 font-mono" style={{ color: '#ff006e' }}>◆</span>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Expand Hint */}
        <div className="flex items-center justify-center mt-4 text-[10px] text-[#606070] uppercase tracking-widest font-mono">
          {expanded ? '▲ COLLAPSE' : '▼ EXPAND FOR RESEARCH DATA'}
        </div>
      </div>
      
      {/* Severity Bar */}
      <div className="h-1 bg-[#0a0a0f]">
        <div 
          className="h-full progress-bar"
          style={{ width: `${Math.min(disease.mortalityRate, 100)}%` }}
        />
      </div>
    </div>
  )
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('deaths')
  const [fundingFilter, setFundingFilter] = useState<FundingFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  
  const categories = useMemo(() => {
    const cats = [...new Set(diseases.map(d => d.category))]
    return ['all', ...cats.sort()]
  }, [])
  
  const filteredAndSortedDiseases = useMemo(() => {
    let result = [...diseases]
    
    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query)
      )
    }
    
    // Funding filter
    if (fundingFilter !== 'all') {
      result = result.filter(d => d.researchFunding === fundingFilter)
    }
    
    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(d => d.category === categoryFilter)
    }
    
    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'prevalence': return b.prevalence - a.prevalence
        case 'mortality': return b.mortalityRate - a.mortalityRate
        case 'deaths': return b.deathsPerYear - a.deathsPerYear
        case 'name': return a.name.localeCompare(b.name)
        default: return 0
      }
    })
    
    return result
  }, [searchQuery, sortBy, fundingFilter, categoryFilter])
  
  const totalAffected = useMemo(() => {
    return diseases.reduce((sum, d) => sum + d.prevalence, 0)
  }, [])
  
  const totalDeaths = useMemo(() => {
    return diseases.reduce((sum, d) => sum + d.deathsPerYear, 0)
  }, [])

  return (
    <div className="min-h-screen grid-bg">
      {/* Header */}
      <header className="border-b border-[#2a2a3a] bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center text-xl">
                  🔬
                </div>
                <h1 className="text-2xl md:text-3xl font-bold header-gradient">Disease Research Observatory</h1>
              </div>
              <p className="text-[#9898a8] text-sm font-mono">Prioritizing humanity's health challenges through data</p>
            </div>
            
            {/* Global Stats */}
            <div className="flex gap-6">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#606070] font-mono">Total Affected</div>
                <div className="text-xl font-bold font-mono text-cyan-400">{formatNumber(totalAffected)}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#606070] font-mono">Deaths/Year</div>
                <div className="text-xl font-bold font-mono text-red-400">{formatNumber(totalDeaths)}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#606070] font-mono">Diseases Tracked</div>
                <div className="text-xl font-bold font-mono text-[#e8e8f0]">{diseases.length}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Filters */}
      <div className="border-b border-[#2a2a3a] bg-[#12121a]/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606070]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search diseases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg pl-10 pr-4 py-2.5 text-sm font-mono text-[#e8e8f0] placeholder-[#606070] focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
            </div>
            
            {/* Sort & Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-sm font-mono text-[#e8e8f0] focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="deaths">Sort: Deaths/Year</option>
                <option value="prevalence">Sort: Prevalence</option>
                <option value="mortality">Sort: Mortality Rate</option>
                <option value="name">Sort: A-Z</option>
              </select>
              
              <select
                value={fundingFilter}
                onChange={(e) => setFundingFilter(e.target.value as FundingFilter)}
                className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-sm font-mono text-[#e8e8f0] focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="all">All Funding Levels</option>
                <option value="critical">Critical (Severely Underfunded)</option>
                <option value="underfunded">Underfunded</option>
                <option value="moderate">Moderate Funding</option>
                <option value="well-funded">Well Funded</option>
              </select>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-sm font-mono text-[#e8e8f0] focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mission Banner */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-magenta-500/10 border border-[#2a2a3a] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🎯</div>
            <div>
              <h2 className="font-semibold text-[#e8e8f0] mb-1">Mission: Research Every Direction, Explore Every Option</h2>
              <p className="text-sm text-[#9898a8]">This observatory tracks diseases by global impact to help prioritize research efforts. Click any disease card to reveal research directions and key data points. Start at the top and work your way down.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Disease Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAndSortedDiseases.map((disease, index) => (
            <DiseaseCard key={disease.id} disease={disease} rank={index + 1} />
          ))}
        </div>
        
        {filteredAndSortedDiseases.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-[#9898a8] font-mono">No diseases match your search criteria</div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-[#2a2a3a] bg-[#0a0a0f]/80">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#606070] font-mono">
            <div className="flex items-center gap-2">
              <span>Data compiled from WHO, CDC, NIH, and peer-reviewed research</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Requested by</span>
              <a href="https://twitter.com/T1000_V2" target="_blank" rel="noopener noreferrer" className="text-[#9898a8] hover:text-cyan-400 transition-colors">@T1000_V2</a>
              <span>·</span>
              <span>Built by</span>
              <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-[#9898a8] hover:text-cyan-400 transition-colors">@clonkbot</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App