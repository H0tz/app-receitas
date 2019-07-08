import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import FullWidthTabs from './FullWidthTabs';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import receitasJson from './receitas.json';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    maxWidth: 700,
    margin: '0 auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Home(props) {

  const [receitas, setReceitas] = React.useState([]);

  React.useEffect(() => setReceitas(receitasJson), []);

  function onChangeSearchBar(e){
    console.log(receitas)
    console.log('alo', e.target.value);

    setReceitas(receitasJson.filter(receita => receita.titulo.toUpperCase().includes(e.target.value.toUpperCase())));
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header onChangeSearchBar={onChangeSearchBar}/>
            <FullWidthTabs receitas={receitas}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};