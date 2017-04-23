import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {AccountTransactions} from 'app/components/AccountDetails';

class AccountTransactionsContainer extends React.Component {
    render() {
        const {transactionList} = this.props;
        return (
            <AccountTransactions transactionList={transactionList} />
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    AccountTransactionsContainer.propTypes = {
        transactionList : PropTypes.array
    };
}

const mapStateToProps = state => {
    return {
        transactionList : state.transactionList
    }
};

export default connect(mapStateToProps)(AccountTransactionsContainer);
