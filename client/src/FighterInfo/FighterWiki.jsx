import { Paper, Grid, Box, Typography } from '@mui/material';

export default ({ fighterData }) => {
  const keyStyle = {
    color: '#307ae5',
    paddingRight: '10px',
    textAlign: 'right',
    justifyContent: 'flex-end',
    fontFamily: 'Lato',
  };
  const valueStyle = {
    paddingLeft: '0px',
    fontWeight: '200px',
    textAlign: 'left',
    color: 'black',
    fontFamily: 'Lato',
  };

  const extraValueStyle = {
    paddingLeft: '0px',
    fontWeight: '200px',
    paddingTop: '3px',
    textAlign: 'left',
    color: 'gray',
    fontFamily: 'Lato',
  };

  return (
    <Grid container>
      <Grid item container>
        <Grid item xs={5}>
          <Typography sx={keyStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
            Age
          </Typography>
        </Grid>
        <Grid item container xs={7}>
          <Grid item>
            <Typography sx={valueStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
              {fighterData.age}
            </Typography>
          </Grid>
          <Grid pl='1.2em'>
            <Typography
              sx={extraValueStyle}
              fontSize={{ md: '1em', sm: '0.9rem' }}
            >
              {fighterData.birthday}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/*  */}
      <Grid item container>
        <Grid item xs={5}>
          <Typography sx={keyStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
            Weight
          </Typography>
        </Grid>
        <Grid item container xs={7}>
          <Grid item>
            <Typography sx={valueStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
              {fighterData.weight}
            </Typography>
          </Grid>
          <Grid pl='1.2em'>
            <Typography
              sx={extraValueStyle}
              fontSize={{ md: '1em', sm: '0.9rem' }}
            >
              {parseInt(fighterData.weight) * 0.453592} kg
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/*  */}
      <Grid item container>
        <Grid item xs={5}>
          <Typography sx={keyStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
            Class
          </Typography>
        </Grid>
        <Grid item container xs={7}>
          <Grid item>
            <Typography sx={valueStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
              {fighterData.weight_class}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/*  */}
      <Grid item container>
        <Grid item xs={5}>
          <Typography sx={keyStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
            Height
          </Typography>
        </Grid>
        <Grid item container xs={7}>
          <Grid item>
            <Typography sx={valueStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
              {fighterData.height}
            </Typography>
          </Grid>
          <Grid pl='1.2em'>
            <Typography
              sx={extraValueStyle}
              fontSize={{ md: '1em', sm: '0.9rem' }}
            >
              {parseInt(fighterData.height.split(`'`)[0]) * 30.48 +
                parseInt(fighterData.height.split(`'`)[1]) * 2.54}{' '}
              cm
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/*  */}
      <Grid item container>
        <Grid item xs={5}>
          <Typography sx={keyStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
            Association
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography sx={valueStyle} fontSize={{ md: '1.2em', sm: '1rem' }}>
            {fighterData.association}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
