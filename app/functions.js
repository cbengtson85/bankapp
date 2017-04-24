import formatDate from 'dateformat';
import config from 'app/config';
import * as ACTIONS from 'app/actions/appActions';

export function actionCreator(type, ...argNames) {
    return function(...args) {
        let action = {
            type
        }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    }
}

export const formatCurrency = amount => {
    let amt = amount;
    let formatted = '';
    if(amt < 0) {
        formatted += '-';
        amt *= -1;
    }
    formatted += '$';
    formatted += amt.toFixed(2);
    return formatted;
};

export const getFormattedDate = date => {
    return formatDate(date, config.dateFormat);
}

export const getLastTransactionId = tArr => {
    return tArr[0];
}

export const getLastTransaction = (tArr, transactions) => {
    const lastId = getLastTransactionId(tArr);
    return transactions[lastId];
};

export const setStorageItem = (storage, key, value) => {
    try {
        storage.setItem(key, value);
    } catch(e) {
        console.error(e);
    }
}

export const getStorageItem = (storage, key) => {
    try {
        return storage.getItem(key);
    } catch(e) {
        console.error(e);
        return null;
    }
}

export const getObjectFromStorage = (storage, key) => {
    let sItem = getStorageItem(storage, key);
    if(sItem != undefined) {
        sItem = JSON.parse(sItem);
    }
    return sItem;
}

export const deleteStorageItem = (storage, key) => {
    try {
        storage.removeItem(key);
    } catch(e) {
        console.error(e);
    }
}

export const localStorageMiddleWare = store => next => action => {
    let result = next(action);
    if(action.type === ACTIONS.SUBMIT_TRANSACTION) {
        let newState = store.getState();
        let {transactionList, transactionEntries} = newState;
        let dataObj = {transactionList, transactionEntries};
        setStorageItem(localStorage, newState.currentUser, JSON.stringify(dataObj));
    }
    return result;
}
