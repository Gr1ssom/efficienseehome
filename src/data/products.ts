import hubFacilityImg from '../assets/Aug_22_2025_E.jpg'

export interface Feature {
  title: string
  body: string
}

export interface Module {
  name: string
  items: string[]
}

export interface Integration {
  name: string
  description: string
  icon: string
}

export interface Product {
  id: string
  name: string
  shortName: string
  tagline: string
  description: string
  url: string
  path: string
  accentColor: string
  accentGradient: string
  accentLight: string
  features: Feature[]
  modules?: Module[]
  integrations?: Integration[]
  heroImage: string
}

export const products: Product[] = [
  {
    id: 'hub',
    name: 'HarvestHub',
    shortName: 'HarvestHub',
    tagline: 'Enterprise cannabis facility management. Seed to shelf.',
    description:
      'HarvestHub is a comprehensive operations platform for large-scale cannabis cultivation facilities. It coordinates cultivation teams, tracks batches through complex multi-stage workflows, integrates with regulatory and distribution systems, and provides real-time visibility across every department — from propagation to packaging.',
    url: 'https://hub.efficiensee.io',
    path: '/products/hub',
    accentColor: '#2d7a22',
    accentGradient: 'linear-gradient(135deg, #2d7a22, #e68c1a)',
    accentLight: '#f0fdf4',
    features: [
      { title: 'Full Lifecycle Tracking', body: 'Follow every crop from seed propagation through harvest, post-harvest processing, testing, packaging, and distribution — with complete weight accountability at every handoff.' },
      { title: 'Compliance Automation', body: 'Deep METRC integration for harvest sync, plant counts, test result retrieval, destruction tasks, and package barcode verification — always audit-ready.' },
      { title: 'Multi-Department Coordination', body: 'Cultivation, harvest, post-harvest, hash lab, pre-roll, and testing all operate in one unified platform with role-based access and department-scoped task management.' },
      { title: 'Real-Time Hardware Integration', body: 'Direct Web Serial connections to industrial scales and live Growlink sensor data keep your team working from ground truth, not estimates.' },
      { title: 'Hash Lab & Extractions', body: 'Full ice water extraction and rosin production workflow — from frozen intake through washing, pressing, melt, distillate allocation, and cartridge filling.' },
      { title: 'Advanced Analytics', body: 'Harvest report cards, COGS per crop, trim performance panels, genetics trending, cultivar health metrics, and soil analysis — all built in.' },
    ],
    modules: [
      {
        name: 'Cultivation',
        items: ['Crop Control', 'Propagating', 'Zone Clone', 'Vegging', 'Flowering', 'Genetics Dashboard', 'Defol Designator', 'Soil Reports', 'Cultivar Distribution', 'Failed Valves Log'],
      },
      {
        name: 'Harvest',
        items: ['Live Harvest', 'Harvested Queue', 'Harvest History'],
      },
      {
        name: 'Post-Harvest — Flower',
        items: ['Post-Harvest Overview', 'Dry Room / Bucking', 'Sorting', 'Trim', 'Trim QC', 'Cure', 'Allocation Station', 'Packaging & Labeling', 'Label Creator', 'Fulfillment'],
      },
      {
        name: 'Hash Lab',
        items: ['FF Bucking Terminal', 'Frozen & Ready', 'Washing', 'Pressing', 'Melt Menu', 'Disty Depot', 'VapeJet Queue', 'Jarring', 'Infusions', 'Hash Labeling'],
      },
      {
        name: 'Pre-Roll Operations',
        items: ['Collection Intake', 'S/F/P Queue', 'Machine Run Tracking', 'Combined Run System', 'Labeling Terminal', 'Testing & Fulfillment'],
      },
      {
        name: 'Personnel & Operations',
        items: ['Attendance Terminal', 'Task Dashboard', 'Task Tracker Terminal', 'Maintenance Log', 'Personnel Portal', 'Daily Messages', 'Company Hierarchy'],
      },
      {
        name: 'Analytics & Reporting',
        items: ['Harvest Report', 'Crop Report Cards', 'Allocation Analytics', 'COGS by Crop', 'Trim Performance Panel', 'Genetics Analytics', 'Soil Analytics'],
      },
    ],
    integrations: [
      { name: 'METRC', description: 'State-mandated track-and-trace — harvest sync, plant counts, test results, destruction tasks, and package barcode verification.', icon: '⚖️' },
      { name: 'Growlink', description: 'Real-time hardware controller, module, and sensor readings with 60-second polling, historical charts, and out-of-range alerts.', icon: '🌡️' },
      { name: 'LeafLink', description: 'B2B wholesale inventory sync with 30-minute background cache, order queue, product image caching, and price management.', icon: '🛒' },
      { name: 'SensorPush', description: 'Environmental monitoring — real-time temperature, humidity, and CO₂ with gateway status, alert thresholds, and historical trends.', icon: '📡' },
      { name: 'Scale Hardware', description: 'Direct USB Web Serial connection to industrial scales (Ohaus Ranger) — real-time polling, stability detection, and tare management.', icon: '⚖️' },
    ],
    heroImage: hubFacilityImg,
  },
]
