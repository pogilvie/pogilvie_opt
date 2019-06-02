#!/usr/local/bin/node

const
    Program = require('./opt.js'),
    program = new Program()

program.version('1.0.0')
       .option('-s --sobject <object>', 'sobject')
       .parse(process.argv)

if (!program.sobject)
    console.log('no argument specified')
else
    console.log(program.sobject)



