import { readFileSync } from 'fs'
import { resolve, extname } from 'path'

const readFile = (filepath) => {
  const fullPath = resolve(process.cwd(), filepath)
  return readFileSync(fullPath, 'utf-8')
}

const parseData = (data, fileType) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(data)

    default:
      throw new Error(`Unsupported file format: ${fileType}`)
  }
}

export const getFileData = (filepath) => {
  const data = readFile(filepath)
  const fileType = extname(filepath)
  return parseData(data, fileType)
}
