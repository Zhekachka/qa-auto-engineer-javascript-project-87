import { generateDiff } from '../src/index.js'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('Сравнение плоских JSON-файлов', () => {
  let file1
  let file2
  let expectedResult

  beforeAll(() => {
    file1 = JSON.parse(readFileSync(getFixturePath('file1.json'), 'utf-8'))
    file2 = JSON.parse(readFileSync(getFixturePath('file2.json'), 'utf-8'))
    expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
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
