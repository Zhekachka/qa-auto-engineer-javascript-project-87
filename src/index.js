import { readFileSync } from 'fs'
import { resolve, extname } from 'path'
import { parse } from './parsers.js'
import { formatDiff } from './formatters/index.js'
import { compare } from './diffBuilder.js'

const readFile = (filepath) => {
  const fullPath = resolve(process.cwd(), filepath)
  return readFileSync(fullPath, 'utf-8')
}

const getFileFormat = filepath => extname(filepath).slice(1).toLowerCase()

export const getFileData = (filepath) => {
  const content = readFile(filepath)
  const format = getFileFormat(filepath)
  return parse(content, format)
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getFileData(filepath1)
  const data2 = getFileData(filepath2)
  const diff = compare(data1, data2)

  return formatDiff(diff, format)
}
export default genDiff
