import React, { useState } from 'react';
import { Paper, Grid, Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FighterRecord from './FighterRecord';
import FighterWiki from './FighterWiki';

const _ = require('lodash');

const GRID_ITEM_HEIGHT = '400px';

const FighterName = ({ fighterData }) => {
  return (
    <>
      <Typography
        id='nickname'
        variant='h4'
        fontSize='1.2rem'
        fontWeight={600}
        fontFamily={'Lato'}
      >
        <i>"{fighterData.nickname}"</i>
      </Typography>
      <Typography
        id='fullName'
        variant='h4'
        fontSize={{ md: '2rem', xs: '1.8rem' }}
        fontWeight={700}
        fontFamily={'Lato'}
      >
        {fighterData.name.toUpperCase()}
      </Typography>
    </>
  );
};

const FighterBio = ({ fighterData }) => {
  const theme = useTheme();

  // media queries
  const phoneView = useMediaQuery('(min-width:701px)');
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const xs = useMediaQuery(theme.breakpoints.up('xs'));

  return (
    <Grid
      item
      container
      id='fighter-biography'
      justifyContent='center'
      align='center'
      direction='row'
      sx={{ height: { GRID_ITEM_HEIGHT }, minWidth: '390pxx' }}
    >
      <Grid
        id='fighter-pic-grid-container'
        item
        container
        xs={12}
        sm={3}
        justifyContent={{ md: 'flex-end', xs: 'center' }}
        alignItems='center'
      >
        <Grid item id='fighter-pic-grid-item' pr='10px'>
          <img
            id='fighter-image'
            src={fighterData['image_url'] ?? './imageNotFound.png'}
            alt='fighter'
            style={{
              height: `${parseInt(GRID_ITEM_HEIGHT)}px`,
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        id='fighter-bio-grid-item'
        xs={12}
        sm={7}
        md={6}
        order={{ xs: 4, sm: 0 }}
      >
        <Paper
          id='fighter-bio-paper'
          elevation='2'
          sx={{
            height: GRID_ITEM_HEIGHT,
            // margin: '5px 10px 5px 510x',
            my: '5px',
            borderRadius: '10px',
            textAlign: 'flex-start',
          }}
        >
          <Grid
            container
            id='fighter-bio-grid-container'
            padding={'25px 25px 25px 25px'}
            direction='column'
            textAlign='center'
            mt='10px'
            justifyContent='space-evenly'
          >
            <Grid item id='fighter-name-grid-item' pb='15px'>
              <FighterName fighterData={fighterData} />
            </Grid>

            <Grid item id='fighter-record-grid-item' pb='15px'>
              <FighterRecord fighterData={fighterData} />
            </Grid>
            <Grid item id='fighter-basic-stats' pt={{ xs: '10px', lg: '25px' }}>
              <FighterWiki fighterData={fighterData} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        md={3}
        sx={{
          // height: xs ? '200px' : {GRID_ITEM_HEIGHT},
          backgroundColor: 'yellow',
        }}
      >
        <Typography variant='h6'></Typography>
      </Grid>
    </Grid>
  );
};

export default FighterBio;
