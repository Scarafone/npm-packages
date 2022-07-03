/**
 * Collection of global tests that can be run against the whole collection of packages
 */

const { getDataFromSources, postDataToSources } = require('../pkgs/data-source-collector')
const { closeFile, deleteFile, readFile, writeFile } = require('../pkgs/files-helper')
const isEmpty = require('../pkgs/is-empty')
const Mapper = require('../pkgs/json-remapper')
const ModelKeyValidator = require('../pkgs/model-key-validator')
const ObjectSerializer = require('../pkgs/object-serializer')
const { ObjectKeyErrorMap, validateObject } = require('../pkgs/object-validator')


describe('Global Project Test Suite - Import Suite', () => {

    it('Should allow import of data-source-collector package from index as functions', () => {
        expect(typeof getDataFromSources).toBe("function")
        expect(typeof postDataToSources).toBe("function")
    })

    it('Should allow import of files-helper package from index as functions', () => {
        expect(typeof closeFile).toBe("function")
        expect(typeof deleteFile).toBe("function")
        expect(typeof readFile).toBe("function")
        expect(typeof writeFile).toBe("function")
    })

    it('Should allow import of is-empty package from index as functions', () => {
        expect(typeof isEmpty).toBe("function")
    })

    it('Should allow import of mapper package from index as functions', () => {
        expect(typeof Mapper).toBe("function")
    })

    it('Should allow import of model-key-validator package from index as functions', () => {
        expect(typeof ModelKeyValidator).toBe("function")
    })

    it('Should allow import of object-serializer package from index as functions', () => {
        expect(typeof ObjectSerializer).toBe("function")
    })

    it('Should allow import of object-validator package from index as functions', () => {
        expect(typeof ObjectKeyErrorMap).toBe("function")
        expect(typeof validateObject).toBe("function")
    })

})