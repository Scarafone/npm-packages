# NPM Packages Repo

<p>
Single repository housing all @scarafone scoped packages. 

Each one is published individually, but the steps will be identical.
</p>



## Getting Started

```
1. Clone this repo
2. npm install
3. npm run tests
```


## Developing

- All packages must have 80% test coverage or higher before committing to the main branch.
- All packages must start at version `0.0.1` 


## Publishing

```
1. npm run tests
2. npm version patch
3. npm publish
4. git push origin <branch>
5. git push --tags
```
