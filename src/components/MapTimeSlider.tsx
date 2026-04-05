import { MAP_TIME_SLIDER_MAX_HOURS } from '../data/mockData'
import { formatHoursLabel } from '../lib/forecast'

type Props = {
  hoursFromNow: number
  onChange: (hours: number) => void
}

export function MapTimeSlider({ hoursFromNow, onChange }: Props) {
  return (
    <div className="px-4 pb-3" aria-label="Map time">
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-sm ring-1 ring-slate-900/5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Map time</h3>
            <p className="text-[13px] font-semibold text-slate-800">How zones evolve later today</p>
          </div>
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
            {formatHoursLabel(hoursFromNow)}
          </span>
        </div>
        <p className="mt-1 text-left text-[11px] leading-snug text-slate-500">
          Warm and cool circles update as mock conditions change — some spots flip type by evening.
        </p>
        <div className="relative mt-4 pt-0.5">
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-slate-200/90"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-500 via-amber-400 to-orange-500 opacity-50"
            style={{ width: `${(hoursFromNow / MAP_TIME_SLIDER_MAX_HOURS) * 100}%` }}
            aria-hidden
          />
          <input
            type="range"
            min={0}
            max={MAP_TIME_SLIDER_MAX_HOURS}
            step={0.25}
            value={hoursFromNow}
            onChange={(e) => onChange(Number(e.target.value))}
            className="relative z-10 h-9 w-full cursor-pointer appearance-none bg-transparent"
            style={{ accentColor: '#0ea5e9' }}
            aria-valuemin={0}
            aria-valuemax={MAP_TIME_SLIDER_MAX_HOURS}
            aria-valuenow={hoursFromNow}
            aria-label="Hours from now for map zones"
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          <span>Now</span>
          <span>+{MAP_TIME_SLIDER_MAX_HOURS}h</span>
        </div>
      </div>
    </div>
  )
}
