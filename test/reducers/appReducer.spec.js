import {expect} from 'chai';

import appReducer from './../../app/reducers/appReducer';
import * as ACTIONS from './../../app/actions/appActions';
import initialState from './../../app/store/state';

describe('reducer', () => {
    it('should return intial state', () => {
        expect(appReducer(undefined, {})).to.deep.equal({});
    });
    it('should handle page change action', () => {
        const expectedState = {
            pageIndex : 2
        }
        expect(appReducer({pageIndex : 1}, ACTIONS.paginationChange(1))).to.deep.equal(expectedState);
    });
});
