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

/** Slider max (hours). Keep final anchors near this value in `ZONE_FORECASTS`. */
export const FORECAST_SLIDER_MAX_HOURS = 6

export function getForecastSamplesForZone(zoneId: string): ForecastSample[] {
  const custom = ZONE_FORECASTS[zoneId]
  if (custom?.length) return custom
  const found = findZoneById(zoneId)
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

export function findZoneById(
  id: string,
): { kind: 'hot'; zone: HotZone } | { kind: 'cool'; zone: CoolZone } | null {
  const hot = HOT_ZONES.find((z) => z.id === id)
  if (hot) return { kind: 'hot', zone: hot }
  const cool = COOL_ZONES.find((z) => z.id === id)
  if (cool) return { kind: 'cool', zone: cool }
  return null
}
