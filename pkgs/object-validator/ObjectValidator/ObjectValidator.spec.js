const { ObjectKeyErrorMap, validateObject } = require('./ObjectValidator')

/**
 * Object Validator
 * 
 * Provides a function for creating a basic object shape, called an "ObjectKeyErrorMap"
 * Provides a function for validating a JS object has the required keys, specified with an array of ObjectKeyErrorMaps
 * - Returning a validated object and sanitizing any unwanted data from the object.
 * - If errors, it will return an error object, that is formatted as an array with the provided messages from the object.
 * 
 */

describe('Object Validator Suite', () => {

    it('Should validate object with required keys', () => {

        const body = {
            "player_id": "sample-player-id",
            "player_initials": "bs-initials",
            "score": 123456,
            "extra_data": "./tryandhacksystem"
        }

        const requiredKeyObjects = [
			ObjectKeyErrorMap('player_id', 'Unknown error - #001123 '),
			ObjectKeyErrorMap('player_initials', 'Unknown error - #002255 '),
			ObjectKeyErrorMap('score', 'Unknown error - #003377 '),
		]

		const { errors, player_id, player_initials, score } = validateObject(body, requiredKeyObjects)
		if (errors) {
			return res.status(400).json(errors)
		}
        expect(player_id && player_initials && score && !errors).toEqual(true)
    })

    it('Should return errors when unable to validate object with required keys', () => {

        const body = {
            "player_id": "sample-player-id",
            "score": 123456,
            "player_initial": "bs-initials",
            "extra_data": "./tryandhacksystem"
        }

        const requiredKeyObjects = [
			ObjectKeyErrorMap('player_id', 'Unknown error - #001123 '),
			ObjectKeyErrorMap('player_initials', 'Unknown error - #002255 '),
			ObjectKeyErrorMap('score', 'Unknown error - #003377 '),
		]

		const { errors } = validateObject(body, requiredKeyObjects)
        expect(errors).toEqual(["Unknown error - #002255 "]);
    })

})
