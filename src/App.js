
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import './index.css'

// Define TMDB API base URL and API Key
const API_KEY = 'cc62be236579cfab00f1cc20d9f95287';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

function App() {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Fetch genres dynamically from TMDB API
  const fetchGenres = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: API_KEY,
        },
      });
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(TMDB_BASE_URL, {
        params: {
          api_key: API_KEY,
          sort_by: 'popularity.desc',
          ...(selectedGenre && { with_genres: selectedGenre }),
          ...(selectedYear && { primary_release_date_gte: `${selectedYear}-01-01`, primary_release_date_lte: `${selectedYear}-12-31` }),
          page: currentPage,
        },
      });

      setMovies(response.data.results || []);
      setTotalMovies(response.data.total_results || 0);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(totalMovies / 10);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, selectedYear, currentPage]);

  return (
    <div>
     <h1 className="fancy-title">🎬 Welcome to Movie World! 🎬</h1>
     <p className="welcome-message">Your gateway to the world of movies. Explore, discover, and enjoy!</p>
      <SearchBar
        genres={genres}
        onGenreChange={(genre) => {
          setSelectedGenre(genre);
          setCurrentPage(1);
        }}
        onYearChange={(year) => {
          setSelectedYear(year);
          setCurrentPage(1);
        }}
      />

      <div className="search-results-container">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found. Try selecting different filters.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(totalMovies / 10)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(totalMovies / 10)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
