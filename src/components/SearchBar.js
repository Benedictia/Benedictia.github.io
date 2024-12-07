
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // For displaying the detailed movie info

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: 'cc62be236579cfab00f1cc20d9f95287', // Replace with your TMDb API key
            language: 'en-US',
          },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres from TMDb:', error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies by selected genre
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!selectedGenre) return;

      setLoading(true);
      setError('');

      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: 'cc62be236579cfab00f1cc20d9f95287', // Replace with your TMDb API key
            with_genres: selectedGenre,
            language: 'en-US',
          },
        });

        if (response.data.results.length === 0) {
          setError('No movies found in this genre');
        } else {
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching movies for the selected genre:', error);
        setError('Failed to fetch movies');
      }

      setLoading(false);
    };

    fetchMoviesByGenre();
  }, [selectedGenre]);
  

  // Handle genre selection
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setMovies([]); // Clear previous movies
    setSelectedMovie(null); // Clear movie detail on genre change
    setError('');
  };

  // Show detailed movie info
  const handleReadMore = (movieId) => {
    const movie = movies.find((m) => m.id === movieId);
    setSelectedMovie(movie); // Set the movie to display its details
  };

  return (
    <div className="search-bar">
       <h1 className="fancy-title">🎬 Welcome to Movie World! 🎬</h1>
       <p className="welcome-message">Your gateway to the world of movies. Explore, discover, and enjoy!</p>
      {/* Genre dropdown */}
      <div className="genre-dropdown">
        <select
          onChange={(e) => handleGenreChange(e.target.value)}
          value={selectedGenre || ''}
        >
          <option value="">Select Genre</option>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))
          ) : (
            <option>Loading genres...</option>
          )}
        </select>
      </div>

      {/* Show loading spinner */}
      {loading && <div>Loading movies...</div>}

      {/* Error message */}
      {error && <div className="error">{error}</div>}

      {/* Display Movies for the selected genre */}
      {!loading && !error && selectedGenre && movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-card-image">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
              </div>
              <div className="movie-card-info">
                <h3>{movie.title}</h3>
                <p><strong>Release Year:</strong> {new Date(movie.release_date).getFullYear()}</p>
                <p><strong>Genre:</strong> {movie.genre_ids.map((id) => genres.find((genre) => genre.id === id)?.name).join(', ')}</p>
                <button onClick={() => handleReadMore(movie.id)}>Read More</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && selectedGenre && <p>No movies found in this genre.</p>
      )}

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <div className="movie-detail">
          <h2>{selectedMovie.title}</h2>
          <p><strong>Release Date:</strong> {new Date(selectedMovie.release_date).toLocaleDateString()}</p>
          <p><strong>Overview:</strong> {selectedMovie.overview}</p>
          <p><strong>Rating:</strong> {selectedMovie.vote_average} / 10</p>
          <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
          <button onClick={() => setSelectedMovie(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;

