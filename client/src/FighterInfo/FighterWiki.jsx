import { Paper, Grid, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default ({ fighterData }) => {
  const theme = useTheme();
  const lgBreakPoint = useMediaQuery(theme.breakpoints.up('lg'));

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
        <Grid item xs={lgBreakPoint ? 5 : 6}>
          <Typography sx={keyStyle} fontSize={{ sm: '1.2rem', xs: '1.2rem' }}>
            Age
          </Typography>
        </Grid>
        <Grid item container xs={lgBreakPoint ? 7 : 6}>
          <Grid item>
            <Typography
              sx={valueStyle}
              fontSize={{ sm: '1.2rem', xs: '1.2rem' }}
            >
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
        <Grid item xs={lgBreakPoint ? 5 : 6}>
          <Typography sx={keyStyle} fontSize={{ sm: '1.2rem', xs: '1.2rem' }}>
            Weight
          </Typography>
        </Grid>
        <Grid item container xs={lgBreakPoint ? 7 : 6}>
          <Grid item>
            <Typography
              sx={valueStyle}
              fontSize={{ sm: '1.2rem', xs: '1.2rem' }}
            >
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
        <Grid item xs={lgBreakPoint ? 5 : 6}>
          <Typography sx={keyStyle} fontSize={{ sm: '1.2rem', xs: '1.2rem' }}>
            Class
          </Typography>
        </Grid>
        <Grid item container xs={lgBreakPoint ? 7 : 6}>
          <Grid item>
            <Typography
              sx={valueStyle}
              fontSize={{ sm: '1.2rem', xs: '1.2rem' }}
            >
              {fighterData.weight_class}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/*  */}
      <Grid item container>
        <Grid item xs={lgBreakPoint ? 5 : 6}>
          <Typography sx={keyStyle} fontSize={{ sm: '1.2rem', xs: '1.2rem' }}>
            Height
          </Typography>
        </Grid>
        <Grid item container xs={lgBreakPoint ? 7 : 6}>
          <Grid item>
            <Typography
              sx={valueStyle}
              fontSize={{ sm: '1.2rem', xs: '1.2rem' }}
            >
              {fighterData.height}
            </Typography>
          </Grid>
          <Grid pl='1.2em'>
            <Typography
              sx={extraValueStyle}
              fontSize={{ md: '1em', sm: '0.9rem' }}
            >
              {parseInt(fighterData.height.split(`'`)[0]) * 30.48 +
                parseInt(fighterData.height.split(`'`)[1]) * 2.55}{' '}
              cm
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/*  */}
      <Grid item container>
        <Grid item xs={lgBreakPoint ? 5 : 6}>
          <Typography sx={keyStyle} fontSize={{ sm: '1.2rem', xs: '1.2rem' }}>
            Association
          </Typography>
        </Grid>
        <Grid item xs={lgBreakPoint ? 7 : 6}>
          <Typography sx={valueStyle} fontSize={{ sm: '1.2rem', xs: '1.2rem' }}>
            {fighterData.association}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
