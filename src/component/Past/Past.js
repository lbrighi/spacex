import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider,
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
  
  const Past = props => {
    const { className, ...rest } = props;
  
    const classes = useStyles();
  
    const [pastFlights, setPastFlights] = useState([])
    var sortJsonArray = require('sort-json-array');

    async function fetchAPI() {
      const past = await fetch(Config().url + 'past')
      const pastData = await past.json();
      sortJsonArray(pastData.flights, 'launch_date_utc', 'des');
      setPastFlights(pastData.flights);
    };

    useEffect(() => { 
      fetchAPI();
    }, []);  

    let count = 0;

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
                Past
              </Typography>
              {pastFlights.map(flight => (
                <div key={flight.flight_number}>
                  {(() => {
                    count += 1;
                    if (count != 1) {
                      return (
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
                            {flight.details}
                          </Typography>
                          {(() => {
                            if (pastFlights.length != count) {
                              return <Divider className={classes.divider} />
                            }                    
                          })()}
                        </div>
                      )
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
  
  Past.propTypes = {
    className: PropTypes.string
  };
  
  export default Past;

