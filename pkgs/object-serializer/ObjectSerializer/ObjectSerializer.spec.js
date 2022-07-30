const ObjectSerializer = require('./ObjectSerializer')

describe('Object Serializer Suite', () => {
	it('Should be your first test!', () => {
		expect(typeof ObjectSerializer).toBe('function')
	})
})


	const unserializableFieldsExample = {
		default: ['password', 'birth_date'],
		admin: [''],
		app: ['birth_date'],
	}

	it('Should fail when no fields object is passed', () => {
		try {
            const sampleObject = {
                password: 'password-hash-example-value',
                display_name: 'Emotiman',
                birth_date: '01/01/2001',
            }
			const result = ObjectSerializer(sampleObject)
		} catch (err) {
			expect(err.message).toBe('UnserializableFields is required')
		}
	})

	it('Should return empty object if object is empty', () => {
		try {
			const emptyObject = {}
			const result = ObjectSerializer(emptyObject, unserializableFieldsExample)
			expect(result).toStrictEqual(emptyObject)
		} catch (err) {
			console.error(`Should not have occurred: ${err.message}`)
		}
	})

	it('Should remove date of birth and password from object based on default type key', () => {
		try {
            const sampleObject = {
                password: 'password-hash-example-value',
                display_name: 'Emotiman',
                birth_date: '01/01/2001',
            }
            const typeKey = 'default'
			const result = ObjectSerializer(sampleObject, unserializableFieldsExample, typeKey)
			expect(result).toStrictEqual({ display_name: 'Emotiman' })
		} catch (err) {
			console.error(`Should not have occurred: ${err.message}`)
		}
	})

	it('Should remove nothing if admin type key', () => {
		try {
            const sampleObject = {
                password: 'password-hash-example-value',
                display_name: 'Emotiman',
                birth_date: '01/01/2001',
            }
            const typeKey = 'admin'
			const result = ObjectSerializer(sampleObject, unserializableFieldsExample, typeKey)
			expect(result).toStrictEqual({
				password: 'password-hash-example-value',
				display_name: 'Emotiman',
				birth_date: '01/01/2001',
			})
		} catch (err) {
			console.error(`Should not have occurred: ${err.message}`)
		}
	})

    it('Should return nothing if a matching typekey is not found and default is not present', () => {
		try {
            const sampleObject = {
                password: 'password-hash-example-value',
                display_name: 'Emotiman',
                birth_date: '01/01/2001',
            }
            const unserializableFieldsExample2 = {
                // default: ['password', 'birth_date'],
                admin: [''],
                app: ['birth_date'],
            }
            const typeKey = 'default'
			const result = ObjectSerializer(sampleObject, unserializableFieldsExample2, typeKey)
			expect(result).toStrictEqual({})
		} catch (err) {
			console.error(`Should not have occurred: ${err.message}`)
		}
	})

    it('Should return default object if a matching typekey is not found and default is present', () => {
		try {
            const sampleObject = {
                password: 'password-hash-example-value',
                display_name: 'Emotiman',
                birth_date: '01/01/2001',
            }
            const unserializableFieldsExample3 = {
                default: ['password', 'birth_date'],
                admin: [''],
                app: ['birth_date'],
            }
            const typeKey = 'mismatched-key'
			const result = ObjectSerializer(sampleObject, unserializableFieldsExample3, typeKey)
			expect(result).toStrictEqual({ display_name: 'Emotiman' })
		} catch (err) {
			console.error(`Should not have occurred: ${err.message}`)
		}
	})
})
