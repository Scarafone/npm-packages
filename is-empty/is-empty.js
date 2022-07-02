/**
 * Helper util to qualify response data as equivalent to "null"
 * Object could be empty
 * Object could be undefined
 * Object could null
 * All will result in a true value, otherwise false
 */


module.exports = function IsEmpty(obj) {
    if (obj == undefined) return true
    if (!obj) return true
    if (obj && obj.length <= 0) return true
    if(typeof obj === 'object') {
        const isEmpty = Object.keys(obj).length <= 0
        return isEmpty
    }
    return false
}