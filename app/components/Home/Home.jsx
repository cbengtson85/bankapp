import React from 'react';
import PropTypes from 'prop-types';

import {Header, Container, Segment} from 'semantic-ui-react';
import {LoginFormContainer} from 'app/components/Common';

class Home extends React.Component {
    render() {
        return (
            <Container textAlign="center">
                <Header as="h2">Login to your bank account</Header>
                <Segment padded="very" textAlign="left" className="home-login-segment">
                    <LoginFormContainer history={this.props.history} />
                </Segment>
            </Container>
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    Home.propTypes = {
        history : PropTypes.object
    };
}

export default Home;
