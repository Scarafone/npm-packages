/**
 * Simple function for validating that our keys on our models match the expected pattern.
 * @param {string} id 
 * @param {string} pattern 
 * @returns 
 */
module.exports = function idMatches(id, pattern) {
	const validationQuery = pattern
	const validationSearch = new RegExp('^' + validationQuery, 'i')
	return validationSearch.test(id)
}