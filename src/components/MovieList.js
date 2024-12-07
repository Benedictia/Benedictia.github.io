// import React from 'react';
// import MovieCard from './MovieCard';

// function MovieList({ movies }) {
//   return (
//     <div className="movie-list">
//       {movies.length > 0 ? (
//         movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
//       ) : (
//         <p>No movies found</p>
//       )}
//     </div>
//   );
// }

// export default MovieList;
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key= cc62be236579cfab00f1cc20d9f95287'
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const scrollToDetails = () => {
    const detailsSection = document.getElementById('movie-details');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onShowMoreClick={scrollToDetails} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>

      <div id="movie-details" className="movie-detail-section">
        {/* Movie details will be shown here */}
      </div>
    </div>
  );
}

export default MovieList;

