import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {OverviewContainer, Deposit, Withdraw} from 'app/components/AccountDetails';
import config from 'app/config';

const AccountMenuContent = () => {
    return (
        <Switch>
            <Route exact path={'/' + config.overviewText} component={OverviewContainer} />
            <Route exact path={'/' + config.depositText} component={Deposit} />
            <Route exact path={'/' + config.withdrawText} component={Withdraw} />
        </Switch>
    )
};

export default AccountMenuContent;
