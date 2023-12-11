import React from 'react';

const Lists = ({ savedLists }) => {
    return (
        <div className="lists-container">
            <div className="lists-header">
                <h1>Saved Lists</h1>
            </div>
            <div className="lists-content">
                {savedLists.length === 0 ? (
                    <p>No lists saved yet.</p>
                ) : (
                    <ul className="lists-ul">
                        {savedLists.map((list) => (
                            <div key={list.id} className="lists-item">
                                <h3>{list.name}</h3>
                                <ul className="lists-item-ul">
                                    {list.movies.map((movie) => (
                                        <li key={movie.imdbID} className="lists-item-li">{movie.Title}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Lists;
