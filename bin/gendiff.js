#!/usr/bin/env node

import { Command } from 'commander'
import { getFileData } from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = getFileData(filepath1)
    const data2 = getFileData(filepath2)

    console.log(data1, data2)
  })
  .parse(process.argv)
