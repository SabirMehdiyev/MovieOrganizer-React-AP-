import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Pages.css'; 

const DetailsPage = () => {
  const { id: movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = () => {
      fetch(`https://www.omdbapi.com/?apikey=522f2f8f&i=${movieId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === 'True') {
            setMovieDetails(data);
          } else {
            console.error('Error fetching movie details');
          }
        })
        .catch(() => {
          alert('Internet connection error. Please check your connection.');
        });
    };

    fetchMovieDetails();

    return () => {
      setMovieDetails(null);
    };
  }, [movieId]);

  return (
    <div className="details-container">
      {movieDetails && (
        <div className="movie-details">
          <img src={movieDetails.Poster} alt={movieDetails.Title} className="movie-poster" />
          <p> {movieDetails.Title} ({movieDetails.Year})</p>
        </div>
      )}
      <div className="button-container">
        <Link
          to={`https://www.imdb.com/title/${movieDetails?.imdbID}/?ref_=ttls_li_tt`}
          target="_blank"
          className="go-to-trailer-button"
        >
          Go to Trailer
        </Link>
      </div>
    </div>
  );
};

export default DetailsPage;
