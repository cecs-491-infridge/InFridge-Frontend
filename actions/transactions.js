import axios from 'axios';
import { testUser } from '../testUser';
const userId = testUser.userId;

const addTransaction = (transaction) => ({
  type: 'ADD_TRANSACTION',
  transaction
});
export const startAddTransaction = (data = {}) => {
  return (dispatch) => {
    const {
      body,
      location,
      tradeType
    } = data;
    const transactionData = { author: userId, body, location, tradeType };

    // Need user id to do this
    // WAIT FOR VICTORIA TO GET USER ID

<<<<<<< HEAD
    return axios.post(`https://school.corg.network:3002/create-transaction`, {
        ...transactionData
=======
    return axios.post(`http://school.corg.network:3000/create-transaction`, {
      ...transactionData
>>>>>>> master
    })
      .then(res => {
        console.log('--------------------------------------')
        console.log(res.data)
        const newId = res.data.data._id;

        const newTransaction = {
          _id: newId,
          ...transactionData
        }
        dispatch(addTransaction(newTransaction));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const deleteTransaction = (id) => ({
  type: 'DELETE_TRANSACTION',
  id
})
export const startDeleteTransaction = (id) => {
  const data = {
    postId: id
  }
  console.log('data---------------------------------------------------');

  console.log(data);
  return (dispatch) => {
    return axios.delete(`https://school.corg.network:3002/delete-post`, {
      data
    })
      .then(res => {
        console.log('--------------------------------------')
        console.log(res.data)
        dispatch(deleteTransaction(id));
      })
      .catch(err => {
        console.log('--------------------------------------')

        console.log(err);
      });
  }
}

const updateTransaction = (id, updates) => ({
  type: 'UPDATE_TRANSACTION',
  id,
  updates
})

export const startUpdateTransaction = (id, updates) => {
  return async (dispatch) => {
    // await axios.post(`http://school.corg.network:3000/delete-post`, {
    //      id,
    //      ...updates
    // });

    dispatch(updateTransaction(id, updates));
  }
}

const setTransactions = (transactions) => ({
  type: 'SET_TRANSACTIONS',
  transactions
})
export const startSetTransactions = () => {
  return (dispatch) => {
<<<<<<< HEAD
        return axios.get('https://school.corg.network:3002/all-posts')
            .then(transactions => {
              console.log('--------------------------------------')
              console.log(transactions.data.data)
              dispatch(setTransactions(transactions.data.data));
            })
            .catch(err => {
                console.log(err);
            });
=======
    return axios.get('http://school.corg.network:3000/all-posts')
      .then(res => {
        const transactions = res.data.data
        dispatch(setTransactions(transactions));
      })
      .catch(err => {
        console.log(err);
      });
>>>>>>> master
  }
}
