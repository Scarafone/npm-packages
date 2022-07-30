
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

    const getTemplate = (options) => "your template string here"

    return {
        'parts': [ {"template.js": getTemplate(options)} ]
    }
}
module.exports = TBlueprint        
