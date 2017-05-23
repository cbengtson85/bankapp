import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Header} from 'semantic-ui-react';
import {Logout} from 'app/components/Common';

import * as ACTIONS from 'app/actions/appActions';
import {deleteStorageItem} from 'app/functions';

export class HeaderContainer extends React.Component {
    handleClickLogout = () => {
        this.props.dispatch(ACTIONS.logout());
        deleteStorageItem(sessionStorage, 'user');
        this.props.history.push('/');
    }

    render() {
        const {currentUser} = this.props;
        return (
            <header>
                <Header color="blue" dividing as="h1" textAlign="center">
                    <Link to="/" className="blue">Bank App</Link>
                </Header>
                {currentUser ? <Logout handleClick={this.handleClickLogout} /> : null}
            </header>
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    HeaderContainer.propTypes = {
        currentUser : PropTypes.string,
        dispatch : PropTypes.func,
        history : PropTypes.object
    };
}

export const mapStateToProps = state => {
    return {
        currentUser : state.currentUser
    }
};

export default connect(mapStateToProps)(HeaderContainer);
