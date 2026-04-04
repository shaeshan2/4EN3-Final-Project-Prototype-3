import { RECOMMENDATION_ACTIVE, RECOMMENDATION_IDLE } from '../data/mockData'
import { IconNavigation, IconSparkles } from './icons'

type Props = {
  navigationActive: boolean
}

export function RecommendedAction({ navigationActive }: Props) {
  const data = navigationActive ? RECOMMENDATION_ACTIVE : RECOMMENDATION_IDLE

  return (
    <section className="px-4 pb-3" aria-label="Recommended action">
      <div
        className={`relative overflow-hidden rounded-2xl p-4 shadow-lg ring-1 transition duration-300 ${
          navigationActive
            ? 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-teal-600/25 ring-white/20'
            : 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 text-white shadow-slate-900/20 ring-white/10'
        }`}
      >
        <div
          className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl ${
            navigationActive ? 'bg-white/25' : 'bg-sky-400/20'
          }`}
        />
        <div className="relative flex items-start gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
              navigationActive ? 'bg-white/20' : 'bg-white/10'
            }`}
          >
            {navigationActive ? (
              <IconNavigation className="h-6 w-6 text-white" />
            ) : (
              <IconSparkles className="h-6 w-6 text-sky-200" />
            )}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">{data.title}</p>
            <p className="mt-1 text-[15px] font-semibold leading-snug">{data.directionHint}</p>
            {data.destinationTempC != null && (
              <p className="mt-2 text-sm font-medium text-white/90">
                Estimated destination temperature:{' '}
                <span className="tabular-nums font-semibold">{data.destinationTempC}°C</span>
              </p>
            )}
            <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-white/85">
              {data.bullets.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
