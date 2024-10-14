const Axios = require('axios')
/**
 * GETRequest
 * @param {*} url String representation of an http(s) valid URL address
 * @param {*} headers Object of any additional headers required to be sent with request
 * @param {*} options { verbose: false, shouldThrowError: false }
 * @returns Either returns the results of the API call, or empty object if shouldThrowError function will throw stack error will need to be caught in try catch block
 */
async function GETRequest(url, headers, options = { verbose: false, shouldThrowError: false }) {
	try {
		const results = await Axios.get(url, {
			headers: headers,
		})
		const data = results.data
		return data
	} catch (err) {
		if (options) {
			if (options.verbose) console.error('Error', err)
			if (options.shouldThrowError) throw err
		}
		return []
	}
}

/**
 * Post Request
 * 
 * @param {*} url The url for the request to go to
 * @param {*} body JSON Object representing the data to be passed along with the request 
 * @param {*} headers Header JSON object usually includes at minimum some authorization header { authorization: "JWT Token"}
 * @param {*} options { verbose: false, shouldThrowError: false }
 * @returns Either returns the results of the API call, or empty object if shouldThrowError function will throw stack error will need to be caught in try catch block
 */
async function POSTRequest(url, body, headers, options = { verbose: false, shouldThrowError: false }) {
	try {
		const results = await Axios.post(url, body, {
			headers: headers,
		})
		const data = results.data
		return data
	} catch (err) {
		if (options) {
			if (options.verbose) console.error('Error', err)
			if (options.shouldThrowError) throw err
		}
		throw err.response.data.error
	}
}

/**
 * Patch Request
 * 
 * @param {*} url The url for the request to go to
 * @param {*} body JSON Object representing the data to be passed along with the request 
 * @param {*} headers Header JSON object usually includes at minimum some authorization header { authorization: "JWT Token"}
 * @param {*} options { verbose: false, shouldThrowError: false }
 * @returns Either returns the results of the API call, or empty object if shouldThrowError function will throw stack error will need to be caught in try catch block
 */
async function PATCHRequest(url, body, headers, options = { verbose: false, shouldThrowError: false }) {
	try {
		const results = await Axios.patch(url, body, {
			headers: headers,
		})
		const data = results.data
		return data
	} catch (err) {
		if (options) {
			if (options.verbose) console.error('Error', err)
			if (options.shouldThrowError) throw err
		}
		return []
	}
}

/**
 * Delete Request
 * 
 * @param {*} url The url for the request to go to
 * @param {*} body JSON Object representing the data to be passed along with the request 
 * @param {*} headers Header JSON object usually includes at minimum some authorization header { authorization: "JWT Token"}
 * @param {*} options { verbose: false, shouldThrowError: false }
 * @returns Either returns the results of the API call, or empty object if shouldThrowError function will throw stack error will need to be caught in try catch block
 */
async function DELETERequest(url, body, headers, options = { verbose: false, shouldThrowError: false }) {
	try {
		const results = await Axios.delete(url, {
			headers: headers,
			body: body,
		})
		const data = results.data
		return data
	} catch (err) {
		if (options) {
			if (options.verbose) console.error('Error', err)
			if (options.shouldThrowError) throw err
		}
		return []
	}
}

async function PUTRequest(url, body, headers, options = { verbose: false, shouldThrowError: false }) {
	try {
		const results = await Axios.put(url, body, {
			headers: headers,
		})
		const data = results.data
		return data
	} catch (err) {
		if (options) {
			if (options.verbose) console.error('Error', err)
			if (options.shouldThrowError) throw err
		}
		return []
	}
}

module.exports = {
	DELETERequest,
	GETRequest,
	PATCHRequest,
	POSTRequest,
	PUTRequest,
}