const isEmpty = require('@scarafone/is-empty/is-empty')

/**
 * 
 * @param {*} object The object in which you wish to scrub data from. 
 * @param {*} unserializableFields A map object that describes based on a type key, what fields should be allowed or not 
 * @param {*} typeKey The type key defined in the unserializableFields mapping 
	``` 

	Example: {
		'admin': [''],
		'default': [
			'permissions'
		]
	}

	```
* If there is no mapping provided or found in the fields it will use default
* If default is not defined, then it will simply not return any fields, but you will
* get an empty object
*/
function ObjectSerializer(object, unserializableFields, typeKey = 'default') {
	if (!unserializableFields) {
		throw new Error('UnserializableFields is required')
	}
	if (isEmpty(object)) {
		return object
	}
	var toSerializeOut = unserializableFields[typeKey]
	if (isEmpty(toSerializeOut)) {
		toSerializeOut = unserializableFields['default']
		if (isEmpty(toSerializeOut)) {
			toSerializeOut = Object.keys(object)
		}
	}
	toSerializeOut &&
		toSerializeOut.forEach((field) => {
			delete object[field]
		})
	return object
}

module.exports = ObjectSerializer
