import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Overview} from 'app/components/AccountDetails';
import {formatCurrency, getLastTransaction, getFormattedDate} from 'app/functions';

class OverviewContainer extends React.Component {
    render() {
        const {currentBalance, currentUser, lastActivity} = this.props;
        const propsObj = {currentBalance, currentUser, lastActivity};
        return (
            <Overview {...propsObj} />
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    OverviewContainer.propTypes = {
        currentBalance : PropTypes.string,
        lastActivity : PropTypes.string,
        currentUser : PropTypes.string
    };
}

const mapStateToProps = state => {
    const transaction = getLastTransaction(state.transactionList, state.transactionEntries);
    const balance = transaction ? formatCurrency(transaction.balance) : '0';
    const activity = transaction ? getFormattedDate(transaction.date) : '---';

    return {
        currentBalance : balance,
        lastActivity : activity,
        currentUser : state.currentUser
    }
};

export default connect(mapStateToProps)(OverviewContainer);
