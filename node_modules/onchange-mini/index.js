#!/usr/bin/env node
const fs = require('fs')
const { spawn } = require('child_process')

// Expected args:
// onchange-mini ./a/file ./another/file -- the command to execute

const [ fileArgs, commandArgs ] = process.argv.slice(2).join(' ').split('--')
const files = fileArgs.trim().split(' ')
const [ command, ...args ] = commandArgs.trim().split(' ')

function log () {
  if (process.env.DEBUG) console.log.apply(console, arguments)
}

log('watched files:', files)
log('command:', command)
log('args:', args)

// See fs.watchFile documentation
// https://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener
const watcherOptions = { persistent: true, interval: 100 }

const onChange = function (curr, prev) {
  log('event', curr, prev)
  // Check if the last modification time (mtime) changed
  if (curr.mtime !== prev.mtime) {
    log('change')
    spawn(command, args, { stdio: 'inherit' })
  }
}

files.forEach((file) => fs.watchFile(file, watcherOptions, onChange))
