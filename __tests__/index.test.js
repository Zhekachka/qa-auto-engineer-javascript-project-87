import { generateDiff, getFileData } from '../src/index.js'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe.each(['json', 'yaml'])('%s files', (ext) => {
  let file1
  let file2
  const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  beforeAll(() => {
    const filepath1 = getFixturePath(`file1.${ext}`)
    const filepath2 = getFixturePath(`file2.${ext}`)
    
    file1 = getFileData(filepath1)
    file2 = getFileData(filepath2)
  })

  test('Корректное сравнение file1 и file2', () => {
    expect(generateDiff(file1, file2)).toBe(expectedResult)
  })

  test('Пустые файлы', () => {
    const emptyContent = '{}'
    const empty1 = JSON.parse(emptyContent)
    const empty2 = JSON.parse(emptyContent)
    expect(generateDiff(empty1, empty2)).toBe('{}')
  })

  test('Одинаковые файлы', () => {
    const sameData = { key: 'value' }
    expect(generateDiff(sameData, sameData)).toBe('{\n    key: value\n}')
  })
})
