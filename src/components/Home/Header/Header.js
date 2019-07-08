import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Searchbar from './Searchbar';
import '../../Fonts/Fonts.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    width: '100%',
    heigth: '200px',
    textAlign: 'center',
  },
  titulo: {
    margin: '0 auto',
    fontFamily: "'Raleway', sans-serif",
    textTransform: 'uppercase',
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.titulo}>Minhas Receitas</h1>
        <Searchbar />
      </div>
    </div>
  )
}