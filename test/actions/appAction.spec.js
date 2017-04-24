import {expect} from 'chai';

import {actionCreator} from './../../app/functions';
import * as ACTIONS from './../../app/actions/appActions';

describe('Test Action Creator', () => {
    it('should create an action to change page index', () => {
        const pageChange = 2;
        const expectedAction = {
            type : ACTIONS.PAGINATION_CHANGE,
            pageChange
        }
        const ac = actionCreator(ACTIONS.PAGINATION_CHANGE, 'pageChange');;
        expect(ac(pageChange)).to.deep.equal(expectedAction);
    });
});
