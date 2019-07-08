import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from './Card';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: 700,
    textAlign: 'center',
    margin: '0 auto',
  },
  barra: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  cards: {
    textAlign: 'center',
    margin: '0 auto',
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxSteps, setMaxSteps] = React.useState(0);

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }

  const categorias = [
    { id: 0, nome: "Todas" },
    { id: 1, nome: "Café da manhã" },
    { id: 2, nome: "Almoço" },
    { id: 3, nome: "Jantar" },
    { id: 4, nome: "Lanches" },
    { id: 5, nome: "Novas" },
  ];

  const getReceitasByCategoria = React.useCallback((categoria) => {
    return categoria === 0 ? props.receitas : props.receitas.filter(receita => receita.categoria === categoria);
  }, [props.receitas]);

  useEffect(() => {
    setMaxSteps(getReceitasByCategoria(0).length);
    setActiveStep(0);
  },[getReceitasByCategoria]);

  function handleChange(event, newValue) {
    setValue(newValue);
    setMaxSteps(getReceitasByCategoria(newValue).length);
    setActiveStep(0);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.barra}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >

          {categorias.map(categoria => (
            <Tab key={categoria.id} label={categoria.nome} />
          ))}

        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

        {categorias.map(categoria => (
          <TabContainer key={categoria.id} dir={theme.direction}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {getReceitasByCategoria(categoria.id).map((step, index) => (
                <div key={step.id} className={classes.cards}>
                  {Math.abs(activeStep - index) <= maxSteps ? (
                    <Card key={step.id} receita={step} />
                  ) : null}
                </div>
              ))}
            </SwipeableViews>
            
            {getReceitasByCategoria(categoria.id).length > 0 ?
            
              <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1 || maxSteps === 0}>
                    Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0 || maxSteps === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
                }
              />
            : <p>Nenhuma receita encontrada para essa categoria =(</p>}
          </TabContainer>
        ))}
      </SwipeableViews>
    </div>
  );
}