import _ from 'lodash'

const formatValue = (value) => { // форматируем
  if (_.isObject(value)) return '[complex value]' // любая вложенность
  return typeof value === 'string' ? `'${value}'` : value // строки делаем в кавычки
}

const formatPlain = (diff, parentKey = '') => { // в плоский текст
  const lines = diff.flatMap((node) => { // выравнивание массива
    const currentKey = parentKey ? `${parentKey}.${node.key}` : node.key
    switch (node.type) {
      case 'changed':
        return `Property '${currentKey}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
      case 'nested':
        return formatPlain(node.children, currentKey)
      case 'added':
        return `Property '${currentKey}' was added with value: ${formatValue(node.value)}`
      case 'removed':
        return `Property '${currentKey}' was removed`
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })
  return lines.join('\n') // объединяем
}

export default formatPlain
