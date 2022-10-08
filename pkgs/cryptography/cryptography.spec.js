const { writeFile, deleteFile } = require('@scarafone/files-helper')
const { Decrypt, Encrypt } = require('./cryptography')


describe("Cryptography Test Suite", () => {

    it("should import correctly", () => {
        expect(typeof Decrypt).toBe("function")
        expect(typeof Encrypt).toBe("function")
    })

    it("encrypt should fail properly if bad data is passed", () => {
        try {
            Encrypt()
        } catch (err) {
            expect(err.message).toBe("Missing required values, a source, a destination, a private key")
        }

        try {
            Encrypt("source")
        } catch (err) {
            expect(err.message).toBe("Missing required values, a destination, a private key")
        }

        try {
            Encrypt("source", "source.destination")
        } catch (err) {
            expect(err.message).toBe("Missing required values, a private key")
        }
    })

    it("decrypt should fail properly if bad data is passed", () => {
        try {
            Decrypt()
        } catch (err) {
            expect(err.message).toBe("Missing required values, a source, a destination, a private key")
        }

        try {
            Decrypt("source")
        } catch (err) {
            expect(err.message).toBe("Missing required values, a destination, a private key")
        }

        try {
            Decrypt("source", "source.destination")
        } catch (err) {
            expect(err.message).toBe("Missing required values, a private key")
        }
    })

    it("should encrypt a file and then decrypt the file", () => {

        const testFileData = "sample-data-to-encrypt"
        const testFileLoc = "./.test-file"
        const testFileDestination = `${testFileLoc}.encrypted`
        const testPrivateKey = "super-secret-secure-totally-private-key"

        // Create sample file
        writeFile(testFileLoc, testFileData, true)

        // Encrypt the file
        Encrypt(testFileLoc, testFileDestination, testPrivateKey)

        // Delete the unencrypted file
        deleteFile(testFileLoc)

        // Decrypt the file
        Decrypt(testFileDestination, testFileLoc, testPrivateKey)

        // Delete the encrypted file
        deleteFile(testFileDestination)

        // Delete the sample file
        deleteFile(testFileLoc)

        // TODO: Add some expects in here for reading and testing the files true existence. 
        // Right now it's passing under the presumptions that the steps themselves succeed
    })

})