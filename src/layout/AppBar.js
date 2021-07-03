import React, { useContext } from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../Logo';
import { Context } from '../context/AppStore';
import { CurrencyFormat } from '../services/index';
import {
  Container,
  Title,
  Totalizador,
  Description,
} from './components/styles';

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  spacer: {
    flex: 1,
  },
});

const MyAppBar = (props) => {
  const classes = useStyles();
  const { state } = useContext(Context);

  let totalizador = 0;
  state.products.map((element) => {
    totalizador += element.price;
  });

  return (
    <AppBar {...props}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="admin-title"
      />
      <Logo />

      <span className={classes.spacer} />
      <Container>
        <Title>Nexfar</Title>
        <Totalizador>{CurrencyFormat(totalizador)}</Totalizador>
        <Description>Preço mínimo: R$ 150,00</Description>
      </Container>
    </AppBar>
  );
};

export default MyAppBar;
