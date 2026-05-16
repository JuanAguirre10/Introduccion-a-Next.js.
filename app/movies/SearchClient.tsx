'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

interface MovieDetail {
  Title: string
  Year: string
  Poster: string
  Plot: string
  Director: string
  Actors: string
  Genre: string
  imdbRating: string
  Runtime: string
  Language: string
  Country: string
}

interface Props {
  apiKey: string
}

export default function SearchClient({ apiKey }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<MovieDetail | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    const timeout = setTimeout(async () => {
      setLoading(true)
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      )
      setResults(response.data.Search || [])
      setLoading(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [query])

  const openDetail = async (id: string) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
    )
    setSelected(response.data)
    setModalOpen(true)
  }

  return (
    <div>
      {/* Search bar */}
      <div className="relative max-w-xl mx-auto">
        <div className="flex items-center gap-3 border border-[#c9a84c]/30 bg-white/[0.03] px-4 py-3 rounded-sm focus-within:border-[#c9a84c]/70 transition-colors duration-300">
          <svg className="w-4 h-4 text-[#c9a84c]/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search films, series..."
            className="bg-transparent text-white placeholder-white/20 outline-none w-full text-sm tracking-wide"
            style={{ fontFamily: 'Georgia, serif' }}
          />
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a84c]/60 border border-[#c9a84c]/20 px-2 py-0.5 flex-shrink-0">
            CSR
          </span>
        </div>
        {/* Decorative corners */}
        <div className="absolute -top-px -left-px w-2.5 h-2.5 border-t border-l border-[#c9a84c]" />
        <div className="absolute -top-px -right-px w-2.5 h-2.5 border-t border-r border-[#c9a84c]" />
        <div className="absolute -bottom-px -left-px w-2.5 h-2.5 border-b border-l border-[#c9a84c]" />
        <div className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b border-r border-[#c9a84c]" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-1 items-end">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-[#c9a84c] rounded-sm animate-pulse"
                style={{ height: `${12 + i * 4}px`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/30 whitespace-nowrap">
              {results.length} results
            </p>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
            {results.map(movie => (
              <div
                key={movie.imdbID}
                onClick={() => openDetail(movie.imdbID)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-sm aspect-[2/3]">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                    alt={movie.Title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full border border-[#c9a84c] flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#c9a84c] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
                <div className="mt-1 px-0.5">
                  <p className="text-white text-[9px] font-semibold truncate">{movie.Title}</p>
                  <p className="text-[#c9a84c]/50 text-[8px] tracking-widest">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-[#0e0e0e] border border-[#c9a84c]/20 w-full max-w-lg sm:max-w-2xl rounded-sm overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Top border accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c9a84c]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#c9a84c]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#c9a84c]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c9a84c]" />

            <div className="flex flex-col sm:flex-row gap-0">
              {/* Poster */}
              <div className="w-full sm:w-40 flex-shrink-0 max-h-48 sm:max-h-none overflow-hidden">
                <img
                  src={selected.Poster !== 'N/A' ? selected.Poster : '/no-image.png'}
                  alt={selected.Title}
                  className="w-full h-full object-cover object-top sm:object-center"
                />
              </div>

              {/* Info */}
              <div className="flex-1 p-5 sm:p-7">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-3 right-4 text-white/30 hover:text-[#c9a84c] transition-colors text-base"
                >
                  ✕
                </button>

                <p className="text-[#c9a84c] text-[8px] tracking-[0.5em] uppercase mb-1.5">Now Showing</p>
                <h2
                  className="text-white text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight mb-1"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {selected.Title}
                </h2>
                <p className="text-white/30 text-[10px] tracking-widest mb-3">
                  {selected.Year} · {selected.Runtime} · {selected.Genre}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#c9a84c]">★</span>
                  <span className="text-white font-black text-base">{selected.imdbRating}</span>
                  <span className="text-white/30 text-[10px] tracking-widest uppercase">IMDb</span>
                </div>

                <div className="h-px bg-[#c9a84c]/10 mb-4" />

                <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-3">{selected.Plot}</p>

                <div className="space-y-1.5">
                  {[
                    { label: 'Director', value: selected.Director },
                    { label: 'Cast', value: selected.Actors },
                    { label: 'Country', value: selected.Country },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-2">
                      <span className="text-[#c9a84c] text-[9px] tracking-widest uppercase w-14 flex-shrink-0">{label}</span>
                      <span className="text-white/40 text-[9px] truncate">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
          </div>
        </div>
      )}
    </div>
  )
}