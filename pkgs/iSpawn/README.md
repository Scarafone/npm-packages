# iSpawn README

# What is it?

Simple utility function that wraps the child.spawn_process into a promise based function. Allowing for easily spawning commands in an async/await pattern.

# Why does it exists?

Because I needed a utility to do these kinds of commands and I got tired of copying and pasting code between projects.

# How to use it?

```
const iSpawn = require('@scarafone/ispawn')

async function Main() {

    // Execute CLI command
    try {
        const result = await iSpawn("ls", ["-ga"], (data) => {
            console.log({ data })
        })
        console.log({ result })
    } catch (err) {
        console.log({ err })
    }

}

Main()
```
