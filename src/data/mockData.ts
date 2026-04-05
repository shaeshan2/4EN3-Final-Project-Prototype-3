/**
 * CoolRoute — edit all mock content here.
 * Coordinates are [latitude, longitude] (WGS84).
 */

export const USER_PROFILE = {
  /** Shown next to greeting */
  username: 'USER 27009',
  greeting: 'Good Morning',
} as const

/** Current location marker & route start */
export const USER_POSITION: [number, number] = [43.65325, -79.38305]

/** One anchor for how the top “Environment” card reads at a map time. Edit `DASHBOARD_TIMELINE`. */
export type DashboardKeyframe = {
  hoursFromNow: number
  temperatureC: number
  condition: string
  humidityPercent: number
  /** Shown after the %, e.g. “Moderate” */
  humidityLabel: string
  windSpeedKmh: number
  heatRiskLabel: string
  /** Short line under comfort, e.g. “Limit outdoor time” */
  comfortHint: string
}

/**
 * User’s general environment vs map time (same 0–6h window as the map slider).
 * Values interpolate between keyframes; text fields switch at segment midpoint.
 */
export const DASHBOARD_TIMELINE: DashboardKeyframe[] = [
  {
    hoursFromNow: 0,
    temperatureC: 30,
    condition: 'Sunny',
    humidityPercent: 68,
    humidityLabel: 'Moderate',
    windSpeedKmh: 14,
    heatRiskLabel: 'High Heat Exposure',
    comfortHint: 'Limit outdoor time',
  },
  {
    hoursFromNow: 2,
    temperatureC: 33,
    condition: 'Very sunny',
    humidityPercent: 62,
    humidityLabel: 'Moderate',
    windSpeedKmh: 16,
    heatRiskLabel: 'Extreme heat risk',
    comfortHint: 'Avoid peak sun',
  },
  {
    hoursFromNow: 4,
    temperatureC: 34,
    condition: 'Hot & clear',
    humidityPercent: 58,
    humidityLabel: 'Drier air',
    windSpeedKmh: 18,
    heatRiskLabel: 'Very high exposure',
    comfortHint: 'Seek shade or AC',
  },
  {
    hoursFromNow: 6,
    temperatureC: 29,
    condition: 'Partly cloudy',
    humidityPercent: 64,
    humidityLabel: 'Moderate',
    windSpeedKmh: 12,
    heatRiskLabel: 'Elevated heat',
    comfortHint: 'Easier evening conditions',
  },
]

/** Slider max for “time across the map” (hours from now). */
export const MAP_TIME_SLIDER_MAX_HOURS = 6

export type DashboardSnapshot = Omit<DashboardKeyframe, 'hoursFromNow'> & {
  /** Query hour used (for labels) */
  hoursFromNow: number
}

export function getDashboardAtMapTime(hoursFromNow: number): DashboardSnapshot {
  const k = [...DASHBOARD_TIMELINE].sort((a, b) => a.hoursFromNow - b.hoursFromNow)
  if (k.length === 0) {
    return {
      hoursFromNow: hoursFromNow,
      temperatureC: 28,
      condition: 'Fair',
      humidityPercent: 60,
      humidityLabel: 'Moderate',
      windSpeedKmh: 14,
      heatRiskLabel: 'Moderate',
      comfortHint: 'Stay hydrated',
    }
  }
  const hMin = k[0].hoursFromNow
  const hMax = k[k.length - 1].hoursFromNow
  const h = Math.max(hMin, Math.min(hMax, hoursFromNow))

  if (h <= k[0].hoursFromNow) {
    const a = k[0]
    return { hoursFromNow: h, ...stripHours(a) }
  }
  if (h >= k[k.length - 1].hoursFromNow) {
    const a = k[k.length - 1]
    return { hoursFromNow: h, ...stripHours(a) }
  }

  let i = 0
  while (i < k.length - 1 && k[i + 1].hoursFromNow < h) i += 1
  const a = k[i]
  const b = k[i + 1]
  const span = b.hoursFromNow - a.hoursFromNow
  const t = span > 0 ? (h - a.hoursFromNow) / span : 0
  const temperatureC = round1(a.temperatureC + (b.temperatureC - a.temperatureC) * t)
  const humidityPercent = Math.round(a.humidityPercent + (b.humidityPercent - a.humidityPercent) * t)
  const windSpeedKmh = round1(a.windSpeedKmh + (b.windSpeedKmh - a.windSpeedKmh) * t)
  const useA = t < 0.5
  return {
    hoursFromNow: h,
    temperatureC,
    humidityPercent,
    windSpeedKmh,
    condition: useA ? a.condition : b.condition,
    humidityLabel: useA ? a.humidityLabel : b.humidityLabel,
    heatRiskLabel: useA ? a.heatRiskLabel : b.heatRiskLabel,
    comfortHint: useA ? a.comfortHint : b.comfortHint,
  }
}

