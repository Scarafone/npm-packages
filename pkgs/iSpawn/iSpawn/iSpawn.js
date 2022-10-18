const { spawn } = require("child_process")

/**
 * iSpawn 
 * 
 * Simple wrapper to help with the using the child process spawn command
 * Takes in CLI commands and executes them with a promise that returns the results of the 
 * command that was executed.
 * 
 * 
 * @since 0.0.1
 * 
 * @param {string} command The root command to call in the command line. Ex  "git, ls" 
 * @param {[string]} args String array to pass along args to the command. Ex: "status, -la, etc"
 * @param {function} dataCallBack Calls back with data from stdout based on command.
 * 
 * Example: await iSpawn("git", ["status"])
 * Example: await iSpawn("ls", ["-la"])
 * Example: await iSpawn("git", ["status"], (data) => {console.log(data)})
 * 
 * @returns {string} The response of the executed action upon completion
 */
async function iSpawn(command, args, dataCallback = null) {
    return new Promise((resolve, reject) => {
        const ls = spawn(command, args)
        ls.stdout.on("data", data => {
            if (dataCallback !== null) {
                dataCallback(data)
            }
        })
        ls.stderr.on("data", data => {
            if (dataCallback !== null) {
                dataCallback(new String(data))
            }
        })
        ls.on("error", error => {
            reject(error.message)
        })
        ls.on("close", code => {
            resolve(code)
        })
    })
}


module.exports = iSpawn