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
      {/* Buscador */}
      <div className="relative">
        <div className="flex items-center bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 focus-within:border-blue-400 transition">
          <span className="text-white text-xl mr-3">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca una película o serie..."
            className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-lg"
          />
          <span className="ml-3 text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">CSR</span>
        </div>
      </div>

      {/* Resultados */}
      {loading && (
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-400 mx-auto"></div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {results.map(movie => (
            <div
              key={movie.imdbID}
              onClick={() => openDetail(movie.imdbID)}
              className="bg-gray-700 rounded-xl overflow-hidden cursor-pointer hover:scale-105 hover:ring-2 hover:ring-blue-400 transition-all duration-200"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                alt={movie.Title}
                className="w-full h-44 object-cover"
              />
              <div className="p-2">
                <p className="text-white font-semibold text-xs truncate">{movie.Title}</p>
                <p className="text-gray-400 text-xs">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full p-6 border-2 border-gray-600 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
            <div className="flex gap-6">
              <img
                src={selected.Poster !== 'N/A' ? selected.Poster : '/no-image.png'}
                alt={selected.Title}
                className="w-36 h-52 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1">
                <h2 className="text-white text-2xl font-bold mb-1">{selected.Title}</h2>
                <p className="text-gray-400 text-sm mb-3">{selected.Year} · {selected.Runtime} · {selected.Genre}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400 text-lg">⭐</span>
                  <span className="text-white font-bold">{selected.imdbRating}</span>
                  <span className="text-gray-400 text-sm">IMDb</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{selected.Plot}</p>
                <p className="text-gray-400 text-xs"><span className="text-white">Director:</span> {selected.Director}</p>
                <p className="text-gray-400 text-xs mt-1"><span className="text-white">Actores:</span> {selected.Actors}</p>
                <p className="text-gray-400 text-xs mt-1"><span className="text-white">País:</span> {selected.Country}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}