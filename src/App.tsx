import { useCallback, useMemo, useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { BottomSummary } from './components/BottomSummary'
import type { MapEmphasis } from './components/CoolRouteMap'
import { CoolRouteMap } from './components/CoolRouteMap'
import { EnvironmentDashboard } from './components/EnvironmentDashboard'
import { MapActionBar } from './components/MapActionBar'
import { MapTimeSlider } from './components/MapTimeSlider'
import { RecommendedAction, type RouteCardState } from './components/RecommendedAction'
import { ZoneForecastSlider } from './components/ZoneForecastSlider'
import {
  USER_POSITION,
  USER_PROFILE,
  findZoneByIdAtTime,
  getBestCoolZoneIdAtTime,
  getZonesAtMapTime,
} from './data/mockData'
import { haversineMeters, straightLineRoute } from './lib/route'

function App() {
  const [emphasis, setEmphasis] = useState<MapEmphasis>('default')
  const [mapTimeHours, setMapTimeHours] = useState(0)
  /** Selected destination zone for the visible polyline */
  const [routeZoneId, setRouteZoneId] = useState<string | null>(null)
  /** When true, recommendation card uses “Find Coolest” copy instead of generic zone copy */
  const [coolestFlow, setCoolestFlow] = useState(false)

  const zonesAtTime = useMemo(() => getZonesAtMapTime(mapTimeHours), [mapTimeHours])
  const bestCoolId = useMemo(() => getBestCoolZoneIdAtTime(mapTimeHours), [mapTimeHours])

  const routeMeta = useMemo(() => {
    if (!routeZoneId) return null
    const found = findZoneByIdAtTime(routeZoneId, mapTimeHours)
    if (!found) return null
    const dest = found.zone.center
    const positions = straightLineRoute(USER_POSITION, dest)
    const distanceM = haversineMeters(USER_POSITION, dest)
    return { found, positions, distanceM }
  }, [routeZoneId, mapTimeHours])

  const routeCardState: RouteCardState = useMemo(() => {
    if (!routeMeta) return { mode: 'idle' }
    if (coolestFlow && bestCoolId && routeZoneId === bestCoolId) {
      return { mode: 'coolest' }
    }
    const { kind, zone } = routeMeta.found
    return {
      mode: 'zone',
      kind,
      tempC: zone.temperatureC,
      distanceM: routeMeta.distanceM,
    }
  }, [routeMeta, coolestFlow, routeZoneId, bestCoolId])

  const handleHeat = () => setEmphasis('heat')
  const handleCool = () => setEmphasis('cool')
  const handleFindCoolest = () => {
    if (bestCoolId) {
      setEmphasis('cool')
      setRouteZoneId(bestCoolId)
      setCoolestFlow(true)
    }
  }

  const handleZoneSelect = useCallback((zoneId: string) => {
    setRouteZoneId(zoneId)
    setCoolestFlow(false)
  }, [])

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
          <RecommendedAction state={routeCardState} />
          <section className="px-4 pb-1 pt-1" aria-label="Map">
            <h2 className="mb-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Map</h2>
            <CoolRouteMap
              emphasis={emphasis}
              zones={zonesAtTime}
              routePositions={routeMeta?.positions ?? null}
              highlightedZoneId={routeZoneId}
              routeKind={routeMeta?.found.kind ?? null}
              onZoneSelect={handleZoneSelect}
            />
          </section>
          <MapTimeSlider hoursFromNow={mapTimeHours} onChange={setMapTimeHours} />
          {routeMeta && routeZoneId && (
            <ZoneForecastSlider
              key={routeZoneId}
              zoneId={routeZoneId}
              zoneKind={routeMeta.found.kind}
              mapHoursFromNow={mapTimeHours}
              zoneTitle={
                routeMeta.found.kind === 'cool'
                  ? `Cool zone · ${routeMeta.found.zone.note}`
                  : `Warm zone · ${routeMeta.found.zone.note}`
              }
            />
          )}
          <MapActionBar emphasis={emphasis} onHeat={handleHeat} onCool={handleCool} onFindCoolest={handleFindCoolest} />
          <BottomSummary />
        </div>
      </div>
    </div>
  )
}

export default App
