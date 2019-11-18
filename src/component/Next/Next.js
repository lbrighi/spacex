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
  
  const Next = props => {
    const { className, ...rest } = props;
  
    const classes = useStyles();
  
    const [nextFlight, setNextFlight] = useState([])
    const [local,setLocal] = useState([])

    async function fetchAPI() {
      const next = await fetch(Config().url + 'next')
      const nextData = await next.json();
      setLocal(nextData.launch_site.site_name_long);
      setNextFlight(nextData);
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
                Next
              </Typography>
                <div>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  > 
                    Mission: {nextFlight.mission_name}
                  </Typography>
                  <Typography
                  className={classes.dateText}
                  color="textSecondary"
                  variant="body1"
                  >
                    {moment(nextFlight.launch_date_utc).format('DD/MM/YY')} at {moment(nextFlight.launch_date_utc).format('hh:mm')}
                  </Typography>
                  <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body2"
                    >
                      Local: {local}
                  </Typography>
                </div>
            </div>            
          </div>
        </CardContent>
      </Card>
    );
  };
  
  Next.propTypes = {
    className: PropTypes.string
  };
  
  export default Next;

