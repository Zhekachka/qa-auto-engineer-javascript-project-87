import { generateDiff, getFileData } from '../src/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe.each(['json', 'yaml'])('%s files', (ext) => {
  let file1
  let file2
  const expectedResult = [
    '{',
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}',
  ].join('\n')

  const expectedResultPlain = [
    'Property \'follow\' was removed',
    'Property \'proxy\' was removed',
    'Property \'timeout\' was updated. From 50 to 20',
    'Property \'verbose\' was added with value: true',
  ].join('\n')

  const expectedResultJson = JSON.stringify({
    removed: ['follow', 'proxy'],
    added: [{ verbose: true }],
    changed: [{ timeout: { oldValue: 50, newValue: 20 } }],
  }, null, 2)

  beforeAll(() => {
    const filepath1 = getFixturePath(`file1.${ext}`)
    const filepath2 = getFixturePath(`file2.${ext}`)

    file1 = getFileData(filepath1)
    file2 = getFileData(filepath2)
  })

  describe('Formats', () => {
    test(`Format: stylish`, () => {
      expect(generateDiff(file1, file2, 'stylish')).toBe(expectedResult)
    })
    test(`Format: plain`, () => {
      expect(generateDiff(file1, file2, 'plain')).toEqual(expectedResultPlain)
    })
    test('Format: json', () => {
      expect(generateDiff(file1, file2, 'json')).toEqual(expectedResultJson)
    })
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
  test('Неизвестный формат', () => {
    expect(() => generateDiff(file1, file2, 'xml')).toThrow('Unsupported format: xml')
  })
})
