const ynjs = require('./ynjs')
const { deleteDirectory } = require('@scarafone/files-helper')
const { exec, spawn } = require("child_process")

describe('YNJS Test Suite', () => {

    it('should import package as function', () => {
        expect(typeof ynjs).toBe('object')
    })

    it('should install the package', async () => {
        await new Promise((resolve, reject) => {
            exec("npm i -g .", async (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`)
                    return
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`)
                    return
                }
                console.log(`stdout: ${stdout.toString()}`)

                exec("ynjs --version", (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`)
                        return
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`)
                        return
                    }

                    console.log(`stdout 2: ${stdout.toString()}`)

                    resolve()
                })

            })
        })
    })

})