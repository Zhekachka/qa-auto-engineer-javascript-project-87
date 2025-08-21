import _ from 'lodash'

const makeIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2) // расчет отступа

const stringify = (value, depth) => { // сериализация
  if (!_.isObject(value)) return value // если не объект, то как есть

  const entries = Object.entries(value) // получение ключ значение
  const indent = makeIndent(depth + 1) // отступ
  const body = entries.map(([k, v]) => `${indent}  ${k}: ${stringify(v, depth + 1)}`).join('\n') // рекурсия
  return `{\n${body}\n${makeIndent(depth)}  }` // объединение с фигурными скобками
}

const stylish = (diff, depth = 1) => { // форматируем
  if (diff.length === 0) return '{}'
  const indent = makeIndent(depth) // отступы

  const lines = diff.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n')
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${indent.slice(2)}}`
}

export default stylish
