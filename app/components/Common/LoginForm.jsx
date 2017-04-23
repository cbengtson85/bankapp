import React from 'react';
import PropTypes from 'prop-types';

import {Button, Form, Message} from 'semantic-ui-react';

const LoginForm = ({loginText, handleChangeLogin, handleSubmit}) => {
    return (
        <Form size="massive" onSubmit={handleSubmit}>
            <Form.Input placeholder="Enter your email address..." type="email" required
                value={loginText} onChange={handleChangeLogin}></Form.Input>
            <Button size="huge" color="blue" fluid type="submit">Login</Button>
            <Message size="mini">*A new account will be created for you if the email does not exist.</Message>
        </Form>
    )
};

if(process.env.NODE_ENV !== 'production') {
    LoginForm.propTypes = {
        loginText : PropTypes.string,
        handleChangeLogin : PropTypes.func,
        handleSubmit : PropTypes.func
    };
}

export default LoginForm;
