import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Button,
  LinearProgress
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
  
  const Upcoming = props => {
    const { className, ...rest } = props;
  
    const classes = useStyles();

    const [upcomingFlights, setUpcomingFlights] = useState([])
    var sortJsonArray = require('sort-json-array');

    async function fetchAPI() {
      const upcoming = await fetch(Config().url + 'upcoming')
      const upcomingData = await upcoming.json();
      sortJsonArray(upcomingData.flights, 'launch_date_utc', 'asc');
      setUpcomingFlights(upcomingData.flights);
    };

    useEffect(() => { 
      fetchAPI();
    }, []);  

    let count = 1;

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
                Upcoming
              </Typography>
              {upcomingFlights.map(flight => (
                <div key={flight.flight_number}>
                  <div>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Mission: {flight.mission_name}
                    </Typography>
                    <Typography
                    className={classes.dateText}
                    color="textSecondary"
                    variant="body1"
                    >
                      {moment(flight.launch_date_utc).format('DD/MM/YY')} at {moment(flight.launch_date_utc).format('hh:mm')}
                    </Typography>
                    <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body2"
                    >
                      Local: {flight.launch_site.site_name_long}
                    </Typography>
                  </div>
                  {(() => {
                    if (upcomingFlights.length != count) {
                      count += 1;
                      return <Divider className={classes.divider} />
                    }                    
                  })()}
                  
                </div>
              ))}              
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  Upcoming.propTypes = {
    className: PropTypes.string
  };
  
  export default Upcoming;

