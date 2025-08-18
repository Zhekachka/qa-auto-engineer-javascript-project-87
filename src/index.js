import { readFileSync } from 'fs'
import { resolve, extname } from 'path'
import _ from 'lodash'

// читаем содержимое файла
const readFile = (filepath) => {
  const fullPath = resolve(process.cwd(), filepath)
  return readFileSync(fullPath, 'utf-8')
}

// преобразуем данные в строку
const parseData = (data, fileType) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(data)

    default:
      throw new Error(`Unsupported file format: ${fileType}`)
  }
}

// возвращаем распарсенные данные
export const getFileData = (filepath) => {
  const data = readFile(filepath) // читаем
  const fileType = extname(filepath) // определяем расширение
  return parseData(data, fileType) // парсим
}

// сравниваем и возвращаем
export const generateDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)))
  
  if (keys.length === 0) return '{}'

  const lines = keys.flatMap((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]
    
    if (!(key in obj2)) 
      return `  - ${key}: ${value1}`
    
    if (!(key in obj1)) 
      return `  + ${key}: ${value2}`
    
    if (value1 !== value2) 
      return [`  - ${key}: ${value1}`, `  + ${key}: ${value2}`]
    
    return `    ${key}: ${value1}`
  })

  return `{\n${lines.join('\n')}\n}`
}
