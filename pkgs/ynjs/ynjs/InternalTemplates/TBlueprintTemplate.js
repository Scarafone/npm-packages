/**
 * Baked in template file used for generating TBlueprint boilerplate files
 * @returns Object with key parts, whose value is an array of objects, 
 *          where the keys are file names to be created and the values 
 *          are the template to be rendered in that file. 
 ```
{ parts: [{"example.js": getTemplate(options) }] }
```
*/

function TBlueprint(options = { argv: {} }) {
	const getTemplate = () => `
/**
 * TBlueprint Object  
 * 
 * Must return a function that results in a object with shape 
 * 
 * \`() => { parts: [{"example.js": getTemplate(options) }] }\` 
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

    const getTemplate = (options) => "your template string here"

    return {
        'parts': [ {"template.js": getTemplate(options)} ]
    }
}
module.exports = TBlueprint        
`

	return {
		parts: [{ [options.argv.name || 'ExampleTemplate.js']: getTemplate(options) }],
	}
}

module.exports = TBlueprint
