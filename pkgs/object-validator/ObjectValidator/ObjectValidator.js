
/**
 * ObjectKeyErrorMap 
 * 
 * Used for generating required shape for us in the validateObject function
 * Should be passed in as an array of these objects, with at least one(1)
 * 
 * @param {*} key The key of the object to match for
 * @param {*} errorMessage The human readable message you would want to be returned in your errors object for the 
 * @param {*} isOptional Will tell the validator not to explicitly fail when checking for these key if not present
 * @returns `{ key, message, optional }` shaped object
 */
function ObjectKeyErrorMap(key, errorMessage, isOptional = false) {
	return {
		key,
		message: errorMessage,
		optional: isOptional,
	}
}

/**
 * Given an object and an array of ObjectKeyErrorMap objects
 * return a valid and sanitized object.
 * @param {Object} obj
 * @param {ObjectKeyErrorMap} requiredKeyKeyMaps Array of ObjectKeyErrorMapShapes
 */

function validateObject(obj, objectKeyErrorMaps) {
	const errors = []
	const validObject = {}
	objectKeyErrorMaps.forEach((keyMap) => {
		if (!obj.hasOwnProperty(keyMap.key) && !keyMap.optional) {
			errors.push(keyMap.message)
		} else {
			validObject[keyMap.key] = obj[keyMap.key]
		}
	})
	if (errors.length > 0) return { errors }
	return { ...validObject }
}


module.exports = {
	ObjectKeyErrorMap,
	validateObject
}
