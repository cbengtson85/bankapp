import * as ACTIONS from 'app/actions/appActions';
import config from 'app/config';
import {getLastTransaction} from 'app/functions';
import initialState from 'app/store/state';


const clearFormObject = () => {
    return {
        withdrawError : false,
        transactionSuccess : false,
        loginText : '',
        amountText : '',
        descriptionText : ''
    };
};

const buildTransactionObject = (type, amount, description, date, oldState) => {
    const lastTransaction = getLastTransaction(oldState.transactionList, oldState.transactionEntries);
    const oldBalance = lastTransaction ? lastTransaction.balance : 0;
    const amt = type === config.withdrawText ? amount*-1 : amount;
    const newBalance = oldBalance + amt;
    return {
        date : date,
        description : description,
        amount : amt,
        balance : newBalance
    }
}

const getNewStateAfterTransaction = (transactionList, date, entry, entries) => {
    let tarr = transactionList.concat();
    tarr.unshift(date);
    const newEntries = {...entries, [date] : entry}
    const obj = {transactionList : tarr, transactionEntries : newEntries, transactionSuccess : true, pageIndex : 1};
    return {...clearFormObject(), ...obj};
}

const appReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.CLEAR_FORM:
            return {...state, ...clearFormObject()};
        case ACTIONS.INPUT_TYPING: {
            const obj = {withdrawError : false, transactionSuccess : false, [action.key] : action.value}
            return {...state, ...obj};
        }
        case ACTIONS.LOGIN_NEW: {
            const newState = {...initialState, currentUser : action.email, pageIndex : 1};
            return {...state, ...newState};
        }
        case ACTIONS.LOGIN_EXISTING: {
            const newState = {...action.loadedState, currentUser : action.email, pageIndex : 1};
            return {...state, ...newState};
        }
        case ACTIONS.LOGOUT:
            return {...state, ...initialState};
        case ACTIONS.INVALID_TRANSACTION:
            return {...state, withdrawError : true};
        case ACTIONS.PAGINATION_CHANGE:
            return {...state, pageIndex : state.pageIndex + action.pageChange};
        case ACTIONS.SUBMIT_TRANSACTION: {
            const entry = buildTransactionObject(action.whichType, action.amount, action.description, action.date, state);
            const newState = getNewStateAfterTransaction(state.transactionList, action.date, entry, state.transactionEntries);
            return {...state, ...newState};
        }
        default:
            return state;
    }
};

export default appReducer;
