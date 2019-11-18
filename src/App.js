import React from 'react';
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import palette from './tema/palette';
import './assets/scss/index.scss';
import Past from './component/Past'
import Next from './component/Next'
import Upcoming from './component/Upcoming'
import Latest from './component/Latest'

const useStyles = makeStyles(tema => ({
  root: {
    backgroundColor: palette.background.default,
    height: '100%'
  },
  grid:{
    height: '100%'
  },
  header: {
    backgroundColor: palette.black,
    height: '10%',
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: palette.white
  },
  logo: {
    height: '80%'
  },
  top: {
    backgroundColor: palette.primary,
    height: '45%',
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundImage: 'url(/images/img-back2.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  titulo: {
    color: 'white',
    fontSize: '50px',
    fontFamily: 'Roboto',
    paddingLeft: '30px'
  },
  down: {
    backgroundColor: palette.primary,
    height: '45%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'top',
    backgroundImage: palette.white,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  content: {
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'top',
    display: 'flex',
  },
  card: {
    width: '85%',
    paddingTop: '20px',
  }
}))

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.grid}    
      >
        <div className={classes.header}>
          <img className={classes.logo} src="/images/logo-spacex.jpg"/>
          
        </div>
        <div className={classes.top}>
          <div className={classes.titulo}>
            Our Lauches
          </div>
        </div>
        <div className={classes.down}>
          <div className={classes.content}>
            <div className={classes.card}>
              <Past />
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.card}>
              <Latest />
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.card}>
              <Next />
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.card}>
              <Upcoming />
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
}
