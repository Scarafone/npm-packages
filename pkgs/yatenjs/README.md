# YateNJS
Yet Another Template Engine (N)ode JS

# Problem

This utility is designed to quickly allow for templates to be generated and files, folder and skeleton structures to be copied and set up automatically. 

The primary use case comes from modern frameworks which generally require a minimum set of files per object. 

Let's take modern ReactJS, in a professional environment developers would be expected to when creating a component also create a test file, likely a messages file for translations, some sort of styling file, an index file for exporting and potentially others depending on the framework you are using. 

So why create all these by hand each time you want to make a new page? Or a new component? 

Another use case is to also help reduce developer time and overhead when dealing with these complex set ups and configurations. By using a template for something we can ensure that the task is accomplished in standardized and uniform way, ensuring easier maintainability in the future.

### Why build another one?

Long story short, like all good things it's important to know how to do something and I felt like this would be a fun project to take on and challenge myself to make new tools, in order to increase my knowledge about making command line utilities along with Node applications in general. All experience is good experience, right?

# Installation
<TODO: Add Steps For Installing>

# Configuration

The recommend way to configure the utility is to provide a configuration JSON object. 
You may create a configuration folder and the application will automatically read from this location first.  

Folder: `./.yatenjs/config.json`

This folder should be located at the root of your directory. 

It is also possible to use flags and pass the information through the command line directly as well. The names for the object and the command line are the same, merely the formatting will slightly vary.

```
{
    // Templates are JS objects that describe the blueprint of how the 
    // process should be executed.
    "templates": "file://folder/where/templates/live",
}
```

```
// Template Files
/*
* A template file should be constructed at minimum like this. 
* There is a utility function of the command line that generate a template file
* for you at a target location to get you started.
*/
// TODO: Add Template File Utility Function

```


---
```
// TODO: Add Command Example

$ node .\YateNJS\index.js create thing "./.yatenjs/templates/" --templates="./.yatenjs/templates" --config="./.yatenjs/config.json"

$ node .\YateNJS\index.js template lib-component "./.yatenjs/templates/" --templates="./.yatenjs/templates" --config="./.yatenjs/config.json"

```

It is also possible to pass the config file location to the command line as well if you do not wish to add the new folder to your directory or have a shared configuration file you would like to use.

```
// TODO: Add Command Line Example For File Parsing
```

### Fallbacks

If multiple locations are possible for configuration the utility will always read the configurations in this order:

1. Config location passed in `--config="//file/location/config.json"`
2. Explicit command line arguments 
3. Project File `./.yatenjs/config.json`

If the requirements of the program can not satisfied by one of these requirements then it will exit and return `0`. 

# Usage

The idea is to provide a simple interface along with a straightforward way of setting up and configuring templates to be used for your project. We only try to be prescriptive in a few ways that matter in terms of set up, otherwise we want to remain un-opinionated about the things you can do with the templates themselves.  

## API

- Help
    - `--help` running the help command will show the help prompt
- Create
    - `$0 create`
    - Create is used to tell the system based on your configuration file

```
yatenjs create 

```

