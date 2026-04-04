import type { MapEmphasis } from './CoolRouteMap'

type Props = {
  emphasis: MapEmphasis
  onHeat: () => void
  onCool: () => void
  onFindCoolest: () => void
}

export function MapActionBar({ emphasis, onHeat, onCool, onFindCoolest }: Props) {
  const base =
    'flex-1 rounded-2xl px-3 py-3 text-[13px] font-semibold tracking-tight shadow-sm transition-all duration-200 active:scale-[0.98] sm:py-3.5'
  const idle = 'bg-white text-slate-700 ring-1 ring-slate-200/90 hover:bg-slate-50 hover:shadow-md'
  const heatOn = 'bg-gradient-to-b from-orange-500 to-amber-600 text-white shadow-orange-500/25 ring-0 hover:brightness-105'
  const coolOn = 'bg-gradient-to-b from-sky-500 to-blue-600 text-white shadow-blue-500/25 ring-0 hover:brightness-105'

  return (
    <div className="flex gap-2 px-4 pb-3">
      <button type="button" className={`${base} ${emphasis === 'heat' ? heatOn : idle}`} onClick={onHeat}>
        Show Heat Map
      </button>
      <button type="button" className={`${base} ${emphasis === 'cool' ? coolOn : idle}`} onClick={onCool}>
        Show Cool Zones
      </button>
      <button
        type="button"
        className={`${base} flex-[1.15] bg-gradient-to-b from-emerald-500 to-teal-600 text-white shadow-lg shadow-teal-600/30 ring-0 hover:brightness-105`}
        onClick={onFindCoolest}
      >
        Find Coolest Area
      </button>
    </div>
  )
}
