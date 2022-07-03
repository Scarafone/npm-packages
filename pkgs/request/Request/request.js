const Axios = require('axios')
/**
 * GETRequest
 * @param {*} url String representation of an http(s) valid URL address
 * @param {*} headers Object of any additional headers required to be sent with request
 */
async function GETRequest(url, headers, options = null) {
	try {
		const results = await Axios.get(url, {
			headers: headers,
		})
		const data = results.data
		return data
	} catch (err) {
		console.error('Error', err)
		if (options && options.verbose) {
		}
		return []
	}
}

async function POSTRequest(url, body, headers, options = null) {
	try {
		const results = await Axios.post(url, body, {
			headers: headers,
		})
		const data = results.data
		return data
	} catch (err) {
		throw err.response.data.error
	}
}

async function PATCHRequest(url, body, headers, options = null) {
	try {
		const results = await Axios.patch(url, body, {
			headers: headers,
		})
		const data = results.data
		return data
	} catch (err) {
		if (options && options.verbose) {
			console.error('Error', err)
		}
		return []
	}
}

async function DELETERequest(url, body, headers, options = null) {
	try {
		const results = await Axios.delete(url, {
			headers: headers,
		})
		const data = results.data
		return data
	} catch (err) {
		if (options && options.verbose) {
			console.error('Error', err)
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