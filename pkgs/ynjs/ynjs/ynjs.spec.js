const ynjs = require('./ynjs')
const { deleteDirectory } = require('@scarafone/files-helper')
const { exec } = require("child_process")
const packageJSON = require('./../package.json')

describe('YNJS Test Suite', () => {

    it('should import package as function', () => {
        expect(typeof ynjs).toBe('object')
    })

    it('should install the package', async () => {
        await new Promise((resolve, reject) => {
            exec("npm i -g .", async (error, stdout, stderr) => {
                if (error || stderr) { console.log(`error: ${error} | stderr: ${stderr}`); return; }
                resolve()
            })
        })

        let result = null
        await new Promise((resolve, reject) => {
            exec("ynjs --version", async (error, stdout, stderr) => {
                if (error || stderr) { console.log(`error: ${error} | stderr: ${stderr}`); return; }
                result = stdout.toString()
                resolve()
            })
        })
        
        await new Promise((resolve, reject) => {
            exec("npm uninstall @scarafone/ynjs -g", async (error, stdout, stderr) => {
                if (error || stderr) { console.log(`error: ${error} | stderr: ${stderr}`); return; }                
                resolve()
            })
        })
        expect(result === `${packageJSON.version}\n`).toEqual(true)

    })
    
})