import {actionCreator, getLastTransaction, getObjectFromStorage} from 'app/functions';
import config from 'app/config';

export const CLEAR_FORM = 'CLEAR_FORM';
export const INPUT_TYPING = 'INPUT_TYPING';
export const LOGIN_NEW = 'LOGIN_NEW';
export const LOGIN_EXISTING = 'LOGIN_EXISTING';
export const SUBMIT_TRANSACTION = 'SUBMIT_TRANSACTION';
export const INVALID_TRANSACTION = 'INVALID_TRANSACTION';
export const LOGOUT = 'LOGOUT';
export const PAGINATION_CHANGE = 'PAGINATION_CHANGE';

export const clearForm = actionCreator(CLEAR_FORM);
export const inputTyping = actionCreator(INPUT_TYPING, 'key', 'value');
const loginNew = actionCreator(LOGIN_NEW, 'email');
const loginExisting = actionCreator(LOGIN_EXISTING, 'email', 'loadedState');
export const logout = actionCreator(LOGOUT);
const invalidTransaction = actionCreator(INVALID_TRANSACTION);
const submitTransactionValid = actionCreator(SUBMIT_TRANSACTION, 'whichType', 'amount', 'description', 'date');
export const paginationChange = actionCreator(PAGINATION_CHANGE, 'pageChange');

export const login = email => {
    return dispatch => {
        let item = getObjectFromStorage(localStorage, email);
        if(item)
            dispatch(loginExisting(email, item));
        else
            dispatch(loginNew(email));
    }
};

export const submitTransaction = (whichType, amount, description, date) => {
    return (dispatch, getState) => {
        let lastTransaction = getLastTransaction(getState().transactionList, getState().transactionEntries);
        let balance = lastTransaction ? lastTransaction.balance : 0;
        if(whichType === config.withdrawText && balance < amount)
            dispatch(invalidTransaction());
        else
            dispatch(submitTransactionValid(whichType, amount, description, date));
    }
}
