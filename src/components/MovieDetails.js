// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function MovieDetails() {
//   const { id } = useParams(); // Get the movie ID from the URL
//   const [movie, setMovie] = useState(null);

//   // Fetch movie details by ID
//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
//           params: {
//             api_key: 'YOUR_API_KEY', // Replace with your TMDb API key
//             language: 'en-US',
//           },
//         });
//         setMovie(response.data);
//       } catch (error) {
//         console.error('Error fetching movie details:', error);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   if (!movie) {
//     return <div>Loading movie details...</div>;
//   }

//   return (
//     <div className="movie-detail-page">
//       <div className="movie-card">
//         <div className="movie-card-image">
//           <img
//             src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//             alt={movie.title}
//             className="movie-image"
//           />
//         </div>
//         <div className="movie-card-info">
//           <h3>{movie.title}</h3>
//           <p><strong>Release Year:</strong> {new Date(movie.release_date).getFullYear()}</p>
//           <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
//           <p><strong>Overview:</strong> {movie.overview}</p>
//           <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
//           <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MovieDetails;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // useParams allows us to access URL parameters

function MovieDetails() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      {/* Display other movie details here */}
    </div>
  );
}

export default MovieDetails;
