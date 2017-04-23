import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from 'app/components/Home';
import {AccountDetails} from 'app/components/AccountDetails';
import {HeaderContainer} from 'app/components/Common';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="*" component={HeaderContainer} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/:page" component={AccountDetails} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
