# Publish Packages

This script will handle publishing packages based on the packages included in the `pkgs` folder. 

## Publish Requirements

- Each package must include a `package.json` and be scoped to `@scarafone` or it will be skipped
- The user publishing must be logged into their npm account `npm login`
- Tests should be ran and coverage should be above 80% overall


The script will then execute the following algorithm:

```
1. npm run tests
2. npm version patch
3. npm publish
4. git push --tags
``` 

And this will repeat for all qualified folders

## Configuration 

It is possible to provide a config JSON object that can be used for various configuration options. Including blackListing projects or specifying how to version things. 

### Setup
In the root directory include a folder and filed called `.scarafone/config.json`

If this file is not found during the run, it will proceed with default parameters.

Config.json Example
```
{
    // These packages will be skipped
    "blacklist": [
        "files-helper",
        "is-empty",
    ],

    // Patch is default
    // Supports any command `npm version` would.
    "publish_version": "patch" | "minor" | "major",
    
     
}
```
