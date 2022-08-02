const ynjs = require('./index')

describe('YNJS Test Suite', () => {

    it('should import package as function', () => {
        expect(typeof ynjs).toBe('object')
    })

})