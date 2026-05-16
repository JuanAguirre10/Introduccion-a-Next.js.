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
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-[#c9a84c]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-[3px]">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] h-6 bg-[#c9a84c] rounded-sm"
                  style={{ opacity: 0.3 + i * 0.12 }}
                />
              ))}
            </div>
            <div>
              <h1
                className="text-xl sm:text-2xl font-black tracking-[0.3em] uppercase text-[#c9a84c]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                LUMIÈRE
              </h1>
              <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Cinema Collection</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[10px] tracking-widest text-white/40 uppercase hidden sm:block">Now Showing</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Hero compact */}
        <div className="text-center mb-10">
          <p className="text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase mb-3">Your Premier Film Destination</p>
          <h2
            className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Discover <span className="text-[#c9a84c]">Cinema</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]/60" />
            <span className="text-white/20 text-[9px] tracking-widest uppercase">Est. 2025</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]/60" />
          </div>
        </div>

        {/* Search CSR */}
        <SearchClient apiKey={API_KEY} />

        {/* Popular SSR */}
        <section className="mt-14">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <p className="text-[#c9a84c] text-[9px] tracking-[0.5em] uppercase mb-0.5">Curated Selection</p>
              <h3
                className="text-lg sm:text-xl font-black uppercase tracking-wide"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Featured Films
              </h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#c9a84c]/40 to-transparent" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#c9a84c] border border-[#c9a84c]/40 px-2 py-0.5 flex-shrink-0">
              SSR
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-3">
            {movies.map((movie, i) => (
              <div key={movie.imdbID} className="group relative">
                <div className="relative overflow-hidden rounded-sm aspect-[2/3]">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                    alt={movie.Title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                  />
                  <div className="absolute top-1 right-1 bg-[#c9a84c] text-black text-[7px] font-black px-1 py-0.5 rounded-sm">
                    #{i + 1}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
                <div className="mt-1 px-0.5">
                  <p className="text-white text-[9px] sm:text-[10px] font-semibold truncate">{movie.Title}</p>
                  <p className="text-[#c9a84c]/50 text-[8px] tracking-widest">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <p className="text-white/20 text-[10px] tracking-widest uppercase">© 2025 Lumière Cinema</p>
          <div className="flex gap-[3px]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[3px] h-4 bg-[#c9a84c]/30 rounded-sm" />
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}