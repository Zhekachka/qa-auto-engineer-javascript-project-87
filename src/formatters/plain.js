import _ from 'lodash'

const formatValue = (value) => { 
  if (_.isObject(value)) return '[complex value]' 
  return typeof value === 'string' ? `'${value}'` : value 
}

const formatPlain = (diff, parentKey = '') => { 
  const lines = diff.flatMap((node) => { 
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
  return lines.join('\n')
}

export default formatPlain
