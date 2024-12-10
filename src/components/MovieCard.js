import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false); 
  const [runtime, setRuntime] = useState('N/A'); // State indicating that the movie has not been fetched yet

  
  const openModal = () => {
    setShowModal(true);
  };

 
  const closeModal = () => {
    setShowModal(false);
  };

  // function to Fetch movie details from API when movie ID is available
  useEffect(() => {
    if (movie?.id) {
      console.log('Fetching movie details for ID:', movie.id); 

      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
            params: { api_key: 'cc62be236579cfab00f1cc20d9f95287' },
          });

          // Log the full response to see what data is returned
          console.log('API Response:', response.data);

          // Set runtime if available
          setRuntime(response.data.runtime ? `${response.data.runtime} min` : 'N/A');
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };

      fetchMovieDetails();
    } else {
      console.log('No movie ID provided');
    }
  }, [movie?.id]); // Dependency array, will run whenever movie.id changes

  return (
    <div className="movie-card">
      <img
        src={movie?.poster_path
          ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
          : 'https://via.placeholder.com/200x300'}
        alt={movie?.title || 'Unknown Movie'}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie?.title || 'Unknown Title'}</h3>
        <p><strong>Release Date:</strong> {movie?.release_date || 'N/A'}</p>
        <p><strong>Rating:</strong> {movie?.vote_average || 'N/A'}</p>
        <p><strong>Duration:</strong> {runtime}</p>
        <button className="toggle-btn" onClick={openModal}>More</button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{movie?.title}</h2>
            <p><strong>Duration:</strong> {runtime}</p>
            <p>{movie?.overview || 'No description available.'}</p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
