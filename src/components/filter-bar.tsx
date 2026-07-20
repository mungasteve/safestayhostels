'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const GENDERS = [
  { value: 'MALE', label: 'Male only' },
  { value: 'FEMALE', label: 'Female only' },
  { value: 'MIXED', label: 'Mixed' },
]

const ROOM_TYPES = [
  { value: 'SINGLE', label: 'Single' },
  { value: 'SHARED', label: 'Shared' },
  { value: 'BEDSITTER', label: 'Bedsitter' },
  { value: 'EN_SUITE', label: 'En-suite' },
]

export default function FilterBar() {
  const router = useRouter()
  const params = useSearchParams()

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString())
      value && value !== 'all' ? next.set(key, value) : next.delete(key)
      router.push(`/hostels?${next.toString()}`)
    },
    [params, router]
  )

  const hasFilters = params.toString().length > 0

  return (
    <div className="bg-background border rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal className="w-4 h-4" />
        Filter hostels
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name…"
            defaultValue={params.get('search') ?? ''}
            onChange={(e) => update('search', e.target.value)}
            className="pl-9"
          />
        </div>

        <Select defaultValue={params.get('gender') || 'all'} onValueChange={(v) => update('gender', v ?? '')}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Any gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any gender</SelectItem>
            {GENDERS.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select defaultValue={params.get('roomType') || 'all'} onValueChange={(v) => update('roomType', v ?? '')}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Any room type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any room type</SelectItem>
            {ROOM_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min price"
            defaultValue={params.get('minPrice') ?? ''}
            onChange={(e) => update('minPrice', e.target.value)}
            className="w-28"
          />
          <Input
            type="number"
            placeholder="Max price"
            defaultValue={params.get('maxPrice') ?? ''}
            onChange={(e) => update('maxPrice', e.target.value)}
            className="w-28"
          />
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => router.push('/hostels')} className="gap-1 text-muted-foreground">
            <X className="w-4 h-4" /> Clear
          </Button>
        )}
      </div>
    </div>
  )
}