function stripHours(x: DashboardKeyframe): Omit<DashboardKeyframe, 'hoursFromNow'> {
  const { hoursFromNow, ...rest } = x
  void hoursFromNow
  return rest
}

/** One keyframe in a zone’s timeline — kind can flip (cool ↔ hot) as hours advance. */
export type ZoneTimeKeyframe = {
  hoursFromNow: number
  kind: 'hot' | 'cool'
  temperatureC: number
  comfort: string
  note: string
  /** Only for cool keyframes; used by Find Coolest when kind is cool */
  isBest?: boolean
}

export type ZoneTimeline = {
  id: string
  center: [number, number]
  radiusM: number
  keyframes: ZoneTimeKeyframe[]
}

/**
 * All map zones and how they evolve over `MAP_TIME_SLIDER_MAX_HOURS`.
 * Edit keyframes to change when a place stops being cool / becomes hot, etc.
 */
export const ZONE_TIMELINES: ZoneTimeline[] = [
  {
    id: 'hot-a',
    center: [43.65445, -79.38455],
    radiusM: 130,
    keyframes: [
      {
        hoursFromNow: 0,
        kind: 'hot',
        temperatureC: 38,
        comfort: 'Very hot',
        note: 'Open pavement, little shade',
      },
      {
        hoursFromNow: 2,
        kind: 'hot',
        temperatureC: 39,
        comfort: 'Peak heat',
        note: 'Afternoon sun',
      },
      {
        hoursFromNow: 4,
        kind: 'hot',
        temperatureC: 37,
        comfort: 'Still hot',
        note: 'Slight shadow shift',
      },
      {
        hoursFromNow: 6,
        kind: 'cool',
        temperatureC: 31,
        comfort: 'Evening pocket',
        note: 'Building shade — now reads as a cool zone',
      },
    ],
  },
  {
    id: 'hot-b',
    center: [43.65205, -79.38135],
    radiusM: 110,
    keyframes: [
      {
        hoursFromNow: 0,
        kind: 'hot',
        temperatureC: 36,
        comfort: 'Hot',
        note: 'Sun-exposed plaza',
      },
      {
        hoursFromNow: 2,
        kind: 'hot',
        temperatureC: 37,
        comfort: 'Very hot',
        note: 'Peak plaza sun',
      },
      {
        hoursFromNow: 4,
        kind: 'hot',
        temperatureC: 35,
        comfort: 'Hot',
        note: 'Still exposed',
      },
      {
        hoursFromNow: 6,
        kind: 'cool',
        temperatureC: 28,
        comfort: 'Shade returns',
        note: 'Trees cover the plaza — now a cool zone',
      },
    ],
  },
  {
    id: 'cool-best',
    center: [43.65505, -79.38195],
    radiusM: 95,
    keyframes: [
      {
        hoursFromNow: 0,
        kind: 'cool',
        temperatureC: 24,
        comfort: 'Cool & comfortable',
        note: 'Tree canopy + indoor cooling nearby',
        isBest: true,
      },
      {
        hoursFromNow: 2,
        kind: 'cool',
        temperatureC: 26,
        comfort: 'Still pleasant',
        note: 'Warming slowly',
        isBest: true,
      },
      {
        hoursFromNow: 4,
        kind: 'cool',
        temperatureC: 28,
        comfort: 'Warm but OK',
        note: 'Less ideal — still coolest pocket nearby',
        isBest: true,
      },
      {
        hoursFromNow: 6,
        kind: 'cool',
        temperatureC: 29,
        comfort: 'Mild evening',
        note: 'Stays cooler than open pavement',
        isBest: true,
      },
    ],
  },
  {
    id: 'cool-b',
    center: [43.65155, -79.38475],
    radiusM: 85,
    keyframes: [
      {
        hoursFromNow: 0,
        kind: 'cool',
        temperatureC: 26,
        comfort: 'Moderate relief',
        note: 'Shaded walkway',
      },
      {
        hoursFromNow: 2,
        kind: 'cool',
        temperatureC: 27,
        comfort: 'Warming',
        note: 'Shade thinning',
      },
      {
        hoursFromNow: 4,
        kind: 'hot',
        temperatureC: 33,
        comfort: 'Sun-struck',
        note: 'No longer a cool zone — direct sun',
      },
      {
        hoursFromNow: 6,
        kind: 'hot',
        temperatureC: 31,
        comfort: 'Warm',
        note: 'Evening, still warm concrete',
      },
    ],
  },
  {
    id: 'cool-c',
    center: [43.65385, -79.38045],
    radiusM: 75,
    keyframes: [
      {
        hoursFromNow: 0,
        kind: 'cool',
        temperatureC: 25,
        comfort: 'Pleasant',
        note: 'Park edge, breezy',
      },
      {
        hoursFromNow: 2,
        kind: 'cool',
        temperatureC: 26,
        comfort: 'Comfortable',
        note: 'Breeze holds',
      },
      {
        hoursFromNow: 4,
        kind: 'cool',
        temperatureC: 28,
        comfort: 'Warming',
        note: 'Sun creeping in',
      },
      {
        hoursFromNow: 6,
        kind: 'hot',
        temperatureC: 32,
        comfort: 'Hot spell',
        note: 'Open sky — now modeled as a warm zone',
      },
    ],
  },
]

