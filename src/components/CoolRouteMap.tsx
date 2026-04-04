import L from 'leaflet'
import { useMemo } from 'react'
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import { COOL_ZONES, HOT_ZONES, ROUTE_COORDINATES, USER_POSITION } from '../data/mockData'

export type MapEmphasis = 'default' | 'heat' | 'cool'

type Props = {
  emphasis: MapEmphasis
  showRoute: boolean
  highlightedCoolId: string | null
}

function hotStyle(emphasis: MapEmphasis) {
  const strong = emphasis === 'heat'
  const dim = emphasis === 'cool'
  return {
    color: strong ? '#ea580c' : '#f97316',
    weight: strong ? 3 : 2,
    opacity: dim ? 0.35 : strong ? 0.95 : 0.75,
    fillColor: '#fb923c',
    fillOpacity: dim ? 0.12 : strong ? 0.5 : 0.28,
  }
}

function coolStyle(emphasis: MapEmphasis, highlighted: boolean) {
  const strong = emphasis === 'cool' || highlighted
  const dim = emphasis === 'heat' && !highlighted
  return {
    color: highlighted ? '#0284c7' : strong ? '#0ea5e9' : '#38bdf8',
    weight: highlighted ? 4 : strong ? 3 : 2,
    opacity: dim ? 0.3 : highlighted ? 1 : strong ? 0.9 : 0.7,
    fillColor: highlighted ? '#22d3ee' : '#7dd3fc',
    fillOpacity: dim ? 0.1 : highlighted ? 0.42 : strong ? 0.35 : 0.22,
  }
}

const MAP_CENTER: [number, number] = [USER_POSITION[0], USER_POSITION[1]]

export function CoolRouteMap({ emphasis, showRoute, highlightedCoolId }: Props) {
  const userIcon = useMemo(
    () =>
      L.divIcon({
        className: 'coolroute-user-marker',
        html: `
          <div style="
            width:36px;height:36px;border-radius:9999px;
            background:linear-gradient(145deg,#0ea5e9,#2563eb);
            box-shadow:0 0 0 4px rgba(255,255,255,.95),0 8px 20px rgba(37,99,235,.45);
            display:flex;align-items:center;justify-content:center;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"/>
            </svg>
          </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    [],
  )

  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl ring-1 ring-slate-200/80">
      <MapContainer
        center={MAP_CENTER}
        zoom={16}
        className="h-full w-full"
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {HOT_ZONES.map((z) => (
          <Circle key={z.id} center={z.center} radius={z.radiusM} pathOptions={hotStyle(emphasis)}>
            <Popup>
              <div className="min-w-[160px] text-slate-800">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">Hot zone</p>
                <p className="mt-1 text-lg font-bold tabular-nums">{z.temperatureC}°C</p>
                <p className="text-[13px] font-medium">{z.comfort}</p>
                <p className="mt-1 text-[12px] text-slate-600">{z.note}</p>
              </div>
            </Popup>
          </Circle>
        ))}
        {COOL_ZONES.map((z) => {
          const hi = highlightedCoolId === z.id
          return (
            <Circle key={z.id} center={z.center} radius={z.radiusM} pathOptions={coolStyle(emphasis, hi)}>
              <Popup>
                <div className="min-w-[160px] text-slate-800">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-600">Cool zone</p>
                  <p className="mt-1 text-lg font-bold tabular-nums">{z.temperatureC}°C</p>
                  <p className="text-[13px] font-medium">{z.comfort}</p>
                  <p className="mt-1 text-[12px] text-slate-600">{z.note}</p>
                  {z.isBest && (
                    <p className="mt-2 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800">
                      Recommended destination
                    </p>
                  )}
                </div>
              </Popup>
            </Circle>
          )
        })}
        {showRoute && (
          <Polyline
            positions={ROUTE_COORDINATES}
            pathOptions={{
              color: '#2563eb',
              weight: 5,
              opacity: 0.92,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        )}
        <Marker position={USER_POSITION} icon={userIcon}>
          <Popup>
            <div className="text-slate-800">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">You</p>
              <p className="text-[13px] font-medium">Current position</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900/10 to-transparent" />
    </div>
  )
}
