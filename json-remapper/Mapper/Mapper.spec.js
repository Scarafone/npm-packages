const Mapper = require('./mapper')

const externalObjTraditional = {
	key_name_1: { internal: 'their first value' },
	key_name_2: { internal: { internal_2: 'their second value' } },
	key_name_3: { in: { in: { in: { in: { in: { in: 'their third value' } } } } } },
}

const internalObjKeyMap = {
	my_key_1: 'key_name_1',
	my_key_2: 'key_name_2.internal.internal_2',
	my_key_3: 'key_name_3.in.in.in.in.in.in',
	my_key_4: 'key_name_4.find.me'
}

describe('Mapper Utility Suite', () => {
	it('Ensure base functionality works for mapping keys, including heavily nested', () => {
		// Simple Test
		let result = new Mapper([externalObjTraditional], internalObjKeyMap, { verbose: false })
		expect(
			JSON.stringify(result) ===
				JSON.stringify([
					{
						my_key_1: { internal: 'their first value' },
						my_key_2: 'their second value',
						my_key_3: 'their third value',
					},
				])
		).toEqual(true)
	})
	it ('Should return the original object if no key map is provided', () => {
		let result = new Mapper([externalObjTraditional], null)
		expect(JSON.stringify(result) === JSON.stringify([externalObjTraditional])).toEqual(true)
	})
	it ('Failure case', () => {
		let result = new Mapper(null, null, { verbose: true })
		let result2 = new Mapper(null, internalObjKeyMap, { verbose: false })
		expect(result).toEqual({})
		expect(result2).toEqual([])
	})
})
