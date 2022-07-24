import React, { useState } from 'react';
import { useEffect } from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FighterBio, { GRID_ITEM_HEIGHT } from './FighterBio';
const _ = require('lodash');

const FighterPage = ({ searchedVal, isSearching, setIsSearching }) => {
  const theme = useTheme();
  const [fighterData, setFighterData] = useState({});

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

  // media queries
  const phoneView = useMediaQuery('(min-width:701px)');
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const xs = useMediaQuery(theme.breakpoints.up('xs'));

  useEffect(() => {
    console.log(fighterData);
  }, [fighterData]);

  if (isSearching) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30vh',
        }}
      >
        Loading...
      </div>
    );
  }
  if (fighterData.errorMessage) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30vh',
        }}
      >
        {fighterData.errorMessage + ' :('}
      </div>
    );
  }

  if (_.isEqual(fighterData, {})) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '20px',
        }}
      >
        <Typography
          variant='p'
          sx={
            !phoneView
              ? { fontSize: '14px', paddingTop: '30vh' }
              : { paddingTop: '30vh' }
          }
        >
          Hi! Search for any MMA fighter you can think of
        </Typography>
      </div>
    );
  }

  return (
    <Grid container>
      <Grid item xs={0} lg={0.5} />
      <Grid item xs={12} lg={11}>
        <Box
          sx={{
            paddingTop: phoneView ? '60px' : '95px',
          }}
        >
          <Grid
            container
            id='fighter-data'
            justify='center'
            direction='column'
            alignItems='center'
            sx={{
              minWidth: phoneView ? '550px' : '350px',
              minHeight: phoneView ? '1000px' : '830px',
            }}
          >
            <Grid
              item
              container
              id='fighter-biography'
              justifyContent='center'
              align='center'
              direction='row'
            >
              <FighterBio fighterData={fighterData} />
            </Grid>
            <Grid item id='fighter-record'></Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={0} lg={0.5} />
    </Grid>
  );
};

export default FighterPage;
