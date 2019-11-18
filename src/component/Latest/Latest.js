import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import Config from '../../config/Config'

const useStyles = makeStyles(theme => ({
    root: {},
    details: {
      alignItems: 'top',
      display: 'flex'
    },
    divider: {
      marginTop: '8px',
      marginBottom: '8px'
    },
    locationText:{
      paddingTop: '10px'
    }
  }));

  const Latest = props => {
    const classes = useStyles();
    const { className, ...rest } = props;

    const [latestFlight, setLatestFlight] = useState([])

    async function fetchAPI() {
      const latest = await fetch(Config().url + 'latest')
      const latestData = await latest.json();
      setLatestFlight(latestData);
    };

    useEffect(() => { 
      fetchAPI();
    }, []);  

    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent>
          <div className={classes.details}>
            <div>
              <Typography
                gutterBottom
                variant="h4"
              >
                Latest
              </Typography>
                <div>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  > 
                    Mission: {latestFlight.mission_name}
                  </Typography>
                  <Typography
                  className={classes.dateText}
                  color="textSecondary"
                  variant="body1"
                  >
                    {moment(latestFlight.launch_date_utc).format('DD/MM/YY')} at {moment(latestFlight.launch_date_utc).format('hh:mm')}
                  </Typography>
                  <Typography
                  className={classes.locationText}
                  color="textSecondary"
                  variant="body2"
                  >
                    {latestFlight.details}
                  </Typography>
                </div>
            </div>            
          </div>
        </CardContent>
      </Card>
    );
  };
  
  Latest.propTypes = {
    className: PropTypes.string
  };
  
  export default Latest;

