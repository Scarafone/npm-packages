/**
 * TBlueprint Object
 *
 * Must return a function that results in a object with shape
 *
 * `() => { parts: [{"example.js": getTemplate(options) }] }`
 *
 * Where parts is an array of objects, whose key is the name of the file to be created at that target,
 * with the value as the template to be rendered as its content.
 *
 * The part must contain the file type you ultimately wish it to be.
 *
 * This template was automatically generated make sure to modify it
 * and update your comments so that people know what kind of options your
 * template takes.
 */
function TBlueprint(options) {

    console.log({
        options
    })

	const getJESTConfig = (options) => `{
"testRegex": "((\\.|/*.)(spec))\\.js?$",
"collectCoverage": true,
"coverageReporters": [
    "json",
    "html",
    "lcov"
],
"roots": ["./"]
}`

	const getPackageJSON = (options) => `{
    "name": "@scarafone/${options.name.toLowerCase()}",
    "version": "0.0.1",
    "description": "${options.desc || 'Please Populate Description'}",
    "main": "index.js",
    "scripts": {
        "test": "jest --config ./jest.config.json --coverage",
        "test:watch": "npm run test -- --watch"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/Scarafone/npm-packages/tree/main/${options.name.toLowerCase()}"
    },
    "author": "Brent Scarafone",
    "license": "MIT",
    "devDependencies": {
        "jest": "^27.5.1"
    }
}
`

    const getObjectJS = (options) => `
/**
 * ${options.name}
 * 
 * Your next great package starts here!
 */
function ${options.name}() {}

module.exports = ${options.name}
    `

    const getObjectJSSpec = (options) => `
const ${options.name} = require('./${options.name}')

describe('${options.name} Suite', () => {
	it('should import ${options.name} as function', () => {
		expect(typeof ObjectSerializer).toBe('function')
	})
})
    `

    const getIndex = (options) => `module.exports = ${options.name} = require('./${options.name}/${options.name}')`

	return {
		parts: [
            { [`${options.name}/jest.config.json`]: getJESTConfig(options) },
            { [`${options.name}/package.json`]: getPackageJSON(options) },
            { [`${options.name}/index.js`]: getIndex(options) },
            { [`${options.name}/${options.name}.js`]: getObjectJS(options) },
            { [`${options.name}/${options.name}.spec.js`]: getObjectJSSpec(options) }
        
        ],
	}
}
module.exports = TBlueprint
