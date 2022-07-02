// Publishing Script

// const { exec } = require("child_process")

// exec("git status", (error, stdout, stderr) => {

//     if (error) {
//         console.log(`error: ${error.message}`)
//         return
//     }

//     if (stderr) {
//         console.log(`stderr: ${stderr}`)
//         return
//     }

//     console.log(`stdout: ${stdout}`)

// })

const { spawn } = require("child_process");

const gitStatus = spawn("git", [`status`])
const gitAdd = spawn("git", ["add ."])
const gitCommitComment = spawn("git", [`commit -m"Robot test publish :${true} "`])
const gitPushTags = spawn("git", [`push --tags`])

gitStatus.stdout.pipe(gitAdd.stdin)
gitAdd.stdout.pipe(gitCommitComment.stdin)
gitCommitComment.stdout.pipe(gitPushTags.stdin)
gitPushTags.stdout.pipe(process.stdin)

// ls.stdout.on("data", data => {

//     console.log(`stdout: ${data}`);
// });

// ls.stderr.on("data", data => {
//     console.log(`stderr: ${data}`);
// });

// ls.on('error', (error) => {
//     console.log(`error: ${error.message}`);
// });

// ls.on("close", code => {
//     console.log(`child process exited with code ${code}`);
// });

