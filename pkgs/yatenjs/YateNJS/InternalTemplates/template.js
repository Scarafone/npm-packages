/**
 * Baked in template file used for generating TBlueprint boilerplate files
 * @returns
 */


function TBlueprint(options) {

	const getTemplate = () =>
		`
        /**
         * TBlueprint Object  
        */
        function TBlueprint(options) {

            const getTemplate = (options) => "your template string here"

            return {
                'parts': [getTemplate(options)],
                'target': 'file://add/target/path/here',
                'make-directory': false,
            }
        }
        module.exports = TBlueprint        
    `

	return {
		parts: [getTemplate()],
		target: `${options.target}`,
		'make-directory': options.makeDirectory || false,
	}
}

module.exports = TBlueprint
