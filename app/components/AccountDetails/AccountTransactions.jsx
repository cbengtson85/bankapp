import React from 'react';
import PropTypes from 'prop-types';

import {Table, Segment, Header} from 'semantic-ui-react';
import {TransactionRowContainer} from 'app/components/AccountDetails';

const AccountTransactions = ({transactionList, headings}) => {
    return (
        <Segment>
            <Header as="h3">Transactions</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {headings.map(heading =>
                            <Table.HeaderCell key={heading}>{heading}</Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {transactionList.length > 0 ? (
                        transactionList.map(id =>
                            <TransactionRowContainer itemId={id} key={id} />
                        )
                    ) :
                    (
                        <Table.Row textAlign="center">
                            <Table.Cell colSpan={4}>You have no recent transactions</Table.Cell>
                        </Table.Row>
                    )
                    }

                </Table.Body>
            </Table>
        </Segment>
    )
};

if(process.env.NODE_ENV !== 'production') {
    AccountTransactions.propTypes = {
        transactionList : PropTypes.array,
        transactionEntries : PropTypes.object,
        headings : PropTypes.array
    };
}

AccountTransactions.defaultProps = {
    headings : ['Date', 'Description', 'Amount', 'Balance']
}

export default AccountTransactions;
