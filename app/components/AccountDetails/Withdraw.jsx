import React from 'react';

import {Segment} from 'semantic-ui-react';
import {TransactionFormContainer} from 'app/components/Common';

import config from 'app/config';

class Withdraw extends React.Component {
    render() {
        return (
            <Segment compact className="transaction-form-segment">
                <TransactionFormContainer buttonText="Withdraw Amount" type={config.withdrawText} />
            </Segment>
        )
    }
}

export default Withdraw;
