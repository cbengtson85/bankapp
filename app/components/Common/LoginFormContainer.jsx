import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {LoginForm} from 'app/components/Common';
import * as ACTIONS from 'app/actions/appActions';
import {setStorageItem} from 'app/functions';
import config from 'app/config';

class LoginFormContainer extends React.Component {
    componentWillUnmount() {
        this.props.actions.clearForm();
    }
    handleChangeLogin = e => {
        this.props.actions.inputTyping('loginText', e.target.value);
    }
    handleSubmit = e => {
        e.preventDefault();
        const email = this.props.loginText;
        this.props.actions.login(email);
        setStorageItem(sessionStorage, 'user', email);
        this.props.history.push('/' + config.overviewText);
    }

    render() {
        const {loginText} = this.props;
        const handleChangeLogin = this.handleChangeLogin;
        const handleSubmit = this.handleSubmit;
        const propsObj = {loginText, handleChangeLogin, handleSubmit};
        return (
            <LoginForm {...propsObj} />
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    LoginFormContainer.propTypes = {
        loginText : PropTypes.string,
        actions : PropTypes.object,
        history : PropTypes.object
    };
}

const mapStateToProps = state => {
    return {
        loginText : state.loginText
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions : bindActionCreators(ACTIONS, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
