#! /usr/bin/env node

// Yet another template engine

const copyrightYear = '2022'

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')


const argv = yargs(hideBin(process.argv))
.command(['create [template] [options]', 'make'], 'Execute a template blueprint. You can pass an optional json string object to pass additional custom options to the blueprint', {}, (argv) => {
    console.log('Executing blueprint for template', argv.template || 'default', 'app')
})
.command(['template [name] [location]',], 'Create a new template boilerplate file at the location', {}, (argv) => {
    console.log('Generating new template boilerplate with name', argv.name || 'default', 'app')
})
.usage('Usage: YateNJS <command> [options]')
.epilog(`copyright ${copyrightYear}`)
.argv

if (Object.keys(argv._).length <= 0) {
    process.stdout.write('\nYet Another Template Engine')
    process.stdout.write('\nUsage: yatensjs --help')
} else {
    console.log(argv)
}

