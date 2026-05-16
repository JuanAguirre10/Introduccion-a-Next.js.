import axios from 'axios'
import SearchClient from './SearchClient'

const API_KEY = '4c48faab'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

async function getPopularMovies(): Promise<Movie[]> {
  const searches = ['avengers', 'batman', 'spider-man']
  const results = await Promise.all(
    searches.map(q =>
      axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&type=movie`)
    )
  )
  const movies: Movie[] = []
  results.forEach(r => {
    if (r.data.Search) movies.push(...r.data.Search.slice(0, 3))
  })
  return movies
}

export default async function MoviesPage() {
  const movies = await getPopularMovies()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-2">🎬 Galería de Películas</h1>
        <p className="text-gray-400 text-center mb-8">Busca y explora películas y series</p>

        {/* CSR - Búsqueda */}
        <SearchClient apiKey={API_KEY} />

        {/* SSR - Populares */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            🔥 Películas Populares
            <span className="ml-3 text-sm font-normal text-green-400 bg-green-400/10 px-3 py-1 rounded-full">SSR</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movies.map(movie => (
              <div key={movie.imdbID} className="bg-gray-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                  alt={movie.Title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <p className="text-white font-semibold text-sm truncate">{movie.Title}</p>
                  <p className="text-gray-400 text-xs">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}