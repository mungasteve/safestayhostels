'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, X } from 'lucide-react'

export default function FilterBar() {
  const router = useRouter()
  const params = useSearchParams()

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString())
      value ? next.set(key, value) : next.delete(key)
      router.push(`/hostels?${next.toString()}`)
    },
    [params, router]
  )

  const hasFilters = params.toString().length > 0

  const selectClass = "h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer"

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            placeholder="Search by name…"
            defaultValue={params.get('search') ?? ''}
            onChange={(e) => update('search', e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
          />
        </div>

        <select
          value={params.get('gender') ?? ''}
          onChange={(e) => update('gender', e.target.value)}
          className={selectClass}
        >
          <option value="">Any gender</option>
          <option value="MALE">Male only</option>
          <option value="FEMALE">Female only</option>
          <option value="MIXED">Mixed</option>
        </select>

        <select
          value={params.get('roomType') ?? ''}
          onChange={(e) => update('roomType', e.target.value)}
          className={selectClass}
        >
          <option value="">Any room type</option>
          <option value="SINGLE">Single</option>
          <option value="SHARED">Shared</option>
          <option value="BEDSITTER">Bedsitter</option>
          <option value="EN_SUITE">En-suite</option>
        </select>

        <input
          type="number"
          placeholder="Min KES"
          defaultValue={params.get('minPrice') ?? ''}
          onChange={(e) => update('minPrice', e.target.value)}
          className="w-24 h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
        />
        <input
          type="number"
          placeholder="Max KES"
          defaultValue={params.get('maxPrice') ?? ''}
          onChange={(e) => update('maxPrice', e.target.value)}
          className="w-24 h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
        />

        {hasFilters && (
          <button
            onClick={() => router.push('/hostels')}
            className="inline-flex items-center gap-1 h-9 px-3 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>
    </div>
  )
}
