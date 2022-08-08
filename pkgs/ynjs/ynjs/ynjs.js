#! /usr/bin/env node

// Yet another template engine

const { ensureDirectoryExistence, readFile } = require('@scarafone/files-helper')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const copyrightYear = '2022'


function print(text) {
	process.stdout.write(`${text}\n`)
}

/**
 * TODO
 * - Test if package has proper configs for command
 * - Template Command
 *  - Based on config, create a new boilerplate template file
 * - Create Command
 *  - Using a TemplateBlueprint created in the previous step to create a template
 *  - Read contents and create
 */


function renderBlueprint(blueprint, config) {
	blueprint.parts.forEach((part) => {
		// const part = blueprint.parts[key]
		Object.keys(part).forEach((key) => {
			template = part[key]
			const writeDir = `${config.templates_dir}/${key}`
			ensureDirectoryExistence(writeDir)
			let stream = fs.createWriteStream(writeDir, {
				flags: 'w',
			})
			stream.write(template)
			stream.end()
		})
	})
}

const argv = yargs(hideBin(process.argv))
	.command(['init'], 'Initialize use of the application and create a config folder in the root directory of the executed directory\n', {}, async (argv) => {
		process.stdout.write('Initialize Application Ynjs')
		const curDirectory = process.cwd()
		try {
			// Test for config
			readFile(`${curDirectory + '/.ynjs/config.json'}`)
		} catch (directoryErr) {
			print('Directory not found, we will now create the directory and set up some default files\n')
			await ensureDirectoryExistence(`${curDirectory + '/.ynjs/'}`)
			
			const yateConfigBlueprint = require('./InternalTemplates/YateConfigTemplate')()
			await renderBlueprint(yateConfigBlueprint, { templates_dir: './.ynjs/' })
			
			print('Created config file\n')
			
			const config = JSON.parse(yateConfigBlueprint.parts[0]['config.json'])
			const templateBlueprint = require('./InternalTemplates/TBlueprintTemplate')()
			
			renderBlueprint(templateBlueprint, config)
			print('Created default sample template\n')
		}
		// TODO: Test if application directory already exists
		// TODO: Create application directory
		// TODO: Test if config json is present
		// TODO: Create config json
		// TODO: Test if templates folder exists?
		// TODO: Create initial blueprint
		print('Operation complete')
	})
	.command(
		['create [template] [directory] [name] [options]', 'make'],
		'Create a new file from a named blueprint template at the specified directory.\n\nYou can pass an optional json string object to pass additional custom options to the blueprint. \n\nWill create the directory if it does not already exists.\n',
		{},
		(argv) => {			
			try {
				const curDirectory = process.cwd()
				const config = require(`${curDirectory + '/.ynjs/config.json'}`)
				const renderDir = argv.directory || curDirectory
				console.log({
					renderDir
				})
				let usableOptions = argv.options && JSON.parse(argv.options)
				console.log({
					usableOptions
				})
				const blueprint = require(`${curDirectory}/${config.templates_dir}/${argv.template}`)({ ...(argv.options && JSON.parse(argv.options)) })
				renderBlueprint(blueprint, { templates_dir: renderDir })
			} catch (templateErr) {
				if (templateErr.code === "MODULE_NOT_FOUND") {
					print('ERROR: Double check the name and ensure it matches a javascript file in your templates directory.\n See ynjs create --help for more details.\n')
				} else {
					print(`${templateErr.code}: ${templateErr.message}`)
					// throw templateErr
				}
			}
		}
	)
	.command(['template [name] [location]'], 'Create a new template boilerplate named file at the location\n', {}, (argv) => {
		async function test() {
			// Test if we can find the config in the root of the repo the command was run from
			try {
				const curDirectory = process.cwd()
				const config = require(`${curDirectory + '/.ynjs/config.json'}`)
				if (!config) {
					throw new Error('No configuration found')
				}

				try {
					const blueprint = require('./InternalTemplates/TBlueprintTemplate')({ argv })
					// For each part we want take the action
					renderBlueprint(blueprint, config)
				} catch (blueprintErr) {
					throw new Error(blueprintErr.message)
				}
			} catch (configErr) {
				print('Configuration file not found. Please run `ynjs init` or `ynjs --help` for more information.\n')
				// throw new Error(configErr.message)
			}
		}
		test()
	})
	.usage('Usage: Ynjs <command> [options]')
	.epilog(`copyright © ${copyrightYear}`).argv

if (argv && argv._ && Object.keys(argv._).length <= 0) {
	print('\nYet Another Template Engine\n')
	print('\nUsage: yatensjs --help\n')
}
