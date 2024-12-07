// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function MovieCard({ movie }) {
//   const history = useNavigate();

//   const handleClick = () => {
//     history.push(`/movie/${movie.id}`);
//   };

//   return (
//     <div className="movie-card" onClick={handleClick}>
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//         alt={movie.title}
//       />
//       <h3>{movie.title}</h3>
//       <p>{movie.genre_ids.join(', ')}</p>
//     </div>
//   );
// }

// export default MovieCard;
import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      
      {/* "Read More" link to movie details */}
      <Link to={`/movie/${movie.id}`} className="show-more-link">
        Read More
      </Link>
    </div>
  );
}

export default MovieCard;
