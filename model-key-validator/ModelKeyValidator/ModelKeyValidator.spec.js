/**
 * ModelKeyValidator
 * Uses simple regex matching to validating a string has the required initial patter
 */

const idMatches = require('./ModelKeyValidator')

describe('Model Key Validator Suite', () => {
    it ('Should validate a model pattern key prefix', () => {
        const modelId = "test-randomIDGeneratedHere"
        expect(idMatches(modelId, "test-")).toEqual(true)
    })
    it ('Should fail model pattern if key is wrong', () => {
        const modelId = "test-randomIDGeneratedHere"
        expect(idMatches(modelId, "404-")).toEqual(false)
    })
})