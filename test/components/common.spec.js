import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import {HeaderContainer, mapStateToProps} from './../../app/components/Common/HeaderContainer';

describe('HeaderContainer', () => {
    it('should render', () => {
        const component = shallow(<HeaderContainer />);
        expect(component).to.exist;
    });
    it('should contain a header element', () => {
        const component = shallow(<HeaderContainer />);
        const header = component.find('header');
        expect(header).to.exist;
    });
    it('mapStateToProps should return expected props', () => {
        const state = {currentUser : 'john'};
        const output = mapStateToProps(state);
        expect(output.currentUser).to.equal('john');
    });
});
