/** Straight-line path in WGS84 (linear interpolation). For short urban distances this matches the map’s shortest visible connection without a routing API. */
export function straightLineRoute(
  from: [number, number],
  to: [number, number],
  segments = 28,
): [number, number][] {
  const out: [number, number][] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    out.push([from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t])
  }
  return out
}

/** Great-circle distance in meters (for labels only). */
export function haversineMeters(a: [number, number], b: [number, number]): number {
  const R = 6371000
  const toRad = Math.PI / 180
  const dLat = (b[0] - a[0]) * toRad
  const dLon = (b[1] - a[1]) * toRad
  const lat1 = a[0] * toRad
  const lat2 = b[0] * toRad
  const x =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(x)))
}
