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
    let lastTransaction = getLastTransaction(oldState.transactionList, oldState.transactionEntries);
    let oldBalance = lastTransaction ? lastTransaction.balance : 0;
    let amt = type === config.withdrawText ? amount*-1 : amount;
    let newBalance = oldBalance + amt;
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
    let newEntries = {...entries, [date] : entry}
    let obj = {transactionList : tarr, transactionEntries : newEntries, transactionSuccess : true};
    return {...clearFormObject(), ...obj};
}

const appReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.CLEAR_FORM:
            return {...state, ...clearFormObject()};
        case ACTIONS.INPUT_TYPING: {
            let obj = {withdrawError : false, transactionSuccess : false, [action.key] : action.value}
            return {...state, ...obj};
        }
        case ACTIONS.LOGIN_NEW: {
            let newState = {...initialState, currentUser : action.email};
            return {...state, ...newState};
        }
        case ACTIONS.LOGIN_EXISTING: {
            let newState = {...action.loadedState, currentUser : action.email};
            return {...state, ...newState};
        }
        case ACTIONS.LOGOUT:
            return {...state, ...initialState};
        case ACTIONS.INVALID_TRANSACTION:
            return {...state, withdrawError : true};
        case ACTIONS.SUBMIT_TRANSACTION: {
            let entry = buildTransactionObject(action.whichType, action.amount, action.description, action.date, state);
            let newState = getNewStateAfterTransaction(state.transactionList, action.date, entry, state.transactionEntries);
            return {...state, ...newState};
        }
        default:
            return state;
    }
};

export default appReducer;
