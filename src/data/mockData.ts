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

export const DASHBOARD = {
  temperatureC: 30,
  condition: 'Sunny',
  humidityPercent: 68,
  windSpeedKmh: 14,
  heatRiskLabel: 'High Heat Exposure',
} as const

export type HotZone = {
  id: string
  center: [number, number]
  radiusM: number
  temperatureC: number
  comfort: string
  note: string
}

export const HOT_ZONES: HotZone[] = [
  {
    id: 'hot-a',
    center: [43.65445, -79.38455],
    radiusM: 130,
    temperatureC: 38,
    comfort: 'Very hot',
    note: 'Open pavement, little shade',
  },
  {
    id: 'hot-b',
    center: [43.65205, -79.38135],
    radiusM: 110,
    temperatureC: 36,
    comfort: 'Hot',
    note: 'Sun-exposed plaza',
  },
]

export type CoolZone = {
  id: string
  center: [number, number]
  radiusM: number
  temperatureC: number
  comfort: string
  note: string
  /** When true, this is the “best” destination for Find Coolest Area */
  isBest: boolean
}

export const COOL_ZONES: CoolZone[] = [
  {
    id: 'cool-best',
    center: [43.65505, -79.38195],
    radiusM: 95,
    temperatureC: 24,
    comfort: 'Cool & comfortable',
    note: 'Tree canopy + indoor cooling nearby',
    isBest: true,
  },
  {
    id: 'cool-b',
    center: [43.65155, -79.38475],
    radiusM: 85,
    temperatureC: 26,
    comfort: 'Moderate relief',
    note: 'Shaded walkway',
    isBest: false,
  },
  {
    id: 'cool-c',
    center: [43.65385, -79.38045],
    radiusM: 75,
    temperatureC: 25,
    comfort: 'Pleasant',
    note: 'Park edge, breezy',
    isBest: false,
  },
]

/** Routes are computed in the app as a straight-line path from `USER_POSITION` to the tapped zone center. */

/** Card copy before “Find Coolest Area” */
export const RECOMMENDATION_IDLE = {
  title: 'Recommended Action',
  directionHint: 'Tap a warm or cool zone, or use “Find Coolest Area”',
  destinationTempC: null as number | null,
  bullets: [
    'Shortest path is drawn from you to the zone you select',
    'Orange zones are warmer; cyan zones are cooler',
  ],
} as const

/** Card copy after “Find Coolest Area” — ties to COOL_ZONES isBest */
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

export function findZoneById(
  id: string,
): { kind: 'hot'; zone: HotZone } | { kind: 'cool'; zone: CoolZone } | null {
  const hot = HOT_ZONES.find((z) => z.id === id)
  if (hot) return { kind: 'hot', zone: hot }
  const cool = COOL_ZONES.find((z) => z.id === id)
  if (cool) return { kind: 'cool', zone: cool }
  return null
}
