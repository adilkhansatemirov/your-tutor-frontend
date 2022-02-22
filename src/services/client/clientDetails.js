import api from '../api';

export const addCreditCard = (card) => {
  return api.post('/client/client_details/connect_card', card);
};

export const addBankAccount = (plaid) => {
  return api.post('/client/client_details/connect_bank', plaid);
};
