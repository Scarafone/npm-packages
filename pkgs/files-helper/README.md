# @scarafone/files-helper

Node utility wrapper around base file system functions to provide ease of use functionality for reading, writing and deleting files to the local system.

## Usage Guide

The test cases should do a good job providing how the functions work if you need further details.


```
/// Import
const { deleteFile, readFile, writeFile } = require("@scarafone/files-helper")

/// Execution
// Functions are synchronous

const fileLocation = "./test/location/results.json"

// Write File
// If true, will ensure filepath exists before writing file
const file = writeFile(filePath: fileLocation, data: JSON.stringify({ "key": "value" }), shouldEnsurePathExists: true)

// Read File
// If true, it will return an empty file
file = readFile(filePath: fileLocation, shouldEnsurePathExists: true)

// Delete File
// If true, it won't fail, but path will be created and deleted
const isSuccess = deleteFile(filePath: fileLocation, shouldEnsurePathExists: true)

```

Wrap in `try/catch` blocks in order to catch exceptions raised. Generally speaking though if `shouldEnsurePathExists` is true the operation is not likely to fail in most cases.