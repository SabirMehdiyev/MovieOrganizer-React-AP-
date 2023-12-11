import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Components/Header';
import './Pages.css';
import { Link } from 'react-router-dom';

const Home = ({ savedLists, setSavedLists }) => {
    const [searchQuery, setSearchQuery] = useState('Harry');
    const [resultData, setResultData] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    const [addedMovies, setAddedMovies] = useState([]);
    const [isListSaved, setIsListSaved] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    const fetchMovies = useCallback(() => {
        const lastQuery = searchQuery.trim();

        if (lastQuery !== '') {
            fetch(`https://www.omdbapi.com/?apikey=522f2f8f&s=${lastQuery}&type=movie`)
                .then(response => response.json())
                .then(data => {
                    setResultData(data.Search || []);
                })
                .catch(()=>(alert('Internet bağlantınızı yoxlayın')))
        }
        else {
            setResultData([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (firstRender) {
            fetchMovies();
            setFirstRender(false);
        }
    }, [firstRender, fetchMovies]);


    const handleSearch = () => {
        fetchMovies();
    };

    const addToCart = (movie) => {
        if (isListSaved) {
            return;
        }
        let isDuplicate = false;
        for (let i = 0; i < addedMovies.length; i++) {
            if (addedMovies[i].imdbID === movie.imdbID) {
                isDuplicate = true;
                break;
            }
        }

        if (isDuplicate) {
            return;
        }

        setAddedMovies((prevMovies) => [...prevMovies, movie]);
    };

    const saveList = () => {
        if (selectedList.trim() === '') {
            return;
        }
        const isDuplicateName = savedLists.map(list => list.name).includes(selectedList);

        if (isDuplicateName) {
            return;
        }
        if (addedMovies.length === 0) {
            return;
        }
        setIsListSaved(true);

        setSavedLists((prevLists) => [
            ...prevLists,
            {
                name: selectedList,
                movies: addedMovies,
            },
        ]);
    };

    const removeMovie = (movie) => {
        if (isListSaved) {
            return;
        }

        setAddedMovies((prevMovies) => prevMovies.filter((m) => m.imdbID !== movie.imdbID));
    };

    return (
        <div>
            <Header />
            <div className='container'>
                <div className='container-left'>
                    <div className='search-part'>
                        <input id='movie-search' type='text' placeholder='Search..' onChange={(e) => setSearchQuery(e.target.value)} />
                        <button className='btn-primary-add btn-search' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <div className='moviecards'>
                        {resultData.map((movie) => (
                            <div className="card" key={movie.imdbID}>
                                <img src={movie.Poster} alt="film-img" />
                                <h3><span className='name'>{movie.Title}</span>({movie.Year})</h3>

                                <div className="bts">
                                    <button className='btn-primary-add' onClick={() => addToCart(movie)}>Add To List</button>
                                    <Link to={`/details/${movie.imdbID}`}>
                                        <button className='btn-primary-add'>Details</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='container-right'>
                    <div className='list-area'>
                        <input className='list-inp' placeholder='New List' value={selectedList} disabled={isListSaved} onChange={(e) => !isListSaved && setSelectedList(e.target.value)} />
                        {!isListSaved && (
                            <button className='btn-primary-add' onClick={saveList}>Save List </button>
                        )}
                        <Link to="/lists">
                            <button className='btn-primary-add'>
                                Go to Lists
                            </button>
                        </Link>
                        <div className='list-items'>
                            {addedMovies.map((movie) => (
                                <div key={movie.imdbID} className='list-item'>
                                    <span>{movie.Title}</span>
                                    {!isListSaved && (
                                        <button onClick={() => removeMovie(movie)}>
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
