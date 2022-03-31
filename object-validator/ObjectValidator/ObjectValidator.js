function ObjectValidator() {
	// Used to generated an object map for use in the validator function
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
	 * @param {ObjectKeyErrorMap} requiredKeyKeyMaps
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

	return {
		validateObject,
		ObjectKeyErrorMap,
	}
}

module.exports = ObjectValidator()
