#! /usr/bin/env node

// Yet another template engine

console.log("Yet Another Template Engine");

const yargs = require("yargs")
const { hideBin } = require("yargs/helpers")
const argv = yargs(hideBin(process.argv)).argv
