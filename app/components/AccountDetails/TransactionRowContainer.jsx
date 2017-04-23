import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Table} from 'semantic-ui-react';
import {formatCurrency, getFormattedDate} from 'app/functions';

class TransactionRowContainer extends React.Component {
    render() {
        const {entry} = this.props;
        const amount = entry.amount;
        const isNegative = amount < 0 ? true : false;

        return (
            <Table.Row negative={isNegative} positive={!isNegative}>
                <Table.Cell>{getFormattedDate(entry.date)}</Table.Cell>
                <Table.Cell>{entry.description || '--'}</Table.Cell>
                <Table.Cell>{formatCurrency(amount)}</Table.Cell>
                <Table.Cell>{formatCurrency(entry.balance)}</Table.Cell>
            </Table.Row>
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    TransactionRowContainer.propTypes = {
        entry : PropTypes.object
    };
}

const makeMapStateToProps = (initialState, initialOwnProps) => {
    const {itemId} = initialOwnProps;
    const mapStateToProps = state => {
        const entry = state.transactionEntries[itemId]
        return {
            entry
        }
    }
    return mapStateToProps;
}


export default connect(makeMapStateToProps)(TransactionRowContainer);
