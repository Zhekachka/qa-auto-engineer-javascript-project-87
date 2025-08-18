import { generateDiff } from '../src/index.js'

describe('Плоские JSON файлы', () => {
  test('Идентичные файлы', () => {
    const file1 = { host: 'hexlet.io' }
    const file2 = { host: 'hexlet.io' }
    expect(generateDiff(file1, file2)).toBe(
      '{\n    host: hexlet.io\n}',
    )
  })

  test('Ключ удален', () => {
    const file1 = { follow: false, host: 'hexlet.io' }
    const file2 = { host: 'hexlet.io' }
    expect(generateDiff(file1, file2)).toMatch(
      '{\n  - follow: false\n    host: hexlet.io\n}',
    )
  })

  test('Ключ добавлен', () => {
    const file1 = { host: 'hexlet.io' }
    const file2 = { host: 'hexlet.io', verbose: true }
    expect(generateDiff(file1, file2)).toBe(
      '{\n    host: hexlet.io\n  + verbose: true\n}',
    )
  })

  test('Значение изменено', () => {
    const file1 = { timeout: 50, host: 'hexlet.io' }
    const file2 = { timeout: 20, host: 'hexlet.io' }
    expect(generateDiff(file1, file2)).toBe(
      '{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n}',
    )
  })

  test('Комбинированные изменения', () => {
    const file1 = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    }

    const file2 = {
      timeout: 20,
      verbose: true,
      host: 'hexlet.io',
    }

    expect(generateDiff(file1, file2)).toMatch(
      `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`)
  })

  test('Сортировка ключей', () => {
    const file1 = { host: 'hexlet.io', timeout: 50 }
    const file2 = { timeout: 50, host: 'hexlet.io' }
    expect(generateDiff(file1, file2)).toBe(
      '{\n    host: hexlet.io\n    timeout: 50\n}',
    )
  })
})
