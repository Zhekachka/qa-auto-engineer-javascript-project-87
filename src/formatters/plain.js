import _ from 'lodash'

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]'
  return typeof value === 'string' ? `'${value}'` : String(value)
}

const getFullKey = (node, parentKey = '') => {
  return parentKey ? `${parentKey}.${node.key}` : node.key
}

const formatPlain = (diff, parentKey = '') => {
  const lines = diff.flatMap((node) => {
    switch (node.type) {
      case 'changed':
        return `Property '${getFullKey(node, parentKey)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`
      case 'nested':
        return formatPlain(node.children, getFullKey(node, parentKey))
      case 'added':
        return `Property '${getFullKey(node, parentKey)}' was added with value: ${stringify(node.value)}`
      case 'removed':
        return `Property '${getFullKey(node, parentKey)}' was removed`
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })
  return lines.join('\n')
}

export default formatPlain
