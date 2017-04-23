import React from 'react';
import PropTypes from 'prop-types';

import {Container} from 'semantic-ui-react';
import {AccountMenu, AccountMenuContent, AccountTransactionsContainer} from 'app/components/AccountDetails';

import {getStorageItem} from 'app/functions';

class AccountDetails extends React.Component {
    componentDidMount() {
        if(!getStorageItem(sessionStorage, 'user'))
            this.props.history.push('/');
    }
    render() {
        return (
            <Container>
                <AccountMenu history={this.props.history} selectedMenu={this.props.match.params.page} />
                <AccountMenuContent />
                <AccountTransactionsContainer />
            </Container>
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    AccountDetails.propTypes = {
        match : PropTypes.object,
        history : PropTypes.object
    };
}

export default AccountDetails;
