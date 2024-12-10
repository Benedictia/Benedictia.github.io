
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [runtime, setRuntime] = useState('N/A'); 

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Dynamically fetch runtime using the movie id
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log('Fetching movie details for ID:', movie?.id); // Debugging log
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie?.id}`,
          {
            params: {
              api_key: 'cc62be236579cfab00f1cc20d9f95287', 
            },
          }
        );

        // console.log('Full response from TMDB API:', response?.data); // Log full response to debug
        setRuntime(response?.data?.runtime ? `${response.data.runtime} min` : 'N/A');
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    if (movie?.id) {
      fetchMovieDetails();
    } else {
      console.warn('Movie ID is invalid or undefined');
    }
  }, [movie?.id]);

  useEffect(() => {
    // console.log('Movie overview:', movie?.overview); // Debugging log
  }, [movie?.overview]);

  return (
    <div className="movie-card">
      {/* Movie Poster */}
      <img
        src={movie?.poster_path
          ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
          : 'https://via.placeholder.com/200x300'}
        alt={movie?.title}
        className="movie-poster"
      />

      <div className="movie-details">
        
        <h3>{movie?.title || 'Unknown Title'}</h3>

        
        <p><strong>Release Date:</strong> {movie?.release_date || 'N/A'}</p>

     
        <p><strong>Rating:</strong> {movie?.vote_average || 'N/A'}</p>

      
        <p><strong>Duration:</strong> {runtime}</p>


        <button className="toggle-btn" onClick={openModal}>
          More
        </button>
      </div>

     
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{movie?.title}</h2>
            <p><strong>Duration:</strong> {runtime}</p>
            <p>{movie?.overview || 'No description available.'}</p>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
