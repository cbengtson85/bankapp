import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import {Home} from './../../app/components/Home';

describe('Home', () => {
    it('should render and render a Login form', () => {
        let component = shallow(<Home />);
        expect(component).to.exist;
        let loginContainer = component.find('LoginFormContainer');
        expect(loginContainer).to.exist;
    });
});
