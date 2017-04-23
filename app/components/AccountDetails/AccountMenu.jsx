import React from 'react';
import PropTypes from 'prop-types';

import {Menu} from 'semantic-ui-react';
import config from 'app/config';

class AccountMenu extends React.Component {
    handleMenuClick = e => {
        e.preventDefault();
        this.props.history.push(e.target.getAttribute('href'));
    }
    render() {
        const {selectedMenu, menuItems} = this.props;
        return (
            <Menu color="blue" size="massive">
                {menuItems.map(item =>
                    <Menu.Item active={item.url === selectedMenu} key={item.name}
                        href={'/' + item.url} onClick={this.handleMenuClick}>
                        {item.name}
                    </Menu.Item>
                )}
            </Menu>
        )
    }
}

if(process.env.NODE_ENV !== 'production') {
    AccountMenu.propTypes = {
        selectedMenu : PropTypes.string,
        menuItems : PropTypes.array,
        history : PropTypes.object
    };
}

AccountMenu.defaultProps = {
    menuItems : [{url : config.overviewText, name : 'Overview'}, {url : config.depositText, name : 'Deposit'},
        {url : config.withdrawText, name : 'Withdraw'}]
}

export default AccountMenu;
