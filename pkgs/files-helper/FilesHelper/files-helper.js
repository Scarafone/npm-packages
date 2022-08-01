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

function readFile(filePath) {
	const buffer = FS.readFileSync(filePath, {
		encoding: 'utf8',
		flag: 'r',
	})
	return JSON.parse(buffer)
}

function writeFile(filePath, data, shouldEnsurePathExists = false) {
	if (shouldEnsurePathExists) {
		ensureDirectoryExistence(filePath)
	}
	FS.writeFileSync(filePath, JSON.stringify(data))
}

function deleteFile(filePath) {
	FS.unlinkSync(filePath)
}

function deleteDirectory(directoryPath, recursive = false) {
	FS.rmdirSync(directoryPath, { recursive })
}

module.exports = {
	closeFile: FS.closeSync,
	deleteFile,
	ensureDirectoryExistence,
	deleteDirectory,
	readFile,
	writeFile,
}
