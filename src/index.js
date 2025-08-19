import { readFileSync } from 'fs'
import { resolve, extname } from 'path'
import _ from 'lodash'
import { getParser } from './parsers.js'
import { formatDiff } from './formatters/index.js'

const readFile = (filepath) => {
  const fullPath = resolve(process.cwd(), filepath)
  return readFileSync(fullPath, 'utf-8')
}

const parseData = (data, fileType) => {
  const parse = getParser(fileType)
  return parse(data)
}

export const getFileData = (filepath) => {
  const data = readFile(filepath)
  const fileType = extname(filepath)
  return parseData(data, fileType)
}

const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2))
  return _.sortBy(keys).flatMap((key) => {
    if (!_.has(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] }
    }
    if (!_.has(obj1, key)) {
      return { type: 'added', key, value: obj2[key] }
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { type: 'unchanged', key, value: obj1[key] }
    }
    return [
      { type: 'removed', key, value: obj1[key] },
      { type: 'added', key, value: obj2[key] },
    ]
  })
}

export const generateDiff = (obj1, obj2, format = 'stylish') => {
  const diff = compare(obj1, obj2)
  return formatDiff(diff, format)
}
