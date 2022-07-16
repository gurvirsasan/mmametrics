import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const fetchFighter = () => {
    setSearching(true);
    fetch(`/api/fighter?name=${inputVal}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearching(false);
        setData(data);
      });
  };

  const displayJSON = (data) => {
    if (data.errorMessage) return <h4>{data.errorMessage}</h4>;
    return (
      <div>
        {Object.keys(data).map((key, i) => (
          <div>
            {key}: {JSON.stringify(data[key])}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <label for='search-name'>Enter Fighter's Name: </label>
        <input id='search-name' onChange={(e) => setInputVal(e.target.value)} />
        <button onClick={() => fetchFighter()}>Search</button>

        <p>{searching ? 'Loading...' : ''}</p>
        <div>{data ? displayJSON(data) : ''}</div>
      </header>
    </div>
  );
}

export default App;
