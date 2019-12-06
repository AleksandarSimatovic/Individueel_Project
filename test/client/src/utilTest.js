const assert = require('chai').assert;
const calculateDistance = require('../../../client/src/util').calculateDistance;

describe('App', () => {
    it('app should return 0', () => {
       let result = calculateDistance(5,10,5,10);
       assert.equal(result, 0);
    });
})