import { generateDiff, getFileData } from '../src/index.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readFixture = (filename) => {
  const filepath = path.join(__dirname, '..', '__fixtures__', filename)
  return fs.readFileSync(filepath, 'utf-8').trim()
}

describe.each(['json', 'yaml'])('%s files', (ext) => {
  let file1
  let file2

  beforeAll(() => {
    const filepath1 = path.join(__dirname, '..', '__fixtures__', `file1.${ext}`)
    const filepath2 = path.join(__dirname, '..', '__fixtures__', `file2.${ext}`)

    file1 = getFileData(filepath1)
    file2 = getFileData(filepath2)
  })

  describe('Formats', () => {
    test('Format: stylish', () => {
      const expectedResult = readFixture('stylish_result.txt')
      expect(generateDiff(file1, file2, 'stylish')).toBe(expectedResult)
    })

    test('Format: plain', () => {
      const expectedResult = readFixture('plain_result.txt')
      expect(generateDiff(file1, file2, 'plain')).toBe(expectedResult)
    })

    test('Format: json', () => {
      const expectedJson = readFixture('json_result.txt');
      const actualJson = generateDiff(file1, file2, 'json');
  
      const expected = JSON.parse(expectedJson);
      const actual = JSON.parse(actualJson);
  
  expect(actual).toEqual(expected);
    })
  })

  test('Correct compare file1 and file2 (default format)', () => {
    const expectedResult = readFixture('stylish_result.txt')
    expect(generateDiff(file1, file2)).toBe(expectedResult)
  })

  test('Empty files', () => {
    expect(generateDiff({}, {})).toBe('{}')
  })

  test('Unsupported format', () => {
    expect(() => generateDiff(file1, file2, 'xml')).toThrow('Unsupported format: xml')
  })
})
