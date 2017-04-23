import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from 'app/components/App.jsx';

import configureStore from 'app/store/configureStore';
import {getLoadedState} from 'app/store/state';
const store = configureStore(getLoadedState());

class AppEntry extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

ReactDOM.render(
    <AppEntry />,
    document.getElementById('app')
);
