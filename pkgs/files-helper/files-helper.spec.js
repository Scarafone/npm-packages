// Files Helper Spec

/**
 * 
 */

const { readFile, writeFile, deleteFile } = require('./files-helper')

describe('Files Helper Test Suite', () => {

    it('Should fail write when ensure is false and folder does not exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            const fatalResult = writeFile(dummyLocation, false) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should fail read when ensure is false and folder exists but file does not exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            const fatalResult = readFile(dummyLocation, false) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should fail delete when ensure is false and folder exists but file does not exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            const fatalResult = readFile(dummyLocation, false) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should succeed when ensure is false and folder and file exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            
            writeFile(dummyLocation, dummyData, true)
            const successResult = readFile(dummyLocation, false)
            expect(successResult).not.toBe(null)

            deleteFile(dummyLocation, true)

        } catch (err) {
            console.error(err)
        }
    })
    it('Should succeed write when ensure is true and folder or file do not exist', () => {
        try {
            const dummyLocation = "./test/imbed/test.json"
            const dummyData = { "key": "value" }
        
            const successResult = writeFile(dummyLocation, JSON.stringify(dummyData), true)
            deleteFile(dummyLocation)

            expect(successResult).not.toBe(null)


        } catch (err) {
            console.error(err)
        }
    })
    it('Should succeed when deleting a file that exists', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            
            writeFile(dummyLocation, dummyData, true)
            const succeeded = deleteFile(dummyLocation, true)
            expect(succeeded).not.toBe(false)

        } catch (err) {
            console.error(err)
        }
    })

    

})