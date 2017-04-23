import {getStorageItem, getObjectFromStorage} from 'app/functions';

const initialState = {
    currentUser : '',
    transactionList : [],
    transactionEntries : {},
    withdrawError : false,
    transactionSuccess : false,
    loginText : '',
    amountText : '',
    descriptionText : ''
}

export const getLoadedState = () => {
    let loadedState = {};
    let user = getStorageItem(sessionStorage, 'user');
    if(user) {
        loadedState = getObjectFromStorage(localStorage, user);
        if(loadedState)
            loadedState.currentUser = user;
    }
    return {...initialState, ...loadedState};
}

export default initialState;
