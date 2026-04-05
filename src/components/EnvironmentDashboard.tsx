import { DASHBOARD } from '../data/mockData'
import { IconAlertTriangle, IconDroplets, IconSun, IconWind } from './icons'

export function EnvironmentDashboard() {
  const { temperatureC, condition, humidityPercent, windSpeedKmh, heatRiskLabel } = DASHBOARD

  return (
    <section className="px-4 pb-3" aria-label="Environment">
      <h2 className="mb-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
        Environment
      </h2>
      <div className="flex items-stretch gap-4 rounded-2xl bg-white/90 p-4 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80">
        <div className="flex min-w-0 flex-1 flex-col justify-center border-r border-slate-200/90 pr-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Now</p>
          <p className="mt-0.5 text-4xl font-semibold tabular-nums tracking-tight text-slate-900">{temperatureC}°C</p>
          <p className="mt-1 text-[15px] font-medium text-slate-600">{condition}</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5 text-left">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <IconDroplets className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Humidity</p>
              <p className="text-sm font-semibold tabular-nums text-slate-800">{humidityPercent}% · Moderate</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <IconWind className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Wind</p>
              <p className="text-sm font-semibold tabular-nums text-slate-800">
                {windSpeedKmh} km/h
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
              <IconAlertTriangle className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-rose-400">Comfort</p>
              <p className="text-sm font-semibold leading-snug text-rose-900">{heatRiskLabel}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-rose-700/90">
                <IconSun className="h-3 w-3 shrink-0" />
                Limit outdoor time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
