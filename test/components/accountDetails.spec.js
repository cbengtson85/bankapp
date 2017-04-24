import React from 'react';
import {expect} from 'chai';
import {shallow, render} from 'enzyme';

import {AccountTransactions} from './../../app/components/AccountDetails';

describe('AccountTransactions', () => {
    const dummyfunc = () => false;
    let props = {
        transactionList : ['1', '2', '3', '4'],
        pageIndex : 1,
        maxItemsPerPage : 2,
        paginationChange : dummyfunc
    };
    it('should render', () => {
        const component = shallow(<AccountTransactions {...props} />);
        expect(component).to.exist;
    });
    it('should render correct amount of transaction rows', () => {
        let component = shallow(<AccountTransactions {...props} />);
        let itemsCount = component.find('Connect(TransactionRowContainer)').length;
        expect(itemsCount).to.equal(2);
        props = {...props, maxItemsPerPage : 10};
        component = shallow(<AccountTransactions {...props} />);
        itemsCount = component.find('Connect(TransactionRowContainer)').length;
        expect(itemsCount).to.equal(4);
    });
});
