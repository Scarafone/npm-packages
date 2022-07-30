#! /usr/bin/env node

// Yet another template engine

const { writeFile, readFile, closeFile, deleteFile, ensureDirectoryExistence } = require('@scarafone/files-helper')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const copyrightYear = '2022'
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
		process.stdout.write('Initialize Application YateNJS')
		const curDirectory = process.cwd()
		try {
			// Test for config
			readFile(`${curDirectory + '/.yatenjs/config.json'}`)
		} catch (directoryErr) {
			process.stdout.write('Directory not found, we will now create the directory and set up some default files\n')
			await ensureDirectoryExistence(`${curDirectory + '/.yatenjs/'}`)
			const yateConfigBlueprint = require('./InternalTemplates/YateConfigTemplate')()
			await renderBlueprint(yateConfigBlueprint, { templates_dir: './.yatenjs/' })
			process.stdout.write('Created config file\n')
			const config = JSON.parse(yateConfigBlueprint.parts[0]["config.json"])
			const templateBlueprint = require('./InternalTemplates/TBlueprintTemplate')()
			renderBlueprint(templateBlueprint, config)
			process.stdout.write('Created default sample template\n')
		}
		// TODO: Test if application directory already exists
		// TODO: Create application directory
		// TODO: Test if config json is present
		// TODO: Create config json
		// TODO: Test if templates folder exists?
		// TODO: Create initial blueprint
		process.stdout.write('Operation complete')
	})
	.command(
		['create [template] [directory] [options]', 'make'],
		'Create a new file from a named blueprint template at the specified directory.\n\nYou can pass an optional json string object to pass additional custom options to the blueprint. \n\nWill create the directory if it does not already exists.\n',
		{},
		(argv) => {
			try {
				const curDirectory = process.cwd()
				const config = require(`${curDirectory + '/.yatenjs/config.json'}`)
				const blueprint = require(`${curDirectory}/${config.templates_dir}/${argv.template}`)({ ...argv.options && JSON.parse(argv.options) })
				renderBlueprint(blueprint, { templates_dir: argv.directory })
			} catch (templateErr) {
				process.stdout.write("Error", templateErr.message + "\n") 
				throw templateErr
			}
		}
	)
	.command(['template [name] [location]'], 'Create a new template boilerplate named file at the location\n', {}, (argv) => {
		async function test() {
			// Test if we can find the config in the root of the repo the command was run from
			try {
				const curDirectory = process.cwd()
				const config = require(`${curDirectory + '/.yatenjs/config.json'}`)
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
				process.stdout.write('Configuration file not found. Please run `yatenjs init` or `yatenjs --help` for more information.\n')
				// throw new Error(configErr.message)
			}
		}
		test()
	})
	.usage('Usage: YateNJS <command> [options]')
	.epilog(`copyright © ${copyrightYear}`).argv


if (argv && argv._ && Object.keys(argv._).length <= 0) {
	process.stdout.write('\nYet Another Template Engine')
	process.stdout.write('\nUsage: yatensjs --help')
}
