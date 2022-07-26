/**
 * DataSourceCollector Test Suite
 */
const { mockAxios } = require('jest-mock-axios')
const { DataSource, getDataFromSources, postDataToSources } = require('./data-source-collector')

describe('Data Source Collector Suite', () => {

	it('Should create a data source object', () => {
		const dataSource = new DataSource(
			'DS-1',
			'Test Data Source',
			'https://0.0.0.0',
			'JWT TokenHere',
			{
				next: 'next_page',
				results: 'objects',
			},
			null
		)
		expect(dataSource).toStrictEqual({
			api_auth_token: 'JWT TokenHere',
			api_url: 'https://0.0.0.0',
			id: 'DS-1',
			name: 'Test Data Source',
			object_map: null,
			pagination_map: { next: 'next_page', results: 'objects' },
		})
	})

	it('Should fetch data from data source', async () => {
		const source = {
			id: 3,
			name: 'Leader Boards',
			api_url: 'https://api.ultrarps.com/api/v1/rps/leader-boards?page_size=3',
			api_auth_token: null,
			pagination_map: {
				next: 'next', // `next` is a required key
				results: 'results', // `results` is a required key
			},
			object_map: null,
		}
		const results = await getDataFromSources([source], { separate_by_source: true })
		expect(results.length >= 1).toBe(true)
	})

	it('Should fetch data from data source and format it', async () => {
		const source = {
			id: 3,
			name: 'Leader Boards',
			api_url: 'https://api.ultrarps.com/api/v1/rps/leader-boards',
			api_auth_token: null,
			pagination_map: {
				next: 'next', // `next` is a required key
				results: 'results', // `results` is a required key
			},
			object_map: {
				old_school_id: 'player_initials',
				"entry_rank": "rank",
				"entry_score": "score"
			},
		}
		const results = await getDataFromSources([source], { separate_by_source: true })
		expect(results[0]).toStrictEqual({
			entry_rank: 1,
			entry_score: 38001,
			old_school_id: "B.S"
		})
	})

})
