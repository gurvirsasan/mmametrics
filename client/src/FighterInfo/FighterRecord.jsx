import { Paper, Grid, Box, Typography } from '@mui/material';

const OutcomeBox = ({ title, count, color }) => {
  return (
    <Paper
      id='outcome-box'
      elevation='2'
      style={{
        height: '2.5rem',
        width: '100%',
        marginTop: '6px',
        // border: '1px solid black',
        backgroundColor: color,
      }}
    >
      <Grid container paddingTop='2px' paddingLeft='1.5rem'>
        <Grid item>
          <Typography fontSize='25px' color={'white'}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ({ fighterData }) => {
  return (
    <Grid container columnSpacing={0.5}>
      <Grid item xs={3}>
        <OutcomeBox title='W' count={fighterData.wins.total} color='green' />
      </Grid>
      <Grid item xs={3}>
        <OutcomeBox title='L' count={fighterData.losses.total} color='red' />
      </Grid>
      <Grid item xs={3}>
        {fighterData.draws !== 0 && (
          <OutcomeBox title='D' count={fighterData.draws} color='grey' />
        )}
      </Grid>
      <Grid item xs={3}>
        {fighterData.no_contests !== 0 && (
          <OutcomeBox title='NC' count={fighterData.no_contests} color='grey' />
        )}
      </Grid>
    </Grid>
  );
};