export type MapZone = {
  id: string
  center: [number, number]
  radiusM: number
  kind: 'hot' | 'cool'
  temperatureC: number
  comfort: string
  note: string
  isBest?: boolean
}

function pickKeyframeFields(k: ZoneTimeKeyframe): Omit<MapZone, 'id' | 'center' | 'radiusM'> {
  const { kind, temperatureC, comfort, note, isBest } = k
  return {
    kind,
    temperatureC,
    comfort,
    note,
    ...(isBest !== undefined ? { isBest } : {}),
  }
}

function round1(n: number) {
  return Math.round(n * 10) / 10
}

export function resolveZoneAtTime(
  tl: ZoneTimeline,
  hoursFromNow: number,
): Omit<MapZone, 'id' | 'center' | 'radiusM'> {
  const k = [...tl.keyframes].sort((a, b) => a.hoursFromNow - b.hoursFromNow)
  if (k.length === 0) {
    return { kind: 'cool', temperatureC: 26, comfort: 'Moderate', note: 'Mock zone' }
  }
  const hMin = k[0].hoursFromNow
  const hMax = k[k.length - 1].hoursFromNow
  const h = Math.max(hMin, Math.min(hMax, hoursFromNow))

  if (h <= k[0].hoursFromNow) return pickKeyframeFields(k[0])
  if (h >= k[k.length - 1].hoursFromNow) return pickKeyframeFields(k[k.length - 1])

  let i = 0
  while (i < k.length - 1 && k[i + 1].hoursFromNow < h) i += 1
  const a = k[i]
  const b = k[i + 1]
  const span = b.hoursFromNow - a.hoursFromNow
  const t = span > 0 ? (h - a.hoursFromNow) / span : 0
  const temperatureC = round1(a.temperatureC + (b.temperatureC - a.temperatureC) * t)
  const useA = t < 0.5
  const base: Omit<MapZone, 'id' | 'center' | 'radiusM'> = {
    kind: useA ? a.kind : b.kind,
    temperatureC,
    comfort: useA ? a.comfort : b.comfort,
    note: useA ? a.note : b.note,
  }
  const ib = useA ? a.isBest : b.isBest
  if (ib !== undefined) return { ...base, isBest: ib }
  return base
}

