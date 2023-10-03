import React, { createContext, useContext, useState } from "react";

const IncomeExpenseContext = createContext();

export const useIncomeExpense = () => {
  return useContext(IncomeExpenseContext);
};

export const IncomeExpenseProvider = ({ children }) => {
  const [valorTotalRendimentos, setValorTotalRendimentos] = useState(0);
  const [valorTotalDespesas, setValorTotalDespesas] = useState(0);

  // Funções para atualizar os valores totais de rendimentos e despesas
  const atualizarValorTotalRendimentos = (novoValor) => {
    setValorTotalRendimentos(novoValor);
  };

  const atualizarValorTotalDespesas = (novoValor) => {
    setValorTotalDespesas(novoValor);
  };

  return (
    <IncomeExpenseContext.Provider
      value={{
        valorTotalRendimentos,
        valorTotalDespesas,
        atualizarValorTotalRendimentos, // Adicione as funções aqui
        atualizarValorTotalDespesas,    // Adicione as funções aqui
      }}
    >
      {children}
    </IncomeExpenseContext.Provider>
  );
};
