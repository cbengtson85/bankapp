import React from 'react';
import PropTypes from 'prop-types';

import {Button, Form, Message} from 'semantic-ui-react';
import config from 'app/config';

const TransactionForm = ({buttonText, withdrawError, transactionSuccess, handleSubmit,
    handleChangeAmount, handleChangeDescription, amountText, descriptionText}) => {

    return (
        <Form success={transactionSuccess} error={withdrawError} className="transaction-form" onSubmit={handleSubmit}>
            <Form.Field>
                <input placeholder="Enter an amount..." type="text" pattern={config.dollarAmountRegex} required
                    title="Please enter a valid amount." maxLength="30" value={amountText} onChange={handleChangeAmount}/>
            </Form.Field>
            <Form.Input placeholder="Enter a short description..." type="text" maxLength="50"
                value={descriptionText} onChange={handleChangeDescription}></Form.Input>
            <Button size="large" color="blue" fluid type="submit">{buttonText}</Button>
            <Message success size="small">The transaction was successful!</Message>
            <Message error size="small">You do not have sufficient funds to withdraw this amount</Message>
        </Form>
    )
};

if(process.env.NODE_ENV !== 'production') {
    TransactionForm.propTypes = {
        withdrawError : PropTypes.bool,
        transactionSuccess : PropTypes.bool,
        buttonText : PropTypes.string,
        handleChangeAmount : PropTypes.func,
        handleChangeDescription : PropTypes.func,
        amountText : PropTypes.string,
        descriptionText : PropTypes.string,
        handleSubmit : PropTypes.func
    };
}

export default TransactionForm;
