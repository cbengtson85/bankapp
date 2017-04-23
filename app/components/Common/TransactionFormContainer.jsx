import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {TransactionForm} from 'app/components/Common';

import * as ACTIONS from 'app/actions/appActions';

class TransactionFormContainer extends React.Component {
    componentWillUnmount() {
        this.props.actions.clearForm();
    }

    handleChangeAmount = e => {
        this.props.actions.inputTyping('amountText', e.target.value);
    }
    handleChangeDescription = e => {
        this.props.actions.inputTyping('descriptionText', e.target.value);
    }
    handleSubmit = e => {
        e.preventDefault();
        const {type, amountText, descriptionText} = this.props;
        this.props.actions.submitTransaction(type, amountText*1, descriptionText, new Date().getTime());
    }

    render() {
        const {buttonText, withdrawError, transactionSuccess, amountText, descriptionText} = this.props;
        const handleChangeAmount = this.handleChangeAmount;
        const handleChangeDescription = this.handleChangeDescription;
        const handleSubmit = this.handleSubmit;
        const propsObj = {buttonText, withdrawError, transactionSuccess, handleChangeAmount,
            amountText, descriptionText, handleChangeDescription, handleSubmit};
        return (
            <TransactionForm {...propsObj} />
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    TransactionFormContainer.propTypes = {
        withdrawError : PropTypes.bool,
        transactionSuccess : PropTypes.bool,
        buttonText : PropTypes.string,
        actions : PropTypes.object,
        dispatch: PropTypes.func,
        amountText : PropTypes.string,
        descriptionText : PropTypes.string,
        type : PropTypes.string
    };
}

const mapStateToProps = state => {
    return {
        withdrawError : state.withdrawError,
        transactionSuccess : state.transactionSuccess,
        amountText : state.amountText,
        descriptionText : state.descriptionText
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions : bindActionCreators(ACTIONS, dispatch),
        dispatch : dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionFormContainer);
