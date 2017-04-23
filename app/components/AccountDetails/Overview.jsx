import React from 'react';
import PropTypes from 'prop-types';

import {Segment} from 'semantic-ui-react';

const Overview = ({currentBalance, lastActivity, currentUser}) => {
    return (
        <Segment.Group compact size="big">
            <Segment>
                <label>Current Balance:</label> <strong>{currentBalance}</strong>
            </Segment>
            <Segment>
                <label>Last Activity:</label> <strong>{lastActivity}</strong>
            </Segment>
            <Segment>
                <label>Email Address:</label> <strong>{currentUser}</strong>
            </Segment>
        </Segment.Group>
    )
};

if(process.env.NODE_ENV !== 'production') {
    Overview.propTypes = {
        currentBalance : PropTypes.string,
        lastActivity : PropTypes.string,
        currentUser : PropTypes.string
    };
}

export default Overview;
