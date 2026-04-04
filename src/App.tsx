import { useMemo, useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { BottomSummary } from './components/BottomSummary'
import type { MapEmphasis } from './components/CoolRouteMap'
import { CoolRouteMap } from './components/CoolRouteMap'
import { EnvironmentDashboard } from './components/EnvironmentDashboard'
import { MapActionBar } from './components/MapActionBar'
import { RecommendedAction } from './components/RecommendedAction'
import { COOL_ZONES, USER_PROFILE } from './data/mockData'

function App() {
  const [emphasis, setEmphasis] = useState<MapEmphasis>('default')
  const [navigationActive, setNavigationActive] = useState(false)

  const bestCoolId = useMemo(() => COOL_ZONES.find((z) => z.isBest)?.id ?? COOL_ZONES[0]?.id ?? null, [])

  const handleHeat = () => setEmphasis('heat')
  const handleCool = () => setEmphasis('cool')
  const handleFindCoolest = () => {
    setEmphasis('cool')
    setNavigationActive(true)
  }

  return (
    <div className="flex min-h-svh items-start justify-center py-6 sm:items-center sm:py-10">
      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-[2.5rem] border border-white/70 bg-gradient-to-b from-white via-slate-50/90 to-slate-100/95 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/5"
        style={{ minHeight: 'min(860px, calc(100svh - 3rem))' }}
      >
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-7 rounded-b-3xl bg-slate-900/90"
          aria-hidden
        />
        <div className="relative flex max-h-[min(860px,calc(100svh-3rem))] flex-col overflow-y-auto overscroll-contain pb-1">
          <AppHeader greeting={USER_PROFILE.greeting} username={USER_PROFILE.username} />
          <EnvironmentDashboard />
          <RecommendedAction navigationActive={navigationActive} />
          <section className="px-4 pb-1 pt-1" aria-label="Map">
            <h2 className="mb-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Map</h2>
            <CoolRouteMap
              emphasis={emphasis}
              showRoute={navigationActive}
              highlightedCoolId={navigationActive ? bestCoolId : null}
            />
          </section>
          <MapActionBar emphasis={emphasis} onHeat={handleHeat} onCool={handleCool} onFindCoolest={handleFindCoolest} />
          <BottomSummary />
        </div>
      </div>
    </div>
  )
}

export default App
