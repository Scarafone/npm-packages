/**
 * IsEmpty
 *  Helper util to qualify response data as equivalent to "null"
 *  Object could be empty
 *  Object could be undefined
 *  Object could null
 *  All will result in a true value, otherwise false
 */

const isEmpty = require('./is-empty')



describe('Is Empty Suite', () => {
    it ('Should return true for various cases of "empty"', () => {
        const testObj1 = {}
        expect(isEmpty(testObj1)).toEqual(true)
        const testObj2 = []
        expect(isEmpty(testObj2)).toEqual(true)
        const testObj3 = null
        expect(isEmpty(testObj3)).toEqual(true)
        const testObj4 = ''
        expect(isEmpty(testObj4)).toEqual(true)
        const testObj5 = undefined
        expect(isEmpty(testObj5)).toEqual(true)
    })
    it ('Should return false when not empty', () => {
        const testObj1 = { "not": "empty" }
        const testObj2 = "not-empty"
        expect(isEmpty(testObj1)).toEqual(false)
        expect(isEmpty(testObj2)).toEqual(false)
    })
})

