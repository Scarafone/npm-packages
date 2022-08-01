const Axios = require('axios')
/**
 * GETRequest
 * @param {*} url String representation of an http(s) valid URL address
 * @param {*} headers Object of any additional headers required to be sent with request
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
 * 
 * @param {*} url 
 * @param {*} body 
 * @param {*} headers 
 * @param {*} options 
 * @returns 
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
 * 
 * @param {*} url 
 * @param {*} body 
 * @param {*} headers 
 * @param {*} options 
 * @returns 
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
 * 
 * @param {*} url 
 * @param {*} body 
 * @param {*} headers 
 * @param {*} options 
 * @returns 
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

module.exports = {
	DELETERequest,
	GETRequest,
	PATCHRequest,
	POSTRequest,
}