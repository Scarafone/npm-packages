const { create } = require('domain')
const FS = require('fs')
const Path = require('path')
// Utility class for working with files

function ensureDirectoryExistence(filePath) {
	var dirname = Path.dirname(filePath)
	if (FS.existsSync(dirname)) {
		return true
	}
	return FS.mkdirSync(dirname)
}

function readFile(filePath, options = null) {
	const buffer = FS.readFileSync(filePath, options || {
		encoding: 'utf-8',
		flag: 'r',
	})
	return JSON.parse(buffer)
}

function writeFile(filePath, data, shouldEnsurePathExists = false) {
	shouldEnsurePathExists && ensureDirectoryExistence(filePath)
	FS.writeFileSync(filePath, JSON.stringify(data))
}

function deleteFile(filePath) {
	FS.unlinkSync(filePath)
}

function deleteDirectory(directoryPath, recursive = false) {
	FS.rmSync(directoryPath, { recursive })
}

function readDirectory(directoryPath, ensureDirectoryExistence = false, options = null) {
	ensureDirectoryExistence && createDirectory(directoryPath)
	return FS.readdirSync(directoryPath, options)
}

function createDirectory(directoryPath) {
	return ensureDirectoryExistence(directoryPath + " ")
}

module.exports = {
	closeFile: FS.closeSync,
	deleteFile,
	ensureDirectoryExistence,
	createDirectory,
	readDirectory,
	deleteDirectory,
	readFile,
	writeFile,
}
