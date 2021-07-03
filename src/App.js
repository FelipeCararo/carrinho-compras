import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

import { Dashboard } from './home/Dashboard';
import { theme, MyLayout } from './layout/index';

import dataProvider from './providers/index';
import { ProductsList } from './pages/products/index';

const App = () => (
  <Admin
    layout={MyLayout}
    theme={theme}
    dashboard={Dashboard}
    dataProvider={dataProvider}
  >
    <Resource
      name="products"
      list={ProductsList}
      icon={ShoppingCart}
      options={{ label: 'Produtos' }}
    />
  </Admin>
);

export default App;
