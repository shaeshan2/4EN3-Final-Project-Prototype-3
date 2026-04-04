import { IconSearch, IconUser } from './icons'

type Props = {
  greeting: string
  username: string
}

export function AppHeader({ greeting, username }: Props) {
  return (
    <header className="shrink-0 px-4 pt-5 pb-3">
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-white/60 transition-transform active:scale-95"
          aria-hidden
        >
          <IconUser className="h-6 w-6 opacity-95" />
        </div>
        <div className="min-w-0 text-left">
          <p className="text-[13px] font-medium tracking-wide text-slate-500">{greeting}</p>
          <h1 className="truncate text-lg font-semibold tracking-tight text-slate-900">{username}</h1>
        </div>
      </div>
      <label className="mt-4 block">
        <span className="sr-only">Search</span>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            readOnly
            placeholder="Search for a place or address"
            className="w-full cursor-default rounded-2xl border border-slate-200/90 bg-white/90 py-3 pl-11 pr-4 text-[15px] text-slate-800 shadow-sm shadow-slate-900/5 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-300 focus:shadow-md focus:shadow-sky-500/10"
          />
        </div>
      </label>
    </header>
  )
}
