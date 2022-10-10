#!/usr/bin/env node
// Express
// EJS
// HTML
// Pre-Processor

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .option('port', {
        alias: 'p',
        type: 'number',
        description: 'port to run on',
        default: 3000
    })
    .option('folder', {
        alias: 'f',
        type: 'string',
        description: 'Specify a folder other than the current one.',
        default: process.cwd()
    })
    .option('detach', {
        alias: 'd',
        type: 'boolean',
        description: 'Detach this process from the parent process',
        default: false
    })
    .argv

const server = require('./server');

server(argv.folder, argv.port)

if (argv.detach) {
    console.log(`pid: ${process.pid}`);
    process.disconnect();
}