
const ObjectSerializer = require('./ObjectSerializer')

describe('Object Serializer Suite', () => {
    
    const sampleObject = {
        "password": "password-hash-example-value",
        "display_name": "Emotiman",
        "birth_date": "01/01/2001"
    }
    
    it ('Should fail when no fields object is passed', () => {        
        try {
            const result = ObjectSerializer(sampleObject)
        } catch (err) {
            expect(err.message).toBe("UnserializableFields is required")
        }
    })

    it ('Should return empty object if object is empty', () => {
        try {
            const emptyObject = {}
            const result = ObjectSerializer(emptyObject)
            expect(result).toBe(emptyObject)
        
        } catch (err) {
            console.error(`Should not have occurred: ${err.message}`)
        }
    })
})