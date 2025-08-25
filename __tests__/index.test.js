import { genDiff } from '../src/index.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readFixture = (filename) => {
  const filepath = path.join(__dirname, '..', '__fixtures__', filename)
  return fs.readFileSync(filepath, 'utf-8').trim()
}

describe.each(['json', 'yaml'])('%s files', (ext) => {
  let filepath1
  let filepath2

  beforeAll(() => {
    filepath1 = path.join('__fixtures__', `file1.${ext}`) // Путь относительный
    filepath2 = path.join('__fixtures__', `file2.${ext}`)
  })

  describe('Formats', () => {
    test('Format: stylish', () => {
      const expectedResult = readFixture('stylish_result.txt')
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedResult)
    })

    test('Format: plain', () => {
      const expectedResult = readFixture('plain_result.txt')
      expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedResult)
    })

    test('Format: json', () => {
      const expectedJson = readFixture('json_result.txt')
      const actualJson = genDiff(filepath1, filepath2, 'json')

      const expected = JSON.parse(expectedJson)
      const actual = JSON.parse(actualJson)

      expect(actual).toEqual(expected)
    })
  })

  test('Correct compare file1 and file2 (default format)', () => {
    const expectedResult = readFixture('stylish_result.txt')
    expect(genDiff(filepath1, filepath2)).toBe(expectedResult)
  })

  test('Empty files', () => {
    expect(genDiff('__fixtures__/empty1.json', '__fixtures__/empty2.json')).toBe('{}')
  })

  test('Unsupported format', () => {
    expect(() => genDiff(filepath1, filepath2, 'xml')).toThrow('Unsupported format: xml')
  })
})
