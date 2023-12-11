import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Details from './Pages/Details';
import Lists from './Pages/Lists';

const App = () => {
    const [savedLists, setSavedLists] = useState([]);

    return (
        <Routes>
            <Route
                path="/"
                element={<Home savedLists={savedLists} setSavedLists={setSavedLists} />}
            />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/lists" element={<Lists savedLists={savedLists} />} />
        </Routes>
    );
};

export default App;

