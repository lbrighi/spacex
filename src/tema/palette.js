import {colors } from '@material-ui/core'

const white = '#FFFFFF';
const black = '#000000';

export default {
    black,
    white,
    primary: {
        contrastText: white,
        dark: colors.indigo[900],
        main: colors.indigo[500],
        light: colors.indigo[100]
      },
     
    background: {
       default: '#F4F6F8',
       paper: white
     },
};