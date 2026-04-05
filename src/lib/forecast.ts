import type { ForecastSample } from '../data/mockData'

/** Linear interpolation between forecast anchors (mock only). */
export function forecastAtHours(samples: ForecastSample[], hours: number): ForecastSample {
  if (samples.length === 0) {
    return {
      hoursFromNow: hours,
      temperatureC: 22,
      condition: '—',
      comfort: '—',
      humidityPercent: 50,
    }
  }
  const h = Math.max(samples[0].hoursFromNow, Math.min(samples[samples.length - 1].hoursFromNow, hours))

  let i = 0
  while (i < samples.length - 1 && samples[i + 1].hoursFromNow <= h) {
    if (samples[i + 1].hoursFromNow === h) {
      return { ...samples[i + 1], hoursFromNow: h }
    }
    i += 1
  }
  const a = samples[i]
  const b = samples[Math.min(i + 1, samples.length - 1)]

  if (a.hoursFromNow === b.hoursFromNow) {
    return { ...a, hoursFromNow: h }
  }

  const t = (h - a.hoursFromNow) / (b.hoursFromNow - a.hoursFromNow)
  const temperatureC = Math.round((a.temperatureC + (b.temperatureC - a.temperatureC) * t) * 10) / 10
  const humidityPercent = Math.round(a.humidityPercent + (b.humidityPercent - a.humidityPercent) * t)
  const useA = t < 0.5

  return {
    hoursFromNow: h,
    temperatureC,
    humidityPercent,
    condition: useA ? a.condition : b.condition,
    comfort: useA ? a.comfort : b.comfort,
  }
}

export function formatHoursLabel(hours: number): string {
  if (hours < 0.08) return 'Now'
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (h === 0) return `In ${m} min`
  if (m === 0) return h === 1 ? 'In 1 hour' : `In ${h} hours`
  return `In ${h}h ${m}m`
}
