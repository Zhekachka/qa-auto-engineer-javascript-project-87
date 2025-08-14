#!/usr/bin/env node

import { Command } from 'commander'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)))
const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(pkg.version)
  .parse(process.argv)
