const CurrencyFormat = (value) => {
  const newValue = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  });

  return newValue;
};

export { CurrencyFormat };
