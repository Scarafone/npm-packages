// Files Helper Spec

/**
 * 
 */

const { readFile, writeFile, deleteFile } = require('./files-helper')

describe('Files Helper Test Suite', () => {

    it('Should fail write when ensure is false and folder does not exist', async () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            const fatalResult = await writeFile(dummyLocation, JSON.stringify(dummyData), false) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should fail read when ensure is false and folder exists but file does not exist', async () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            const fatalResult = await readFile(dummyLocation, JSON.stringify(dummyData), false) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should fail delete when ensure is false and folder exists but file does not exist', async () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            const fatalResult = await readFile(dummyLocation, JSON.stringify(dummyData), false) 
        } catch (err) {
            expect(err.message).toBe("ENOENT: no such file or directory, open './test/test.json'")
        }
    })
    it('Should succeed when ensure is false and folder and file exist', async () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            
            await writeFile(dummyLocation, dummyData, true)
            const successResult = await readFile(dummyLocation, JSON.stringify(dummyData), false)
            expect(successResult).not.toBe(null)

            await deleteFile(dummyLocation, true)

        } catch (err) {
            console.error(err)
        }
    })
    it('Should succeed write when ensure is true and folder or file do not exist', async () => {
        try {
            const dummyLocation = "./test/imbed/test.json"
            const dummyData = { "key": "value" }
        
            const successResult = await writeFile(dummyLocation, JSON.stringify(dummyData), true)
            await deleteFile(dummyLocation)

            expect(successResult).not.toBe(null)


        } catch (err) {
            console.error(err)
        }
    })
    it('Should succeed when deleting a file that exists', async () => {
        try {
            const dummyLocation = "./test/test.json"
            const dummyData = { "key": "value" }
            
            await writeFile(dummyLocation, dummyData, true)
            const succeeded = await deleteFile(dummyLocation, true)
            expect(succeeded).not.toBe(false)

        } catch (err) {
            console.error(err)
        }
    })

    

})