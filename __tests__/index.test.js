import genDiff from '../src/index.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readFixture = (filename) => {
  const filepath = path.join(__dirname, '..', '__fixtures__', filename)
  return fs.readFileSync(filepath, 'utf-8').trim()
}

const TESTED_FORMATS = ['json', 'yaml']

let expectedResults

beforeAll(() => {
  expectedResults = {
    stylish: readFixture('stylish_result.txt'),
    plain: readFixture('plain_result.txt'),
    json: readFixture('json_result.txt'),
  }
})

describe.each(TESTED_FORMATS)('%s files', (ext) => {
  let filepath1
  let filepath2

  beforeAll(() => {
    filepath1 = path.join('__fixtures__', `file1.${ext}`)
    filepath2 = path.join('__fixtures__', `file2.${ext}`)
  })

  describe('Formats', () => {
    test('Format: stylish', () => {
      expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedResults.stylish)
    })

    test('Format: plain', () => {
      expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedResults.plain)
    })

    test('Format: json', () => {
      expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedResults.json)
    })
  })

  describe('Default behavior', () => {
    test('Default format is stylish', () => {
      expect(genDiff(filepath1, filepath2)).toBe(expectedResults.stylish)
    })

    test('Empty files with default format', () => {
      expect(genDiff('__fixtures__/empty1.json', '__fixtures__/empty2.json')).toBe('{}')
    })
  })

  test('Unsupported format', () => {
    expect(() => genDiff(filepath1, filepath2, 'xml')).toThrow('Unsupported format: xml')
  })
})
