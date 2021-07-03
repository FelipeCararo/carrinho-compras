import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

import { ProductsShow } from './show';

export const ProductsList = (props) => {
  return (
    <List
      {...props}
      title="Listar Produtos"
      bulkActionButtons={false}
      exporter={false}
    >
      <Datagrid expand={<ProductsShow />}>
        <TextField source="id" label="ID" sortable={false} />
        <TextField source="name" label="Name" sortable={false} />
      </Datagrid>
    </List>
  );
};
