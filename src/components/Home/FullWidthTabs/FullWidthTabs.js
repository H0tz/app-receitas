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
  blocoEscondido: {
    display: 'block',
  },
}));

export default function FullWidthTabs() {
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

  const receitas = [
    {
      id: 0,
      titulo: "Chocolate quente cremoso",
      ingredientes: [
        {
          id: 0,
          qtd: 2,
          descricao: "xícaras (chá) de leite",
        },
        {
          id: 1,
          qtd: 1,
          descricao: "colher (sopa) de amido de milho",
        },
        {
          id: 2,
          qtd: 3,
          descricao: "colheres (sopa) de chocolate em pó",
        },
        {
          id: 3,
          qtd: 4,
          descricao: "colheres (sopa) de açúcar",
        },
        {
          id: 4,
          qtd: 1,
          descricao: "canela em pau",
        },
        {
          id: 5,
          qtd: 1,
          descricao: "caixinha de creme de leite",
        }
      ],
      resumo: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
      autor: "Beep",
      categoria: 1,
      img: "https://img.itdg.com.br/tdg/images/recipes/000/130/871/321194/321194_original.jpg?mode=crop&width=710&height=400",
      preparo: "Em um liquidificador, bata o leite, o amido de milho, o chocolate em pó e o açúcar. Despeje a mistura em uma panela com a canela e leve ao fogo baixo, mexendo sempre até ferver. Desligue, adicione o creme de leite e mexa bem até obter uma mistura homogênea. Retire a canela e sirva quente."
    },
    {
      id: 1,
      titulo: "Bolo de iogurte e creme de avelã",
      ingredientes: [
        {
          id: 0,
          qtd: 1,
          descricao: "pote de iogurte natural de 170 g",
        },
        {
          id: 1,
          qtd: 3,
          descricao: "ovos",
        },
        {
          id: 2,
          qtd: 1,
          descricao: "pote (do iogurte) de açúcar",
        },
        {
          id: 3,
          qtd: 1,
          descricao: "pote (do iogurte) de chocolate em pó",
        },
        {
          id: 4,
          qtd: 3,
          descricao: "potes (do iogurte) de farinha de trigo",
        },
        {
          id: 5,
          qtd: 1,
          descricao: "colher (sopa) de fermento",
        },
        {
          id: 6,
          qtd: "1 ou 2",
          descricao: "potes de 350 g de creme de avelã para rechear e cobrir (se quiser cobrir e rechear, use 2)",
        },
        {
          id: 7,
          qtd: 1,
          descricao: "pote (do iogurte) de óleo",
        }
      ],
      resumo: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
      autor: "Beep",
      categoria: 1,
      img: "https://img.itdg.com.br/tdg/images/recipes/000/139/114/70979/70979_original.jpg?mode=crop&width=710&height=400",
      preparo: "Em uma tigela, misture com um batedor os ovos e o iogurte. Acrescente o óleo e o açúcar e misture bem. Coloque o chocolate e a farinha aos poucos, misturando. Por último o fermento coloque em forma de 20 cm de diâmetro, untada e enfarinhada. Asse em forno preaquecido, a 180° C, por aproximadamente 40 minutos, ou até furar com um palito e sair limpo. Se desejar rechear, corte o bolo ao meio e coloque creme de avelã, senão, apenas cubra. Coloque a outra parte do bolo e cubra todo com creme de avelã."
    },
  ];


  useEffect(() => {
    setMaxSteps(getReceitasByCategoria(0).length);
    // setActiveStep(0);
  });

  function handleChange(event, newValue) {
    setValue(newValue);
    console.log(getReceitasByCategoria(newValue).length);
    setMaxSteps(getReceitasByCategoria(newValue).length);
    setActiveStep(0);
    console.log(activeStep);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  function getReceitasByCategoria(categoria) {
    return categoria === 0 ? receitas : receitas.filter(receita => receita.categoria === categoria);
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
            
            {getReceitasByCategoria(categoria.id).length > 0 &&
            
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
            }
          </TabContainer>
        ))}
      </SwipeableViews>
    </div>
  );
}