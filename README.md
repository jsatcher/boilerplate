
Boilerplate
================

### Installing dependencies

You must have [node](http://nodejs.org) and [ruby](https://www.ruby-lang.org/en/) installed to run this app on your machine. On OS X you can manage both through [homebrew](http://brew.sh/).

```bash
$> brew install node ruby
... installs the latest versions of node and ruby on your OS X machine
```

You'll also need the [grunt](http://gruntjs.com) and [compass](http://compass-style.org/) libraries available on your PATH. This app uses **grunt** as a task runner, and **compass** to compile SCSS into CSS. 

```bash
$> npm install
... installs npm dependencies and bower dependencies

$> npm install -g grunt-cli
... installs the grunt command-line utility globally

$> gem install compass
... installs compass (requires ruby; required for sass compilation)
```

### Configuration
This app uses [nconf](https://www.npmjs.com/package/nconf) to manage configuration. Config values are specified by default in [config/index.js](./config/index.js) and can be overridden by adding a file named `config.local.json` to the application root, or by specifying environment variables.

### Running the app
```bash
$> grunt
... Builds the app and hosts it on http://localhost:8080/
```
The main `grunt` target will build and run the app locally, and watch for changes to files as you edit them. It runs all of the following targets automatically:
* `grunt clean` -- Remove the build directory and all of its artifacts.
* `grunt build` -- Compile CSS and JavaScript resources, and copy everything into the build directory.
* `grunt run` -- Host the build directory on a local server (default: http://localhost:8080)
* `grunt watch` -- Watch for changes to local files, and run their build operations (e.g. compile SCSS files and copy them into the build directory).
