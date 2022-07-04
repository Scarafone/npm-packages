const { GETRequest } = require('@scarafone/request')
const Mapper = require('@scarafone/json-remapper')

/**
 * DataSource Object
 * @param {*} id 
 * @param {*} name 
 * @param {*} api_url 
 * @param {*} api_auth_token 
 * @param {*} pagination_map 
 * @param {*} object_map 
 * @returns 
 */
function DataSource(id, name, api_url, api_auth_token, pagination_map, object_map) {
    return { id, name, api_url, api_auth_token, pagination_map, object_map }
}

/**
 * Given an array of Data Source objects, collect and process the information
 * and return a single array of all the information gathered, by default.
 * 
 * To get back as a dictionary object, pass into options the formatStyle: 'map'
 * Supported `FormatStyles`:
 *  - 'arr' (Default)
 *  - 'map'
 *
 * @param {*} dataSources Array of Data Source objects
 * @param {*} options An options object, currently only supports { separate_by_source: false }
 * Enabling separate by source will sort the data in a map and by key values by source
 * Data Source so you can know where the results came from.
 * ```
    {
        id: 3,
        name: 'Ultra RPS Feed',
        api_url: "https://api.ultrarps.com/api/v2/posts/feed",
        api_auth_token: null,
        pagination_map: { // Optional, if used then // { 'Required Keys' : 'Their Keys' }
            next: 'next',  // `next` is a required key
            results: 'results' // `results` is a required key
        },
        object_map: { // { 'Your Keys' : 'Their Keys' }
            'id': 'id',
            'lat': 'gps_position.gps',
            'lng': 'gps_position.lng',
            'name': 'name'
        }
    }
    ```
 * Returns a map of objects, keyed to the data sources id
 */
async function getDataFromSources (dataSources, options = null) {
    if (!dataSources) { return null }
    let responses = {}
    for (let index in dataSources) {
        const source = dataSources[index]
        if (options && options.verbose) {
            console.info("Fetching from source: ", source.api_url)
        }
        try {
            const response = await GETRequest(source.api_url,  { "Authorization": `${source.api_auth_token}` })
            const results = await processResponseFromSource(response, source, options)
            if (results)  {
                responses[source.id] = results
            }
        } catch (err) {
            if (options && options.verbose) {
                console.error('Error', err)
            }
            throw err
        }
    }
    const formatStyle = (options && options.formatStyle) ? options.formatStyle : 'arr'
    return formatResponsesToStyle(responses, formatStyle)
}

async function postDataToSources (dataSources, options = null) {
    console.log(options, "This is a test log")
}


/**
 * This function takes in a map of objects and given a supported formatting style
 * will return an appropriate response.
 * 
 * Currently defaults to `map` return, which means no additional processing will occur.
 * Used as a bypass proxy.
 * 
 * @param {Map} responses 
 * @param {String} formatStyle 
 */
function formatResponsesToStyle(responses, formatStyle) {
    switch (formatStyle) {
        case 'arr': {
            return Object.values(responses).reduce((ac, cu) =>{
                return ac.concat(cu)
            })
        }
        default: return responses
    }
}

/**
 * Given an initial response from a Data Source and the Data Source object itself
 * asynchronously process and return a filtered result set based on the `object_map`
 * object provided in the Data Source that's passed in. 
 * 
 * If the source includes a `pagination_map` object. The source will be checked
 * for additional pages. If they exist, this function will continue to fetch data
 * from all the remaining pages, until exhausted, or stopped. 
 * If a data source page fetch fails, the gathering will be stopped and all results
 * gathered thus far will be returned. 
 * @param {*} response Raw server response from the initial API request
 * @param {*} source The Data Source object for the response being sent in
 */
async function processResponseFromSource(response, source, options = null) {
    if (!source || !response) { throw new Error("Missing response or source object, requires both") }
    if (source.pagination_map) {
        let pageControl = new Mapper([response], source.pagination_map)[0]
        let nextDataSource = pageControl.next
        let results = pageControl.results
        while (nextDataSource) {
            try {
                if (options && options.verbose) {
                    console.info(`Fetching next: ${nextDataSource}`)
                }
                const result = await GETRequest(nextDataSource, { "Authorization": `${source.api_auth_token}` })
                let resultControl = new Mapper([result], source.pagination_map, options)[0]
                if (resultControl.results) {
                    results.push(...resultControl.results)
                }
                nextDataSource = resultControl.next
            } catch (err) {
                nextDataSource = null
                if (options && options.verbose) {
                    console.error('Internal Request Error: ', err)
                }
                throw err
            }
        }
        const mapped = new Mapper(results, source.object_map, options)
        return mapped
    }
    let modResponse = response
    if (!(modResponse instanceof Array)) {
        modResponse = new Array(response)
    }
    const mapped = new Mapper(modResponse, source.object_map, options)
    return mapped
}

module.exports = {
    DataSource,
    getDataFromSources,
    postDataToSources,
}