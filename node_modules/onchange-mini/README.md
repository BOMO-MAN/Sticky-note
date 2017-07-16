# onchange-mini
run a command on file(s) change, the minimalist way

## Motivation

It happened repetively that [onchange](https://github.com/Qard/onchange) didn't work for me, for reasons I couldn't track down. So, out of frustration, I wrote a minimalist implementation that would just do the thing I needed: watching a few files and running a script when they change. And it worked! So I wrapped it into this module, mostly for my own use, but maybe you will find it useful too.

## Installation

To make it accessible to scripts in a project ([learn more](http://www.2ality.com/2016/01/locally-installed-npm-executables.html)):
```sh
npm install --save-dev onchange-mini
```
Or to make it accessible globally:
```sh
npm install -g onchange-mini
```

## How-to

### Watch file(s) changes
```sh
onchange-mini ./a/file/to/watch ./another/file -- echo 'the wind of CHAaaAAAaaaNGE ♪ ♫'
# works great with npm scripts
onchange-mini ./a/file/to/watch ./another/file -- npm run build'
```

### Watch directories
```sh
onchange-mini ./a/folder/to/watch ./another/folder -- the command to execute
```
**:warning: :one: this will only trigger an event when a file is created, renamed, or removed, not when the files themselves change.**

**:warning: :two: this isn't watching recursively: any file change in subfolders won't be detected**

You can work around :warning: :one: by watching both the directory and its files like so
```sh
onchange-mini ./a/folder/to/watch ./a/folder/to/watch/* -- the command to execute
```
but beware that it needs to be restarted to watch new files

### Debug
```sh
export DEBUG=true; onchange-mini ./a/file/to/watch -- the command to execute
```

### For any other feature
**Option 1**: use [onchange](https://github.com/Qard/onchange) if it works for you

**Option 2**:
* open `./index.js`
* hack your way
* minimalist PR welcome
