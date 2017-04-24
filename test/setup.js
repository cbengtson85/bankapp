'use strict'

import jsdom from 'jsdom';

global.document = jsdom.jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});

//hack to surpress console errors from semantic-ui-react package
global.window.localStorage = {debug : function() {return false}};

global.navigator = {
    userAgent: 'node.js'
};
