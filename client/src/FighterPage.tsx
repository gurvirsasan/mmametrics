import React, { useState } from 'react';

const _ = require('lodash');

interface IFighterPage {
  searchedVal: string;
  isSearching: boolean;
  setIsSearching: (boolean) => void;
}

const FighterPage = ({
  searchedVal,
  isSearching,
  setIsSearching,
}: IFighterPage) => {
  const [fighterData, setFighterData] = useState<any>({});

  const getFighter = () => {
    fetch(`/api/fighter?name=${searchedVal}`)
      .then((res) => res.json())
      .then((fighterData) => {
        setIsSearching(false);
        setFighterData(fighterData);
      })
      .catch((error) => {
        setIsSearching(false);
        console.error(error);
      });
  };

  if (isSearching) getFighter();

  const displayJSON = () => {
    if (_.isEqual(fighterData, {})) return;
    if (fighterData.errorMessage) return <h4>{fighterData.errorMessage}</h4>;
    return (
      <div>
        {Object.keys(fighterData).map((key, i) => (
          <div>
            {key}: {JSON.stringify(fighterData[key])}
          </div>
        ))}
      </div>
    );
  };
  return <>{displayJSON()}</>;
};

export default FighterPage;
