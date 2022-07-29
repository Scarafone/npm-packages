#! /usr/bin/env node

// Yet another template engine

const { writeFile, readFile, closeFile, deleteFile, ensureDirectoryExistence } = require('@scarafone/files-helper')
const path = require('path')
const fs = require('fs')

const copyrightYear = '2022'

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const { string } = require('yargs')

/**
 * TODO
 * - Test if package has proper configs for command
 * - Template Command
 *  - Based on config, create a new boilerplate template file
 * - Create Command
 *  - Using a TemplateBlueprint created in the previous step to create a template
 *  - Read contents and create
 */

const argv = yargs(hideBin(process.argv))
	.command(['create [template] [fileLocation]', 'make'], 'Execute a template blueprint. You can pass an optional json string object to pass additional custom options to the blueprint. \n\nWill make the file and folder if it does not already exists.', {}, (argv) => {
		console.log('Executing blueprint for template', argv.template || 'default', 'app')
	})
	.command(['template [name] [location]'], 'Create a new template boilerplate named file at the location', {}, (argv) => {
		async function test() {
			console.log('Generating new template boilerplate with name', argv.name || 'default', 'app')

			// Test if we can find the config in the root of the repo the command was run from
			try {
				const curDirectory = process.cwd()
				const config = require(`${curDirectory + '/.yatenjs/config.json'}`)
				if (!config) {
					throw new Error('No configuration found')
				}

				try {
					const blueprint = require('./InternalTemplates/template')({ argv })
					// For each part we want take the action
					// console.log({blueprint: blueprint.parts})
					blueprint.parts.forEach((part) => {
						// const part = blueprint.parts[key]
						Object.keys(part).forEach((key) => {
							template = part[key]
							const writeDir = `${config.templates_dir}/${key}.js`
                            ensureDirectoryExistence(writeDir)
							let stream = fs.createWriteStream(writeDir, {
								flags: 'w',
							})
							stream.write(template)
							stream.end()
						})
					})
				} catch (blueprintErr) {
					console.log({
						blueprintErr,
					})
				}
			} catch (configErr) {
				throw new Error(configErr.message)
			}
		}
		test()
	})
	.usage('Usage: YateNJS <command> [options]')
	.epilog(`copyright © ${copyrightYear}`).argv
// console.log({ argv })

if (Object.keys(argv._).length <= 0) {
	process.stdout.write('\nYet Another Template Engine')
	process.stdout.write('\nUsage: yatensjs --help')
} else {
	// console.log({argv})
}