export function getZonesAtMapTime(hoursFromNow: number): MapZone[] {
  return ZONE_TIMELINES.map((tl) => ({
    id: tl.id,
    center: tl.center,
    radiusM: tl.radiusM,
    ...resolveZoneAtTime(tl, hoursFromNow),
  }))
}

export function getBestCoolZoneIdAtTime(hoursFromNow: number): string | null {
  const cool = getZonesAtMapTime(hoursFromNow).filter((z) => z.kind === 'cool')
  const tagged = cool.find((z) => z.isBest)
  if (tagged) return tagged.id
  if (cool.length === 0) return null
  return cool.reduce((a, b) => (a.temperatureC <= b.temperatureC ? a : b)).id
}

export function findZoneByIdAtTime(
  id: string,
  hoursFromNow: number,
): { kind: 'hot' | 'cool'; zone: MapZone } | null {
  const tl = ZONE_TIMELINES.find((z) => z.id === id)
  if (!tl) return null
  const zone: MapZone = {
    id: tl.id,
    center: tl.center,
    radiusM: tl.radiusM,
    ...resolveZoneAtTime(tl, hoursFromNow),
  }
  return { kind: zone.kind, zone }
}

/** Routes are computed in the app as a straight-line path from `USER_POSITION` to the tapped zone center. */

/** Card copy before “Find Coolest Area” */
export const RECOMMENDATION_IDLE = {
  title: 'Recommended Action',
  directionHint: 'Tap a warm or cool zone, or use “Find Coolest Area”',
  destinationTempC: null as number | null,
  bullets: [
    'Shortest path is drawn from you to the zone you select',
    'Use the time slider under the map to see zones change',
  ],
} as const

/** Card copy after “Find Coolest Area” — ties to coolest zone at current map time */
export const RECOMMENDATION_ACTIVE = {
  title: 'Recommended Action',
  directionHint: 'Move 200m northeast to reach a cooler area',
  destinationTempC: 24,
  bullets: [
    'Lower humidity and more shade detected',
    'Indoor cooling available nearby',
  ],
} as const

export const BOTTOM_SUMMARY = {
  line1: 'Fastest cooler route available',
  line2: 'Estimated heat exposure reduced by 20%',
  line3: 'Safer path recommended',
} as const

/** One anchor for the zone forecast slider — edit times & values per zone in `ZONE_FORECASTS`. */
export type ForecastSample = {
  hoursFromNow: number
  temperatureC: number
  condition: string
  comfort: string
  humidityPercent: number
}

/**
 * Forecast anchors keyed by zone id. The UI slider interpolates between these points.
 * Max time should match `FORECAST_SLIDER_MAX_HOURS`.
 */
