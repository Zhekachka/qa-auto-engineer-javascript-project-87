import _ from 'lodash'

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const formatPlain = (diff, parentPath = '') => {
  const lines = []
  for (let i = 0; i < diff.length; i++) {
    const node = diff[i]
    const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key

    // Обработка изменённых свойств
    if (i + 1 < diff.length && diff[i + 1].key === node.key && node.type === 'removed' && diff[i + 1].type === 'added') {
      const nextNode = diff[i + 1]
      lines.push(`Property '${currentPath}' was updated. From ${formatValue(node.value)} to ${formatValue(nextNode.value)}`)
      i++ // Пропускаем следующий элемент, так как он уже обработан
      continue
    }

    switch (node.type) {
      case 'added':
        lines.push(`Property '${currentPath}' was added with value: ${formatValue(node.value)}`)
        break
      case 'removed':
        lines.push(`Property '${currentPath}' was removed`)
        break
      case 'nested':
        lines.push(...formatPlain(node.children, currentPath).split('\n'))
        break
      default:
        break
    }
  }
  return lines.join('\n')
}

export default formatPlain
