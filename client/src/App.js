import React, { useState, useEffect } from 'react';
import FighterPage from './FighterInfo/FighterPage.jsx';
import './App.css';
import Navbar from './Navbar.js';

export const BACKGROUND_COLOR = '#307ae5';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchedVal, setSearchedVal] = useState('');
  const [isLogoClicked, setIsLogoClicked] = useState(false);

  useEffect(() => {
    document.title = 'MMAMetrics';
  }, [isLogoClicked]);

  return (
    <>
      <Navbar
        searchedVal={searchedVal}
        setSearchedVal={setSearchedVal}
        setIsSearching={setIsSearching}
        isLogoClicked={isLogoClicked}
        setIsLogoClicked={setIsLogoClicked}
      />
      {/* page content */}
      <FighterPage
        searchedVal={searchedVal}
        setSearchedVal={setSearchedVal}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        isLogoClicked={isLogoClicked}
        setIsLogoClicked={setIsLogoClicked}
      />
    </>
  );
}

export default App;
