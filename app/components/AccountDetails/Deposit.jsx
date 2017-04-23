import React from 'react';

import {Segment} from 'semantic-ui-react';
import {TransactionFormContainer} from 'app/components/Common';

import config from 'app/config';

class Deposit extends React.Component {
    render() {
        return (
            <Segment compact className="transaction-form-segment">
                <TransactionFormContainer buttonText="Deposit Amount" type={config.depositText} />
            </Segment>
        )
    }
}

export default Deposit;
