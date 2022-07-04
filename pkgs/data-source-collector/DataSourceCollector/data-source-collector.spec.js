/**
 * DataSourceCollector Test Suite
 */
const { DataSource, getDataFromSources, postDataToSources } = require('./data-source-collector')
const { GETRequest } = require('@scarafone/request')

jest.mock('GETRequest')

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
        expect(dataSource).toStrictEqual({"api_auth_token": "JWT TokenHere", "api_url": "https://0.0.0.0", "id": "DS-1", "name": "Test Data Source", "object_map": null, "pagination_map": {"next": "next_page", "results": "objects"}})
	})

    it('Should', () => {
        6
    })
})
