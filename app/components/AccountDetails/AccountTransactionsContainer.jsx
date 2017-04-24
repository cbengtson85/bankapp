import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {AccountTransactions} from 'app/components/AccountDetails';
import * as ACTIONS from 'app/actions/appActions';
import config from 'app/config';

class AccountTransactionsContainer extends React.Component {
    render() {
        const {transactionList, pageIndex, paginationChange} = this.props;
        return (
            <AccountTransactions transactionList={transactionList} pageIndex={pageIndex}
                paginationChange={paginationChange} maxItemsPerPage={config.pagination} />
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    AccountTransactionsContainer.propTypes = {
        transactionList : PropTypes.array,
        pageIndex : PropTypes.number,
        paginationChange : PropTypes.func
    };
}

const mapStateToProps = state => {
    return {
        transactionList : state.transactionList,
        pageIndex : state.pageIndex
    }
};

const mapDispatchToProps = dispatch => {
    return {
        paginationChange : id => {dispatch(ACTIONS.paginationChange(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountTransactionsContainer);
