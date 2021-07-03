import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
export const Dashboard = (props) => {
  return (
    <Card style={{ height: 200 }}>
      <CardHeader title="Bem vindo ao carrinho de compras" />
      <CardContent>Produtos fictícios para demonstração</CardContent>
    </Card>
  );
};
