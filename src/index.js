import { readFileSync } from 'fs'
import { resolve, extname } from 'path'
import _ from 'lodash'
import { getParser } from './parsers.js'
import { formatDiff } from './formatters/index.js'

const readFile = (filepath) => {
  const fullPath = resolve(process.cwd(), filepath) // абсолютный путь
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

const compare = (obj1, obj2) => { // сравнение объектов
  const keys = _.union(Object.keys(obj1), Object.keys(obj2))
  return _.sortBy(keys).flatMap((key) => {
    if (!_.has(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] }
    }
    if (!_.has(obj1, key)) {
      return { type: 'added', key, value: obj2[key] }
    }

    const value1 = obj1[key]
    const value2 = obj2[key]
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'nested',
        key,
        children: compare(value1, value2),
      }
    }

    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed',
        key,
        oldValue: value1,
        newValue: value2,
      }
    }
    return { type: 'unchanged', key, value: value1 }
  })
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getFileData(filepath1)
  const data2 = getFileData(filepath2)
  const diff = compare(data1, data2)

  return formatDiff(diff, format)
}
export default genDiff