export const ZONE_FORECASTS: Record<string, ForecastSample[]> = {
  'cool-best': [
    {
      hoursFromNow: 0,
      temperatureC: 24,
      condition: 'Partly cloudy',
      comfort: 'Cool & comfortable',
      humidityPercent: 62,
    },
    {
      hoursFromNow: 2,
      temperatureC: 25,
      condition: 'Mostly sunny',
      comfort: 'Still pleasant',
      humidityPercent: 58,
    },
    {
      hoursFromNow: 4,
      temperatureC: 27,
      condition: 'Sunny',
      comfort: 'Warming up',
      humidityPercent: 55,
    },
    {
      hoursFromNow: 6,
      temperatureC: 29,
      condition: 'Clear, bright',
      comfort: 'Moderate heat',
      humidityPercent: 52,
    },
  ],
  'cool-b': [
    { hoursFromNow: 0, temperatureC: 26, condition: 'Hazy sun', comfort: 'Moderate relief', humidityPercent: 64 },
    { hoursFromNow: 2, temperatureC: 27, condition: 'Sunny', comfort: 'Warm', humidityPercent: 60 },
    { hoursFromNow: 4, temperatureC: 29, condition: 'Hot sun', comfort: 'Less comfortable', humidityPercent: 56 },
    { hoursFromNow: 6, temperatureC: 31, condition: 'Very sunny', comfort: 'High heat feel', humidityPercent: 53 },
  ],
  'cool-c': [
    { hoursFromNow: 0, temperatureC: 25, condition: 'Light breeze', comfort: 'Pleasant', humidityPercent: 61 },
    { hoursFromNow: 2, temperatureC: 26, condition: 'Fair', comfort: 'Comfortable', humidityPercent: 59 },
    { hoursFromNow: 4, temperatureC: 28, condition: 'Sunny', comfort: 'Warm afternoon', humidityPercent: 56 },
    { hoursFromNow: 6, temperatureC: 30, condition: 'Clear', comfort: 'Hot spell', humidityPercent: 54 },
  ],
  'hot-a': [
    { hoursFromNow: 0, temperatureC: 38, condition: 'Intense sun', comfort: 'Very hot', humidityPercent: 48 },
    { hoursFromNow: 2, temperatureC: 39, condition: 'Peak heat', comfort: 'Extreme exposure', humidityPercent: 46 },
    { hoursFromNow: 4, temperatureC: 37, condition: 'Still hot', comfort: 'High risk', humidityPercent: 47 },
    { hoursFromNow: 6, temperatureC: 34, condition: 'Softening light', comfort: 'Hot but easing', humidityPercent: 50 },
  ],
  'hot-b': [
    { hoursFromNow: 0, temperatureC: 36, condition: 'Sunny', comfort: 'Hot', humidityPercent: 52 },
    { hoursFromNow: 2, temperatureC: 37, condition: 'Very sunny', comfort: 'Very hot', humidityPercent: 50 },
    { hoursFromNow: 4, temperatureC: 35, condition: 'Bright', comfort: 'Hot', humidityPercent: 51 },
    { hoursFromNow: 6, temperatureC: 32, condition: 'Partly cloudy', comfort: 'Warm', humidityPercent: 54 },
  ],
}

/** Slider max (hours) for the per-zone forecast card. */
export const FORECAST_SLIDER_MAX_HOURS = 6

export function getForecastSamplesForZone(zoneId: string, mapHoursFromNow = 0): ForecastSample[] {
  const custom = ZONE_FORECASTS[zoneId]
  if (custom?.length) return custom
  const found = findZoneByIdAtTime(zoneId, mapHoursFromNow)
  if (!found) {
    return [
      {
        hoursFromNow: 0,
        temperatureC: 26,
        condition: 'Fair',
        comfort: 'Moderate',
        humidityPercent: 60,
      },
      {
        hoursFromNow: FORECAST_SLIDER_MAX_HOURS,
        temperatureC: 28,
        condition: 'Warm',
        comfort: 'Warm',
        humidityPercent: 55,
      },
    ]
  }
  const t0 = found.zone.temperatureC
  if (found.kind === 'cool') {
    return [
      { hoursFromNow: 0, temperatureC: t0, condition: 'Current', comfort: found.zone.comfort, humidityPercent: 62 },
      {
        hoursFromNow: 3,
        temperatureC: t0 + 2,
        condition: 'Warming',
        comfort: 'Less cool',
        humidityPercent: 56,
      },
      {
        hoursFromNow: FORECAST_SLIDER_MAX_HOURS,
        temperatureC: t0 + 4,
        condition: 'Much warmer',
        comfort: 'Hotter than now',
        humidityPercent: 52,
      },
    ]
  }
  return [
    { hoursFromNow: 0, temperatureC: t0, condition: 'Current', comfort: found.zone.comfort, humidityPercent: 50 },
    {
      hoursFromNow: 3,
      temperatureC: t0 - 1,
      condition: 'Slight relief',
      comfort: 'Still hot',
      humidityPercent: 51,
    },
    {
      hoursFromNow: FORECAST_SLIDER_MAX_HOURS,
      temperatureC: t0 - 3,
      condition: 'Cooling trend',
      comfort: 'Warm',
      humidityPercent: 54,
    },
  ]
}
