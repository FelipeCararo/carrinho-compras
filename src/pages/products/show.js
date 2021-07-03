import React, { useContext, useState, useEffect } from 'react';

import {
  Show,
  SimpleShowLayout,
  TextField,
  ImageField,
  FunctionField,
} from 'react-admin';
import { Context } from '../../context/AppStore';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { InputNumber } from '../components/styles';
import { CurrencyFormat } from '../../services/index';

const ProductsTitle = () => <span>Detalhes do Produto</span>;

export const ProductsShow = (props) => {
  let item = 0;

  if (props.record.id) {
    item = Number(localStorage.getItem(`quantity_item_${props.record.id}`));
  }

  const { state, dispatch } = useContext(Context);
  const [products, setProduct] = useState(state.products);
  const [count, setCount] = useState(item);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PRODUCTS',
      payload: products,
    });
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addCount = (countNumber, id, price, setProduct) => {
    let item = Number(localStorage.getItem(`quantity_item_${id}`));
    if (item) {
      item++;
      localStorage.setItem(`quantity_item_${id}`, item);
      let element = state.products.find((element) => element.id === id);
      if (!element) {
        setProduct([...products, { id, price: item * price, quantity: item }]);
      } else {
        let filtered = state.products.filter((el) => {
          return el.id !== id;
        });
        filtered.push({
          id,
          price: item * price,
          quantity: item,
        });

        setProduct(filtered);
      }
      setCount(item);
    } else {
      countNumber++;
      localStorage.setItem(`quantity_item_${id}`, countNumber);
      let element = state.products.find((element) => element.id === id);
      if (!element) {
        setProduct([
          ...products,
          { id, price: countNumber * price, quantity: countNumber },
        ]);
      } else {
        let filtered = state.products.filter((el) => {
          return el.id !== id;
        });
        filtered.push({
          id,
          price: countNumber * price,
          quantity: countNumber,
        });

        setProduct(filtered);
      }
      setCount(countNumber);
    }
  };

  const decreaseCount = (countNumber, id, price, setProduct) => {
    let item = Number(localStorage.getItem(`quantity_item_${id}`));

    if (item) {
      item--;
      let element = state.products.find((element) => element.id === id);
      localStorage.setItem(`quantity_item_${id}`, item);

      if (!element) {
        setProduct([...products, { id, price: item * price, quantity: item }]);
      } else {
        let filtered = state.products.filter((el) => {
          return el.id !== id;
        });
        filtered.push({
          id,
          price: item * price,
          quantity: item,
        });

        setProduct(filtered);
      }
      setCount(item);
    } else if (countNumber) {
      countNumber--;
      localStorage.setItem(`quantity_item_${id}`, countNumber);
      let element = state.products.find((element) => element.id === id);
      if (!element) {
        setProduct([
          ...products,
          { id, price: countNumber * price, quantity: countNumber },
        ]);
      } else {
        let filtered = state.products.filter((el) => {
          return el.id !== id;
        });
        filtered.push({
          id,
          price: countNumber * price,
          quantity: countNumber,
        });

        setProduct(filtered);
      }
      setCount(countNumber);
    }
  };

  const getItems = (record, setProduct) => {
    return (
      <div>
        <Tooltip
          style={{ height: 40, width: 40 }}
          title="Diminuir"
          aria-label="Diminuir"
          onClick={() => {
            decreaseCount(count, record.id, record.price.price, setProduct);
          }}
        >
          <Fab color="secondary">
            <Remove />
          </Fab>
        </Tooltip>
        <InputNumber
          id={`item_${record.id}`}
          value={count}
          onChange={(event) => {
            let value = event.target.value;
            if (value) {
              localStorage.setItem(`quantity_item_${record.id}`, value);
              setCount(value);

              let element = state.products.find(
                (element) => element.id === record.id
              );

              if (!element) {
                setProduct([
                  ...products,
                  {
                    id: record.id,
                    price: value * record.price.price,
                    quantity: value,
                  },
                ]);
              } else {
                let filtered = state.products.filter((el) => {
                  return el.id !== record.id;
                });
                filtered.push({
                  id: record.id,
                  price: value * record.price.price,
                  quantity: value,
                });

                setProduct(filtered);
              }
            } else {
              localStorage.setItem(`quantity_item_${record.id}`, value);
              setCount(0);
            }
          }}
        />
        <Tooltip
          style={{ height: 40, width: 40 }}
          title="Adicionar"
          aria-label="Adicionar"
          onClick={() => {
            addCount(count, record.id, record.price.price, setProduct);
          }}
        >
          <Fab color="secondary">
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    );
  };

  return (
    <Show title={<ProductsTitle />} {...props}>
      <SimpleShowLayout style={{ alignItems: 'center', display: 'flex' }}>
        <ImageField source="imageURL" label="Produto" />
        <TextField source="name" label="Nome" />
        <FunctionField
          label="Quantidade"
          render={(record) => getItems(record, setProduct)}
        />
        <FunctionField
          label="Preço"
          render={(record) => {
            if (record.price) {
              let price = Number(record.price.price);
              return CurrencyFormat(price);
            }
            return 0;
          }}
        />
        <FunctionField
          label="Total"
          render={(record) => {
            let total =
              Number(localStorage.getItem(`quantity_item_${record.id}`)) *
              record.price.price;
            return CurrencyFormat(total);
          }}
        />
      </SimpleShowLayout>
    </Show>
  );
};
