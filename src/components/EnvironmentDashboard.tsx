import { DASHBOARD } from '../data/mockData'
import { IconAlertTriangle, IconDroplets, IconSun, IconThermometer, IconWind } from './icons'

export function EnvironmentDashboard() {
  const { temperatureC, condition, humidityPercent, windSpeedKmh, heatRiskLabel } = DASHBOARD

  return (
    <section className="px-4 pb-3" aria-label="Environment">
      <h2 className="mb-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
        Environment
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-white/90 p-3 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 transition hover:shadow-lg">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Now</p>
              <p className="mt-0.5 text-2xl font-semibold tabular-nums text-slate-900">{temperatureC}°C</p>
              <p className="text-[13px] font-medium text-slate-600">{condition}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
              <IconThermometer className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/90 p-3 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 transition hover:shadow-lg">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Humidity</p>
              <p className="mt-0.5 text-2xl font-semibold tabular-nums text-slate-900">{humidityPercent}%</p>
              <p className="text-[13px] font-medium text-slate-600">Moderate</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-2 text-sky-600">
              <IconDroplets className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/90 p-3 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 transition hover:shadow-lg">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Wind</p>
              <p className="mt-0.5 text-2xl font-semibold tabular-nums text-slate-900">{windSpeedKmh}</p>
              <p className="text-[13px] font-medium text-slate-600">km/h</p>
            </div>
            <div className="rounded-xl bg-slate-100 p-2 text-slate-600">
              <IconWind className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50/90 p-3 shadow-md shadow-orange-900/5 ring-1 ring-rose-200/60 transition hover:shadow-lg">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-rose-500/90">Comfort</p>
              <p className="mt-1 text-[13px] font-semibold leading-snug text-rose-900">{heatRiskLabel}</p>
              <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-rose-700/90">
                <IconSun className="h-3.5 w-3.5 shrink-0" />
                Limit outdoor time
              </p>
            </div>
            <div className="rounded-xl bg-white/80 p-2 text-rose-500">
              <IconAlertTriangle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
