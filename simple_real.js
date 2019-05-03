#!/usr/local/bin/node

const
    Program = require('./opt.js'),
    program = new Program()

program.version('1.0.0')
       .option('-s --sobject <object>', 'sobject')
       .parse(process.argv)

console.log(program.sobject)



