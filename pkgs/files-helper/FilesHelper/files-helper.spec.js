// Files Helper Spec

/**
 * 
 */

const { readFile, writeFile, deleteFile, deleteDirectory } = require('./files-helper')

describe('Files Helper Test Suite', () => {

    it('Should fail write when ensure is false and folder does not exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            writeFile(dummyLocation, dummyData) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should fail read when ensure is false and folder exists but file does not exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            readFile(dummyLocation) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should fail read when ensure is true and folder does exists and file does not exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            readFile(dummyLocation) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should fail delete when ensure is false and folder exists but file does not exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            readFile(dummyLocation) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should succeed when ensure is false and folder and file exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            
            writeFile(dummyLocation, dummyData, true)
            const successResult = readFile(dummyLocation)
            expect(successResult).not.toBe(null)
            deleteDirectory("./test", true)

        } catch (err) {
            console.error(err)
        }
    })
    it('Should succeed write when ensure is true and folder or file do not exist', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            const successResult = writeFile(dummyLocation, JSON.stringify(dummyData), true)
            deleteDirectory("./test", true)
            expect(successResult).not.toBe(null)
        } catch (err) {
            console.error(err)
        }
    })
    it('Should succeed when deleting a file that exists and directory', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            
            writeFile(dummyLocation, dummyData, true)
            deleteFile(dummyLocation, true)
            deleteDirectory("./test", true)
            readFile(dummyLocation)
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })

    it('Should fail when deleting a directory with contents', () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            writeFile(dummyLocation, dummyData, true)
            deleteDirectory("./test")
            readFile(dummyLocation)
        } catch (err) {
            expect(err.message).toBe("ENOTEMPTY: directory not empty, rmdir './test'")
        } finally {
            deleteDirectory("./test", true)
        }
    })

    

})