import { BOTTOM_SUMMARY } from '../data/mockData'

export function BottomSummary() {
  return (
    <div className="px-4 pb-5 pt-1">
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm shadow-slate-900/5 backdrop-blur-sm">
        <p className="text-center text-[12px] font-medium leading-relaxed text-slate-600">
          <span className="text-slate-800">{BOTTOM_SUMMARY.line1}</span>
          <span className="mx-1.5 text-slate-300">·</span>
          <span>{BOTTOM_SUMMARY.line2}</span>
          <span className="mx-1.5 text-slate-300">·</span>
          <span className="text-emerald-700">{BOTTOM_SUMMARY.line3}</span>
        </p>
      </div>
    </div>
  )
}
