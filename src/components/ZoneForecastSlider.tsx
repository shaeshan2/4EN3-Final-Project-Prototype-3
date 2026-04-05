import { useMemo, useState } from 'react'
import {
  FORECAST_SLIDER_MAX_HOURS,
  getForecastSamplesForZone,
  type ForecastSample,
} from '../data/mockData'
import { forecastAtHours, formatHoursLabel } from '../lib/forecast'
import { IconDroplets, IconSun, IconThermometer } from './icons'

type Props = {
  zoneId: string | null
  zoneTitle: string
  /** 'hot' | 'cool' for accent */
  zoneKind: 'hot' | 'cool' | null
  /** Current map time slider — shifts fallback forecast baselines */
  mapHoursFromNow: number
}

function tempHue(temp: number, minT: number, maxT: number): string {
  if (maxT <= minT) return '210 90% 45%'
  const t = (temp - minT) / (maxT - minT)
  const h = 210 - t * 210
  const s = 70 + t * 25
  const l = 55 - t * 12
  return `${h} ${s}% ${l}%`
}

export function ZoneForecastSlider({ zoneId, zoneTitle, zoneKind, mapHoursFromNow }: Props) {
  const [hours, setHours] = useState(0)

  const samples = useMemo(
    () => (zoneId ? getForecastSamplesForZone(zoneId, mapHoursFromNow) : []),
    [zoneId, mapHoursFromNow],
  )

  const { minT, maxT } = useMemo(() => {
    if (!samples.length) return { minT: 20, maxT: 32 }
    const temps = samples.map((s) => s.temperatureC)
    return { minT: Math.min(...temps), maxT: Math.max(...temps) }
  }, [samples])

  const snapshot: ForecastSample = useMemo(
    () => forecastAtHours(samples, hours),
    [samples, hours],
  )

  if (!zoneId || !zoneKind) return null

  const accent =
    zoneKind === 'cool'
      ? 'from-sky-500/15 via-cyan-500/10 to-blue-600/15'
      : 'from-orange-500/15 via-amber-500/10 to-rose-600/15'
  const sliderAccent = zoneKind === 'cool' ? '#0ea5e9' : '#ea580c'
  const fillPct = (hours / FORECAST_SLIDER_MAX_HOURS) * 100

  return (
    <section className="px-4 pb-3" aria-label="Zone time forecast">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${accent} p-4 shadow-md ring-1 ring-slate-200/80`}
      >
        <div className="relative rounded-xl bg-white/90 p-3.5 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Forecast in this zone
              </h3>
              <p className="mt-0.5 text-left text-[13px] font-semibold text-slate-800">{zoneTitle}</p>
            </div>
            <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              {formatHoursLabel(hours)}
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p
                className="text-4xl font-semibold tabular-nums tracking-tight"
                style={{ color: `hsl(${tempHue(snapshot.temperatureC, minT, maxT)})` }}
              >
                {snapshot.temperatureC}
                <span className="text-2xl font-semibold text-slate-400">°C</span>
              </p>
              <p className="mt-1 text-left text-[14px] font-medium text-slate-700">{snapshot.condition}</p>
              <p className="text-left text-[13px] text-slate-500">{snapshot.comfort}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 text-right">
              <div className="flex items-center gap-1.5 text-sky-600">
                <IconDroplets className="h-4 w-4 shrink-0 opacity-80" />
                <span className="text-sm font-semibold tabular-nums text-slate-700">
                  {snapshot.humidityPercent}%
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-500">
                <IconSun className="h-4 w-4 shrink-0 opacity-80" />
                <span className="text-[11px] font-medium text-slate-500">Mock outlook</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              <span>Now</span>
              <span>{FORECAST_SLIDER_MAX_HOURS}h ahead</span>
            </div>
            <div className="relative pt-1">
              <div
                className="pointer-events-none absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-slate-200/90"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-400 to-orange-400 opacity-40"
                style={{ width: `${fillPct}%` }}
                aria-hidden
              />
              <input
                type="range"
                min={0}
                max={FORECAST_SLIDER_MAX_HOURS}
                step={0.25}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="relative z-10 h-8 w-full cursor-pointer appearance-none bg-transparent"
                style={{ accentColor: sliderAccent }}
                aria-valuemin={0}
                aria-valuemax={FORECAST_SLIDER_MAX_HOURS}
                aria-valuenow={hours}
                aria-label="Hours into the future for this zone"
              />
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-500">
              Slide to preview {FORECAST_SLIDER_MAX_HOURS}h of mock conditions in this area
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-8 -top-8 opacity-[0.07]" aria-hidden>
          <IconThermometer className="h-28 w-28 text-slate-900" />
        </div>
      </div>
    </section>
  )
}
