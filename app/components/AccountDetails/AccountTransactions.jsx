import React from 'react';
import PropTypes from 'prop-types';

import {Table, Segment, Header} from 'semantic-ui-react';
import {TransactionRowContainer} from 'app/components/AccountDetails';
import {Pagination} from 'app/components/Common';

import config from 'app/config';

class AccountTransactions extends React.Component {
    handleNextClick = e => {
        e.preventDefault();
        const {transactionList, pageIndex, paginationChange} = this.props;
        const tlength = transactionList.length;
        const maxPages = Math.ceil(tlength / config.pagination);
        if(pageIndex < maxPages)
            paginationChange(1);
    }
    handlePrevClick = e => {
        e.preventDefault();
        const {pageIndex, paginationChange} = this.props;
        if(pageIndex > 1)
            paginationChange(-1);
    }

    render() {
        const {transactionList, headings, pageIndex} = this.props;
        const tlength = transactionList.length;
        const page = config.pagination;
        const maxPages = Math.ceil(tlength / page);
        let displayedList = transactionList;
        if(tlength > config.pagination ) {
            const start = (pageIndex-1) * page;
            const end = start + page;
            displayedList = transactionList.slice(start,end);
        }

        return (
            <Segment>
                <Segment basic floated="left"><Header as="h2">Transactions</Header></Segment>
                {tlength > config.pagination ?
                    <Segment size="small" floated="right" basic>
                        <Pagination pageIndex={pageIndex} maxPages={maxPages} handlePrev={this.handlePrevClick}
                            handleNext={this.handleNextClick} />
                    </Segment>
                    : null}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {headings.map(heading =>
                                <Table.HeaderCell key={heading}>{heading}</Table.HeaderCell>
                            )}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tlength > 0 ? (
                            displayedList.map(id =>
                                <TransactionRowContainer itemId={id} key={id} />
                            )
                        ) : (
                            <Table.Row textAlign="center">
                                <Table.Cell colSpan={4}>You have no recent transactions</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Segment>
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    AccountTransactions.propTypes = {
        transactionList : PropTypes.array,
        transactionEntries : PropTypes.object,
        headings : PropTypes.array,
        pageIndex : PropTypes.number,
        paginationChange : PropTypes.func
    };
}

AccountTransactions.defaultProps = {
    headings : ['Date', 'Description', 'Amount', 'Balance']
}

export default AccountTransactions;
