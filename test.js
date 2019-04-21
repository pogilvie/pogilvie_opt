#!/usr/local/bin/node
const program = require('./opt.js')

program.name('sodescribe: get ojbect information from a salesforce org')
       .version('1.0.0')
       .option('-s --sobject <myObject__c>', 'name of the Salesforce object to describe', false)
       .option('-u --user <name@example.com>', 'DX authenticated user name or alias', true)
       .option('u --user <name@example.com>', 'DX authenticated user name or alias', true)
       .help()

