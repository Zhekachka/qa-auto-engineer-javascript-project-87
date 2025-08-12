#!/usr/bin/env node
import { program } from 'commander'
import genDiff from '../src/index.js'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)))

program
  .version(packageJson.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2))
  })
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.help()
}
