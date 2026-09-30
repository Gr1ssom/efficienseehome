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
  {
    id: 'oasis',
    name: 'OrderOasis',
    shortName: 'OrderOasis',
    tagline: 'Order management and fulfillment for cannabis distribution.',
    description:
      'OrderOasis is the operations hub for cannabis distributors — a real-time order pipeline with team chat, LeafLink inventory sync, METRC transfer and manifest integration, and bulk import tools. Available as a web app and natively on iPad via Capacitor with biometric unlock and push notifications.',
    url: 'https://oasis.efficiensee.io',
    path: '/products/oasis',
    accentColor: '#1a6e8e',
    accentGradient: 'linear-gradient(135deg, #1a6e8e, #2d7a22)',
    accentLight: '#f0f9ff',
    features: [
      { title: 'Real-Time Order Pipeline', body: 'Live status updates across every order in the queue with built-in team chat, so your crew stays coordinated without leaving the app.' },
      { title: 'LeafLink Integration', body: 'Full inventory sync, 30-minute background caching, and price verification against partner pricing agreements — catch discrepancies before they become problems.' },
      { title: 'METRC Manifest Integration', body: 'Transfer and manifest creation proxied through a Supabase Edge Function — METRC compliance baked into the fulfillment workflow, not bolted on.' },
      { title: 'Bulk PDF & CSV Import', body: 'Drop in order files from any source format and let OrderOasis parse, validate, and queue them automatically. No manual re-entry.' },
      { title: 'iPad / iOS Native', body: 'Built with Capacitor for a true native iPad experience — biometric unlock, push notifications, and a touch-optimized UI for floor and dispatch use.' },
      { title: 'Dashboard Analytics', body: 'Order throughput, fulfillment rates, LeafLink sync status, and inventory health — all surfaced in a single operations dashboard.' },
    ],
    modules: [
      {
        name: 'Order Management',
        items: ['Live order pipeline', 'Real-time status updates', 'Team chat per order', 'Bulk PDF/CSV import', 'Order history & search'],
      },
      {
        name: 'LeafLink',
        items: ['Inventory sync & caching', 'Price verification', 'Partner pricing agreements', 'Product image caching', '30-min background refresh'],
      },
      {
        name: 'METRC',
        items: ['Transfer creation', 'Manifest generation', 'Edge function proxy', 'Package lookup', 'Compliance receipts'],
      },
      {
        name: 'Mobile / iOS',
        items: ['Capacitor iOS build', 'iPad-optimized UI', 'Biometric unlock', 'Push notifications', 'TestFlight distribution'],
      },
      {
        name: 'Analytics',
        items: ['Order throughput dashboard', 'Fulfillment rate tracking', 'LeafLink sync status', 'Inventory health metrics', 'Feature walkthroughs'],
      },
    ],
    integrations: [
      { name: 'LeafLink', description: 'B2B wholesale inventory sync with 30-minute background caching, price verification against partner agreements, and product image management.', icon: '🛒' },
      { name: 'METRC', description: 'Transfer and manifest integration via a Supabase Edge Function proxy — state-compliant documentation generated inside the fulfillment workflow.', icon: '⚖️' },
      { name: 'Supabase Realtime', description: 'Order status, chat messages, and inventory updates pushed live to every connected client — no polling, no refresh.', icon: '⚡' },
      { name: 'Capacitor / iOS', description: 'Native iOS and iPad build with biometric authentication, push notifications via APNs, and TestFlight distribution support.', icon: '📱' },
    ],
    heroImage: 'https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
]
