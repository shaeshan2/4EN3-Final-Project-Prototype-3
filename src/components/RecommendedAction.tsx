import { RECOMMENDATION_ACTIVE, RECOMMENDATION_IDLE } from '../data/mockData'
import { IconNavigation, IconSparkles } from './icons'

export type RouteCardState =
  | { mode: 'idle' }
  | { mode: 'coolest' }
  | { mode: 'zone'; kind: 'hot' | 'cool'; tempC: number; distanceM: number }

type Props = {
  state: RouteCardState
}

function cardClasses(state: RouteCardState) {
  if (state.mode === 'idle') {
    return 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 text-white shadow-slate-900/20 ring-white/10'
  }
  if (state.mode === 'coolest') {
    return 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-teal-600/25 ring-white/20'
  }
  if (state.kind === 'hot') {
    return 'bg-gradient-to-br from-orange-500 via-amber-600 to-rose-600 text-white shadow-orange-600/25 ring-white/20'
  }
  return 'bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-600 text-white shadow-blue-600/25 ring-white/20'
}

function blurClass(state: RouteCardState) {
  if (state.mode === 'idle') return 'bg-sky-400/20'
  if (state.mode === 'coolest') return 'bg-white/25'
  if (state.mode === 'zone' && state.kind === 'hot') return 'bg-white/20'
  return 'bg-white/25'
}

export function RecommendedAction({ state }: Props) {
  const active = state.mode !== 'idle'
  const data =
    state.mode === 'coolest'
      ? RECOMMENDATION_ACTIVE
      : state.mode === 'idle'
        ? RECOMMENDATION_IDLE
        : null

  const title = data?.title ?? 'Route'
  const directionHint =
    state.mode === 'zone'
      ? `Shortest path to this ${state.kind === 'hot' ? 'warm' : 'cool'} zone`
      : (data?.directionHint ?? '')
  const destinationTempC =
    state.mode === 'zone' ? state.tempC : (data?.destinationTempC ?? null)
  const bullets =
    state.mode === 'zone'
      ? [
          `About ${Math.round(state.distanceM)} m along the direct path (mock)`,
          state.kind === 'hot'
            ? 'You are routing toward a warmer area — use for awareness only'
            : 'Follow the line on the map toward cooler conditions',
        ]
      : (data?.bullets ?? [])

  return (
    <section className="px-4 pb-3" aria-label="Recommended action">
      <div
        className={`relative overflow-hidden rounded-2xl p-4 shadow-lg ring-1 transition duration-300 ${cardClasses(state)}`}
      >
        <div className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl ${blurClass(state)}`} />
        <div className="relative flex items-start gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
              active ? 'bg-white/20' : 'bg-white/10'
            }`}
          >
            {active ? (
              <IconNavigation className="h-6 w-6 text-white" />
            ) : (
              <IconSparkles className="h-6 w-6 text-sky-200" />
            )}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">{title}</p>
            <p className="mt-1 text-[15px] font-semibold leading-snug">{directionHint}</p>
            {destinationTempC != null && (
              <p className="mt-2 text-sm font-medium text-white/90">
                {state.mode === 'coolest' ? 'Estimated destination temperature' : 'Zone temperature'}:{' '}
                <span className="tabular-nums font-semibold">{destinationTempC}°C</span>
              </p>
            )}
            <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-white/85">
              {bullets.map((line) => (
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
